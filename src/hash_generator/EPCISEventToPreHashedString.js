/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

import {
  bizLocationCanonicalPropertyOrder,
  bizTransactionCanonicalPropertyOrder,
  canonicalPropertyOrder,
  destinationCanonicalPropertyOrder,
  persistentDispositionCanonicalPropertyOrder,
  quantityElementCanonicalPropertyOrder,
  readPointCanonicalPropertyOrder,
  sensorElementCanonicalPropertyOrder,
  sensorMetadataCanonicalPropertyOrder,
  sensorReportCanonicalPropertyOrder,
  sourceCanonicalPropertyOrder,
} from './canonicalPropertyOrder';
import {
  convertEpcUriToDlUri,
  formatTheDate,
  listOfStringToPreHashLexicalOrderedString,
  getEventContexts,
  removeWhiteSpaceAtTheBeginningOrEndOfString,
  toBeIgnored,
} from './hashAlgorithmUtils';
import cbv from '../cbv/cbv';

// The rules of the algorithm are defined here :
// https://github.com/RalphTro/epcis-event-hash-generator#algorithm

/**
 * Return the pre-hashed string corresponding to the field-value passed in parameter
 * @param {string} field
 * @param {*} value
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @returns {string} - the pre-hashed string
 */
export const getPreHashStringOfField = (field, value, throwError) => {
  value = removeWhiteSpaceAtTheBeginningOrEndOfString(value); // rule n°5
  value = formatTheDate(value); // rule n°8 and rule n°9
  value = convertEpcUriToDlUri(value, throwError); // rule n°15
  return `${field}=${value}`;
};

/**
 * Return the pre-hashed string corresponding to the custom field list passed in parameter
 * @param {string} prefix - the prefix that will be applied to each element of the list
 * e.g, if the list is:
 * "example:mySubField3": [
 *  "3",
 *  "1"
 * ]
 * The prefix would be:
 * {https://ns.example.com/epcis}mySubField3
 *
 * and this function would return:
 * {https://ns.example.com/epcis}mySubField3=1{https://ns.example.com/epcis}mySubField3=3
 *
 * @param {*} value
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @returns {string} - the pre-hashed string
 */
export const getPreHashStringFromCustomFieldElementList = (prefix, value, throwError) => {
  const strings = [];
  for (let i = 0; i < value.length; i += 1) {
    strings.push(getPreHashStringOfField(prefix, value[i], throwError));
  }
  return listOfStringToPreHashLexicalOrderedString(strings);
};

/**
 * Return the pre-hashed string corresponding to the custom field passed in parameter
 * @param {string} key
 * @param {*} value
 * @param {{}} context - the list of context (e.g {
 *    "example": "http://ns.example.com/epcis/",
 *    "example2": "http://ns.example2.com/epcis/",
 * })
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @returns {string} - the pre-hashed string
 */
export const getPreHashStringFromCustomFieldElement = (key, value, context, throwError) => {
  let field = key;

  const splitKey = key.split(':');

  if (splitKey.length > 1) {
    if (!context.hasOwnProperty(splitKey[0])) {
      // this field gives the context and shall not be added to the pre-hashed string
      if (splitKey[0] === '@xmlns') {
        return '';
      }

      if (throwError) {
        throw new Error(`The context isn't defined for the custom field ${key}`);
      }

      return '';
    }

    field = key.replace(`${splitKey[0]}:`, `{${context[splitKey[0]]}}`);
  } else if (key.startsWith('#')) {
    // if the key is '#text' for example, we don't want ot add the
    // key to the pre-hashed string
    return `=${value}`;
  }

  // if the object has children
  if (value.toString() === '[object Object]') {
    return `${field}${getPreHashStringOfElementWithChildren(value, context, throwError)}`;
  }

  // If the object is an Array
  if (Array.isArray(value)) {
    return getPreHashStringFromCustomFieldElementList(field, value, throwError);
  }

  return getPreHashStringOfField(field, value, throwError);
};

/**
 * Return the pre-hashed string corresponding to the element passed in parameter
 * @param {{}} element
 * @param {{}} context - the list of context (e.g {
 *    "example": "http://ns.example.com/epcis/",
 *    "example2": "http://ns.example2.com/epcis/",
 * })
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @returns {string} - the pre-hashed string
 */
export const getPreHashStringOfElementWithChildren = (element, context, throwError) => {
  let string = '';
  const strings = [];

  Object.keys(element).forEach((key) => {
    strings.push(getPreHashStringFromCustomFieldElement(key, element[key], context, throwError));
  });

  string += listOfStringToPreHashLexicalOrderedString(strings);

  return string;
};

