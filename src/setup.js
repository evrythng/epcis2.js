/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import settings from './settings';

/**
 * Override global settings. Ignore unknown settings.
 *
 * @param {Object} newSettings - Custom settings
 * @returns {Object} new
 */
export default function setup(newSettings = {}) {
  return Object.assign(settings, newSettings);
}
