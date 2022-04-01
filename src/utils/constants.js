/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021.
 * All rights reserved. Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { errorReasonIdentifiers } from '../cbv/cbv';

export * as fieldNames from './field-names';

/** Event EPC relation types */
export const eventEpcRelType = {
  epcList: 'epcList',
  childEPCs: 'childEPCs',
  inputEPCList: 'inputEPCList',
  outputEPCList: 'outputEPCList',
  quantityList: 'quantityList',
  inputQuantityList: 'inputQuantityList',
  outputQuantityList: 'outputQuantityList',
  childQuantityList: 'childQuantityList',
  parentID: 'parentID',
};

/** Event source and destination relation types */
export const eventSourceDestRelType = {
  source: 'source',
  destination: 'destination',
};

/** Capture job error types */
export const captureJobErrorTypes = {
  incorrectData: errorReasonIdentifiers.incorrect_data,
};
