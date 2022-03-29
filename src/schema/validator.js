/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

const { default: Ajv } = require('ajv');
const { default: addFormats } = require('ajv-formats');
const { readFileSync } = require('fs');
const EPCISDocument = require('./EPCISDocument.schema copy.json');
const fieldNames = require('../entity/field-names');
const definitions = require('./definitions.json');
const validationMode = require('../settings');

/**
 * @typedef {object} ValidatorResult
 * @property {boolean} success - true if the validator found no errors.
 * @property {Array<string>} errors - List of errors.
 */
const successResult = { success: true, errors: [] };

const ajv = addFormats(new Ajv({ useDefaults: true }), { mode: validationMode });

/**
 * Load a schema and include 'definitions'.
 *
 * @param {string} schemaName - Name of schema.
 * @returns {object} Loaded and enhanced schema.
 */
const loadSchema = (schemaName) => ({
  ...JSON.parse(readFileSync(`src/schema/${schemaName}.schema.json`, 'utf8')), definitions,
});

/** Available schemas */
const validators = {
  EPCISDocument: ajv.compile(loadSchema('EPCISDocument')),
  ObjectEvent: ajv.compile(loadSchema('ObjectEvent')),
  AggregationEvent: ajv.compile(loadSchema('AggregationEvent')),
  TransformationEvent: ajv.compile(loadSchema('TransformationEvent')),
  TransactionEvent: ajv.compile(loadSchema('TransactionEvent')),
  AssociationEvent: ajv.compile(loadSchema('AssociationEvent')),
};

/**
 * Validate an EPCIS document.
 *
 * @param {object} instance - The data to validate against the schema.
 * @returns {Array<string>} Any errors.
 */
const validateSchema = (instance) => {
  // const test = validators.EPCISDocument;
  const test = ajv.compile(EPCISDocument);
  if (!test(instance)) {
    const [{ dataPath, message }] = test.errors;
    throw new Error(`${dataPath}: ${message}`);
  }
};

/**
 * Validate data against a nominated schema.
 *
 * @param {object} data - Data to validate.
 * @param {string} schemaName - Name of the schema from validatorNames.
 * @returns {ValidatorResult} Validation results.
 */
const validateAgainstSchema = (data, schemaName) => {
  const validatorNames = Object.keys(validators);
  if (!validatorNames.includes(schemaName)) throw new Error(`Invalid schemaName: ${schemaName}`);

  const validator = validators[schemaName];
  if (validator(data)) return successResult;

  const [{ dataPath, message }] = validator.errors;
  return { success: false, errors: [`${schemaName}${dataPath} ${message}`] };
};

/**
 * Ensure an object has only expected fields, or extensions with namespace.
 *
 * @throws {Error} if unexpected non-namespaced fields are found or an invalid fieldSet is used.
 *
 * @param {object} data - Data to validate.
 * @param {string} fieldSet - Name of the field set from field-names.js.
 */
const ensureFieldSet = (data, fieldSet) => {
  if (!data) return;
  if (!fieldNames[fieldSet]) throw new Error(`Unknown fieldSet: ${fieldSet}`);

  const dataFields = Object.keys(data);
  const allowed = fieldNames[fieldSet];

  // All fields must be a known field, or namespaced:extensions
  const unknownNames = dataFields.filter((p) => !allowed[p] && p.split(':').length < 2);
  if (unknownNames.length === 0) return;

  throw new Error(`Event contains unknown fields: ${unknownNames.join(', ')}`);
};

/**
 * Validate an event only has expected fields, including those that are namespaced:extensions.
 *
 * Because many fields have sub-fields, they should be validated too.
 *
 * @param {object} event - Event to validate.
 * @returns {ValidatorResult} Validation results.
 */
const validateExtraEventFields = (event) => {
  try {
    // Validate top-level fields
    ensureFieldSet(event, 'event');

    // Validate sub-field objects
    ensureFieldSet(event.readPoint, 'readPoint');
    ensureFieldSet(event.bizLocation, 'bizLocation');
    ensureFieldSet(event.persistentDisposition, 'persistentDisposition');
    ensureFieldSet(event.errorDeclaration, 'errorDeclaration');

    // Validate sub-fields that are lists of objects
    const {
      bizTransactionList = [],
      sourceList = [],
      destinationList = [],
      quantityList = [],
      inputQuantityList = [],
      outputQuantityList = [],
      childQuantityList = [],
      sensorElementList = [],
    } = event;

    // Validate bizTransactionList
    bizTransactionList.forEach((p) => ensureFieldSet(p, 'bizTransaction'));

    // Validate source/destination lists
    sourceList.forEach((p) => ensureFieldSet(p, 'source'));
    destinationList.forEach((p) => ensureFieldSet(p, 'destination'));

    // Validate various quantity list types
    quantityList.forEach((p) => ensureFieldSet(p, 'quantityElement'));
    inputQuantityList.forEach((p) => ensureFieldSet(p, 'quantityElement'));
    outputQuantityList.forEach((p) => ensureFieldSet(p, 'quantityElement'));
    childQuantityList.forEach((p) => ensureFieldSet(p, 'quantityElement'));

    // Validate sensor elements and contained reports
    sensorElementList.forEach((element) => {
      const { sensorMetadata, sensorReport = [] } = element;

      ensureFieldSet(element, 'sensorElement');
      ensureFieldSet(sensorMetadata, 'sensorMetadata');
      sensorReport.forEach((p) => ensureFieldSet(p, 'sensorReport'));
    });

    // All fields checked out
    return successResult;
  } catch (err) {
    // Return expected error type
    return {
      success: false,
      errors: [err.message],
    };
  }
};

/**
 * Validate EPCIS Document.
 *
 * @param {object} epcisDocument - Data to validate.
 * @returns {ValidatorResult} Validation results.
 */
const validateEpcisDocument = (epcisDocument) => {
  // Validate the capture document
  const documentResult = validateAgainstSchema(epcisDocument, 'EPCISDocument');
  if (!documentResult.success) throw new Error(`${documentResult.errors}`);

  // Validate the events by event type
  const { eventList } = epcisDocument.epcisBody;
  for (let i = 0; i < eventList.length; i += 1) {
    const event = eventList[i];

    // Validate against schema for defined fields for this event type
    const eventResult = validateAgainstSchema(event, event.type);
    if (!eventResult.success) throw new Error(`${eventResult.errors}`);

    // Validate all extra field names and possible extensions
    const eventFieldsResult = validateExtraEventFields(event);
    if (!eventFieldsResult.success) throw new Error(`${eventFieldsResult.errors}`);
  }

  // No errors in document or any events
  return successResult;
};

export {
  validateAgainstSchema,
  ensureFieldSet,
  validateEpcisDocument,
};

export default validateSchema;