/**
 * Return the pre-hashed string corresponding to the list passed in parameter + the pre-hashed
 * strings of custom fields
 * @param {[]} list - the list to convert
 * @param {{}} context - the list of context (e.g {
 *    "example": "http://ns.example.com/epcis/",
 *    "example2": "http://ns.example2.com/epcis/",
 * })
 * @param {string} fieldName - the field name of the list
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @returns {*}
 */
export const preHashStringTheList = (list, context, fieldName, throwError) => {
  let string = fieldName;
  const strings = [];
  const customFields = [];
  let res;

  if (list.length === 0) return ''; // rule n°4

  switch (fieldName) {
    case 'epcList':
      for (let i = 0; i < list.length; i += 1) {
        strings.push(getPreHashStringOfField('epc', list[i], throwError));
      }
      break;
    case 'childEPCs':
      for (let i = 0; i < list.length; i += 1) {
        strings.push(getPreHashStringOfField('epc', list[i], throwError));
      }
      break;
    case 'outputEPCList':
      for (let i = 0; i < list.length; i += 1) {
        strings.push(getPreHashStringOfField('epc', list[i], throwError));
      }
      break;
    case 'inputEPCList':
      for (let i = 0; i < list.length; i += 1) {
        strings.push(getPreHashStringOfField('epc', list[i], throwError));
      }
      break;
    case 'set':
      string = '';
      for (let i = 0; i < list.length; i += 1) {
        res = list[i];
        // if, for example, the field is equal to 'completeness_inferred' instead of
        // 'https://ns.gs1.org/cbv/Disp-completeness_inferred' for example, we need to complete it
        if (Object.values(cbv.dispositions).includes(res)) {
          res = `https://ns.gs1.org/cbv/Disp-${res}`;
        }
        strings.push(getPreHashStringOfField('set', res, throwError));
      }
      break;
    case 'unset':
      string = '';
      for (let i = 0; i < list.length; i += 1) {
        res = list[i];
        // if, for example, the field is equal to 'completeness_inferred' instead of
        // 'https://ns.gs1.org/cbv/Disp-completeness_inferred' for example, we need to complete it
        if (Object.values(cbv.dispositions).includes(res)) {
          res = `https://ns.gs1.org/cbv/Disp-${res}`;
        }
        strings.push(getPreHashStringOfField('unset', res, throwError));
      }
      break;
    case 'quantityList':
      for (let i = 0; i < list.length; i += 1) {
        res = getOrderedPreHashString(
          list[i],
          context,
          quantityElementCanonicalPropertyOrder,
          throwError,
        );
        strings.push(`quantityElement${res.preHashed}`);
        customFields.push(...res.customFields.map((j) => `quantityElement${j}`));
      }
      break;
    case 'childQuantityList':
      for (let i = 0; i < list.length; i += 1) {
        res = getOrderedPreHashString(
          list[i],
          context,
          quantityElementCanonicalPropertyOrder,
          throwError,
        );
        strings.push(`quantityElement${res.preHashed}`);
        customFields.push(...res.customFields.map((j) => `quantityElement${j}`));
      }
      break;
    case 'inputQuantityList':
      for (let i = 0; i < list.length; i += 1) {
        res = getOrderedPreHashString(
          list[i],
          context,
          quantityElementCanonicalPropertyOrder,
          throwError,
        );
        strings.push(`quantityElement${res.preHashed}`);
        customFields.push(...res.customFields.map((j) => `quantityElement${j}`));
      }
      break;
    case 'outputQuantityList':
      for (let i = 0; i < list.length; i += 1) {
        res = getOrderedPreHashString(
          list[i],
          context,
          quantityElementCanonicalPropertyOrder,
          throwError,
        );
        strings.push(`quantityElement${res.preHashed}`);
        customFields.push(...res.customFields.map((j) => `quantityElement${j}`));
      }
      break;
    case 'bizTransactionList':
      for (let i = 0; i < list.length; i += 1) {
        // if, for example, the field is equal to 'bol' instead of
        // 'https://ns.gs1.org/cbv/BTT-bol', we need to complete it
        if (Object.values(cbv.businessTransactionTypes).includes(list[i].type)) {
          list[i].type = `https://ns.gs1.org/cbv/BTT-${list[i].type}`;
        }
        res = getOrderedPreHashString(
          list[i],
          context,
          bizTransactionCanonicalPropertyOrder,
          throwError,
        );
        strings.push(res.preHashed);
        customFields.push(...res.customFields.map((j) => `bizTransaction${j}`));
      }
      break;
    case 'sourceList':
      for (let i = 0; i < list.length; i += 1) {
        // if, for example, the field is equal to 'location' instead of
        // 'https://ns.gs1.org/cbv/SDT-location', we need to complete it
        if (Object.values(cbv.sourceDestinationTypes).includes(list[i].type)) {
          list[i].type = `https://ns.gs1.org/cbv/SDT-${list[i].type}`;
        }
        res = getOrderedPreHashString(list[i], context, sourceCanonicalPropertyOrder, throwError);
        strings.push(res.preHashed);
        customFields.push(...res.customFields.map((j) => `source${j}`));
      }
      break;
    case 'destinationList':
      for (let i = 0; i < list.length; i += 1) {
        // if, for example, the field is equal to 'location' instead of
        // 'https://ns.gs1.org/cbv/SDT-location', we need to complete it
        if (Object.values(cbv.sourceDestinationTypes).includes(list[i].type)) {
          list[i].type = `https://ns.gs1.org/cbv/SDT-${list[i].type}`;
        }
        res = getOrderedPreHashString(
          list[i],
          context,
          destinationCanonicalPropertyOrder,
          throwError,
        );
        strings.push(res.preHashed);
        customFields.push(...res.customFields.map((j) => `destination${j}`));
      }
      break;
    case 'sensorElementList':
      for (let i = 0; i < list.length; i += 1) {
        res = getOrderedPreHashString(
          list[i],
          context,
          sensorElementCanonicalPropertyOrder,
          throwError,
        );
        strings.push(`sensorElement${res.preHashed}`);
        customFields.push(...res.customFields.map((j) => `sensorElement${j}`));
      }
      break;
    case 'sensorReport':
      string = '';
      for (let i = 0; i < list.length; i += 1) {
        // if, for example, the field is equal to 'Temperature' instead of
        // 'https://gs1.org/voc/MeasurementType-Temperature' we need to complete it
        if (Object.values(cbv.sensorMeasurementTypes).includes(list[i].type)) {
          list[i].type = `https://gs1.org/voc/MeasurementType-${list[i].type}`;
        }

        // if, for example, the field is equal to 'ALARM_CONDITION' instead of
        // 'https://gs1.org/voc/SensorAlertType-ALARM_CONDITION' we need to complete it
        if (Object.values(cbv.alarmTypes).includes(list[i].exception)) {
          list[i].exception = `https://gs1.org/voc/SensorAlertType-${list[i].exception}`;
        }

        // if, for example, the field is equal to 'x' instead of
        // 'https://ns.gs1.org/cbv/Comp-x' we need to complete it
        if (Object.values(cbv.components).includes(list[i].component)) {
          list[i].component = `https://ns.gs1.org/cbv/Comp-${list[i].component}`;
        }

        res = getOrderedPreHashString(
          list[i],
          context,
          sensorReportCanonicalPropertyOrder,
          throwError,
        );
        strings.push(`sensorReport${res.preHashed}`);
        customFields.push(...res.customFields.map((j) => `sensorReport${j}`));
      }
      break;
    default:
      for (let i = 0; i < list.length; i += 1) {
        customFields.push(
          getPreHashStringFromCustomFieldElement(fieldName, list[i], context, throwError),
        );
      }
      break;
  }

  // rule n°12 - order the element of a list according to their case-sensitive lexical ordering
  string += listOfStringToPreHashLexicalOrderedString(strings);

  return { preHashed: string, customFields };
};

