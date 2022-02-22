/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/**
 * Example of a sensorMetadata object
 */
export const exampleSensorMetadata = {
  time: '2019-04-02T13:05:00.000Z',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  startTime: '2019-04-02T12:55:01.000Z',
  endTime: '2019-04-02T13:55:00.000Z',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
  bizRules: 'https://example.com/gdti/4012345000054987',
  'ext1:someFurtherMetadata': 'someText',
};

/**
 * Example of a sensorReportElement object
 */
export const exampleSensorReportElement = {
  type: 'Temperature',
  deviceID: 'urn:epc:id:giai:4000001.111',
  rawData: 'https://example.org/giai/401234599999',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
  time: '2019-07-19T13:00:00.000Z',
  microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
  chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
  value: 26,
  component: 'example:x',
  exception: 'ALARM_CONDITION',
  stringValue: 'SomeString',
  booleanValue: true,
  hexBinaryValue: 'f0f0f0',
  uriValue: 'https://id.gs1.org/giai/4000001111',
  minValue: 26,
  maxValue: 26.2,
  meanValue: 13.2,
  percRank: 50,
  percValue: 12.7,
  uom: 'CEL',
  sDev: 0.1,
  'ext1:someFurtherReportData': 'someText',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
};

/**
 * Example of a sensorElement object
 */
export const exampleSensorElement = {
  type: 'epcis:SensorElement',
  sensorMetadata: {
    time: '2019-04-02T14:05:00.000+01:00',
    deviceID: 'urn:epc:id:giai:4000001.111',
    deviceMetadata: 'https://id.gs1.org/8004/4000001111',
    rawData: 'https://example.org/8004/401234599999',
  },
  sensorReport: [
    {
      type: 'gs1:Temperature',
      value: 26.0,
      uom: 'CEL',
    },
    {
      type: 'gs1:AbsoluteHumidity',
      value: 12.1,
      uom: 'A93',
    },
    {
      type: 'gs1:Speed',
      value: 160.0,
      uom: 'KMH',
    },
    {
      type: 'gs1:Illuminance',
      value: 800.0,
      uom: 'LUX',
    },
  ],
  'ext1:time': '2013-06-08T14:58:56.591Z',
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
    'example:furtherSensorData': [{ 'example:measure1': '123.5' }, { 'example:measure2': '0.987' }],
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
  type: 'po',
  bizTransaction: 'urn:epc:id:gdti:0614141.00001.1618034',
};

/**
 * Example of a sourceElement object
 */
export const exampleSourceElement = {
  type: 'location',
  source: 'urn:epc:id:sgln:4012345.00225.0',
};

/**
 * Example of a destinationElement object
 */
export const exampleDestinationElement = {
  type: 'possessing_party',
  destination: 'urn:epc:id:pgln:0614141.00777',
};

/**
 * Example of a vocabulary object
 */
