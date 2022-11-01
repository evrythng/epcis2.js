/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import {
  AggregationEvent,
  ObjectEvent,
  QuantityElement,
  SensorElement,
  TransformationEvent,
} from '../src';
import setup from '../src/setup';
import EPCISDocumentObjectEvent from './data/EPCISDocument-ObjectEvent.json';
import EPCISDocumentAggregationEvent from './data/EPCISDocument-AggregationEvent.json';
import EPCISDocumentTransformationEvent from './data/EPCISDocument-TransformationEvent.json';
import EPCISDocumentTransactionEvent from './data/EPCISDocument-TransactionEvent.json';
import EPCISDocumentAssociationEvent from './data/EPCISDocument-AssociationEvent.json';
import EPCISDocumentQueryDocument from './data/EPCISQueryDocument.json';
import EPCISDocument from '../src/entity/epcis/EPCISDocument';
import BizTransactionElement from '../src/entity/model/BizTransactionElement';
import cbv from '../src/cbv/cbv';
import {
  validateAgainstSchema,
  ensureFieldSet,
  validateEpcisDocument,
  getAuthorizedExtensions,
  checkIfExtensionsAreDefinedInTheContext,
} from '../src/schema/validator';

/** Test documents with different event types inside */
const testData = {
  invalid: { foo: 'bar' },
  ObjectEvent: EPCISDocumentObjectEvent,
  AggregationEvent: EPCISDocumentAggregationEvent,
  TransformationEvent: EPCISDocumentTransformationEvent,
  AssociationEvent: EPCISDocumentAssociationEvent,
  QueryDocument: EPCISDocumentQueryDocument,
  TransactionEvent: EPCISDocumentTransactionEvent,
};

