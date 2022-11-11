/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

// The rules of the algorithm are defined here :
// https://github.com/RalphTro/epcis-event-hash-generator#algorithm

import { getTheTimeZoneOffsetFromDateString } from '../utils/utils';
import { normalizeDigitalLinks } from './dlNormalizer';

/**
 * The list of fields that will be ignored in the pre-hashed string
 * @type {string[]}
 */
export const toBeIgnored = ['recordTime', 'eventID', 'errorDeclaration', '@context', 'certificationInfo'];

/**
 * Check if the parameter is a string
 * @param obj
 * @return true if the parameter is a string, false otherwise
 */
export const isAString = (obj) => typeof obj === 'string' || obj instanceof String;

/**
 * If the parameter is a string, it returns the string without the useless spaces at the beginning
 * or at the end
 * If the parameter isn't a string, it returns the parameter
 *
 * It useful for the rule n°5 of the algorithm
 *
 * @param {*} obj
 * @return {*} - the obj if it isn't a string, the parameter without useless spaces if it is a
 * string
 */
export const removeWhiteSpaceAtTheBeginningOrEndOfString = (obj) => {
  if (!isAString(obj)) return obj;

  return obj.trim();
};

/**
 * if present, EPC URIs (starting with ‘urn:epc:id’), EPC Class URIs (starting with ‘urn:epc:class’)
 * or EPC Pattern URIs (starting with ‘urn:epc:idpat’) SHALL be converted into the corresponding
 * canonical GS1 Digital Link URI (starting with ‘https://id.gs1.org’). Canonical GS1 Digital Link
 * URIs are specified in [GS1 Digital Link: URI Syntax, release 1.2], section 4.11.
 *
 * @param obj
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @returns {*} the obj if it isn't a string, the parameter updated to follow the rules if it is
 * a string
 */
export const convertEpcUriToDlUri = (obj, throwError) => {
  if (!isAString(obj)) return obj;

  return normalizeDigitalLinks(obj, throwError);
};

/**
 * Check if the parameter is a date
 * @param obj
 * @return true if the parameter is a date, false otherwise
 */
// eslint-disable-next-line  no-restricted-globals
export const isADate = (obj) => isNaN(obj) && !isNaN(Date.parse(obj)) && obj.length > 17;

/**
 * If the UTC date passed in param contains a timezone, it removes it
 * It is useful for the rule n°8 of the algorithm
 *
 * @param {string} date - a string representing an UTC date
 * @return {string} - the date without the timezone
 */
export const removeTimeZoneProperty = (date) => new Date(date).toISOString();

/**
 * If the UTC date passed in param hasn't any offset and hasn't a 'Z' at the end, it adds it
 *
 * It useful for the rule n°8 of the algorithm
 *
 * @param {string} date - a string representing an UTC date
 * @return {string} - the date with a 'Z' at the end if it needs to, the date without any
 * modification otherwise
 */
export const addATrailingZ = (date) => {
  if (getTheTimeZoneOffsetFromDateString(date)) return date;

  return date.endsWith('Z') ? date : `${date}Z`;
};

/**
 * Return a date passed in parameter, but with a millisecond property that follows the rule of the
 * algorithm
 * @param {string} date
 * @returns {string} the updated date
 */
export const addMillisecondPrecisionToDate = (date) => {
  const [yearMonthDay, time] = date.split('T');
  const startTime = time.substring(0, 5);
  let endTime = time.substring(6);
  let ms;
  let end = getTheTimeZoneOffsetFromDateString(date);

  if (!end) {
    end = 'Z';
  }

  endTime = endTime.substring(0, endTime.indexOf(end.charAt(0)));

  if (endTime.length > 2) {
    ms = endTime.substring(endTime.indexOf('.') + 1);
    endTime = endTime.substring(0, endTime.indexOf('.'));

    while (ms.length < 3) {
      ms += '0';
    }

    if (ms.length > 3) {
      ms = ms.substring(0, 3);
    }
  } else {
    ms = '000';
  }

  return `${yearMonthDay}T${startTime}:${endTime}.${ms}${end}`;
};

/**
 * If the parameter is a date, it returns the parameter with some modification to follow the
 * rules defined by the algorithm
 * If the parameter isn't a date, it returns the parameter
 *
 * It useful for the rule n°8 and n°9 of the algorithm
 *
 * @param {*} obj
 * @return {*} - the obj if it isn't a date, the date with some modification to follow the
 * rules defined by the algorithm otherwise.
 */
export const formatTheDate = (obj) => {
  if (!isADate(obj)) return obj;

  let date = addATrailingZ(obj);

  date = removeTimeZoneProperty(date);

  date = addMillisecondPrecisionToDate(date);

  return date;
};

/**
 * returns a string that concatenated all the string passed in param, ordered in lexical order
 * @param {[]} strings - the list of string
 * @returns {string} string that concatenated all the string, ordered in lexical order
 */
export const listOfStringToPreHashLexicalOrderedString = (strings) => strings.sort().reduce((acc, s) => `${acc}${s}`, '');

/**
 * Read and returns all the contexts provided in the object
 * @param {{}} object
 * @return {{}} - the contexts
 * e.g {
 *    "example": "http://ns.example.com/epcis/",
 *    "example2": "http://ns.example2.com/epcis/",
 * }
 */
export const getEventContexts = (object) => {
  let context = {};

  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === 'object') {
      context = { ...context, ...getEventContexts(value) };
    } else if (key.startsWith('@xmlns:')) {
      context[key.substring(7)] = value;
    }
  });

  return context;
};
