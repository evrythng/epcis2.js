/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021.
 * All rights reserved. Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

'use strict';

const fieldNames = require('./field-names');

/** Allowed eventTypes URL segment values */
const allowedEventTypeSegments = new Set([
  'all',
  'ObjectEvent'.toLowerCase(),
  'AggregationEvent'.toLowerCase(),
  'AssociationEvent'.toLowerCase(),
  'TransactionEvent'.toLowerCase(),
  'TransformationEvent'.toLowerCase(),
]);

/** Types of persistent dispositions */
const eventPersistentDispositionRelType = {
  set: 'set',
  unset: 'unset',
};

/** Event EPC relation types */
const eventEpcRelType = {
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
const eventSourceDestRelType = {
  source: 'source',
  destination: 'destination',
};

/** Capture job error types */
const captureJobErrorTypes = {
  incorrectData: 'urn:epcglobal:cbv:er:payload:incorrect_data',
};

/** Maximum number of retries when reading the capture document */
const maxRetries = 3;

/** Time between retry attempts */
const retryWaitMs = 5000;

module.exports = {
  fieldNames,
  allowedEventTypeSegments,
  eventPersistentDispositionRelType,
  eventEpcRelType,
  eventSourceDestRelType,

  captureJobErrorTypes,

  maxRetries,
  retryWaitMs,
};