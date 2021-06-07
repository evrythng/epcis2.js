/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/**
 * Example of a sensorMetadata object
 */
export const exampleSensorMetadata = {
  time: '2019-04-02T14:05:00.000+01:00',
  startTime: '2019-04-02T14:05:00.000+02:00',
  endTime: '2019-04-02T14:05:00.000+03:00',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  bizRules: 'https://example.com/gdti/4012345000054987',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
};

/**
 * Example of a sensorReportElement object
 */
export const exampleSensorReportElement = {
  type: 'gs1:MT-Temperature',
  value: 26.0,
  uom: 'CEL',
  'ex:feature': 'ex:ambiance',
  minValue: 12.4,
  maxValue: 13.8,
  microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
  chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
  component: 'componentValue',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  time: '2019-04-02T14:05:00.000+01:00',
  meanValue: 13.2,
  sDev: 0.41,
  percRank: 50,
  percValue: 12.7,
  'example:cv': '123',
  hexBinaryValue: 'F0F0F0',
  stringValue: 'SomeString',
  booleanValue: true,
  uriValue: 'https://example.org/example/someSectorSpecificValue',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
  bizRules: 'https://example.org/gdti/4012345000054987',
};

/**
 * Another example of a sensorReportElement object
 */
export const exampleSensorReportElement2 = {
  type: 'gs1:MT-Humidity',
  value: 26.0,
  uom: 'CEL',
  'ex:feature': 'ex:ambiance',
  minValue: 12.4,
  maxValue: 13.8,
  microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
  chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
  component: 'componentValue',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  time: '2019-04-02T14:05:00.000+01:00',
  meanValue: 13.2,
  sDev: 0.41,
  percRank: 50,
  percValue: 12.7,
  'example:cv': '123',
  hexBinaryValue: 'F0F0F0',
  stringValue: 'SomeString',
  booleanValue: true,
  uriValue: 'https://example.org/example/someSectorSpecificValue',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
  bizRules: 'https://example.org/gdti/4012345000054987',
};

/**
 * Example of a sensorElement object
 */
export const exampleSensorElement = {
  sensorMetadata: {
    time: '2019-07-19T14:00:00.000+01:00',
    deviceID: 'urn:epc:id:giai:4000001.111',
    deviceMetadata: 'https://id.gs1.org/giai/4000001111',
    rawData: 'https://example.org/giai/401234599999',
    dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
    bizRules: 'https://example.org/gdti/4012345000054987',
  },
  sensorReport: [
    { type: 'gs1:MT-Humidity', value: 12.1, uom: 'A93' },
    {
      type: 'gs1:MT-Molar_concentration',
      chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
      value: 0.18,
      uom: 'C35',
    },
    {
      type: 'gs1:MT-Molar_concentration',
      microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
      value: 0.05,
      uom: 'C35',
    },
  ],
};

/**
 * Example of a sensorElementList object
 */
export const exampleSensorElementList = [
  {
    sensorMetadata: {
      time: '2019-07-19T14:00:00.000+01:00',
      deviceID: 'urn:epc:id:giai:4000001.111',
      deviceMetadata: 'https://id.gs1.org/giai/4000001111',
      rawData: 'https://example.org/giai/401234599999',
      dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
      bizRules: 'https://example.org/gdti/4012345000054987',
    },
    sensorReport: [
      { type: 'gs1:MT-Humidity', value: 12.1, uom: 'A93' },
      {
        type: 'gs1:MT-Molar_concentration',
        chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
        value: 0.18,
        uom: 'C35',
      },
      {
        type: 'gs1:MT-Molar_concentration',
        microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
        value: 0.05,
        uom: 'C35',
      },
    ],
  },
  {
    sensorMetadata: {
      startTime: '2019-04-01T15:00:00.000+01:00',
      endTime: '2019-04-02T14:59:59.999+01:00',
      'example:someFurtherMetaData': 'someText',
    },
    sensorReport: [
      {
        type: 'gs1:MT-Temperature',
        minValue: 12.4,
        maxValue: 13.8,
        meanValue: 13.2,
        sDev: 0.41,
        uom: 'CEL',
        percRank: 50,
        percValue: 12.7,
        'example:cv': '123',
      },
      { type: 'example:someSensorProperty', stringValue: 'someSensorOutput' },
    ],
    'example:furtherSensorData': [
      { 'example:measure1': '123.5' },
      { 'example:measure2': '0.987' },
    ],
  },
  {
    sensorReport: [
      {
        type: 'gs1:MT-Temperature',
        uom: 'CEL',
        time: '2019-07-19T14:00:00.000+01:00',
        deviceID: 'urn:epc:id:giai:4000001.111',
        deviceMetadata: 'https://id.gs1.org/giai/4000001111',
        rawData: 'https://example.org/giai/401234599999',
        dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
        bizRules: 'https://example.org/gdti/4012345000054987',
      },
      { type: 'example:someSensorProperty', stringValue: 'someSensorOutput' },
    ],
  },
];

