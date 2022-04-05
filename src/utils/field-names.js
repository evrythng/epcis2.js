/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

export const fieldNames = {
  attributeElement: {
    id: 'id',
    attribute: 'attribute',
  },
  bizLocation: {
    id: 'id',
  },
  bizTransactionElement: {
    type: 'type',
    bizTransaction: 'bizTransaction',
  },
  destinationElement: {
    type: 'type',
    destination: 'destination',
  },
  errorDeclaration: {
    declarationTime: 'declarationTime',
    reason: 'reason',
    correctiveEventIDs: 'correctiveEventIDs',
  },
  ilmd: {
    type: 'type',
    format: 'format',
  },
  persistentDisposition: {
    set: 'set',
    unset: 'unset',
  },
  quantityElement: {
    epcClass: 'epcClass',
    quantity: 'quantity',
    uom: 'uom',
  },
  readPoint: {
    id: 'id',
  },
  sourceElement: {
    type: 'type',
    source: 'source',
  },
  vocabulary: {
    type: 'type',
    vocabularyElementList: 'vocabularyElementList',
  },
  vocabularyElement: {
    id: 'id',
    attributes: 'attributes',
    children: 'children',
  },
  sensorElement: {
    sensorMetadata: 'sensorMetadata',
    sensorReport: 'sensorReport',
  },
  sensorMetadata: {
    time: 'time',
    startTime: 'startTime',
    endTime: 'endTime',
    deviceID: 'deviceID',
    deviceMetadata: 'deviceMetadata',
    rawData: 'rawData',
    dataProcessingMethod: 'dataProcessingMethod',
    bizRules: 'bizRules',
  },
  sensorReport: {
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
    exception: 'exception',
    coordinateReferenceSystem: 'coordinateReferenceSystem',
  },
  event: {
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
    // fields below are only for transformationEvent
    inputEPCList: 'inputEPCList',
    inputQuantityList: 'inputQuantityList',
    outputEPCList: 'outputEPCList',
    outputQuantityList: 'outputQuantityList',
    transformationID: 'transformationID',
    certificationInfo: 'certificationInfo',
  },
  epcisDocument: {
    type: 'type',
    context: '@context',
    schemaVersion: 'schemaVersion',
    creationDate: 'creationDate',
    epcisHeader: 'epcisHeader',
    epcisBody: 'epcisBody',
    sender: 'sender',
    receiver: 'receiver',
    instanceIdentifier: 'instanceIdentifier',
  },
  epcisHeader: {
    epcisMasterData: 'epcisMasterData',
  },
  epcisMasterData: {
    vocabularyList: 'vocabularyList',
  },

};

export default fieldNames;
