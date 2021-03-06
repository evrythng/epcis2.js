/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import settings from '../settings';
import buildParams from './buildParams';

/**
 * Merge base options and global settings
 *
 * @param {Settings} customOptions - User options
 * @returns {Settings} - Merged options for fetch
 */
function mergeInitialOptions(customOptions) {
  const options = {
    method: 'get',
    ...settings,
    ...customOptions,
    headers: { ...settings.headers, ...customOptions.headers },
  };

  delete options.eventTimeZoneOffset;
  delete options.useEventListByDefault;
  delete options.EPCISDocumentContext;
  delete options.EPCISDocumentSchemaVersion;

  return options;
}

/**
 * Concatenate url with parameters from request options.
 *
 * @param {Object} options request options including url and params
 * @param {string} path - the path to add to the url
 * @returns {string}
 */
export function buildUrl(options, path) {
  let url = `${options.apiUrl}${options.apiUrl.endsWith('/') ? path : `/${path}`}`;

  if (options.params) {
    url += `?${buildParams(options.params)}`;
  }

  return url;
}

/**
 * Make the actual fetch request using the Fetch API (browser and Node.js).
 * Mimic timeout with Promise.race, rejecting request if timeout happens before
 * response arrives.
 * Note: timeout should be added to fetch spec:
 * https://github.com/whatwg/fetch/issues/20
 *
 * @param {string} path - the url of the request
 * @param {Settings} options - Request options
 */
function makeFetch(path, options) {
  const req = fetch(buildUrl(options, path), options);
  if (!options.timeout) {
    return req;
  }
  return Promise.race([
    req,
    new Promise((resolve, reject) => {
      setTimeout(() => reject('Request timeout'), options.timeout);
    }),
  ]);
}

/**
 * Make request to provided Url. Custom user options are merged with
 * the globally defined settings and request defaults.
 *
 * This method returns both a Promise and accepts error first callbacks.
 *
 * @param {string} path - The url of the request
 * @param {Settings} [customOptions] - User options for this single request
 * @returns {Promise} - Response promise
 */
export default function request(path, customOptions = {}) {
  const initialOptions = mergeInitialOptions(customOptions);

  return makeFetch(path, initialOptions);
}
