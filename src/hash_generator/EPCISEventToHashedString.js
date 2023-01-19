/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import sha256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';
import { eventToPreHashedString } from './EPCISEventToPreHashedString';

/**
 * Returns the sha256 string corresponding to the parameter
 * @param {string} preHash
 * @returns {string} the hashed string
 */
export const preHashedStringToHashedString = (preHash) => `ni:///sha-256;${Hex.stringify(sha256(preHash))}?ver=CBV2.0`;

/**
 * Convert the epcis event passed in parameter into a hashed id using the sha-256 encryption
 * @param {{}} event - the EPCIS Event that needs to be converted
 * @param {{}} context - the list of context (e.g {
 *    "example": "http://ns.example.com/epcis/",
 *    "example2": "http://ns.example2.com/epcis/",
 * })
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @returns {string} - the hashed id
 */
export const eventToHashedId = (event, context, throwError = true) => {
  const preHash = eventToPreHashedString(event, context, throwError);
  console.log(preHash);
  return preHashedStringToHashedString(preHash);
};
