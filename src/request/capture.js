import request from './request'

/**
 * Make capture request to provided Url. Custom user options are merged with
 * the globally defined settings and request defaults.
 *
 * This method returns both a Promise and accepts error first callbacks.
 *
 * @param {EPCISDocument} epcisDocument - The url of the request
 * @param {Settings} [customOptions] - User options for this single request
 * @param {function} [callback] - Error first callback
 * @returns {Promise} - Response promise
 */
const capture = (epcisDocument, customOptions = {}, callback) => {
  customOptions.method = 'POST'
  customOptions.body = JSON.stringify(epcisDocument.toJSON())
  return request('capture', customOptions, callback)
}

export default capture
