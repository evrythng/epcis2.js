/**
 * Settings can be applied globally or for individual requests.
 * Available options are provided below:
 *
 * @typedef {Object} Settings
 * @property {string} endpoint - Url of the requests
 * @property {Object} headers - Headers to send with request
 * @property {string} eventTimeZoneOffset - The default eventTimeZoneOffset that will be set in
 * events
 */

/**
 * Default settings.
 *
 * @type {Settings}
 */
const defaultSettings = {
  endpoint: 'https://epcis.evrythng.io/v2_0/',
  headers: {
    'content-type': 'application/json'
  },
  eventTimeZoneOffset: ''
}

// Initialize settings with defaults.
const settings = Object.assign({}, defaultSettings)

export default settings