/**
 * Order the fields of the object passed in param according to the orderList and returns a
 * pre-hashed string + the pre-hashed strings of custom fields
 * @param {{}} object
 * @param {{}} context - the list of context (e.g {
 *    "example": "http://ns.example.com/epcis/",
 *    "example2": "http://ns.example2.com/epcis/",
 * })
 * @param {[]} orderList
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @param {boolean} recursive - false if it is the first call of the function - true if it is being
 * called from inside the function
 * @returns {{preHashed: string, customFields: []}} the object passed in parameter with its field
 * ordered
 */
export const getOrderedPreHashString = (
  object,
  context,
  orderList,
  throwError,
  recursive = true,
) => {
  let string = '';
  const strings = [];
  let res;

  // First, we add the fields that are defined in the order list
  for (let i = 0; i < orderList.length; i += 1) {
    if (object.hasOwnProperty(orderList[i])) {
      if (Array.isArray(object[orderList[i]])) {
        res = preHashStringTheList(object[orderList[i]], context, orderList[i], throwError);
        string += res.preHashed;
        strings.push(...res.customFields);
      } else {
        switch (orderList[i]) {
          case 'type':
            // if it is the root 'type' (i.e the type of the event) we replace 'type' by 'eventType'
            // else - it is the type of a subfield, we don't replace it.
            string += getPreHashStringOfField(
              recursive ? 'type' : 'eventType',
              object[orderList[i]],
              throwError,
            );
            break;
          case 'readPoint':
            string += 'readPoint';
            res = getOrderedPreHashString(
              object[orderList[i]],
              context,
              readPointCanonicalPropertyOrder,
              throwError,
            );
            string += res.preHashed;
            strings.push(...res.customFields.map((j) => `readPoint${j}`));
            break;
          case 'bizLocation':
            string += 'bizLocation';
            res = getOrderedPreHashString(
              object[orderList[i]],
              context,
              bizLocationCanonicalPropertyOrder,
              throwError,
            );
            string += res.preHashed;
            strings.push(...res.customFields.map((j) => `bizLocation${j}`));
            break;
          case 'sensorMetadata':
            string += 'sensorMetadata';
            res = getOrderedPreHashString(
              object[orderList[i]],
              context,
              sensorMetadataCanonicalPropertyOrder,
              throwError,
            );
            string += res.preHashed;
            strings.push(...res.customFields.map((j) => `sensorMetadata${j}`));
            break;
          case 'persistentDisposition':
            string += 'persistentDisposition';
            res = getOrderedPreHashString(
              object[orderList[i]],
              context,
              persistentDispositionCanonicalPropertyOrder,
              throwError,
            );
            string += res.preHashed;
            strings.push(...res.customFields.map((j) => `persistentDisposition${j}`));
            break;
          case 'ilmd':
            string += `ilmd${getPreHashStringOfElementWithChildren(
              object[orderList[i]],
              context,
              throwError,
            )}`;
            break;
          case 'bizStep':
            res = object[orderList[i]];
            // if, for example, the field is equal to 'accepting' instead of
            // 'https://ns.gs1.org/cbv/BizStep-accepting' for example, we need to complete it
            if (Object.values(cbv.bizSteps).includes(res)) {
              res = `https://ns.gs1.org/cbv/BizStep-${res}`;
            }

            string += getPreHashStringOfField(orderList[i], res, throwError);
            break;
          case 'disposition':
            res = object[orderList[i]];
            // if, for example, the field is equal to 'active' instead of
            // 'https://ns.gs1.org/cbv/Disp-active', we need to complete it
            if (Object.values(cbv.dispositions).includes(res)) {
              res = `https://ns.gs1.org/cbv/Disp-${res}`;
            }

            string += getPreHashStringOfField(orderList[i], res, throwError);
            break;
          default:
            string += getPreHashStringOfField(orderList[i], object[orderList[i]], throwError);
            break;
        }
      }
    }
  }

  // Then, we look for the fields that are not defined in the order list
  const fieldsToAdd = {};

  Object.keys(object).forEach((prop) => {
    if (!orderList.includes(prop) && !toBeIgnored.includes(prop)) {
      fieldsToAdd[prop] = object[prop];
    }
  });

  Object.keys(fieldsToAdd).forEach((prop) => {
    strings.push(
      getPreHashStringFromCustomFieldElement(prop, fieldsToAdd[prop], context, throwError),
    );
  });

  return { preHashed: string, customFields: strings };
};

