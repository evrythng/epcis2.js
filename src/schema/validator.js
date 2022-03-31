/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as fieldNames from '../entity/field-names';
import definitions from './definitions.json';
import validationMode from '../settings';
import EPCISDocument from './EPCISDocument.schema.json';
import ObjectEvent from './ObjectEvent.schema.json';
import AggregationEvent from './AggregationEvent.schema.json';
import TransformationEvent from './TransformationEvent.schema.json';
import TransactionEvent from './TransactionEvent.schema.json';
import AssociationEvent from './AssociationEvent.schema.json';
import ExtendedEvent from './ExtendedEvent.schema.json';
import EPCISQueryDocument from './EPCISQueryDocument.schema.json';

/**
 * @typedef {object} ValidatorResult
 * @property {boolean} success - true if the validator found no errors.
 * @property {Array<string>} errors - List of errors.
 */
const successResult = { success: true, errors: [] };

const ajv = addFormats(new Ajv({ useDefaults: true, strict: false }), { mode: validationMode });

/**
 * Load a schema and include 'definitions'.
 *
 * @param {object} schema - schema to be loaded.
 * @returns {object} Loaded and enhanced schema.
 */
const loadSchema = ((schema) => ({ ...schema, definitions })
);

/** Available schemas */
const validators = {
  EPCISDocument: ajv.compile(EPCISDocument),
  ObjectEvent: ajv.compile(loadSchema(ObjectEvent)),
  AggregationEvent: ajv.compile(loadSchema(AggregationEvent)),
  TransformationEvent: ajv.compile(loadSchema(TransformationEvent)),
  TransactionEvent: ajv.compile(loadSchema(TransactionEvent)),
  AssociationEvent: ajv.compile(loadSchema(AssociationEvent)),
  ExtendedEvent: ajv.compile(loadSchema(ExtendedEvent)),
  EPCISQueryDocument: ajv.compile(loadSchema(EPCISQueryDocument)),
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
  let documentResult = '';
  let eventList = [];
  if (epcisDocument.type === 'EPCISQueryDocument') {
    // Validate the query document
    documentResult = validateAgainstSchema(epcisDocument, 'EPCISQueryDocument');
    eventList = epcisDocument.epcisBody.queryResults.resultsBody.eventList;
  } else if (epcisDocument.type === 'EPCISDocument') {
    // Validate the capture document
    documentResult = validateAgainstSchema(epcisDocument, 'EPCISDocument');
    eventList = epcisDocument.epcisBody.eventList;
  }
  if (!documentResult.success) throw new Error(`${documentResult.errors}`);

  // Validate the events by event type
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