/**
 * Example of an objectEvent object
 */
export const exampleObjectEvent = {
  eventID: 'ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0',
  isA: 'ObjectEvent',
  action: 'OBSERVE',
  bizStep: 'urn:epcglobal:cbv:bizstep:shipping',
  disposition: 'urn:epcglobal:cbv:disp:in_transit',
  bizLocation: { id: 'urn:epc:id:sgln:9529999.99999.0' },
  epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
  eventTime: '2005-04-03T20:33:31.116-06:00',
  recordTime: '2020-04-04T20:33:31.116-06:00',
  eventTimeZoneOffset: '-06:00',
  readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
  bizTransactionList: [{
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345678',
  },
  {
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345679',
  }],
  destinationList: [
    { type: 'urn:epcglobal:cbv:sdt:owning_party', destination: 'urn:epc:id:pgln:9520999.99999' },
  ],
  'example:myField': 'Example of a vendor/user extension',
  quantityList: [
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998877', quantity: 200, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998878', quantity: 201, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998879', quantity: 202, uom: 'KGM' },
  ],
  sensorElementList: exampleSensorElementList,
  errorDeclaration: {
    declarationTime: '2020-01-15T00:00:00.000+01:00',
    reason: 'urn:epcglobal:cbv:er:incorrect_data',
    'example:vendorExtension': 'Test1',
    correctiveEventIDs: [
      'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8',
    ],
  },
  sourceList: [
    { type: 'urn:epcglobal:cbv:sdt:owning_party', source: 'urn:epc:id:pgln:9520001.11111' },
    { type: 'urn:epcglobal:cbv:sdt:owning_party', source: 'urn:epc:id:pgln:9520001.11112' },
  ],
  persistentDisposition: {
    set: ['urn:epcglobal:cbv:disp:completeness_inferred'],
    unset: ['urn:epcglobal:cbv:disp:completeness_verified'],
  },
  ilmd: { 'example:bestBeforeDate': '2014-12-10', 'example:batch': 'XYZ' },
};

/**
 * Example of a transactionEvent object
 */
export const exampleTransactionEvent = {
  eventID: 'ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0',
  isA: 'TransactionEvent',
  action: 'OBSERVE',
  bizStep: 'urn:epcglobal:cbv:bizstep:shipping',
  disposition: 'urn:epcglobal:cbv:disp:in_transit',
  bizLocation: { id: 'urn:epc:id:sgln:9529999.99999.0' },
  epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
  eventTime: '2005-04-03T20:33:31.116-06:00',
  recordTime: '2020-04-04T20:33:31.116-06:00',
  eventTimeZoneOffset: '-06:00',
  readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
  bizTransactionList: [{
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345678',
  },
  {
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345679',
  }],
  destinationList: [
    { type: 'urn:epcglobal:cbv:sdt:owning_party', destination: 'urn:epc:id:pgln:9520999.99999' },
  ],
  'example:myField': 'Example of a vendor/user extension',
  quantityList: [
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998877', quantity: 200, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998878', quantity: 201, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998879', quantity: 202, uom: 'KGM' },
  ],
  sensorElementList: exampleSensorElementList,
  errorDeclaration: {
    declarationTime: '2020-01-15T00:00:00.000+01:00',
    reason: 'urn:epcglobal:cbv:er:incorrect_data',
    'example:vendorExtension': 'Test1',
    correctiveEventIDs: [
      'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8',
    ],
  },
  sourceList: [
    { type: 'urn:epcglobal:cbv:sdt:owning_party', source: 'urn:epc:id:pgln:9520001.11111' },
    { type: 'urn:epcglobal:cbv:sdt:owning_party', source: 'urn:epc:id:pgln:9520001.11112' },
  ],
  persistentDisposition: {
    set: ['urn:epcglobal:cbv:disp:completeness_inferred'],
    unset: ['urn:epcglobal:cbv:disp:completeness_verified'],
  },
  parentID: 'parentID',
};

/**
 * Example of a aggregationEvent object
 */
