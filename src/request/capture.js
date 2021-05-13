import request from './request';

/**
 * Make capture request to provided Url. Custom user options are merged with
 * the globally defined settings and request defaults.
 *
 * This method returns both a Promise and accepts error first callbacks.
 *
 * @param {EPCISDocument} epcisDocument - The url of the request
 * @param {Settings} [customOptions] - User options for this single request
 * @returns {Promise} - Response promise
 */
const capture = (epcisDocument, customOptions = {}) => {
  const captureOptions = {
    method: 'POST',
    body: JSON.stringify(epcisDocument.toObject()),
    ...customOptions,
  };
  return request('capture', captureOptions);
};

export default capture;
