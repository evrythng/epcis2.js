/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/** A string date with a timezone offset can't be less than 7 chars */
const MIN_DATE_WITH_OFFSET_LENGTH = 7;

/**
 * Convert a number (e.g 7) to a two character string (e.g '07')
 *
 * @param {number} number - the number to convert (e.g 1 or 74)
 * @return {string} the number to convert (e.g "01" or "74")
 */
export const numberToZeroPadString = (number) => {
  if (number > 99 || number < 0) {
    throw new Error('The number has to be between 0 and 99');
  }
  return number < 10 ? `0${number}` : number.toString();
};

/**
 * convert an hour (e.g -6) and minutes (e.g 30) to a string (e.g "-06:30")
 *
 * @param {number} hours
 * @param {number} minutes
 * @return {string} - a string corresponding to the offset (e.g "+02:00")
 */
export const offsetToString = (hours, minutes) => (hours >= 0
  ? `+${numberToZeroPadString(hours)}:${numberToZeroPadString(minutes)}`
  : `-${numberToZeroPadString(-1 * hours)}:${numberToZeroPadString(minutes)}`);

/**
 * Return a string corresponding to the offset passed in parameter
 * @param {number|string} offset - the time zone offset
 * (e.g "+02:30" or "-06:00" if it is a string)
 * (e.g -6 or 2.5 if it is a number)
 * @return {string} a string corresponding to the offset (e.g "+02:00")
 */
export const getTimeZoneOffsetFromStringOrNumber = (offset) => {
  if (typeof offset === 'string') {
    const pattern = /^(\+|-)[0-9]{2}:[0-9]{2}/;
    const result = offset.match(pattern);

    if (!result) {
      throw new Error('The TimeZoneOffset is invalid');
    }

    let [strHours, strMinutes] = offset.split(':'); // eslint-disable-line prefer-const

    const sign = strHours.charAt(0);
    strHours = strHours.substring(1);

    const hours = sign === '+' ? parseInt(strHours, 10) : -parseInt(strHours, 10);
    const minutes = parseInt(strMinutes, 10);
    return offsetToString(hours, minutes);
  }

  if (typeof offset === 'number') {
    const hours = Math.floor(offset);
    const minutes = (offset - Math.floor(offset)) * 60;
    return offsetToString(hours, minutes);
  }

  throw new Error('The parameter provided in the constructor should be a number or a string');
};

/**
 * Returns the offset of the date passed in parameter
 * For example:
 *    - '2005-04-03T20:33:31.116-06:00' contains an offset ('-06:00')
 *    - '2005-04-03T20:33:31.116' doesn't contain an offset
 * @param {string} date - the date
 * @return {string|null} the timezone offset (e.g ('+02:00')) - null otherwise
 */
export const getTheTimeZoneOffsetFromDateString = (date) => {
  if (typeof date !== 'string') {
    throw new Error('The parameter has to be a string');
  }
  if (date.length < MIN_DATE_WITH_OFFSET_LENGTH) {
    return null;
  }
  const potentialOffset = date.substring(date.length - 6, date.length);
  try {
    return getTimeZoneOffsetFromStringOrNumber(potentialOffset);
  } catch (e) {
    return null;
  }
};

/**
 * Build a SGTIN URI based on the parameters
 * @param {String} gcp
 * @param {String} itemRefAndIndicator
 * @param {String} serialNumber
 * @returns {String} The SGTIN URI
 */
export const buildSGTINUri = (gcp, itemRefAndIndicator, serialNumber) => `urn:epc:id:sgtin:${gcp}.${itemRefAndIndicator}.${serialNumber}`;

/**
 * Build a SGLN URI based on the parameters
 * @param {String} gcp
 * @param {String} locationReference
 * @param {String} extension
 * @returns {String} The SGLN URI
 */
export const buildSGLNUri = (gcp, locationReference, extension) => `urn:epc:id:sgln:${gcp}.${locationReference}.${extension}`;

