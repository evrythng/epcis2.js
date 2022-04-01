/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/**
 * Settings can be applied globally or for individual request.
 * Available options are provided below:
 *
 * @typedef {Object} Settings
 * @property {string} apiUrl - Url of the request
 * @property {Object} headers - Headers to send with request
 * @property {string} eventTimeZoneOffset - The default eventTimeZoneOffset that will be set in
 * @property {number} timeout - Timeout for request in ms
 * @property {boolean} documentValidation - whether the EPCISDocument has to be validated or not
 * before sending it via the capture interface
 * @property {string} EPCISDocumentContext - The default value of the '@context' parameter of an
 * EPCISDocument. Set it to undefined if you don't want the parameter in your EPCISDocument.
 * @property {string} EPCISDocumentSchemaVersion - The default value of the 'schemaVersion'
 * parameter of an EPCISDocument. Set it to undefined if you don't want the parameter in your
 * EPCISDocument.
 * @property {string} validationMode - The default value of 'validationMode' for the format
 * validation of EPCISDocument or EPCIS Event against schemas. Set it to "fast" if you want 
 * the following formats simplified: "date", "time", "date-time", "iso-time", "iso-date-time",
 * "uri", "uri-reference", "email".
 * */

/**
 * Default settings.
 *
 * @type {Settings}
 */
export const defaultSettings = {
  apiUrl: 'https://api.evrythng.io/v2/epcis/',
  headers: {
    'content-type': 'application/json',
  },
  eventTimeZoneOffset: undefined,
  timeout: undefined,
  EPCISDocumentContext: 'https://gs1.github.io/EPCIS/epcis-context.jsonld',
  EPCISDocumentSchemaVersion: '2.0',
  documentValidation: true,
  validationMode: 'full',
};

// Initialize settings with defaults.
const settings = { ...defaultSettings };

export default settings;