export const exampleAggregationEvent = {
  eventID: 'ni:///sha-256;87b5f18a69993f0052046d4687dfacdf48f7c988cfabda2819688c86b4066a49?ver=CBV2.0',
  isA: 'AggregationEvent',
  eventTime: '2013-06-08T14:58:56.591Z',
  eventTimeZoneOffset: '+02:00',
  parentID: 'urn:epc:id:sscc:0614141.1234567890',
  childEPCs: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
  action: 'OBSERVE',
  bizStep: 'urn:epcglobal:cbv:bizstep:receiving',
  disposition: 'urn:epcglobal:cbv:disp:in_progress',
  readPoint: { id: 'urn:epc:id:sgln:0614141.00777.0' },
  bizLocation: { id: 'urn:epc:id:sgln:0614141.00888.0' },

  childQuantityList: [
    { epcClass: 'urn:epc:idpat:sgtin:4012345.098765.*', quantity: 10 },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998877', quantity: 200.5, uom: 'KGM' },
  ],
  'example:myField': 'Example of a vendor/user extension',
};

/**
 * Example of a transformationEvent object
 */
export const exampleTransformationEvent = {
  eventID: 'ni:///sha-256;e65c3a997e77f34b58306da7a82ab0fc91c7820013287700f0b50345e5795b97?ver=CBV2.0',
  isA: 'TransformationEvent',
  eventTime: '2013-10-31T14:58:56.591Z',
  eventTimeZoneOffset: '+02:00',
  inputEPCList: ['urn:epc:id:sgtin:4012345.011122.25', 'urn:epc:id:sgtin:4000001.065432.99886655'],
  inputQuantityList: [
    { epcClass: 'urn:epc:class:lgtin:4012345.011111.4444', quantity: 10, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:0614141.077777.987', quantity: 30 },
    { epcClass: 'urn:epc:idpat:sgtin:4012345.066666.*', quantity: 220 },
  ],
  outputQuantityList: [
    { epcClass: 'urn:epc:class:lgtin:4012345.011111.4444', quantity: 10, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:0614141.077777.987', quantity: 30 },
    { epcClass: 'urn:epc:idpat:sgtin:4012345.066666.*', quantity: 220 },
  ],
  outputEPCList: [
    'urn:epc:id:sgtin:4012345.077889.25',
    'urn:epc:id:sgtin:4012345.077889.26',
    'urn:epc:id:sgtin:4012345.077889.27',
    'urn:epc:id:sgtin:4012345.077889.28',
  ],

  bizStep: 'urn:epcglobal:cbv:bizstep:commissioning',
  disposition: 'urn:epcglobal:cbv:disp:in_progress',
  readPoint: { id: 'urn:epc:id:sgln:4012345.00001.0' },
  ilmd: { 'example:bestBeforeDate': '2014-12-10', 'example:batch': 'XYZ' },
  'example:myField': 'Example of a vendor/user extension',
};

/**
 * Example of an associationEvent object
 */
export const exampleAssociationEvent = {
  eventID: 'ni:///sha-256;5f7c472bc4905de27a19b2efc8e4a9c6dc195139669b80b515f12218ff07cf65?ver=CBV2.0',
  isA: 'AssociationEvent',
  eventTime: '2019-11-06T14:00:00.000+01:00',
  recordTime: '2019-11-06T14:05:00.000+01:00',
  eventTimeZoneOffset: '+01:00',
  parentID: 'urn:epc:id:grai:4012345.55555.98765',
  childEPCs: ['urn:epc:id:giai:4000001.12345', 'urn:epc:id:giai:4000001.12346'],
  childQuantityList: [
    { epcClass: 'urn:epc:class:lgtin:4023333.002000.998877', quantity: 4 },
  ],
  action: 'ADD',
  bizStep: 'urn:epcglobal:cbv:bizstep:installing',
  disposition: 'urn:epcglobal:cbv:disp:in_progress',
  readPoint: { id: 'urn:epc:id:sgln:4012345.00001.0' },
  bizLocation: { id: 'urn:epc:id:sgln:4012345.00002.0' },
  bizTransactionList: [{
    type: 'urn:epcglobal:cbv:btt:inv',
    bizTransaction: 'urn:epcglobal:cbv:bt:4023333000000:54545',
  }],
  sourceList: [
    { type: 'urn:epcglobal:cbv:sdt:possessing_party', source: 'urn:epc:id:pgln:4000001.00012' },
  ],
  destinationList: [
    { type: 'urn:epcglobal:cbv:sdt:possessing_party', destination: 'urn:epc:id:pgln:4012345.00000' },
  ],
  sensorElementList: [
    {
      sensorMetadata: {
        startTime: '2019-11-06T13:55:00.000+01:00',
        endTime: '2019-11-06T13:57:00.000+01:00',
      },
      sensorReport: [
        {
          type: 'gs1:Humidity', minValue: 12.1, maxValue: 12.2, uom: 'A93',
        },
      ],
    },
  ],
};

/**
 * Example of a quantityElement object
 */
export const exampleQuantityElement = {
  epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
  quantity: 200,
  uom: 'KGM',
};

/**
 * Example of a bizTransactionElement object
 */
export const exampleBizTransactionElement = {
  type: 'urn:epcglobal:cbv:btt:po',
  bizTransaction: 'http://transaction.acme.com/po/12345678',
};

/**
 * Example of a sourceElement object
 */
export const exampleSourceElement = {
  type: 'urn:epcglobal:cbv:sdt:owning_party',
  source: 'urn:epc:id:pgln:9520001.11111',
};

/**
 * Example of a destinationElement object
 */
export const exampleDestinationElement = {
  type: 'urn:epcglobal:cbv:sdt:owning_party',
  destination: 'urn:epc:id:pgln:9520999.99999',
};

/**
 * Example of a vocabulary object
 */
export const exampleVocabulary = {
  isA: 'Vocabulary',
  type: 'vtype:ReadPoint',
  vocabularyElementList: [{
    isA: 'VocabularyElement',
    id: 'urn:epc:id:sgln:0037000.00729.8201',
    'cbvmda:site': '0037000007296',
    'cbvmda:sst': 201,
  },

  {
    isA: 'VocabularyElement',
    id: 'urn:epc:id:sgln:0037000.00729.8202',
    'cbvmda:site': '0037000007296',
    'cbvmda:sst': 202,
  },

  {
    isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
    id: 'urn:epc:id:sgln:0037000.00729.0',
    attributes: [
      { id: 'xmda:latitude', attribute: '+18.0000' },
      { id: 'xmda:longitude', attribute: '-70.0000' },
      {
        id: 'xmda:address',
        attribute: {
          '@context': {
            '@vocab': 'http://epcis.example.com/ns/',
          },
          isA: 'Address',
          street: '100 Nowhere Street',
          city: 'Fancy',
          state: 'DC',
          zip: '99999',
        },
      },
    ],
    children: [
      'urn:epc:id:sgln:0037000.00729.8201',
      'urn:epc:id:sgln:0037000.00729.8202',
      'urn:epc:id:sgln:0037000.00729.8203',
    ],
  },
  ],
};

/**
 * Example of a vocabularyElement list
 */
export const exampleVocabularyElements = exampleVocabulary.vocabularyElementList;

/**
 * Example of an EPCISDocument object
 */
export const exampleEPCISDocument = {
  '@context': ['https://gs1.github.io/EPCIS/epcis-context.jsonld', { example: 'http://ns.example.com/epcis/' }],
  id: '_:document1',
  isA: 'EPCISDocument',
  schemaVersion: 2.0,
  creationDate: '2005-07-11T11:30:47.0Z',
  format: 'application/ld+json',
  epcisBody: {
    eventList: [
      exampleObjectEvent,
      {
        eventID: 'ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0',
        isA: 'ObjectEvent',
        action: 'OBSERVE',
        bizStep: 'urn:epcglobal:cbv:bizstep:shipping',
        disposition: 'urn:epcglobal:cbv:disp:in_transit',
        epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
        eventTime: '2005-04-03T20:33:31.116000-06:00',
        eventTimeZoneOffset: '-06:00',
        readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
        bizTransactionList: [{
          type: 'urn:epcglobal:cbv:btt:po',
          bizTransaction: 'http://transaction.acme.com/po/12345678',
        }],
      },
      {
        eventID: 'ni:///sha-256;00e1e6eba3a7cc6125be4793a631f0af50f8322e0ab5f2c0bab994a11cec1d79?ver=CBV2.0',
        isA: 'ObjectEvent',
        action: 'OBSERVE',
        bizStep: 'urn:epcglobal:cbv:bizstep:receiving',
        disposition: 'urn:epcglobal:cbv:disp:in_progress',
        epcList: ['urn:epc:id:sgtin:0614141.107346.2018'],
        eventTime: '2005-04-04T20:33:31.116-06:00',
        eventTimeZoneOffset: '-06:00',
        readPoint: { id: 'urn:epc:id:sgln:0012345.11111.400' },
        bizLocation: { id: 'urn:epc:id:sgln:0012345.11111.0' },
        bizTransactionList: [
          { type: 'urn:epcglobal:cbv:btt:po', bizTransaction: 'http://transaction.acme.com/po/12345678' },
          { type: 'urn:epcglobal:cbv:btt:desadv', bizTransaction: 'urn:epcglobal:cbv:bt:0614141073467:1152' },
        ],
        'example:myField': 'Example of a vendor/user extension',
      },
    ],
  },
  epcisHeader: {
    epcisMasterData: {
      vocabularyList: [
        {
          type: 'vtype:BusinessLocation',
          vocabularyElementList: [
            {
              isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
              id: 'urn:epc:id:sgln:0037000.00729.0',
              attributes: [
                { id: 'xmda:latitude', attribute: '+18.0000' },
                { id: 'xmda:longitude', attribute: '-70.0000' },
                {
                  id: 'xmda:address',
                  attribute: {
                    '@context': {
                      '@vocab': 'http://epcis.example.com/ns/',
                    },
                    isA: 'Address',
                    street: '100 Nowhere Street',
                    city: 'Fancy',
                    state: 'DC',
                    zip: '99999',
                  },
                },
              ],
              children: [
                'urn:epc:id:sgln:0037000.00729.8201',
                'urn:epc:id:sgln:0037000.00729.8202',
                'urn:epc:id:sgln:0037000.00729.8203',
              ],
            },
            {
              isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
              id: 'urn:epc:id:sgln:0037000.00729.8202',
              attributes: [
                { id: 'cbvmda:sst', attribute: '202' },
              ],
              children: [
                'urn:epc:id:sgln:0037000.00729.8203',
              ],
            },
            {
              isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
              id: 'urn:epc:id:sgln:0037000.00729.8203',
              attributes: [
                { id: 'cbvmda:sst', attribute: '202' },
                { id: 'cbvmda:ssa', attribute: '402' },
              ],
            },
          ],
        },
        {
          type: 'vtype:ReadPoint',
          vocabularyElementList: [
            {
              isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
              id: 'urn:epc:id:sgln:0037000.00729.8201',
              attributes: [
                { id: 'cbvmda:site', attribute: '0037000007296' },
                { id: 'cbvmda:sst', attribute: 201 },
              ],
            },
            {
              isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
              id: 'urn:epc:id:sgln:0037000.00729.8202',
              attributes: [
                { id: 'cbvmda:site', attribute: '0037000007296' },
                { id: 'cbvmda:sst', attribute: '202' },
              ],
            },
            {
              isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
              id: 'urn:epc:id:sgln:0037000.00729.8203',
              attributes: [
                { id: 'cbvmda:sst', attribute: 204 },
              ],
            },
          ],
        },
      ],
    },
  },
};

/**
 * Example of an EPCISHeader object
 */
export const exampleEPCISHeader = {
  epcisMasterData: {
    vocabularyList: [
      {
        vocabularyElementList: [
          {
            isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
            id: 'urn:epc:id:sgln:0037000.00729.0',
            attributes: [
              { id: 'xmda:latitude', attribute: '+18.0000' },
              { id: 'xmda:longitude', attribute: '-70.0000' },
              {
                id: 'xmda:address',
                attribute: {
                  '@context': {
                    '@vocab': 'http://epcis.example.com/ns/',
                  },
                  isA: 'Address',
                  street: '100 Nowhere Street',
                  city: 'Fancy',
                  state: 'DC',
                  zip: '99999',
                },
              },
            ],
            children: [
              'urn:epc:id:sgln:0037000.00729.8201',
              'urn:epc:id:sgln:0037000.00729.8202',
              'urn:epc:id:sgln:0037000.00729.8203',
            ],
          },
          {
            isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
            id: 'urn:epc:id:sgln:0037000.00729.8202',
            attributes: [
              { id: 'cbvmda:sst', attribute: '202' },
            ],
            children: [
              'urn:epc:id:sgln:0037000.00729.8203',
            ],
          },
          {
            isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
            id: 'urn:epc:id:sgln:0037000.00729.8203',
            attributes: [
              { id: 'cbvmda:sst', attribute: '202' },
              { id: 'cbvmda:ssa', attribute: '402' },
            ],
          },
        ],
      },
      {
        vocabularyElementList: [
          {
            isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
            id: 'urn:epc:id:sgln:0037000.00729.8201',
            attributes: [
              { id: 'cbvmda:site', attribute: '0037000007296' },
              { id: 'cbvmda:sst', attribute: 201 },
            ],
          },
          {
            isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
            id: 'urn:epc:id:sgln:0037000.00729.8202',
            attributes: [
              { id: 'cbvmda:site', attribute: '0037000007296' },
              { id: 'cbvmda:sst', attribute: '202' },
            ],
          },
          {
            isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
            id: 'urn:epc:id:sgln:0037000.00729.8203',
            attributes: [
              { id: 'cbvmda:sst', attribute: 204 },
            ],
          },
        ],
      },
    ],
  },
};
