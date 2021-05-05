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