describe('validation of an EPCIS document', () => {
  describe('schema validation: valid', () => {
    it('should accept a valid EPCISDocument containing ObjectEvent', () => {
      assert.doesNotThrow(() => validateEpcisDocument(testData.ObjectEvent));
    });

    it('should accept a valid EPCISDocument containing ObjectEvent (2)', () => {
      const epcisDocument = new EPCISDocument();
      const objectEvent = new ObjectEvent();
      const bizTransaction = new BizTransactionElement({
        type: cbv.businessTransactionTypes.po,
        bizTransaction: 'http://transaction.acme.com/po/12345678',
      });

      objectEvent
        .setEventTime('2005-04-03T20:33:31.116-06:00')
        .addEPC('urn:epc:id:sgtin:0614141.107346.2020')
        .addEPC('urn:epc:id:sgtin:0614141.107346.2021')
        .setAction(cbv.actionTypes.observe)
        .setEventID('ni:///sha-256;87b5f18a69993f0052046d4687dfacdf48f?ver=CBV2.0')
        .setBizStep(cbv.bizSteps.shipping)
        .setDisposition(cbv.dispositions.in_transit)
        .setReadPoint('urn:epc:id:sgln:0614141.07346.1234')
        .addBizTransaction(bizTransaction);

      epcisDocument.setCreationDate('2005-07-11T11:30:47+00:00').addEvent(objectEvent);
      assert.doesNotThrow(() => epcisDocument.isValid());
    });

    it('should accept a valid EPCISDocument containing AggregationEvent', () => {
      assert.doesNotThrow(() => validateEpcisDocument(testData.AggregationEvent));
    });

    it('should accept a valid EPCISDocument containing TransactionEvent', () => {
      assert.doesNotThrow(() => validateEpcisDocument(testData.TransactionEvent));
    });

    it('should accept a valid EPCISDocument containing TransformationEvent', () => {
      assert.doesNotThrow(() => validateEpcisDocument(testData.TransformationEvent));
    });

    it('should accept a valid EPCISDocument containing ObjectEvent', () => {
      assert.doesNotThrow(() => validateEpcisDocument(testData.ObjectEvent));
    });

    it('should accept a valid EPCISDocument containing AssociationEvent', () => {
      assert.doesNotThrow(() => validateEpcisDocument(testData.AssociationEvent));
    });

    it('should accept a valid EPCISQueryDocument', () => {
      assert.doesNotThrow(() => validateEpcisDocument(testData.QueryDocument));
    });
  });

  describe('schema validation: invalid', () => {
    it('should reject an invalid object', () => {
      assert.throws(() => validateEpcisDocument(testData.invalid));
    });

    it('should reject an invalid EPCISDocument', () => {
      const copy = { ...testData.ObjectEvent };

      // Omit the events
      const { epcisBody, ...instance } = copy;

      assert.throws(() => validateEpcisDocument(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid ObjectEvent', () => {
      const instance = { ...testData.ObjectEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].action = 'OBSERVED';

      assert.throws(() => validateEpcisDocument(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid AggregationEvent', () => {
      const instance = { ...testData.AggregationEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].parentID = 'somebadid';

      assert.throws(() => validateEpcisDocument(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid TransactionEvent', () => {
      const instance = { ...testData.TransactionEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].action = 'NOT_VALID_ACTION_TYPE';

      assert.throws(() => validateEpcisDocument(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid TransformationEvent', () => {
      const instance = { ...testData.TransformationEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].eventTimeZoneOffset = '19:00';

      assert.throws(() => validateEpcisDocument(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid AssociationEvent', () => {
      const instance = { ...testData.AssociationEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].action = 'ADDED';

      assert.throws(() => validateEpcisDocument(instance));
    });

    it('should reject an invalid EPCISQueryDocument', () => {
      const copy = { ...testData.QueryDocument };

      // Omit the query results
      const instance = {
        ...copy,
        epcisBody: {},
      };

      assert.throws(() => validateEpcisDocument(instance));
    });
  });
});

describe('Unit test: validator.js', () => {
  describe('validateAgainstSchema', () => {
    it('should throw for unknown schema name', () => {
      assert.throws(() => validateAgainstSchema({}, 'invalidName'));
    });
  });

  describe('ensureFieldSet', () => {
    it('should throw for unknown fieldSet name', () => {
      assert.throws(() => ensureFieldSet({}, 'invalidName'));
    });
  });

  describe('validateEpcisDocument', () => {
    it('should accept correct EPCISDocument', () => {
      const epcisD = {
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'ObjectEvent',
              action: 'OBSERVE',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: ['urn:epc:id:sgtin:0614141.107346.2017'],
              eventTime: '2005-04-03T20:33:31.116000-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
            },
          ],
        },
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
      };
      const res = validateEpcisDocument(epcisD);
      assert.equal(res.success, true);
      assert.deepEqual(res.errors, []);
    });

    it('should reject incorrect EPCISDocument', () => {
      const epcisDocument = {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
        type: 'EPCISDocument',
        schemaVersion: 2,
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'ObjectEvent',
              action: 'OBSERVE',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: ['urn:epc:id:sgtin:0614141.107346.2017'],
              eventTime: '2005-04-03T20:33:31.116000-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
            },
          ],
        },
      };

      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should reject correct EPCISDocument with invalid event', () => {
      const epcisDocument = {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'ObjectEvent',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: ['urn:epc:id:sgtin:0614141.107346.2017'],
              eventTime: '2005-04-03T20:33:31.116000-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
            },
          ],
        },
      };

      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should accept correct event with event extensions', () => {
      const epcisDocument = {
        '@context': {
          default: 'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
          evt: 'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
        },
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'ObjectEvent',
              'evt:factoryId': 'foobar',
              action: 'OBSERVE',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: ['urn:epc:id:sgtin:0614141.107346.2017'],
              eventTime: '2005-04-03T20:33:31.116000-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
            },
          ],
        },
      };
      const res = validateEpcisDocument(epcisDocument);
      assert.equal(res.success, true);
      assert.deepEqual(res.errors, []);
    });

    it('should reject incorrect event with invalid event extensions', () => {
      const epcisDocument = {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'ObjectEvent',
              factoryId: 'foobar',
              action: 'OBSERVE',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: ['urn:epc:id:sgtin:0614141.107346.2017'],
              eventTime: '2005-04-03T20:33:31.116000-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
            },
          ],
        },
      };

      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should reject incorrect event with with eventId instead of eventID', () => {
      const epcisDocument = {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventId: 'test:event:id',
              type: 'ObjectEvent',
              action: 'OBSERVE',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: ['urn:epc:id:sgtin:0614141.107346.2017'],
              eventTime: '2005-04-03T20:33:31.116000-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
            },
          ],
        },
      };

      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should accept correct sensorElementList with no extensions', () => {
      const epcisDocument = {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'ObjectEvent',
              action: 'OBSERVE',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: [
                'urn:epc:id:sgtin:0614141.107346.2017',
                'urn:epc:id:sgtin:0614141.107346.2018',
              ],
              eventTime: '2005-04-03T20:33:31.116-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: {
                id: 'urn:epc:id:sgln:0614141.07346.1234',
              },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
              sensorElementList: [
                {
                  sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
                  sensorReport: [
                    {
                      type: cbv.sensorMeasurementTypes.temperature,
                      value: 26.0,
                      uom: 'CEL',
                      deviceID: 'urn:epc:id:giai:4000001.111',
                      deviceMetadata: 'https://id.gs1.org/giai/4000001111',
                      rawData: 'https://example.org/giai/401234599999',
                    },
                    {
                      type: cbv.sensorMeasurementTypes.absolute_humidity,
                      value: 12.1,
                      uom: 'A93',
                      deviceID: 'urn:epc:id:giai:4000001.222',
                      deviceMetadata: 'https://id.gs1.org/giai/4000001222',
                      rawData: 'https://example.org/giai/401234599999',
                    },
                  ],
                },
              ],
            },
          ],
        },
      };

      const res = validateEpcisDocument(epcisDocument);
      assert.equal(res.success, true);
      assert.deepEqual(res.errors, []);
    });

    it('should accept sensorElementList with extensions', () => {
      const epcisDocument = {
        '@context': [
          'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
          { example: 'https://example.com/', evt: 'https://example.com/evt/' },
        ],
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'ObjectEvent',
              action: 'OBSERVE',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: [
                'urn:epc:id:sgtin:0614141.107346.2017',
                'urn:epc:id:sgtin:0614141.107346.2018',
              ],
              eventTime: '2005-04-03T20:33:31.116-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: {
                id: 'urn:epc:id:sgln:0614141.07346.1234',
                'example:extension': 'factoryId',
              },
              bizLocation: {
                id: 'urn:epc:id:sgln:9529999.99999.0',
                'evt:factoryId': '8934897894',
              },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
              sensorElementList: [
                {
                  'example:furtherEventData': [
                    { 'example:data1': '123.5' },
                    { 'example:data2': '0.987' },
                  ],
                  sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
                  sensorReport: [
                    {
                      type: cbv.sensorMeasurementTypes.temperature,
                      value: 26.0,
                      uom: 'CEL',
                      deviceID: 'urn:epc:id:giai:4000001.111',
                      deviceMetadata: 'https://id.gs1.org/giai/4000001111',
                      rawData: 'https://example.org/giai/401234599999',
                    },
                    {
                      type: cbv.sensorMeasurementTypes.relative_humidity,
                      value: 12.1,
                      uom: 'A93',
                      deviceID: 'urn:epc:id:giai:4000001.222',
                      deviceMetadata: 'https://id.gs1.org/giai/4000001222',
                      rawData: 'https://example.org/giai/401234599999',
                    },
                  ],
                },
              ],
              'example:furtherEventData': [
                { 'example:data1': '123.5' },
                { 'example:data2': '0.987' },
              ],
            },
          ],
        },
      };

      const res = validateEpcisDocument(epcisDocument);
      assert.equal(res.success, true);
      assert.deepEqual(res.errors, []);
    });

    it('should reject correct sensorElementList with invalid extensions', () => {
      const epcisDocument = {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'ObjectEvent',
              action: 'OBSERVE',
              bizStep: cbv.bizSteps.shipping,
              disposition: cbv.dispositions.in_transit,
              epcList: [
                'urn:epc:id:sgtin:0614141.107346.2017',
                'urn:epc:id:sgtin:0614141.107346.2018',
              ],
              eventTime: '2005-04-03T20:33:31.116-06:00',
              eventTimeZoneOffset: '-06:00',
              readPoint: {
                id: 'urn:epc:id:sgln:0614141.07346.1234',
                'example:extension': 'factoryId',
              },
              bizLocation: {
                id: 'urn:epc:id:sgln:9529999.99999.0',
                'evt:factoryId': '8934897894',
              },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.po,
                  bizTransaction: 'http://transaction.acme.com/po/12345678',
                },
              ],
              sensorElementList: [
                {
                  furtherEventData: [{ 'example:data1': '123.5' }, { 'example:data2': '0.987' }],
                  sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
                  sensorReport: [
                    {
                      type: cbv.sensorMeasurementTypes.temperature,
                      value: 26.0,
                      uom: 'CEL',
                      deviceID: 'urn:epc:id:giai:4000001.111',
                      deviceMetadata: 'https://id.gs1.org/giai/4000001111',
                      rawData: 'https://example.org/giai/401234599999',
                    },
                    {
                      type: cbv.sensorMeasurementTypes.absolute_humidity,
                      value: 12.1,
                      uom: 'A93',
                      deviceID: 'urn:epc:id:giai:4000001.222',
                      deviceMetadata: 'https://id.gs1.org/giai/4000001222',
                      rawData: 'https://example.org/giai/401234599999',
                    },
                  ],
                },
              ],
              'example:furtherEventData': [
                { 'example:data1': '123.5' },
                { 'example:data2': '0.987' },
              ],
            },
          ],
        },
      };

      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should accept AggregationEvent with no extensions', () => {
      const epcisDocument = {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'AggregationEvent',
              eventTime: '2020-06-08T18:11:16Z',
              eventTimeZoneOffset: '+02:00',
              parentID: 'urn:epc:id:sgtin:952001.1012345.22222223333',
              childEPCs: [
                'urn:epc:id:sgtin:9520001.012346.10000001001',
                'urn:epc:id:sgtin:9520001.012346.10000001002',
                'urn:epc:id:sgtin:9520001.012346.10000001003',
              ],
              action: 'DELETE',
              bizStep: cbv.bizSteps.unpacking,
              disposition: cbv.dispositions.in_progress,
              readPoint: { id: 'urn:epc:id:sgln:9529999.99999.0' },
              bizLocation: { id: 'urn:epc:id:sgln:9529999.99999.0' },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.inv,
                  bizTransaction: 'urn:epcglobal:cbv:bt:9520011111116:A123',
                },
              ],
              sourceList: [
                {
                  type: cbv.sourceDestinationTypes.owning_party,
                  source: 'urn:epc:id:pgln:9520001.11111',
                },
              ],
              destinationList: [
                {
                  type: cbv.sourceDestinationTypes.owning_party,
                  destination: 'urn:epc:id:pgln:9520999.99999',
                },
              ],
              errorDeclaration: {
                declarationTime: '2020-01-14T23:00:00.000+00:00',
                reason: cbv.errorReasonIdentifiers.incorrect_data,
                correctiveEventIDs: ['urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'],
              },
            },
          ],
        },
      };

      const res = validateEpcisDocument(epcisDocument);
      assert.equal(res.success, true);
      assert.deepEqual(res.errors, []);
    });

    it('should reject AggregationEvent with invalid extensions', () => {
      const epcisDocument = {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld'],
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2005-07-11T11:30:47.0Z',
        epcisBody: {
          eventList: [
            {
              eventID: 'test:event:id',
              type: 'AggregationEvent',
              eventTime: '2020-06-08T18:11:16Z',
              eventTimeZoneOffset: '+02:00',
              parentID: 'urn:epc:id:sgtin:952001.1012345.22222223333',
              childEPCs: [
                'urn:epc:id:sgtin:9520001.012346.10000001001',
                'urn:epc:id:sgtin:9520001.012346.10000001002',
                'urn:epc:id:sgtin:9520001.012346.10000001003',
              ],
              action: 'DELETE',
              bizStep: cbv.bizSteps.unpacking,
              disposition: cbv.dispositions.in_progress,
              readPoint: { id: 'urn:epc:id:sgln:9529999.99999.0' },
              bizLocation: { id: 'urn:epc:id:sgln:9529999.99999.0' },
              bizTransactionList: [
                {
                  type: cbv.businessTransactionTypes.inv,
                  bizTransaction: 'urn:epcglobal:cbv:bt:9520011111116:A123',
                },
              ],
              sourceList: [
                {
                  type: cbv.sourceDestinationTypes.owning_party,
                  source: 'urn:epc:id:pgln:9520001.11111',
                },
              ],
              destinationList: [
                {
                  type: cbv.sourceDestinationTypes.owning_party,
                  destination: 'urn:epc:id:pgln:9520999.99999',
                },
              ],
              persistentDisposition: {
                unset: [cbv.dispositions.completeness_inferred],
                set: [cbv.dispositions.completeness_verified],
              },
              errorDeclaration: {
                declarationTime: '2020-01-14T23:00:00.000+00:00',
                reason: cbv.errorReasonIdentifiers.incorrect_data,
                correctiveEventIDs: ['urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'],
                evtErrorCode: 1239,
              },
            },
          ],
        },
      };

      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should accept TransformationEvent with various quantity list types', () => {
      const epcisDocument = {
        type: 'EPCISDocument',
        schemaVersion: '2.0',
        creationDate: '2013-06-04T14:59:02.099+02:00',
        epcisBody: {
          eventList: [
            {
              type: 'TransformationEvent',
              eventTime: '2013-10-31T14:58:56.591Z',
              eventTimeZoneOffset: '+02:00',
              inputEPCList: [
                'urn:epc:id:sgtin:4012345.011122.25',
                'urn:epc:id:sgtin:4000001.065432.99886655',
              ],
              inputQuantityList: [
                {
                  epcClass: 'urn:epc:class:lgtin:4012345.011111.4444',
                  quantity: 10,
                  uom: 'KGM',
                },
                {
                  epcClass: 'urn:epc:class:lgtin:0614141.077777.987',
                  quantity: 30,
                },
                {
                  epcClass: 'urn:epc:idpat:sgtin:4012345.066666.*',
                  quantity: 220,
                },
              ],
              outputEPCList: [
                'urn:epc:id:sgtin:4012345.077889.25',
                'urn:epc:id:sgtin:4012345.077889.26',
                'urn:epc:id:sgtin:4012345.077889.27',
                'urn:epc:id:sgtin:4012345.077889.28',
              ],
              outputQuantityList: [
                {
                  epcClass: 'urn:epc:class:lgtin:4012345.011111.4444',
                  quantity: 10,
                  uom: 'KGM',
                },
                {
                  epcClass: 'urn:epc:class:lgtin:0614141.077777.987',
                  quantity: 30,
                },
                {
                  epcClass: 'urn:epc:idpat:sgtin:4012345.066666.*',
                  quantity: 220,
                },
              ],
              transformationID: 'urn:epc:id:gdti:0614141.12345.400',
              bizStep: 'commissioning',
              disposition: 'in_progress',
              readPoint: {
                id: 'urn:epc:id:sgln:4012345.00001.0',
              },
              bizLocation: {
                id: 'urn:epc:id:sgln:0614141.00888.0',
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
                        'ext2:array': [
                          '14',
                          '23.0',
                          'stringInArrayInObjectInArray',
                        ],
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
                  'ext2:array': [
                    '11',
                    '21',
                    'stringInArrayInObject',
                  ],
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
              sensorElementList: [
                {
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
                      deviceMetadata: 'https://id.gs1.org/giai/4000001111',
                    },
                  ],
                },
              ],
              persistentDisposition: {
                set: [
                  'completeness_verified',
                ],
                unset: [
                  'completeness_inferred',
                ],
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
                      'ext2:array': [
                        '14',
                        '23.0',
                        'stringInArrayInObjectInArray',
                      ],
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
                'ext2:array': [
                  '11',
                  '21',
                  'stringInArrayInObject',
                ],
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
          'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
          {
            ext3: 'http://example.com/ext3/',
          },
          {
            ext2: 'http://example.com/ext2/',
          },
          {
            ext1: 'http://example.com/ext1/',
            cbvmda: 'http://example.com/cbvmda/',
          },
        ],
      };

      const res = validateEpcisDocument(epcisDocument);
      assert.equal(res.success, true);
      assert.deepEqual(res.errors, []);
    });

    it('should reject correct EPCISDocument with an object event containing a bizTransaction list with a non-valid extension', () => {
      const epcisDocument = new EPCISDocument();
      const oe = new ObjectEvent();
      oe.setAction('OBSERVE'); // required
      oe.addEPC('epc:epc:epc'); // required
      oe.addBizTransactionList([
        new BizTransactionElement(
          {
            type: cbv.businessTransactionTypes.po,
            bizTransaction: 'http://transaction.acme.com/po/12345678',
            invalid: '',
          },
        ),
      ]);
      epcisDocument.addEvent(oe);
      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should reject correct EPCISDocument with an object event containing a quantity list with a non-valid extension', () => {
      const epcisDocument = new EPCISDocument();
      const oe = new ObjectEvent();
      oe.setAction('OBSERVE'); // required
      oe.addQuantityList([
        new QuantityElement(
          {
            epcClass: 'urn:epc:class:lgtin:4012345.011111.1111',
            quantity: 10,
            uom: 'KGM',
            invalid: '',
          },
        ),
      ]);
      epcisDocument.addEvent(oe);
      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should reject correct EPCISDocument with a transformation event containing an input quantity list with a non-valid extension', () => {
      const epcisDocument = new EPCISDocument();
      const te = new TransformationEvent();
      te.addInputQuantity(
        new QuantityElement(
          {
            epcClass: 'urn:epc:class:lgtin:4012345.011111.1111',
            quantity: 10,
            uom: 'KGM',
            invalid: '',
          },
        ),
      );
      te.addOutputQuantity(
        new QuantityElement(
          {
            epcClass: 'urn:epc:class:lgtin:4012345.011111.1111',
            quantity: 10,
            uom: 'KGM',
          },
        ),
      );
      epcisDocument.addEvent(te);
      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should reject correct EPCISDocument with a transformation event containing an output quantity list with a non-valid extension', () => {
      const epcisDocument = new EPCISDocument();
      const te = new TransformationEvent();
      te.addInputQuantity(
        new QuantityElement(
          {
            epcClass: 'urn:epc:class:lgtin:4012345.011111.1111',
            quantity: 10,
            uom: 'KGM',
          },
        ),
      );
      te.addOutputQuantity(
        new QuantityElement(
          {
            epcClass: 'urn:epc:class:lgtin:4012345.011111.1111',
            quantity: 10,
            uom: 'KGM',
            invalid: '',
          },
        ),
      );
      epcisDocument.addEvent(te);
      assert.throws(() => { validateEpcisDocument(epcisDocument); });
    });

    it('should reject correct EPCISDocument with an aggregation event containing a child quantity list with a non-valid extension', () => {
      const epcisDocument = new EPCISDocument();
      const te = new AggregationEvent();
      te.setAction('OBSERVE'); // required
      te.addChildQuantity(
        new QuantityElement(
          {
            epcClass: 'urn:epc:class:lgtin:4012345.011111.1111',
            quantity: 10,
            uom: 'KGM',
            invalid: '',
          },
        ),
      );
      epcisDocument.addEvent(te);
      assert.throws(() => { epcisDocument.isValid(); });
    });

    it('should reject correct EPCISDocument with an aggregation event containing a sensorElement with a non-valid extension', () => {
      const epcisDocument = new EPCISDocument();
      const te = new ObjectEvent();
      te.setAction('OBSERVE'); // required
      te.addEPC('epc:epc:epc'); // required
      te.addSensorElement(
        new SensorElement({
          invalid: '',
          sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
          sensorReport: [
            {
              type: cbv.sensorMeasurementTypes.temperature,
              value: 26.0,
              uom: 'CEL',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
            },
            {
              type: cbv.sensorMeasurementTypes.absolute_humidity,
              value: 12.1,
              uom: 'A93',
              deviceID: 'urn:epc:id:giai:4000001.222',
              deviceMetadata: 'https://id.gs1.org/giai/4000001222',
              rawData: 'https://example.org/giai/401234599999',
            },
          ],
        }),
      );
      epcisDocument.addEvent(te);
      assert.throws(() => { epcisDocument.isValid(); });
    });

    it('should reject correct EPCISDocument with an aggregation event containing a sensor metadata with a non-valid extension', () => {
      const epcisDocument = new EPCISDocument();
      const te = new ObjectEvent();
      te.setAction('OBSERVE'); // required
      te.addEPC('epc:epc:epc'); // required
      te.addSensorElement(
        new SensorElement({
          sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00', invalid: '' },
          sensorReport: [
            {
              type: cbv.sensorMeasurementTypes.temperature,
              value: 26.0,
              uom: 'CEL',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
            },
            {
              type: cbv.sensorMeasurementTypes.relative_humidity,
              value: 12.1,
              uom: 'A93',
              deviceID: 'urn:epc:id:giai:4000001.222',
              deviceMetadata: 'https://id.gs1.org/giai/4000001222',
              rawData: 'https://example.org/giai/401234599999',
            },
          ],
        }),
      );
      epcisDocument.addEvent(te);
      assert.throws(() => { epcisDocument.isValid(); });
    });

    it('should reject correct EPCISDocument with an aggregation event containing a sensor report with a non-valid extension', () => {
      const epcisDocument = new EPCISDocument();
      const te = new ObjectEvent();
      te.setAction('OBSERVE'); // required
      te.addEPC('epc:epc:epc'); // required
      te.addSensorElement(
        new SensorElement({
          sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
          sensorReport: [
            {
              type: cbv.sensorMeasurementTypes.temperature,
              value: 26.0,
              uom: 'CEL',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
              invalid: '',
            },
            {
              type: cbv.sensorMeasurementTypes.absolute_humidity,
              value: 12.1,
              uom: 'A93',
              deviceID: 'urn:epc:id:giai:4000001.222',
              deviceMetadata: 'https://id.gs1.org/giai/4000001222',
              rawData: 'https://example.org/giai/401234599999',
            },
          ],
        }),
      );
      epcisDocument.addEvent(te);
      assert.throws(() => { epcisDocument.isValid(); });
    });
    it('should reject correct EPCISDocument with an invalid cbv', () => {
      const te = new ObjectEvent();
      te.setAction('ADD');
      te.setBizStep('foobar');
      assert.throws(() => { te.isValid(); });
    });
  });

  describe('schema validation: throwError = false', () => {
    it('should accept a valid EPCISDocument containing ObjectEvent', () => {
      const instance = { ...testData.ObjectEvent };
      instance.epcisBody.eventList[0].action = 'ADD';
      let result = {};
      assert.doesNotThrow(() => { result = validateEpcisDocument(instance, false); });
      expect(result.success).to.be.equal(true);
      expect(result.errors).to.deep.equal([]);
    });

    it('should reject a valid EPCISDocument containing an invalid AssociationEvent', () => {
      const instance = { ...testData.AssociationEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].action = 'ADDED';

      let result = {};
      assert.doesNotThrow(() => { result = validateEpcisDocument(instance, false); });
      expect(result.success).to.be.equal(false);
      expect(result.errors).to.deep.equal(['EPCISDocument/epcisBody/eventList/0/action should be equal to one of the allowed values']);
    });

    it('should reject a null EPCISDocument ', () => {
      let result = {};
      assert.doesNotThrow(() => { result = validateEpcisDocument(null, false); });
      expect(result.success).to.be.equal(false);
      expect(result.errors).to.deep.equal(['EPCISDocument should be object']);
    });

    it('should reject an undefined EPCISDocument ', () => {
      let result = {};
      assert.doesNotThrow(() => { result = validateEpcisDocument(undefined, false); });
      expect(result.success).to.be.equal(false);
      expect(result.errors).to.deep.equal(['EPCISDocument should be object']);
    });
  });

  it('should reject a document with extensions that are not defined in the context (e.g. example:*}'
   + 'if the settings checkExtensions is set to true', () => {
    setup({ checkExtensions: true });
    const epcisDocument = {
      '@context': [
        'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
        { evt: 'https://example.com/evt/' },
      ],
      type: 'EPCISDocument',
      schemaVersion: '2.0',
      creationDate: '2005-07-11T11:30:47.0Z',
      epcisBody: {
        eventList: [
          {
            eventID: 'test:event:id',
            type: 'ObjectEvent',
            action: 'OBSERVE',
            bizStep: cbv.bizSteps.shipping,
            disposition: cbv.dispositions.in_transit,
            epcList: [
              'urn:epc:id:sgtin:0614141.107346.2017',
              'urn:epc:id:sgtin:0614141.107346.2018',
            ],
            eventTime: '2005-04-03T20:33:31.116-06:00',
            eventTimeZoneOffset: '-06:00',
            readPoint: {
              id: 'urn:epc:id:sgln:0614141.07346.1234',
              'example:extension': 'factoryId',
            },
            bizLocation: {
              id: 'urn:epc:id:sgln:9529999.99999.0',
              'evt:factoryId': '8934897894',
            },
            bizTransactionList: [
              {
                type: cbv.businessTransactionTypes.po,
                bizTransaction: 'http://transaction.acme.com/po/12345678',
              },
            ],
            sensorElementList: [
              {
                'example:furtherEventData': [
                  { 'example:data1': '123.5' },
                  { 'example:data2': '0.987' },
                ],
                sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
                sensorReport: [
                  {
                    type: cbv.sensorMeasurementTypes.temperature,
                    value: 26.0,
                    uom: 'CEL',
                    deviceID: 'urn:epc:id:giai:4000001.111',
                    deviceMetadata: 'https://id.gs1.org/giai/4000001111',
                    rawData: 'https://example.org/giai/401234599999',
                  },
                  {
                    type: cbv.sensorMeasurementTypes.relative_humidity,
                    value: 12.1,
                    uom: 'A93',
                    deviceID: 'urn:epc:id:giai:4000001.222',
                    deviceMetadata: 'https://id.gs1.org/giai/4000001222',
                    rawData: 'https://example.org/giai/401234599999',
                  },
                ],
              },
            ],
            'example:furtherEventData': [
              { 'example:data1': '123.5' },
              { 'example:data2': '0.987' },
            ],
          },
        ],
      },
    };
    let res = {};
    assert.throws(() => { validateEpcisDocument(epcisDocument); });
    assert.doesNotThrow(() => { res = validateEpcisDocument(epcisDocument, false); });
    expect(res.success).to.be.equal(false);
    expect(res.errors).to.deep.equal(['Event contains unknown extension: example']);
  });

  it('should reject a document with an event containing extensions that are not defined in the context (e.g. notInContext:*}'
   + 'if the settings checkExtensions is set to true', () => {
    setup({ checkExtensions: true });
    const epcisDocument = {
      '@context': [
        'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
        { evt: 'https://example.com/evt/', example: 'https://example.com/example/' },
      ],
      type: 'EPCISDocument',
      schemaVersion: '2.0',
      creationDate: '2005-07-11T11:30:47.0Z',
      epcisBody: {
        eventList: [
          {
            eventID: 'test:event:id',
            type: 'ObjectEvent',
            action: 'OBSERVE',
            bizStep: cbv.bizSteps.shipping,
            disposition: cbv.dispositions.in_transit,
            epcList: [
              'urn:epc:id:sgtin:0614141.107346.2017',
              'urn:epc:id:sgtin:0614141.107346.2018',
            ],
            eventTime: '2005-04-03T20:33:31.116-06:00',
            eventTimeZoneOffset: '-06:00',
            readPoint: {
              id: 'urn:epc:id:sgln:0614141.07346.1234',
              'example:extension': 'factoryId',
              'notInContext:furtherEventData': [{ 'example:data1': '123.5' }, { 'example:data2': '0.987' }],
            },
            bizLocation: {
              id: 'urn:epc:id:sgln:9529999.99999.0',
              'evt:factoryId': '8934897894',
            },
            bizTransactionList: [
              {
                type: cbv.businessTransactionTypes.po,
                bizTransaction: 'http://transaction.acme.com/po/12345678',
              },
            ],
            sensorElementList: [
              {
                'example:furtherEventData': [
                  { 'example:data1': '123.5' },
                  { 'example:data2': '0.987' },
                ],
                sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
                sensorReport: [
                  {
                    type: cbv.sensorMeasurementTypes.temperature,
                    value: 26.0,
                    uom: 'CEL',
                    deviceID: 'urn:epc:id:giai:4000001.111',
                    deviceMetadata: 'https://id.gs1.org/giai/4000001111',
                    rawData: 'https://example.org/giai/401234599999',
                  },
                  {
                    type: cbv.sensorMeasurementTypes.relative_humidity,
                    value: 12.1,
                    uom: 'A93',
                    deviceID: 'urn:epc:id:giai:4000001.222',
                    deviceMetadata: 'https://id.gs1.org/giai/4000001222',
                    rawData: 'https://example.org/giai/401234599999',
                  },
                ],
              },
            ],
            'example:furtherEventData': [
              { 'example:data1': '123.5' },
              { 'example:data2': '0.987' },
            ],
          },
        ],
      },
    };
    let res = {};
    assert.throws(() => { validateEpcisDocument(epcisDocument); });
    assert.doesNotThrow(() => { res = validateEpcisDocument(epcisDocument, false); });
    expect(res.success).to.be.equal(false);
    expect(res.errors).to.deep.equal(['Event contains unknown extension: notInContext']);
  });

  it('should accept a document with extensions that are not defined in the context (e.g. example:*}' +
    'if the settings checkExtensions is set to false', () => {
    setup({ checkExtensions: false });
    const epcisDocument = {
      '@context': [
        'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
        { evt: 'https://example.com/evt/' },
      ],
      type: 'EPCISDocument',
      schemaVersion: '2.0',
      creationDate: '2005-07-11T11:30:47.0Z',
      epcisBody: {
        eventList: [
          {
            eventID: 'test:event:id',
            type: 'ObjectEvent',
            action: 'OBSERVE',
            bizStep: cbv.bizSteps.shipping,
            disposition: cbv.dispositions.in_transit,
            epcList: [
              'urn:epc:id:sgtin:0614141.107346.2017',
              'urn:epc:id:sgtin:0614141.107346.2018',
            ],
            eventTime: '2005-04-03T20:33:31.116-06:00',
            eventTimeZoneOffset: '-06:00',
            readPoint: {
              id: 'urn:epc:id:sgln:0614141.07346.1234',
              'example:extension': 'factoryId',
            },
            bizLocation: {
              id: 'urn:epc:id:sgln:9529999.99999.0',
              'evt:factoryId': '8934897894',
            },
            bizTransactionList: [
              {
                type: cbv.businessTransactionTypes.po,
                bizTransaction: 'http://transaction.acme.com/po/12345678',
              },
            ],
            sensorElementList: [
              {
                'example:furtherEventData': [
                  { 'example:data1': '123.5' },
                  { 'example:data2': '0.987' },
                ],
                sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
                sensorReport: [
                  {
                    type: cbv.sensorMeasurementTypes.temperature,
                    value: 26.0,
                    uom: 'CEL',
                    deviceID: 'urn:epc:id:giai:4000001.111',
                    deviceMetadata: 'https://id.gs1.org/giai/4000001111',
                    rawData: 'https://example.org/giai/401234599999',
                  },
                  {
                    type: cbv.sensorMeasurementTypes.relative_humidity,
                    value: 12.1,
                    uom: 'A93',
                    deviceID: 'urn:epc:id:giai:4000001.222',
                    deviceMetadata: 'https://id.gs1.org/giai/4000001222',
                    rawData: 'https://example.org/giai/401234599999',
                  },
                ],
              },
            ],
            'example:furtherEventData': [
              { 'example:data1': '123.5' },
              { 'example:data2': '0.987' },
            ],
          },
        ],
      },
    };
    let res = {};
    assert.doesNotThrow(() => { res = validateEpcisDocument(epcisDocument, false); });
    expect(res.success).to.be.equal(true);
    expect(res.errors).to.deep.equal([]);
  });

  it('should accept a document with extensions that are defined in the default EPCIS context', () => {
    setup({ checkExtensions: true });
    const epcisDocument = {
      '@context': [
        'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
      ],
      type: 'EPCISDocument',
      schemaVersion: '2.0',
      creationDate: '2005-07-11T11:30:47.0Z',
      epcisBody: {
        eventList: [
          {
            eventID: 'test:event:id',
            type: 'ObjectEvent',
            action: 'OBSERVE',
            bizStep: cbv.bizSteps.shipping,
            disposition: cbv.dispositions.in_transit,
            epcList: [
              'urn:epc:id:sgtin:0614141.107346.2017',
              'urn:epc:id:sgtin:0614141.107346.2018',
            ],
            eventTime: '2005-04-03T20:33:31.116-06:00',
            eventTimeZoneOffset: '-06:00',
            readPoint: {
              id: 'urn:epc:id:sgln:0614141.07346.1234',
            },
            bizLocation: {
              id: 'urn:epc:id:sgln:9529999.99999.0',
            },
            bizTransactionList: [
              {
                type: cbv.businessTransactionTypes.po,
                bizTransaction: 'http://transaction.acme.com/po/12345678',
              },
            ],
            sensorElementList: [
              {
                sensorMetadata: { time: '2019-04-02T14:55:00.000+01:00' },
                sensorReport: [
                  {
                    type: cbv.sensorMeasurementTypes.temperature,
                    value: 26.0,
                    uom: 'CEL',
                    deviceID: 'urn:epc:id:giai:4000001.111',
                    deviceMetadata: 'https://id.gs1.org/giai/4000001111',
                    rawData: 'https://example.org/giai/401234599999',
                  },
                  {
                    type: cbv.sensorMeasurementTypes.relative_humidity,
                    value: 12.1,
                    uom: 'A93',
                    deviceID: 'urn:epc:id:giai:4000001.222',
                    deviceMetadata: 'https://id.gs1.org/giai/4000001222',
                    rawData: 'https://example.org/giai/401234599999',
                  },
                ],
              },
            ],
          },
        ],
      },
      'owl:sameAs': 'above',
    };
    let res = {};
    assert.doesNotThrow(() => { res = validateEpcisDocument(epcisDocument, false); });
    expect(res.success).to.be.equal(true);
    expect(res.errors).to.deep.equal([]);
  });

  describe('getAuthorizedExtensions()', () => {
    it('should return the list of authorized extensions', () => {
      const doc = new EPCISDocument();
      doc.setContext([
        'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
        {
          ext3: 'http://example.com/ext3/',
        },
        {
          ext2: 'http://example.com/ext2/',
        },
        {
          ext1: 'http://example.com/ext1/',
          cbvmda: 'http://example.com/cbvmda/',
        },
      ]);
      const authorizedExtensions = getAuthorizedExtensions(doc);
      expect(authorizedExtensions).to.include('cbvmda');
      expect(authorizedExtensions).to.include('ext1');
      expect(authorizedExtensions).to.include('ext2');
      expect(authorizedExtensions).to.include('ext3');
    });
  });

  describe('checkIfExtensionsAreDefinedInTheContext()', () => {
    it('should return true if all extensions are defined in the context', () => {
      const doc = new EPCISDocument();
      doc.setContext([
        'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
        {
          ext3: 'http://example.com/ext3/',
        },
        {
          ext2: 'http://example.com/ext2/',
        },
        {
          ext1: 'http://example.com/ext1/',
          cbvmda: 'http://example.com/cbvmda/',
        },
      ]);
      const authorizedExtensions = getAuthorizedExtensions(doc);
      expect(checkIfExtensionsAreDefinedInTheContext(['ext1', 'cbvmda', 'ext2', 'ext3'], authorizedExtensions)).to.deep.equal(
        {
          success: true,
          errors: [],
        },
      );
    });

    it('should return true if extensions are defined in the default epcis context', () => {
      const doc = new EPCISDocument();
      doc.setContext([
        'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
        {
          ext: 'http://example.com/ext/',
        },
      ]);
      const authorizedExtensions = getAuthorizedExtensions(doc);
      expect(checkIfExtensionsAreDefinedInTheContext(['ext', 'cbvmda', 'gs1', 'rdfs', 'owl', 'xsd', 'dcterms'], authorizedExtensions)).to.deep.equal(
        {
          success: true,
          errors: [],
        },
      );
    });

    it('should return false if some extensions are not defined in the context', () => {
      const doc = new EPCISDocument();
      doc.setContext([
        'https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld',
        {
          ext3: 'http://example.com/ext3/',
        },
        {
          ext2: 'http://example.com/ext2/',
        },
        {
          ext1: 'http://example.com/ext1/',
          cbvmda: 'http://example.com/cbvmda/',
        },
      ]);
      const authorizedExtensions = getAuthorizedExtensions(doc);
      expect(checkIfExtensionsAreDefinedInTheContext(['ext4'], authorizedExtensions)).to.deep.equal({
        success: false,
        errors: ['Event contains unknown extension: ext4'],
      });
    });
  });

  describe('QuantityElement validation', () => {
    it('should validate the event with a QuantityElement without the quantity field', () => {
      const quantityElement = new QuantityElement();
      quantityElement.setUom('KGM');
      quantityElement.setEpcClass('urn:epc:class:lgtin:4012345.012345.998877');

      const oe = new ObjectEvent();
      oe.setAction(cbv.actionTypes.observe);

      // Add the QuantityElement without the quantity field to the ObjectEvent
      oe.addQuantity(quantityElement);

      expect(oe.isValid()).to.be.equal(true);
    });
  });
});
