/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021.
 * All rights reserved. Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

export * as fieldNames from './field-names';

/** Allowed eventTypes URL segment values */
export const allowedEventTypeSegments = new Set([
  'all',
  'ObjectEvent'.toLowerCase(),
  'AggregationEvent'.toLowerCase(),
  'AssociationEvent'.toLowerCase(),
  'TransactionEvent'.toLowerCase(),
  'TransformationEvent'.toLowerCase(),
  'ExtendedEvent'.toLowerCase(),
]);

/** Types of persistent dispositions */
export const eventPersistentDispositionRelType = {
  set: 'set',
  unset: 'unset',
};

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
  incorrectData: 'urn:epcglobal:cbv:er:payload:incorrect_data',
};