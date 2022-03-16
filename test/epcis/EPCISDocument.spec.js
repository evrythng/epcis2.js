/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import setup from '../../src/setup';
import settings, { defaultSettings } from '../../src/settings';
import EPCISDocument from '../../src/entity/epcis/EPCISDocument';
import EPCISHeader from '../../src/entity/epcis/EPCISHeader';
import {
  AssociationEvent,
  BizLocation,
  BizTransactionElement,
  DestinationElement,
  ErrorDeclaration,
  Ilmd,
  ObjectEvent,
  PersistentDisposition,
  QuantityElement,
  ReadPoint,
  SensorElement,
  SourceElement,
} from '../../src';
import EPCISDocumentObjectEvent from '../data/EPCISDocument-ObjectEvent.json';
import EPCISDocumentAggregationEvent from '../data/EPCISDocument-AggregationEvent.json';
import EPCISDocumentTransformationEvent from '../data/EPCISDocument-TransformationEvent.json';
import EPCISDocumentAssociationEvent from '../data/EPCISDocument-AssociationEvent.json';
import { exampleEPCISDocumentWithEPCISHeader } from '../data/eventExample';

describe('unit tests for the EPCISDocument class', () => {
  const events = [
    new ObjectEvent(EPCISDocumentObjectEvent.epcisBody.eventList[0]),
    new AssociationEvent(EPCISDocumentAssociationEvent.epcisBody.eventList[0]),
  ];

  describe('setup function and EPCISDocument class', () => {
    afterEach((done) => {
      setup(defaultSettings);
      done();
    });

    it('should use default values', async () => {
      const e = new EPCISDocument();
      expect(e.getType()).to.be.equal('EPCISDocument');
      expect(e.getSchemaVersion()).to.be.equal('2.0');
      expect(e.getContext()).to.be.equal(settings.EPCISDocumentContext);
      expect(e.getCreationDate().length).to.not.be.equal(0);
    });

    it('should set the correct context and schema version', async () => {
      setup({ EPCISDocumentSchemaVersion: 3, EPCISDocumentContext: 'foo' });
      const e = new EPCISDocument();
      expect(e.getSchemaVersion()).to.be.equal(3);
      expect(e.getContext()).to.be.equal('foo');
      setup({ EPCISDocumentSchemaVersion: undefined, EPCISDocumentContext: undefined });
      const e2 = new EPCISDocument();
      expect(e2.toObject().schemaVersion).to.be.equal(undefined);
      expect(e2.toObject()['@context']).to.be.equal(undefined);
    });
  });

  it('setters should set the variables correctly', async () => {
    const e = new EPCISDocument()
      .setContext(EPCISDocumentObjectEvent['@context'])
      .setCreationDate(EPCISDocumentObjectEvent.creationDate)
      .setSchemaVersion(EPCISDocumentObjectEvent.schemaVersion)
      .setEPCISHeader(new EPCISHeader(exampleEPCISDocumentWithEPCISHeader.epcisHeader))
      .addEventList(events);
    expect(e.getContext()).to.be.equal(EPCISDocumentObjectEvent['@context']);
    expect(e.getCreationDate()).to.be.equal(EPCISDocumentObjectEvent.creationDate);
    expect(e.getSchemaVersion()).to.be.equal(EPCISDocumentObjectEvent.schemaVersion);
    expect(e.getEPCISHeader().toObject()).to.deep.equal(
      exampleEPCISDocumentWithEPCISHeader.epcisHeader,
    );
    expect(e.getEventList()).to.deep.equal(events);
  });

  it('creation from object should set the variables correctly', async () => {
    const e = new EPCISDocument(EPCISDocumentObjectEvent);
    expect(e.getEventList()[0]).to.be.instanceof(ObjectEvent);
    expect(e.toObject()).to.deep.equal(EPCISDocumentObjectEvent);
  });

  it('should set the object event in the eventList field', async () => {
    const o = new ObjectEvent();
    const e = new EPCISDocument().addEvent(o);
    expect(e.toObject().epcisBody.eventList).to.deep.equal([o.toObject()]);
  });

  it('should set the object event in the event field', async () => {
    const o = new ObjectEvent();
    const e = new EPCISDocument().addEvent(o);
    expect(e.toObject().epcisBody.eventList).to.deep.equal([o.toObject()]);
  });

  it('should not validate the document', async () => {
    const e = new EPCISDocument();
    assert.throws(() => e.isValid());
  });

  it('should validate the document', async () => {
    const e = new EPCISDocument(EPCISDocumentObjectEvent);
    expect(e.isValid()).to.be.equal(true);
    const e2 = new EPCISDocument(EPCISDocumentAggregationEvent);
    expect(e2.isValid()).to.be.equal(true);
    const e4 = new EPCISDocument(EPCISDocumentTransformationEvent);
    expect(e4.isValid()).to.be.equal(true);
    const e5 = new EPCISDocument(EPCISDocumentAssociationEvent);
    expect(e5.isValid()).to.be.equal(true);
  });

  it('should output the document passed in input', async () => {
    const e = new EPCISDocument(EPCISDocumentObjectEvent);
    expect(e.toObject()).to.deep.equal(EPCISDocumentObjectEvent);
    const e2 = new EPCISDocument(EPCISDocumentAggregationEvent);
    expect(e2.toObject()).to.deep.equal(EPCISDocumentAggregationEvent);
    const e4 = new EPCISDocument(EPCISDocumentTransformationEvent);
    expect(e4.toObject()).to.deep.equal(EPCISDocumentTransformationEvent);
    const e5 = new EPCISDocument(EPCISDocumentAssociationEvent);
    expect(e5.toObject()).to.deep.equal(EPCISDocumentAssociationEvent);
  });

  it('should build correctly an EPCISDocument with an objectEvent', async () => {
    let e = new EPCISDocument(EPCISDocumentObjectEvent);
    expect(e.toObject()).to.deep.equal(EPCISDocumentObjectEvent);
    expect(e.isValid()).to.be.equal(true);

    const o = EPCISDocumentObjectEvent;
    const ov = EPCISDocumentObjectEvent.epcisBody.eventList[0];

    const ev = new ObjectEvent();
    ev.setEventTime(ov.eventTime)
      .setEventTimeZoneOffset(ov.eventTimeZoneOffset)
      .setEventID(ov.eventID)
      .setRecordTime(ov.recordTime)
      .addEPC(ov.epcList[0])
      .addEPC(ov.epcList[1])
      .setAction(ov.action)
      .setBizStep(ov.bizStep)
      .setDisposition(ov.disposition)
      .setReadPoint(new ReadPoint().setId(ov.readPoint.id))
      .setBizLocation(new BizLocation().setId(ov.bizLocation.id))
      .addBizTransactionList([
        new BizTransactionElement({
          type: 'po',
          bizTransaction: 'urn:epc:id:gdti:0614141.00001.1618034',
        }),
        new BizTransactionElement({
          type: 'pedigree',
          bizTransaction: 'urn:epc:id:gsrn:0614141.0000010253',
        }),
      ])
      .addQuantity(
        new QuantityElement({
          epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
          quantity: 200,
          uom: 'KGM',
        }),
      )
      .addSourceList([
        new SourceElement({
          type: 'location',
          source: 'urn:epc:id:sgln:4012345.00225.0',
        }),
        new SourceElement({
          type: 'possessing_party',
          source: 'urn:epc:id:pgln:4012345.00225',
        }),
        new SourceElement({
          type: 'owning_party',
          source: 'urn:epc:id:pgln:4012345.00225',
        }),
      ])
      .addDestinationList([
        new DestinationElement({
          type: 'location',
          destination: 'urn:epc:id:sgln:0614141.00777.0',
        }),
        new DestinationElement({
          type: 'possessing_party',
          destination: 'urn:epc:id:pgln:0614141.00777',
        }),
        new DestinationElement({
          type: 'owning_party',
          destination: 'urn:epc:id:pgln:0614141.00777',
        }),
      ])
      .addSensorElement(
        new SensorElement({
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
        }),
      )
      .setPersistentDisposition(
        new PersistentDisposition()
          .addSet('completeness_verified')
          .addUnset('completeness_inferred'),
      )
      .setIlmd(
        new Ilmd({
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
        })
          .removeExtension('cbvmda:lotNumber')
          .addExtension('cbvmda:lotNumber', 'ABC123'),
      )
      .setErrorDeclaration(
        new ErrorDeclaration({
          declarationTime: '2020-01-15T00:00:00+01:00',
          reason: 'incorrect_data',
          'example:vendorExtension': 'Test1',
          correctiveEventIDs: ['urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'],
        }),
      )
      .addExtension('ext1:float', '20')
      .addExtension('ext1:time', '2013-06-08T14:58:56.591Z')
      .addExtension('ext1:array', [
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
      ])
      .addExtension('ext1:boolean', 'true')
      .addExtension('ext1:object', {
        'ext2:array': ['11', '21', 'stringInArrayInObject'],
        'ext2:object': {
          'ext2:object': {
            'ext3:string': 'stringInObjectInObject',
          },
        },
        'ext2:string': 'stringInObject',
      })
      .addExtension('ext1:default', 'stringAsDefaultValue')
      .addExtension('ext1:int', '10')
      .addExtension('ext1:string', 'string');

    e = new EPCISDocument();
    e.setSchemaVersion(o.schemaVersion)
      .setCreationDate(o.creationDate)
      .setContext(o['@context'])
      .addEvent(ev);

    expect(e.toObject()).to.deep.equal(EPCISDocumentObjectEvent);
    expect(e.isValid()).to.be.equal(true);
  });

  describe('Context can have different types', () => {
    it('context can be a string', async () => {
      const context = 'context';
      let e = new EPCISDocument({ '@context': context });
      expect(e.toObject()['@context']).to.deep.equal(context);
      e = new EPCISDocument().setContext(context);
      expect(e.toObject()['@context']).to.deep.equal(context);
    });

    it('context can be an object', async () => {
      const context = { key: 'value', key2: 'value2' };
      let e = new EPCISDocument({ '@context': context });
      expect(e.toObject()['@context']).to.deep.equal(context);
      e = new EPCISDocument().setContext(context);
      expect(e.toObject()['@context']).to.deep.equal(context);
    });

    it('context can be an array of string', async () => {
      const context = ['v', 'v2', 'v3'];
      let e = new EPCISDocument({ '@context': context });
      expect(e.toObject()['@context']).to.deep.equal(context);
      e = new EPCISDocument().setContext(context);
      expect(e.toObject()['@context']).to.deep.equal(context);
    });

    it('context can be an array of object', async () => {
      const context = [
        { key3: 'value3', key2: 'value2' },
        { key: 'value', key2: 'value2' },
      ];
      let e = new EPCISDocument({ '@context': context });
      expect(e.toObject()['@context']).to.deep.equal(context);
      e = new EPCISDocument().setContext(context);
      expect(e.toObject()['@context']).to.deep.equal(context);
    });
  });

  describe('eventList field', () => {
    it('should add and remove event', async () => {
      const o = new EPCISDocument();
      o.addEvent(events[1]);
      expect(o.getEventList()).to.deep.equal([events[1]]);
      o.addEvent(events[0]);
      expect(o.getEventList()).to.deep.equal([events[1], events[0]]);
      o.removeEvent(events[0]);
      expect(o.getEventList()).to.deep.equal([events[1]]);
      o.removeEvent(events[1]);
      expect(o.getEventList()).to.deep.equal([]);
    });

    it('should add an event list', async () => {
      const o = new EPCISDocument();
      o.addEventList(events);
      expect(o.getEventList()).to.deep.equal(events);
    });

    it('should remove an event list', async () => {
      const o = new EPCISDocument();
      o.addEventList(events);
      expect(o.getEventList()).to.deep.equal(events);
      o.removeEventList(events);
      expect(o.getEventList()).to.deep.equal([]);
    });

    it('should clear the event list', async () => {
      const o = new EPCISDocument();
      o.addEventList(events);
      o.clearEventList();
      expect(o.eventList).to.be.equal(undefined);
    });

    it('should not add the event list to JSON if it is not defined', async () => {
      const o = new EPCISDocument();
      const json = o.toObject();
      expect(json.eventList).to.be.equal(undefined);
    });
  });
});
