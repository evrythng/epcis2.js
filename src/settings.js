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
 * @property {number} digitalLinkDomain - The digital link domain that should be used in when
 * building a digital link from an epc
 * @property {boolean} documentValidation - whether the EPCISDocument has to be validated or not
 * before sending it via the capture interface
 * @property {string} EPCISDocumentContext - The default value of the '@context' parameter of an
 * EPCISDocument. Set it to undefined if you don't want the parameter in your EPCISDocument.
 * @property {string} EPCISDocumentSchemaVersion - The default value of the 'schemaVersion'
 * parameter of an EPCISDocument. Set it to undefined if you don't want the parameter in your
 * EPCISDocument.
 * @property {string} validationMode - The default value of 'validationMode' for the
 * validation of an EPCISDocument or an EPCIS Event against schemas.
 * Possible values are either "full" or "fast".
 * @property {boolean} checkExtensions - set it to true if you want the extension of the
 * EPCISDocument to be checked against the EPCIS Document context.
 * Otherwise, the extensions check will be ignored.
 * Please refer to: https://www.npmjs.com/package/ajv-formats/v/0.3.4
 */

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
  EPCISDocumentContext: 'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
  EPCISDocumentSchemaVersion: '2.0',
  documentValidation: true,
  validationMode: 'full',
  checkExtensions: false,
  digitalLinkDomain: 'https://dlnkd.tn.gg',
};

// Initialize settings with defaults.
const settings = { ...defaultSettings };

export default settings;