export const exampleVocabulary = {
  type: 'Vocabulary',
  vocabularyElementList: [
    {
      type: 'VocabularyElement',
      id: 'urn:epc:id:sgln:0037000.00729.8201',
      'cbvmda:site': '0037000007296',
      'cbvmda:sst': 201,
    },

    {
      type: 'VocabularyElement',
      id: 'urn:epc:id:sgln:0037000.00729.8202',
      'cbvmda:site': '0037000007296',
      'cbvmda:sst': 202,
    },

    {
      type: 'urn:epcglobal:epcis:vtype:BusinessLocation',
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
            type: 'Address',
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
 * Example of an EPCISHeader object
 */
export const exampleEPCISDocumentWithEPCISHeader = {
  type: 'EPCISDocument',
  schemaVersion: '2.0',
  creationDate: '2013-06-04T14:59:02.099+02:00',
  epcisHeader: {
    epcisHeader: {
      epcisMasterData: {
        vocabularyList: [
          {
            vocabularyElementList: [
              {
                type: 'urn:epcglobal:epcis:vtype:BusinessLocation',
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
                      type: 'Address',
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
                type: 'urn:epcglobal:epcis:vtype:BusinessLocation',
                id: 'urn:epc:id:sgln:0037000.00729.8202',
                attributes: [{ id: 'cbvmda:sst', attribute: '202' }],
                children: ['urn:epc:id:sgln:0037000.00729.8203'],
              },
              {
                type: 'urn:epcglobal:epcis:vtype:BusinessLocation',
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
                type: 'urn:epcglobal:epcis:vtype:ReadPoint',
                id: 'urn:epc:id:sgln:0037000.00729.8201',
                attributes: [
                  { id: 'cbvmda:site', attribute: '0037000007296' },
                  { id: 'cbvmda:sst', attribute: 201 },
                ],
              },
              {
                type: 'urn:epcglobal:epcis:vtype:ReadPoint',
                id: 'urn:epc:id:sgln:0037000.00729.8202',
                attributes: [
                  { id: 'cbvmda:site', attribute: '0037000007296' },
                  { id: 'cbvmda:sst', attribute: '202' },
                ],
              },
              {
                type: 'urn:epcglobal:epcis:vtype:ReadPoint',
                id: 'urn:epc:id:sgln:0037000.00729.8203',
                attributes: [{ id: 'cbvmda:sst', attribute: 204 }],
              },
            ],
          },
        ],
      },
    },
  },
  epcisBody: {
    eventList: [
      {
        type: 'ObjectEvent',
        eventTime: '2005-04-05T02:33:31.116Z',
        eventTimeZoneOffset: '-06:00',
        epcList: ['urn:epc:id:sgtin:0614141.107346.2018'],
        action: 'ADD',
        bizStep: 'receiving',
        disposition: 'in_progress',
        readPoint: {
          id: 'urn:epc:id:sgln:0012345.11111.400',
        },
        bizLocation: {
          id: 'urn:epc:id:sgln:0012345.11111.0',
        },
        bizTransactionList: [
          {
            type: 'po',
            bizTransaction: 'urn:epc:id:gdti:0614141.00001.1618034',
          },
          {
            type: 'pedigree',
            bizTransaction: 'urn:epc:id:gsrn:0614141.0000010253',
          },
        ],
        quantityList: [
          {
            epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
            quantity: 200,
            uom: 'KGM',
          },
        ],
        sourceList: [
          {
            type: 'location',
            source: 'urn:epc:id:sgln:4012345.00225.0',
          },
          {
            type: 'possessing_party',
            source: 'urn:epc:id:pgln:4012345.00225',
          },
          {
            type: 'owning_party',
            source: 'urn:epc:id:pgln:4012345.00225',
          },
        ],
        destinationList: [
          {
            type: 'location',
            destination: 'urn:epc:id:sgln:0614141.00777.0',
          },
          {
            type: 'possessing_party',
            destination: 'urn:epc:id:pgln:0614141.00777',
          },
          {
            type: 'owning_party',
            destination: 'urn:epc:id:pgln:0614141.00777',
          },
        ],
        sensorElementList: [
          {
            type: 'epcis:SensorElement',
            sensorMetadata: {
              time: '2019-04-02T13:05:00.000Z',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
              startTime: '2019-04-02T12:55:01.000Z',
              endTime: '2019-04-02T13:55:00.000Z',
              dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
              bizRules: 'https://example.com/gdti/4012345000054987',
              'ext1:someFurtherMetadata': 'someText',
            },
            sensorReport: [
              {
                type: 'Temperature',
                deviceID: 'urn:epc:id:giai:4000001.111',
                rawData: 'https://example.org/giai/401234599999',
                dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
                time: '2019-07-19T13:00:00.000Z',
                microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
                chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
                value: 26,
                component: 'example:x',
                stringValue: 'SomeString',
                booleanValue: true,
                hexBinaryValue: 'f0f0f0',
                uriValue: 'https://id.gs1.org/giai/4000001111',
                minValue: 26,
                maxValue: 26.2,
                meanValue: 13.2,
                percRank: 50,
                percValue: 12.7,
                uom: 'CEL',
                sDev: 0.1,
                'ext1:someFurtherReportData': 'someText',
                deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              },
            ],
            'ext1:float': '20',
            'ext1:time': '2013-06-08T14:58:56.591Z',
            'ext1:array': [
              '12',
              '22',
              '2013-06-08T14:58:56.591Z',
              'true',
              'stringInArray',
              {
                'ext1:object': {
                  'ext1:object': {
                    'ext2:array': ['14', '23.0', 'stringInArrayInObjectInArray'],
                    'ext2:object': {
                      'ext2:object': {
                        'ext3:string': 'stringInObjectInObjectInArray',
                      },
                    },
                    'ext2:int': '13',
                    'ext2:string': 'stringInObjectInArray',
                  },
                },
              },
            ],
            'ext1:boolean': 'true',
            'ext1:object': {
              'ext2:array': ['11', '21', 'stringInArrayInObject'],
              'ext2:object': {
                'ext2:object': {
                  'ext3:string': 'stringInObjectInObject',
                },
              },
              'ext2:string': 'stringInObject',
            },
            'ext1:default': 'stringAsDefaultValue',
            'ext1:int': '10',
            'ext1:string': 'string',
          },
        ],
        persistentDisposition: {
          set: ['completeness_verified'],
          unset: ['completeness_inferred'],
        },
        ilmd: {
          'ext1:float': '20',
          'ext1:array': [
            '12',
            '22',
            '2013-06-08T14:58:56.591Z',
            'true',
            'stringInArray',
            {
              'ext1:object': {
                'ext1:object': {
                  'ext2:array': ['14', '23.0', 'stringInArrayInObjectInArray'],
                  'ext2:object': {
                    'ext2:object': {
                      'ext3:string': 'stringInObjectInObjectInArray',
                    },
                  },
                  'ext2:int': '13',
                  'ext2:string': 'stringInObjectInArray',
                },
              },
            },
          ],
          'ext1:object': {
            'ext2:array': ['11', '21', 'stringInArrayInObject'],
            'ext2:object': {
              'ext2:object': {
                'ext3:string': 'stringInObjectInObject',
              },
            },
            'ext2:string': 'stringInObject',
          },
          'cbvmda:countryOfExport': 'KR',
          'cbvmda:grossWeight': '3.5',
          'ext1:int': '10',
          'cbvmda:netWeight': '3.5',
          'ext1:time': '2013-06-08T14:58:56.591Z',
          'ext1:boolean': 'true',
          'ext1:default': 'stringAsDefaultValue',
          'ext1:string': 'string',
          'cbvmda:countryOfOrigin': 'GB',
          'cbvmda:drainedWeight': '3.5',
          'cbvmda:lotNumber': 'ABC123',
        },
        'ext1:float': '20',
        'ext1:time': '2013-06-08T14:58:56.591Z',
        'ext1:array': [
          '12',
          '22',
          '2013-06-08T14:58:56.591Z',
          'true',
          'stringInArray',
          {
            'ext1:object': {
              'ext1:object': {
                'ext2:array': ['14', '23.0', 'stringInArrayInObjectInArray'],
                'ext2:object': {
                  'ext2:object': {
                    'ext3:string': 'stringInObjectInObjectInArray',
                  },
                },
                'ext2:int': '13',
                'ext2:string': 'stringInObjectInArray',
              },
            },
          },
        ],
        'ext1:boolean': 'true',
        'ext1:object': {
          'ext2:array': ['11', '21', 'stringInArrayInObject'],
          'ext2:object': {
            'ext2:object': {
              'ext3:string': 'stringInObjectInObject',
            },
          },
          'ext2:string': 'stringInObject',
        },
        'ext1:default': 'stringAsDefaultValue',
        'ext1:int': '10',
        'ext1:string': 'string',
      },
    ],
  },
  '@context': [
    'https://gs1.github.io/EPCIS/epcis-context.jsonld',
    {
      ext3: 'http://example.com/ext3/',
    },
    {
      ext2: 'http://example.com/ext2/',
    },
    {
      ext1: 'http://example.com/ext1/',
    },
  ],
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
            attributes: [{ id: 'cbvmda:sst', attribute: '202' }],
            children: ['urn:epc:id:sgln:0037000.00729.8203'],
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
            attributes: [{ id: 'cbvmda:sst', attribute: 204 }],
          },
        ],
      },
    ],
  },
};

