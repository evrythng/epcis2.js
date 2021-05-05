/**
 * Settings can be applied globally or for individual request.
 * Available options are provided below:
 *
 * @typedef {Object} Settings
 * @property {string} endpoint - Url of the request
 * @property {Object} headers - Headers to send with request
 * @property {string} eventTimeZoneOffset - The default eventTimeZoneOffset that will be set in
 * @property {number} timeout - Timeout for request
 * */

/**
 * Default settings.
 *
 * @type {Settings}
 */
export const defaultSettings = {
  endpoint: 'https://epcis.evrythng.io/v2_0/',
  headers: {
    'content-type': 'application/json',
  },
  eventTimeZoneOffset: undefined,
  timeout: undefined,
};

// Initialize settings with defaults.
const settings = { ...defaultSettings };

export default settings;