/**
 * Convert the epcis event passed in parameter into a pre-hashed string
 * @param {{}} event - the EPCIS Event that needs to be converted
 * @param {{}|string|Array{any}} context - the list of contexts (e.g {
 *    "example": "http://ns.example.com/epcis/",
 *    "example2": "http://ns.example2.com/epcis/",
 * })
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @returns {string} - the pre-hashed string that can be converted to an hashed string
 */
export const eventToPreHashedString = (event, context, throwError = true) => {
  // this field extendedContext contains the context defined
  // in the "context" field and the context defined directly
  // in the JSON (e.g "@xmlns:example": "https://ns.example.com/epcis")
  let contextObject = {};
  let i = 0;
  if (Array.isArray(context)) {
    context.forEach((c) => {
      if (typeof c === 'string') {
        /* We must transform the string into an object.
          For this we put the name of the field: default
          and we have a counter in the case that there are
          several strings in the array */
        const obj = {};
        let fieldName = '';
        i += 1;
        if (i === 1) {
          fieldName = 'default';
        } else {
          fieldName = `default${i}`;
        }
        obj[fieldName] = c;
        contextObject = { ...contextObject, ...obj };
      } else if (c instanceof Object) {
        contextObject = { ...contextObject, ...c };
      }
    });
  } else if (typeof context === 'string') {
    contextObject = { default: context };
  } else if (context instanceof Object) {
    contextObject = context;
  }
  const extendedContext = { ...contextObject, ...getEventContexts(event) };
  const res = getOrderedPreHashString(
    event,
    extendedContext,
    canonicalPropertyOrder,
    throwError,
    false,
  );
  return res.preHashed + listOfStringToPreHashLexicalOrderedString(res.customFields);
};
