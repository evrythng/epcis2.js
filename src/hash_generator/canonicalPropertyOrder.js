/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/**
 * This variable sets the order of EPCIS fields that a pre-hashed string has to follow in order
 * to comply with the hashing algorithm
 * @type {string[]}
 */
export const canonicalPropertyOrder = [
  'type',
  'eventTime',
  'eventTimeZoneOffset',
  'errorDeclaration',
  'parentID',
  'epcList',
  'inputEPCList',
  'childEPCs',
  'quantityList',
  'childQuantityList',
  'inputQuantityList',
  'outputEPCList',
  'outputQuantityList',
  'action',
  'transformationID',
  'bizStep',
  'disposition',
  'persistentDisposition',
  'readPoint',
  'bizLocation',
  'bizTransactionList',
  'sourceList',
  'destinationList',
  'sensorElementList',
  'ilmd',
];

/**
 * This variable sets the order of Error Declaration fields that a pre-hashed string has to follow
 * in order to comply with the used algorithm
 * @type {string[]}
 */
export const errorDeclarationCanonicalPropertyOrder = [
  'declarationTime',
  'reason',
  'correctiveEventIDs',
];

/**
 * This variable sets the order of Quantity Element fields that a pre-hashed string has to follow
 * in order to comply with the used algorithm
 * @type {string[]}
 */
export const quantityElementCanonicalPropertyOrder = [
  'epcClass',
  'quantity',
  'uom',
];

/**
 * This variable sets the order of Read Point fields that a pre-hashed string has to follow in order
 * to comply with the used algorithm
 * @type {string[]}
 */
export const readPointCanonicalPropertyOrder = [
  'id',
];

/**
 * This variable sets the order of BizLocation fields that a pre-hashed string has to follow in
 * order to comply with the used algorithm
 * @type {string[]}
 */
export const bizLocationCanonicalPropertyOrder = [
  'id',
];

/**
 * This variable sets the order of BizTransactions fields that a pre-hashed string has to follow in
 * order to comply with the used algorithm
 * @type {string[]}
 */
export const bizTransactionCanonicalPropertyOrder = [
  'bizTransaction',
  'type',
];

/**
 * This variable sets the order of Source fields that a pre-hashed string has to follow in order to
 * comply with the used algorithm
 * @type {string[]}
 */
export const sourceCanonicalPropertyOrder = [
  'source',
  'type',
];

/**
 * This variable sets the order of Destination fields that a pre-hashed string has to follow in
 * order to comply with the used algorithm
 * @type {string[]}
 */
export const destinationCanonicalPropertyOrder = [
  'destination',
  'type',
];

/**
 * This variable sets the order of Sensor Element fields that a pre-hashed string has to follow in
 * order to comply with the used algorithm
 * @type {string[]}
 */
export const sensorElementCanonicalPropertyOrder = [
  'sensorMetadata',
  'sensorReport',
];

/**
 * This variable sets the order of Sensor Metadata fields that a pre-hashed string has to follow in
 * order to comply with the used algorithm
 * @type {string[]}
 */
export const sensorMetadataCanonicalPropertyOrder = [
  'time',
  'startTime',
  'endTime',
  'deviceID',
  'deviceMetadata',
  'rawData',
  'dataProcessingMethod',
  'bizRules',
];

/**
 * This variable sets the order of Sensor Report fields that a pre-hashed string has to follow in
 * order to comply with the used algorithm
 * @type {string[]}
 */
export const sensorReportCanonicalPropertyOrder = [
  'type',
  'exception',
  'deviceID',
  'deviceMetadata',
  'rawData',
  'dataProcessingMethod',
  'time',
  'microorganism',
  'chemicalSubstance',
  'value',
  'component',
  'stringValue',
  'booleanValue',
  'hexBinaryValue',
  'uriValue',
  'minValue',
  'maxValue',
  'meanValue',
  'sDev',
  'percRank',
  'percValue',
  'uom',
];

/**
 * This variable sets the order of Persistent Disposition fields that a pre-hashed string has to
 * follow in order to comply with the used algorithm
 * @type {string[]}
 */
export const persistentDispositionCanonicalPropertyOrder = [
  'set',
  'unset',
];