/**
 * Build a SSCC URI based on the parameters
 * @param {String} gcp
 * @param {String} serialReference
 * @returns {String} The SSCC URI
 */
export const buildSSCCUri = (gcp, serialReference) => `urn:epc:id:sscc:${gcp}.${serialReference}`;

/**
 * Build a GRAI URI based on the parameters
 * @param {String} gcp
 * @param {String} assetType
 * @param {String} serialNumber
 * @returns {String} The GRAI URI
 */
export const buildGRAIUri = (gcp, assetType, serialNumber) => `urn:epc:id:grai:${gcp}.${assetType}.${serialNumber}`;

/**
 * Build a GIAI URI based on the parameters
 * @param {String} gcp
 * @param {String} individualAssetReference
 * @returns {String} The GIAI URI
 */
export const buildGIAIUri = (gcp, individualAssetReference) => `urn:epc:id:giai:${gcp}.${individualAssetReference}`;

/**
 * Build a GSRN URI based on the parameters
 * @param {String} gcp
 * @param {String} serviceReference
 * @returns {String} The GSRN URI
 */
export const buildGSRNUri = (gcp, serviceReference) => `urn:epc:id:gsrn:${gcp}.${serviceReference}`;

/**
 * Build a GSRNP URI based on the parameters
 * @param {String} gcp
 * @param {String} serviceReference
 * @returns {String} The GSRNP URI
 */
export const buildGSRNPUri = (gcp, serviceReference) => `urn:epc:id:gsrnp:${gcp}.${serviceReference}`;

/**
 * Build a GDTI URI based on the parameters
 * @param {String} gcp
 * @param {String} documentType
 * @param {String} serialNumber
 * @returns {String} The GDTI URI
 */
export const buildGDTIUri = (gcp, documentType, serialNumber) => `urn:epc:id:gdti:${gcp}.${documentType}.${serialNumber}`;

/**
 * Build a CPI URI based on the parameters
 * @param {String} gcp
 * @param {String} componentPartReference
 * @param {String} serial
 * @returns {String} The CPI URI
 */
export const buildCPIUri = (gcp, componentPartReference, serial) => `urn:epc:id:cpi:${gcp}.${componentPartReference}.${serial}`;

/**
 * Build a SGCN URI based on the parameters
 * @param {String} gcp
 * @param {String} couponReference
 * @param {String} serialComponent
 * @returns {String} The SGCN URI
 */
export const buildSGCNUri = (gcp, couponReference, serialComponent) => `urn:epc:id:sgcn:${gcp}.${couponReference}.${serialComponent}`;

/**
 * Build a GINC URI based on the parameters
 * @param {String} gcp
 * @param {String} consignmentReference
 * @returns {String} The GINC URI
 */
export const buildGINCUri = (gcp, consignmentReference) => `urn:epc:id:ginc:${gcp}.${consignmentReference}`;

/**
 * Build a GSIN URI based on the parameters
 * @param {String} gcp
 * @param {String} shipperReference
 * @returns {String} The GSIN URI
 */
export const buildGSINUri = (gcp, shipperReference) => `urn:epc:id:gsin:${gcp}.${shipperReference}`;

/**
 * Build an ITIP URI based on the parameters
 * @param {String} gcp
 * @param {String} itemRefAndIndicator
 * @param {String} piece
 * @param {String} total
 * @param {String} serialNumber
 * @returns {String} The ITIP URI
 */
export const buildITIPUri = (gcp, itemRefAndIndicator, piece, total, serialNumber) => `urn:epc:id:itip:${gcp}.${itemRefAndIndicator}.${piece}.${total}.${serialNumber}`;

/**
 * Build a GID URI based on the parameters
 * @param {String} manageNumber
 * @param {String} objectClass
 * @param {String} serialNumber
 * @returns {String} The GID URI
 */
export const buildGIDUri = (manageNumber, objectClass, serialNumber) => `urn:epc:id:gid:${manageNumber}.${objectClass}.${serialNumber}`;
