/**
 * Settings can be applied globally or for individual request.
 * Available options are provided below:
 *
 * @typedef {Object} Settings
 * @property {string} apiUrl - Url of the request
 * @property {Object} headers - Headers to send with request
 * @property {string} eventTimeZoneOffset - The default eventTimeZoneOffset that will be set in
 * @property {number} timeout - Timeout for request
 * @property {boolean} useEventListByDefault - if true, a single event will be in the eventList
 * field of the EPCISDocument by default. Otherwise, it will be in the event field of the
 * EPCISDocument
 * @property {string} EPCISDocumentContext - The default value of the '@context' parameter of an
 * EPCISDocument. Set it to undefined if you don't want the parameter in your EPCISDocument
 * @property {number} EPCISDocumentSchemaVersion - The default value of the 'schemaVersion' parameter
 * of an EPCISDocument. Set it to undefined if you don't want the parameter in your EPCISDocument
 * */

/**
 * Default settings.
 *
 * @type {Settings}
 */
export const defaultSettings = {
  apiUrl: 'https://epcis.evrythng.io/v2_0/',
  headers: {
    'content-type': 'application/json',
  },
  eventTimeZoneOffset: undefined,
  timeout: undefined,
  useEventListByDefault: true,
  EPCISDocumentContext: 'https://gs1.github.io/EPCIS/epcis-context.jsonld',
  EPCISDocumentSchemaVersion: 2,
};

// Initialize settings with defaults.
const settings = { ...defaultSettings };

export default settings;
