/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

 import { assert, expect } from 'chai';
 import * as sdk from '../src'

describe('All the functions should be well exported', () => {
    it('EPCISDocument', async () => {
      const EpcisDocument = new sdk.EPCISDocument();
      EpcisDocument.setType('test');
      expect(EpcisDocument.getType()).to.be.equal('test');
    });
    it('EPCISMasterData', async () => {
      const EpcisMasterData = new sdk.EPCISMasterData();
      const vocabularyList = [new sdk.Vocabulary,new sdk.Vocabulary]
      EpcisMasterData.addVocabularyList(vocabularyList);
      expect(EpcisMasterData.getVocabularyList().toString()).to.be.equal(vocabularyList.toString());
    });
    it('EPCISHeader', async () => {
      const EpcisHeader = new sdk.EPCISHeader();
      const EpcisMasterData = new sdk.EPCISMasterData();
      EpcisHeader.setEPCISMasterData(EpcisMasterData);
      expect(EpcisHeader.getEPCISMasterData()).to.be.equal(EpcisMasterData);
    });
    it('ObjectEvent', async () => {
      const ov = new sdk.ObjectEvent();
      ov.setRecordTime('test');
      expect(ov.getRecordTime()).to.be.equal('test');
    });
    it('ExtendedEvent', async () => {
      const ov = new sdk.ExtendedEvent();
      ov.setRecordTime('test');
      expect(ov.getRecordTime()).to.be.equal('test');
    });
    it('TransformationEvent', async () => {
      const ov = new sdk.TransformationEvent();
      ov.setRecordTime('test');
      expect(ov.getRecordTime()).to.be.equal('test');
    });
    it('AggregationEvent', async () => {
      const ov = new sdk.AggregationEvent();
      ov.setRecordTime('test');
      expect(ov.getRecordTime()).to.be.equal('test');
    });
    it('AssociationEvent', async () => {
      const ov = new sdk.AssociationEvent();
      ov.setRecordTime('test');
      expect(ov.getRecordTime()).to.be.equal('test');
    });
    it('TransactionEvent', async () => {
      const ov = new sdk.TransactionEvent();
      ov.setRecordTime('test');
      expect(ov.getRecordTime()).to.be.equal('test');
    });
    // it('Event', async () => {
    //   assert.throws(const ov = new sdk.Event());
    //   ov.setRecordTime('test');
    //   expect(ov.getRecordTime()).to.be.equal('test');
    // });


  });