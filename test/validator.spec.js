/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert } from 'chai';
import {
  actionTypes, bizSteps, dispositions, ObjectEvent, validateSchema,
} from '../src';
import EPCISDocumentObjectEvent from './data/EPCISDocument-ObjectEvent.json';
import EPCISDocumentAggregationEvent from './data/EPCISDocument-AggregationEvent.json';
import EPCISDocumentTransformationEvent from './data/EPCISDocument-TransformationEvent.json';
import EPCISDocumentAssociationEvent from './data/EPCISDocument-AssociationEvent.json';
import EPCISDocumentQueryDocument from './data/EPCISQueryDocument.json';
import EPCISDocumentMasterDataDocument from './data/EPCISMasterDataDocument.json';
import EPCISDocument from '../src/entity/epcis/EPCISDocument';
import BizTransactionElement from '../src/entity/model/BizTransactionElement';

/** Test documents with different event types inside */
const testData = {
  invalid: { foo: 'bar' },
  ObjectEvent: EPCISDocumentObjectEvent,
  AggregationEvent: EPCISDocumentAggregationEvent,
  TransformationEvent: EPCISDocumentTransformationEvent,
  AssociationEvent: EPCISDocumentAssociationEvent,
  QueryDocument: EPCISDocumentQueryDocument,
  MasterDataDocument: EPCISDocumentMasterDataDocument,
};

describe('validation of an EPCIS document', () => {
  describe('schema validation: valid', () => {
    it('should accept a valid EPCISDocument containing ObjectEvent', () => {
      assert.doesNotThrow(() => validateSchema(testData.ObjectEvent));
    });

    it('should accept a valid EPCISDocument containing ObjectEvent (2)', () => {
      const epcisDocument = new EPCISDocument();
      const objectEvent = new ObjectEvent();
      const bizTransaction = new BizTransactionElement({
        type: 'urn:epcglobal:cbv:btt:po',
        bizTransaction: 'http://transaction.acme.com/po/12345678',
      });

      objectEvent
        .setEventTime('2005-04-03T20:33:31.116-06:00')
        .addEPC('urn:epc:id:sgtin:0614141.107346.2020')
        .addEPC('urn:epc:id:sgtin:0614141.107346.2021')
        .setAction(actionTypes.observe)
        .setEventID('ni:///sha-256;87b5f18a69993f0052046d4687dfacdf48f?ver=CBV2.0')
        .setBizStep(bizSteps.shipping)
        .setDisposition(dispositions.in_transit)
        .setReadPoint('urn:epc:id:sgln:0614141.07346.1234')
        .addBizTransaction(bizTransaction);

      epcisDocument
        .setCreationDate('2005-07-11T11:30:47+00:00')
        .setFormat('application/ld+json')
        .addEvent(objectEvent);

      assert.doesNotThrow(() => epcisDocument.isValid());
    });

    it('should accept a valid EPCISDocument containing AggregationEvent', () => {
      assert.doesNotThrow(() => validateSchema(testData.AggregationEvent));
    });

    it('should accept a valid EPCISDocument containing TransactionEvent');

    it('should accept a valid EPCISDocument containing TransformationEvent', () => {
      assert.doesNotThrow(() => validateSchema(testData.TransformationEvent));
    });

    it('should accept a valid EPCISDocument containing AssociationEvent', () => {
      assert.doesNotThrow(() => validateSchema(testData.AssociationEvent));
    });

    it('should accept a valid EPCISQueryDocument', () => {
      assert.doesNotThrow(() => validateSchema(testData.QueryDocument));
    });

    it('should accept a valid EPCISMasterDataDocument', () => {
      assert.doesNotThrow(() => validateSchema(testData.MasterDataDocument));
    });

    // Not currently fully defined at the vocabulary level
    // See: https://github.com/gs1/EPCIS/blob/master/REST%20Bindings/openapi.yaml#L3842
    it('should accept a valid EPCISMasterDataDocument and validate the vocabulary');
  });

  describe('schema validation: invalid', () => {
    it('should reject an invalid object', () => {
      assert.throws(() => validateSchema(testData.invalid));
    });

    it('should reject an invalid EPCISDocument', () => {
      const copy = { ...testData.ObjectEvent };

      // Omit the events
      const { epcisBody, ...instance } = copy;

      assert.throws(() => validateSchema(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid ObjectEvent', () => {
      const instance = { ...testData.ObjectEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].action = 'OBSERVED';

      assert.throws(() => validateSchema(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid AggregationEvent', () => {
      const instance = { ...testData.AggregationEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].parentID = 'somebadid';

      assert.throws(() => validateSchema(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid TransactionEvent');

    it('should reject a valid EPCISDocument containing an invalid TransformationEvent', () => {
      const instance = { ...testData.TransformationEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].eventTimeZoneOffset = '19:00';

      assert.throws(() => validateSchema(instance));
    });

    it('should reject a valid EPCISDocument containing an invalid AssociationEvent', () => {
      const instance = { ...testData.AssociationEvent };

      // Introduce some error
      instance.epcisBody.eventList[0].action = 'ADDED';

      assert.throws(() => validateSchema(instance));
    });

    it('should reject an invalid EPCISQueryDocument', () => {
      const copy = { ...testData.QueryDocument };

      // Omit the query results
      const instance = {
        ...copy,
        epcisBody: {},
      };

      assert.throws(() => validateSchema(instance));
    });

    it('should reject an invalid EPCISMasterDataDocument', () => {
      const copy = { ...testData.MasterDataDocument };

      // Omit the header
      const { epcisHeader, ...instance } = copy;

      assert.throws(() => validateSchema(instance));
    });

    // See 'should accept a valid EPCISMasterDataDocument and validate the vocabulary'
    // equivalent test for details
    it('should reject a valid EPCISMasterDataDocument containing invalid vocabulary');
  });
});
