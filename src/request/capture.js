import request from './request';

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
  let captureOptions = {};
  Object.assign(captureOptions, customOptions);
  captureOptions.method = 'POST';
  captureOptions.body = JSON.stringify(epcisDocument.toObject());
  return request('capture', captureOptions, callback);
};

export default capture;
