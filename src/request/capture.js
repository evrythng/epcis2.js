/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import request from './request';
import settings from '../settings';

/**
 * Make capture request to provided Url. Custom user options are merged with
 * the globally defined settings and request defaults.
 * If the EPCISDocument provided isn't valid and the `documentValidation` field of settings is true,
 * the functions throws an Error.
 *
 * @param {EPCISDocument} epcisDocument - The url of the request
 * @param {Settings} [customOptions] - User options for this single request
 * @returns {Promise} - Response promise
 */
const capture = (epcisDocument, customOptions = {}) => {
  const validate =
    customOptions.documentValidation ||
    (customOptions.documentValidation !== false && settings.documentValidation);

  if (validate) {
    epcisDocument.isValid(); // throws an error if it is invalid
  }

  const captureOptions = {
    method: 'POST',
    body: JSON.stringify(epcisDocument.toObject()),
    ...customOptions,
  };

  return request('capture', captureOptions);
};

export default capture;
