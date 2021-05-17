import { isPlainObject } from 'is-plain-object';

const SPECIALS = ['&', '|', '!', '>', '<', '=', '~', '(', ')', ','];
const SPECIALS_REGEXP = new RegExp(`[${SPECIALS.join('\\')}]`, 'g');
const SPECIALS_ESCAPE = '\\$&';

/**
 * Escape special characters in value with the backslash (\) character.
 *
 * @param {string} value
 * @returns {string}
 */
function escapeSpecials(value) {
  return value.replace(SPECIALS_REGEXP, SPECIALS_ESCAPE);
}

/**
 * Returns function that encodes values using encodeURIComponent.
 *
 * @param {boolean} useEncoding
 * @returns {Function}
 */
function uriEncoder(useEncoding) {
  return (value) => (useEncoding ? encodeURIComponent(value) : escapeSpecials(value));
}

/**
 * Returns reducer function that adds the encoded key-value params to
 * accumulator.
 *
 * @param {boolean} useEncoding
 * @returns {Function}
 */
function buildParam(useEncoding) {
  const encode = uriEncoder(useEncoding);
  // eslint-disable-next-line  no-use-before-define
  return ([key, value]) => `${encode(key)}=${encode(buildParams(value))}`;
}

/**
 * Build url safe parameter string if an object provided.
 *
 * @export
 * @param {(Object | string)} [params] key-value object or final query string
 * @param {boolean} [useEncoding] whether to skip encoding
 * @returns {string}
 */
export default function buildParams(params = {}, useEncoding = true) {
  return isPlainObject(params)
    ? Object.entries(params).map(buildParam(useEncoding)).join('&')
    : params;
}
