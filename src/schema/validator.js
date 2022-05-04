/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fieldNames from '../utils/field-names';
import definitions from './definitions.json';
import validationMode from '../settings';
import EPCISDocument from './EPCISDocument.schema.json';
import ObjectEvent from './ObjectEvent.schema.json';
import AggregationEvent from './AggregationEvent.schema.json';
import TransformationEvent from './TransformationEvent.schema.json';
import TransactionEvent from './TransactionEvent.schema.json';
import AssociationEvent from './AssociationEvent.schema.json';
import ExtendedEvent from './ExtendedEvent.schema.json';

/**
 * @typedef {object} ValidatorResult
 * @property {boolean} success - true if the validator found no errors.
 * @property {Array<string>} errors - List of errors.
 */
const successResult = { success: true, errors: [] };

const ajv = addFormats(new Ajv({ useDefaults: true, strict: false }), { mode: validationMode });

/**
 * This function returns a list of all the extensions defined in the context.
 * @param {{}} epcisDocument - the EPCISDocument that we want to get extensions from the context
 * @returns an array of all the extensions that are in the context
 */
const getAuthorizedExtensions = (epcisDocument) => {
  let epcisDocumentContext = {};
  if (Object.keys(epcisDocument).includes('@context')) {
    epcisDocumentContext = epcisDocument['@context'];

    let contextObject = {};
    let i = 0;
    if (Array.isArray(epcisDocumentContext)) {
      epcisDocumentContext.forEach((c) => {
        if (typeof c === 'string') {
          /* We must transform the string into an object.
            For this we put the name of the field: default
            and we have a counter in the case that there are
            several strings in the array */
          const obj = {};
          i += 1;
          obj[`default${i > 1 ? i : ''}`] = c;
          contextObject = { ...contextObject, ...obj };
        } else if (c instanceof Object) {
          contextObject = { ...contextObject, ...c };
        }
      });
    } else if (typeof epcisDocumentContext === 'string') {
      contextObject = { default: epcisDocumentContext };
    } else if (epcisDocumentContext instanceof Object) {
      contextObject = epcisDocumentContext;
    }
    return Object.keys(contextObject);
  }
  return [];
};

/**
 * Load a schema and include 'definitions'.
 *
 * @param {object} schema - schema to be loaded.
 * @returns {object} Loaded and enhanced schema.
 */
export const loadSchema = ((schema) => ({ ...schema, definitions }));

/** Available schemas */
const validators = {
  EPCISDocument: ajv.compile(EPCISDocument),
  ObjectEvent: ajv.compile(loadSchema(ObjectEvent)),
  AggregationEvent: ajv.compile(loadSchema(AggregationEvent)),
  TransformationEvent: ajv.compile(loadSchema(TransformationEvent)),
  TransactionEvent: ajv.compile(loadSchema(TransactionEvent)),
  AssociationEvent: ajv.compile(loadSchema(AssociationEvent)),
  ExtendedEvent: ajv.compile(loadSchema(ExtendedEvent)),
};

/**
 * Validate data against a nominated schema.
 *
 * @param {object} data - Data to validate.
 * @param {string} schemaName - Name of the schema from the following
 * list : EPCISDocument, ObjectEvent, AggregationEvent, TransformationEvent, TransactionEvent,
 * AssociationEvent, ExtendedEvent
 * @returns {ValidatorResult} Validation results.
 */
export const validateAgainstSchema = (data, schemaName) => {
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
export const ensureFieldSet = (data, fieldSet) => {
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
      quantityList = [],
      inputQuantityList = [],
      outputQuantityList = [],
      childQuantityList = [],
      sensorElementList = [],
    } = event;

    // Validate bizTransactionList
    bizTransactionList.forEach((p) => ensureFieldSet(p, 'bizTransactionElement'));

    // Validate source/destination lists
    // sourceList.forEach((p) => ensureFieldSet(p, 'sourceElement'));
    // destinationList.forEach((p) => ensureFieldSet(p, 'destinationElement'));
    // This part is already check in the schema

    // // Validate various quantity list types
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

const checkExtensions = (extensions, authorizedExtensions) => {
  for (let k = 0; k < extensions.length; k += 1) {
    const extension = extensions[k];
    if (!authorizedExtensions.includes(extension)) {
      const error = `Event contains unknown extension: ${extension}`;
      return { success: false, errors: [error] };
    }
  }
  return successResult;
};

/**
 * Validate EPCIS Document.
 *
 * @param {object} epcisDocument - Data to validate.
 * @param {boolean} throwError - if set to true, it will throw an error if
 * the data is not valid. Otherwise, it won't throw an error and it will still
 * return an object containing a boolean and the errors messages.
 * (e.g { success: false, errors: ["the error message"] })
 * @returns {ValidatorResult} Validation results.
 */
export const validateEpcisDocument = (epcisDocument, throwError = true) => {
  let eventList = [];

  // Validate the capture document
  const documentResult = validateAgainstSchema(epcisDocument, 'EPCISDocument');

  if (!documentResult.success && throwError) {
    throw new Error(`${documentResult.errors}`);
  } else if (!documentResult.success) {
    return documentResult;
  }

  if (epcisDocument.type === 'EPCISQueryDocument') {
    eventList = epcisDocument.epcisBody.queryResults.resultsBody.eventList;
  } else {
    eventList = epcisDocument.epcisBody.eventList;
  }

  // Validate the events by event type
  for (let i = 0; i < eventList.length; i += 1) {
    const event = eventList[i];
    // Validate all extra field names and possible extensions
    const eventFieldsResult = validateExtraEventFields(event);
    if (!eventFieldsResult.success && throwError) {
      throw new Error(`${eventFieldsResult.errors}`);
    } else if (!eventFieldsResult.success) {
      return eventFieldsResult;
    }
  }

  const authorizedExtensions = getAuthorizedExtensions(epcisDocument);

  // for each event in the eventList find all the extensions
  for (let i = 0; i < eventList.length; i += 1) {
    const event = eventList[i];
    const eventCustomFields = Object.keys(event).filter((key) => key.includes(':'));
    const eventExtensions = eventCustomFields.map((key) => key.split(':')[0]);

    // check if the extensions are authorized for the event fields
    const eventExtensionsResult = checkExtensions(eventExtensions, authorizedExtensions);
    if (!eventExtensionsResult.success && throwError) {
      throw new Error(`${eventExtensionsResult.errors}`);
    } else if (!eventExtensionsResult.success) {
      return eventExtensionsResult;
    }

    // check if the extensions are authorized for the sub-event fields (e.g. sensorElementList)
    const eventFields = Object.keys(event);
    for (let j = 0; j < eventFields.length; j += 1) {
      if (!eventFields[j].includes(':') && typeof event[eventFields[j]] === 'object') {
        const eventSubFields = Object.keys(event[eventFields[j]]);
        const customFields = eventSubFields.filter((key) => key.includes(':'));
        const extensions = customFields.map((key) => key.split(':')[0]);

        const extensionsResult = checkExtensions(extensions, authorizedExtensions);
        if (!extensionsResult.success && throwError) {
          throw new Error(`${extensionsResult.errors}`);
        } else if (!extensionsResult.success) {
          return extensionsResult;
        }
      }
    }
  }

  // No errors in document or any events
  return successResult;
};
