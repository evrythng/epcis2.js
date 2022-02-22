/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { expect } from 'chai';
import EPCISMasterData from '../../src/entity/epcis/EPCISMasterData';
import Vocabulary from '../../src/entity/model/Vocabulary';
import EPCISHeader from '../../src/entity/epcis/EPCISHeader';
import { exampleEPCISHeader } from '../data/eventExample';
import Entity from '../../src/entity/Entity';

describe('unit tests for the EPCIS classes in the src/entity/epcis folder', () => {
  describe('EPCISMasterData.js', () => {
    const vocabularyList = exampleEPCISHeader.epcisMasterData.vocabularyList.map(
      (v) => new Vocabulary(v),
    );

    it('setters should set the variables correctly', async () => {
      const e = new EPCISMasterData().addVocabularyList(vocabularyList);

      expect(e.getVocabularyList()).to.deep.equal(
        exampleEPCISHeader.epcisMasterData.vocabularyList,
      );
    });

    it('creation from object should set the variables correctly', async () => {
      const e = new EPCISMasterData(exampleEPCISHeader.epcisMasterData);
      expect(e.toObject()).to.deep.equal(exampleEPCISHeader.epcisMasterData);
    });

    it('should add and remove vocabulary', async () => {
      const e = new EPCISMasterData();
      e.addVocabulary(vocabularyList[0]);
      expect(e.getVocabularyList()[0]).to.deep.equal(vocabularyList[0]);
      e.addVocabulary(vocabularyList[1]);
      expect(e.getVocabularyList()).to.deep.equal([vocabularyList[0], vocabularyList[1]]);
      e.removeVocabulary(vocabularyList[0]);
      expect(e.getVocabularyList()).to.deep.equal([vocabularyList[1]]);
      e.removeVocabulary(vocabularyList[1]);
      expect(e.getVocabularyList()).to.deep.equal([]);
    });

    it('should add and remove a vocabulary List', async () => {
      const e = new EPCISMasterData();
      e.addVocabularyList(vocabularyList);
      expect(e.getVocabularyList()).to.deep.equal(vocabularyList);
      e.removeVocabularyList(vocabularyList);
      expect(e.getVocabularyList()).to.deep.equal([]);
    });

    it('should clear the vocabulary List', async () => {
      const e = new EPCISMasterData();
      e.addVocabularyList(vocabularyList);
      expect(e.getVocabularyList()).to.deep.equal(vocabularyList);
      e.clearVocabularyList();
      expect(e.getVocabularyList()).to.be.equal(undefined);
    });

    it('should not add the vocabulary list to JSON if it is not defined', async () => {
      const e = new EPCISMasterData();
      const json = e.toObject();
      expect(json.vocabularyList).to.be.equal(undefined);
    });
  });

  describe('EPCISHeader.js', () => {
    it('setters should set the variables correctly', async () => {
      const e = new EPCISHeader().setEPCISMasterData(
        new EPCISMasterData(exampleEPCISHeader.epcisMasterData),
      );

      expect(e.getEPCISMasterData()).to.deep.equal(exampleEPCISHeader.epcisMasterData);
    });

    it('creation from object should set the variables correctly', async () => {
      const e = new EPCISHeader(exampleEPCISHeader);
      expect(e.toObject()).to.deep.equal(exampleEPCISHeader);
    });
  });

  describe('Entity.js', () => {
    it("shouldn't instantiate an entity", async () => {
      expect(() => new Entity()).to.throw();
    });
  });
});