/**
 * Example of an Extended-Event
 */
export const extendedEvent = {
  type: 'ABC_Event',
  eventID: '_eventID',
  eventTime: '2013-06-08T14:58:56.591Z',
  eventTimeZoneOffset: '+02:00',
  'ext1:float': '20',
};

export const exampleIlmd = {
  type: 'abc',
  format: 'foo',
  'ext1:float': '20',
  'ext1:array': [
    '12',
    '22',
    '2013-06-08T14:58:56.591Z',
    'true',
    'stringInArray',
    {
      'ext1:object': {
        'ext1:object': {
          'ext2:array': ['14', '23.0', 'stringInArrayInObjectInArray'],
          'ext2:object': {
            'ext2:object': {
              'ext3:string': 'stringInObjectInObjectInArray',
            },
          },
          'ext2:int': '13',
          'ext2:string': 'stringInObjectInArray',
        },
      },
    },
  ],
  'ext1:object': {
    'ext2:array': ['11', '21', 'stringInArrayInObject'],
    'ext2:object': {
      'ext2:object': {
        'ext3:string': 'stringInObjectInObject',
      },
    },
    'ext2:string': 'stringInObject',
  },
  'cbvmda:countryOfExport': 'KR',
  'cbvmda:grossWeight': '3.5',
  'ext1:int': '10',
  'cbvmda:netWeight': '3.5',
  'ext1:time': '2013-06-08T14:58:56.591Z',
  'ext1:boolean': 'true',
  'ext1:default': 'stringAsDefaultValue',
  'ext1:string': 'string',
  'cbvmda:countryOfOrigin': 'GB',
  'cbvmda:drainedWeight': '3.5',
  'cbvmda:lotNumber': 'ABC123',
};
