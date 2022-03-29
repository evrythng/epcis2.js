/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/**
 * An object containing all the possible field names for an attributeElement
 * More info here: https://www.gs1.org/standards/epcis
 */
const attributeElement = {
  id: 'id',
  attribute: 'attribute',
};

/**
 * An object containing all the possible field names for a bizLocation
 * More info here: https://www.gs1.org/standards/epcis
 */
const bizLocation = {
  id: 'id',
};

/**
 * An object containing all the possible field names for a bizTransactionElement
 * More info here: https://www.gs1.org/standards/epcis
 */
const bizTransaction = {
  type: 'type',
  bizTransaction: 'bizTransaction',
};

/**
 * An object containing all the possible field names for a destinationElement
 * More info here: https://www.gs1.org/standards/epcis
 */
const destination = {
  type: 'type',
  destination: 'destination',
};

/**
 * An object containing all the possible field names for an errorDeclaration
 * More info here: https://www.gs1.org/standards/epcis
 */
const errorDeclaration = {
  declarationTime: 'declarationTime',
  reason: 'reason',
  correctiveEventIDs: 'correctiveEventIDs',
};

/**
 * An object containing all the possible field names for an ilmd
 * More info here: https://www.gs1.org/standards/epcis
 */
const ilmd = {
  type: 'type',
  format: 'format',
};

/**
 * An object containing all the possible field names for persistentDisposition
 * More info here: https://www.gs1.org/standards/epcis
 */
const persistentDisposition = {
  set: 'set',
  unset: 'unset',
};

/**
 * An object containing all the possible field names for a quantityElement
 * More info here: https://www.gs1.org/standards/epcis
 */
const quantityElement = {
  epcClass: 'epcClass',
  quantity: 'quantity',
  uom: 'uom',
};
/**
 * An object containing all the possible field names for a readPoint
 * More info here: https://www.gs1.org/standards/epcis
 */
const readPoint = {
  id: 'id',
};
/**
 * An object containing all the possible field names for a sourceElement
 * More info here: https://www.gs1.org/standards/epcis
 */
const source = {
  type: 'type',
  source: 'source',
};
/**
 * An object containing all the possible field names for a vocabulary
 * More info here: https://www.gs1.org/standards/epcis
 */
const vocabulary = {
  type: 'type',
  vocabularyElementList: 'vocabularyElementList',
};
/**
 * An object containing all the possible field names for a vocabularyElement
 * More info here: https://www.gs1.org/standards/epcis
 */
const vocabularyElement = {
  id: 'id',
  attributes: 'attributes',
  children: 'children',
};

/**
 * An object containing all the possible field names for a sensorElement
 * More info here: https://www.gs1.org/standards/epcis
 */
const sensorElement = {
  sensorMetadata: 'sensorMetadata',
  sensorReport: 'sensorReport',
};
/**
 * An object containing all the possible field names for a sensorMetadata
 * More info here: https://www.gs1.org/standards/epcis
 */
const sensorMetadata = {
  time: 'time',
  startTime: 'startTime',
  endTime: 'endTime',
  deviceID: 'deviceID',
  deviceMetadata: 'deviceMetadata',
  rawData: 'rawData',
  dataProcessingMethod: 'dataProcessingMethod',
  bizRules: 'bizRules',
};
/**
 * An object containing all the possible field names for a sensorReport
 * More info here: https://www.gs1.org/standards/epcis
 */
const sensorReport = {
  type: 'type',
  deviceID: 'deviceID',
  deviceMetadata: 'deviceMetadata',
  rawData: 'rawData',
  dataProcessingMethod: 'dataProcessingMethod',
  time: 'time',
  microorganism: 'microorganism',
  chemicalSubstance: 'chemicalSubstance',
  value: 'value',
  component: 'component',
  stringValue: 'stringValue',
  booleanValue: 'booleanValue',
  hexBinaryValue: 'hexBinaryValue',
  uriValue: 'uriValue',
  minValue: 'minValue',
  maxValue: 'maxValue',
  meanValue: 'meanValue',
  sDev: 'sDev',
  percRank: 'percRank',
  percValue: 'percValue',
  uom: 'uom',
};
/**
 * An object containing all the possible field names for an event
 * More info here: https://www.gs1.org/standards/epcis
 */
const event = {
  context: '@context',
  type: 'type',
  eventID: 'eventID',
  eventTime: 'eventTime',
  eventTimeZoneOffset: 'eventTimeZoneOffset',
  recordTime: 'recordTime',
  errorDeclaration: 'errorDeclaration',
  epcList: 'epcList',
  quantityList: 'quantityList',
  action: 'action',
  bizStep: 'bizStep',
  disposition: 'disposition',
  persistentDisposition: 'persistentDisposition',
  readPoint: 'readPoint',
  bizLocation: 'bizLocation',
  bizTransactionList: 'bizTransactionList',
  sourceList: 'sourceList',
  destinationList: 'destinationList',
  sensorElementList: 'sensorElementList',
  ilmd: 'ilmd',
  parentID: 'parentID',
  childEPCs: 'childEPCs',
  childQuantityList: 'childQuantityList',
  // fields above are only for transformationEvent
  inputEPCList: 'inputEPCList',
  inputQuantityList: 'inputQuantityList',
  outputEPCList: 'outputEPCList',
  outputQuantityList: 'outputQuantityList',
  transformationID: 'transformationID',

};

/**
 * An object containing all the possible field names for an epcisDocument
 * More info here: https://www.gs1.org/standards/epcis
 */
const epcisDocument = {
  type: 'type',
  context: '@context',
  schemaVersion: 'schemaVersion',
  creationDate: 'creationDate',
  epcisHeader: 'epcisHeader',
  eventList: 'event',
};
/**
 * An object containing all the possible field names for an epcisHeader
 * More info here: https://www.gs1.org/standards/epcis
 */
const epcisHeader = {
  epcisMasterData: 'epcisMasterData',
};
/**
 * An object containing all the possible field names for an epcisMasterData
 * More info here: https://www.gs1.org/standards/epcis
 */
const epcisMasterData = {
  vocabularyList: 'vocabularyList',
};

module.exports = {
  epcisDocument,
  epcisHeader,
  epcisMasterData,
  event,
  sensorElement,
  sensorMetadata,
  sensorReport,
  attributeElement,
  bizLocation,
  bizTransaction,
  destination,
  errorDeclaration,
  ilmd,
  persistentDisposition,
  quantityElement,
  readPoint,
  source,
  vocabulary,
  vocabularyElement,
};
