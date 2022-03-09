/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import { dispositions, Ilmd } from '../src';
import ErrorDeclaration from '../src/entity/model/ErrorDeclaration';
import QuantityElement from '../src/entity/model/QuantityElement';
import PersistentDisposition from '../src/entity/model/PersistentDisposition';
import ReadPoint from '../src/entity/model/ReadPoint';
import BizLocation from '../src/entity/model/BizLocation';
import BizTransactionElement from '../src/entity/model/BizTransactionElement';
import SourceElement from '../src/entity/model/SourceElement';
import DestinationElement from '../src/entity/model/DestinationElement';
import Vocabulary from '../src/entity/model/Vocabulary';
import VocabularyElement from '../src/entity/model/VocabularyElement';
import AttributeElement from '../src/entity/model/AttributeElement';
import {
  exampleVocabulary,
  exampleQuantityElement,
  exampleBizTransactionElement,
  exampleSourceElement,
  exampleDestinationElement,
  exampleVocabularyElements,
  exampleIlmd,
} from './data/eventExample';

const anotherDate = '2005-04-03T20:33:31.116-06:00';
const correctiveEventID1 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8';
const correctiveEventID2 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7';
const correctiveEventID3 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a6';
const reason = 'urn:epcglobal:cbv:er:incorrect_data';

describe('unit tests for model Objects', () => {
  describe('ErrorDeclaration.js', () => {
    it('should create a valid ErrorDeclaration object from setters', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration
        .setDeclarationTime(anotherDate)
        .setReason(reason)
        .addCorrectiveEventID(correctiveEventID1)
        .addCorrectiveEventID(correctiveEventID2)
        .addExtension('example:vendorExtension', 'Test1');

      expect(errorDeclaration.getReason()).to.be.equal(reason);
      expect(errorDeclaration.getDeclarationTime()).to.be.equal(anotherDate);
      expect(errorDeclaration.getExtension('example:vendorExtension')).to.be.equal('Test1');
      expect(errorDeclaration.getCorrectiveEventIDs().toString()).to.be.equal(
        [correctiveEventID1, correctiveEventID2].toString(),
      );
    });

    it('should create a valid ErrorDeclaration object from JSON', async () => {
      const exampleErrorDeclaration = {
        declarationTime: anotherDate,
        correctiveEventIDs: [correctiveEventID1, correctiveEventID2, correctiveEventID3],
        reason,
        'example:vendorExtension': 'Test1',
      };

      const errorDeclaration = new ErrorDeclaration(exampleErrorDeclaration);
      expect(errorDeclaration.toObject()).to.deep.equal(exampleErrorDeclaration);
    });

    it('should create a valid declarationTime', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.setDeclarationTime(anotherDate);

      const json = errorDeclaration.toObject();
      expect(json.declarationTime).to.be.equal(anotherDate);
    });

    it('should add and remove correctiveEventIDs', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addCorrectiveEventID(correctiveEventID1);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal(
        [correctiveEventID1].toString(),
      );
      errorDeclaration.addCorrectiveEventID(correctiveEventID2);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal(
        [correctiveEventID1, correctiveEventID2].toString(),
      );
      errorDeclaration.removeCorrectiveEventID(correctiveEventID1);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal(
        [correctiveEventID2].toString(),
      );
      errorDeclaration.removeCorrectiveEventID(correctiveEventID2);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([].toString());
    });

    it('should add a correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID1, correctiveEventID2]);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal(
        [correctiveEventID1, correctiveEventID2].toString(),
      );
      errorDeclaration.removeCorrectiveEventID(correctiveEventID2);
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID2, correctiveEventID3]);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal(
        [correctiveEventID1, correctiveEventID2, correctiveEventID3].toString(),
      );
    });

    it('should remove a correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addCorrectiveEventIDList([
        correctiveEventID1,
        correctiveEventID2,
        correctiveEventID3,
      ]);
      errorDeclaration.removeCorrectiveEventIDList([correctiveEventID1, correctiveEventID2]);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal(
        [correctiveEventID3].toString(),
      );
    });

    it('should clear the correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addCorrectiveEventIDList([
        correctiveEventID1,
        correctiveEventID2,
        correctiveEventID3,
      ]);
      errorDeclaration.clearCorrectiveEventIDList();
      expect(errorDeclaration.correctiveEventIDs).to.be.equal(undefined);
    });

    it('should not add the correctiveEventID list to JSON if it is not defined', async () => {
      const errorDeclaration = new ErrorDeclaration();
      const json = errorDeclaration.toObject();
      expect(json.correctiveEventIDs).to.be.equal(undefined);
    });

    it('should add a custom field', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addExtension('key', 'value');
      expect(errorDeclaration.toObject().key).to.be.equal('value');
    });

    it('should remove a custom field', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addExtension('key', 'value');
      errorDeclaration.setReason(reason);
      errorDeclaration.removeExtension('key');
      expect(errorDeclaration.toObject().toString()).to.be.equal(
        { reason, correctiveEventIDs: [] }.toString(),
      );
    });
  });

  describe('QuantityElement.js', () => {
    it('should create a valid QuantityElement object from setters', async () => {
      const quantityElement = new QuantityElement();
      quantityElement
        .setQuantity(exampleQuantityElement.quantity)
        .setEpcClass(exampleQuantityElement.epcClass)
        .setUom(exampleQuantityElement.uom);

      expect(quantityElement.getQuantity()).to.be.equal(exampleQuantityElement.quantity);
      expect(quantityElement.getUom()).to.be.equal(exampleQuantityElement.uom);
      expect(quantityElement.getEpcClass()).to.be.equal(exampleQuantityElement.epcClass);
    });

    it('should create a valid QuantityElement object from JSON', async () => {
      const quantityElement = new QuantityElement(exampleQuantityElement);
      expect(quantityElement.toObject()).to.deep.equal(exampleQuantityElement);
    });

    it('should add and remove custom fields', async () => {
      const obj = new QuantityElement();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });

  describe('ReadPoint.js', () => {
    it('should create a valid ReadPoint object from setters', async () => {
      const readPoint = new ReadPoint();
      readPoint.setId('id');

      expect(readPoint.getId()).to.be.equal('id');
    });

    it('should create a valid ReadPoint object from JSON', async () => {
      const readPoint = new ReadPoint({ id: 'id' });

      const json = readPoint.toObject();
      expect(json.id).to.be.equal('id');
    });

    it('should add and remove custom fields', async () => {
      const obj = new ReadPoint();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });

  describe('BizLocation.js', () => {
    it('should create a valid BizLocation object from setters', async () => {
      const bizLocation = new BizLocation();
      bizLocation.setId('id');

      expect(bizLocation.getId()).to.be.equal('id');
    });

    it('should create a valid BizLocation object from JSON', async () => {
      const bizLocation = new BizLocation({ id: 'id' });

      const json = bizLocation.toObject();
      expect(json.id).to.be.equal('id');
    });

    it('should add and remove custom fields', async () => {
      const obj = new BizLocation();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });

  describe('BizTransactionElement.js', () => {
    it('should create a valid BizTransactionElement object from setters', async () => {
      const bizTransaction = new BizTransactionElement();
      bizTransaction
        .setType(exampleBizTransactionElement.type)
        .setBizTransaction(exampleBizTransactionElement.bizTransaction);

      expect(bizTransaction.getType()).to.be.equal(exampleBizTransactionElement.type);
      expect(bizTransaction.getBizTransaction()).to.be.equal(
        exampleBizTransactionElement.bizTransaction,
      );
    });

    it('should create a valid BizTransactionElement object from JSON', async () => {
      const bizTransaction = new BizTransactionElement(exampleBizTransactionElement);

      const json = bizTransaction.toObject();
      expect(json.type).to.be.equal(exampleBizTransactionElement.type);
      expect(json.bizTransaction).to.be.equal(exampleBizTransactionElement.bizTransaction);
    });

    it('should add and remove custom fields', async () => {
      const obj = new BizTransactionElement();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });

  describe('SourceElement.js', () => {
    it('should create a valid SourceElement object from setters', async () => {
      const sourceElement = new SourceElement();
      sourceElement.setType(exampleSourceElement.type).setSource(exampleSourceElement.source);

      expect(sourceElement.getType()).to.be.equal(exampleSourceElement.type);
      expect(sourceElement.getSource()).to.be.equal(exampleSourceElement.source);
    });

    it('should create a valid SourceElement object from JSON', async () => {
      const sourceElement = new SourceElement(exampleSourceElement);

      const json = sourceElement.toObject();
      expect(json.type).to.be.equal(exampleSourceElement.type);
      expect(json.source).to.be.equal(exampleSourceElement.source);
    });

    it('should not add and remove custom fields', async () => {
      const obj = new SourceElement();
      assert.throws(() => obj.addExtension('key', 'value'));
      expect(obj.toObject().key).to.be.equal(undefined);
      assert.throws(() => obj.removeExtension('key'));
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });

  describe('DestinationElement.js', () => {
    it('should create a valid DestinationElement object from setters', async () => {
      const destinationElement = new DestinationElement();
      destinationElement
        .setType(exampleDestinationElement.type)
        .setDestination(exampleDestinationElement.destination);

      expect(destinationElement.getType()).to.be.equal(exampleDestinationElement.type);
      expect(destinationElement.getDestination()).to.be.equal(
        exampleDestinationElement.destination,
      );
    });

    it('should create a valid DestinationElement object from JSON', async () => {
      const destinationElement = new DestinationElement(exampleDestinationElement);

      const json = destinationElement.toObject();
      expect(json.type).to.be.equal(exampleDestinationElement.type);
      expect(json.destination).to.be.equal(exampleDestinationElement.destination);
    });

    it('should not add and remove custom fields', async () => {
      const obj = new DestinationElement();
      assert.throws(() => obj.addExtension('key', 'value'));
      expect(obj.toObject().key).to.be.equal(undefined);
      assert.throws(() => obj.removeExtension('key'));
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });

  describe('PersistentDisposition.js', () => {
    const set = [dispositions.active, dispositions.unavailable];
    const unset = [dispositions.completeness_inferred, dispositions.unknown];

    it('should create a valid PersistentDisposition object from JSON', async () => {
      const persistentDispositionJSON = {
        set,
        unset,
      };

      const persistentDisposition = new PersistentDisposition(persistentDispositionJSON);

      expect(persistentDisposition.getSet().toString()).to.be.equal(
        persistentDispositionJSON.set.toString(),
      );
      expect(persistentDisposition.getUnset().toString()).to.be.equal(
        persistentDispositionJSON.unset.toString(),
      );
    });

    it('should add and remove set', async () => {
      const persistentDisposition = new PersistentDisposition();
      persistentDisposition.addSet(set[0]);
      expect(persistentDisposition.set.toString()).to.be.equal([set[0]].toString());
      persistentDisposition.addSet(set[1]);
      expect(persistentDisposition.set.toString()).to.be.equal([set[0], set[1]].toString());
      persistentDisposition.removeSet(set[0]);
      expect(persistentDisposition.set.toString()).to.be.equal([set[1]].toString());
      persistentDisposition.removeSet(set[1]);
      expect(persistentDisposition.set.toString()).to.be.equal([].toString());
    });

    it('should add and remove a set List', async () => {
      const persistentDisposition = new PersistentDisposition();
      persistentDisposition.addSetList(set);
      expect(persistentDisposition.set.toString()).to.be.equal(set.toString());
      persistentDisposition.removeSetList(set);
      expect(persistentDisposition.set.toString()).to.be.equal([].toString());
    });

    it('should clear the set List', async () => {
      const persistentDisposition = new PersistentDisposition();
      persistentDisposition.addSetList(set);
      expect(persistentDisposition.set.toString()).to.be.equal(set.toString());
      persistentDisposition.clearSetList();
      expect(persistentDisposition.set).to.be.equal(undefined);
    });

    it('should not add the set list to JSON if it is not defined', async () => {
      const persistentDisposition = new PersistentDisposition();
      const json = persistentDisposition.toObject();
      expect(json.set).to.be.equal(undefined);
    });

    it('should add and remove unset', async () => {
      const persistentDisposition = new PersistentDisposition();
      persistentDisposition.addUnset(unset[0]);
      expect(persistentDisposition.unset.toString()).to.be.equal([unset[0]].toString());
      persistentDisposition.addUnset(unset[1]);
      expect(persistentDisposition.unset.toString()).to.be.equal([unset[0], unset[1]].toString());
      persistentDisposition.removeUnset(unset[0]);
      expect(persistentDisposition.unset.toString()).to.be.equal([unset[1]].toString());
      persistentDisposition.removeUnset(unset[1]);
      expect(persistentDisposition.unset.toString()).to.be.equal([].toString());
    });

    it('should add and remove an unset List', async () => {
      const persistentDisposition = new PersistentDisposition();
      persistentDisposition.addUnsetList(unset);
      expect(persistentDisposition.unset.toString()).to.be.equal(unset.toString());
      persistentDisposition.removeUnsetList(unset);
      expect(persistentDisposition.unset.toString()).to.be.equal([].toString());
    });

    it('should clear the unset List', async () => {
      const persistentDisposition = new PersistentDisposition();
      persistentDisposition.addUnsetList(unset);
      expect(persistentDisposition.unset.toString()).to.be.equal(unset.toString());
      persistentDisposition.clearUnsetList();
      expect(persistentDisposition.unset).to.be.equal(undefined);
    });

    it('should not add the unset list to JSON if it is not defined', async () => {
      const persistentDisposition = new PersistentDisposition();
      const json = persistentDisposition.toObject();
      expect(json.unset).to.be.equal(undefined);
    });

    it('should add and remove custom fields', async () => {
      const obj = new PersistentDisposition();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });

  describe('Vocabulary.js', () => {
    const vocabularyElement = exampleVocabularyElements.map((ve) => new VocabularyElement(ve));

    it('should create a valid Vocabulary object from setters', async () => {
      const vocabulary = new Vocabulary();
      vocabulary
        .setType(exampleVocabulary.type)
        .addVocabularyElementList(exampleVocabulary.vocabularyElementList);

      expect(vocabulary.getType()).to.be.equal(exampleVocabulary.type);
      expect(vocabulary.getVocabularyElementList().length).to.be.equal(
        exampleVocabulary.vocabularyElementList.length,
      );
    });

    it('should create a valid Vocabulary object from JSON', async () => {
      const vocabulary = new Vocabulary(exampleVocabulary);

      expect(vocabulary.getVocabularyElementList()[0]).to.be.instanceof(VocabularyElement);
      expect(vocabulary.toObject()).to.deep.equal(exampleVocabulary);
    });

    it('should add and remove vocabulary element', async () => {
      const vocabulary = new Vocabulary();
      vocabulary.addVocabularyElement(vocabularyElement[0]);
      expect(vocabulary.getVocabularyElementList()).to.deep.equal([vocabularyElement[0]]);
      vocabulary.addVocabularyElement(vocabularyElement[1]);
      expect(vocabulary.getVocabularyElementList()).to.deep.equal([
        vocabularyElement[0],
        vocabularyElement[1],
      ]);
      vocabulary.removeVocabularyElement(vocabularyElement[0]);
      expect(vocabulary.getVocabularyElementList()).to.deep.equal([vocabularyElement[1]]);
      vocabulary.removeVocabularyElement(vocabularyElement[1]);
      expect(vocabulary.getVocabularyElementList()).to.deep.equal([]);
    });

    it('should add and remove a vocabulary element list', async () => {
      const vocabulary = new Vocabulary();
      vocabulary.addVocabularyElementList(vocabularyElement);
      expect(vocabulary.toObject().vocabularyElementList).to.deep.equal(vocabularyElement);
      vocabulary.removeVocabularyElementList(vocabularyElement);
      expect(vocabulary.toObject().vocabularyElementList).to.deep.equal([]);
    });

    it('should clear the vocabulary element list', async () => {
      const vocabulary = new Vocabulary();
      vocabulary.addVocabularyElementList(vocabularyElement);
      expect(vocabulary.toObject().vocabularyElementList).to.deep.equal(vocabularyElement);
      vocabulary.clearVocabularyElementList();
      expect(vocabulary.toObject().vocabularyElementList).to.be.equal(undefined);
    });

    it('should not add the vocabulary element list to JSON if it is not defined', async () => {
      const vocabulary = new Vocabulary();
      const json = vocabulary.toObject();
      expect(json.vocabularyElementList).to.be.equal(undefined);
    });
  });

  describe('VocabularyElement.js', () => {
    const attributeList = [
      new AttributeElement(exampleVocabulary.vocabularyElementList[2].attributes[0]),
      new AttributeElement(exampleVocabulary.vocabularyElementList[2].attributes[1]),
      new AttributeElement(exampleVocabulary.vocabularyElementList[2].attributes[2]),
    ];
    const { children } = exampleVocabulary.vocabularyElementList[2];

    it('should create a valid VocabularyElement object from setters', async () => {
      const vocabularyE = new VocabularyElement();
      vocabularyE
        .setId(exampleVocabulary.vocabularyElementList[2].id)
        .addChildList(children)
        .addAttributeList(attributeList);

      expect(vocabularyE.getId()).to.be.equal(exampleVocabulary.vocabularyElementList[2].id);
      expect(vocabularyE.getChildren().length).to.be.equal(
        exampleVocabulary.vocabularyElementList[2].children.length,
      );
      expect(vocabularyE.getAttributes().length).to.be.equal(
        exampleVocabulary.vocabularyElementList[2].attributes.length,
      );
    });

    it('should create a valid VocabularyElement object from JSON', async () => {
      const vocabularyElement = new VocabularyElement(exampleVocabularyElements[2]);

      expect(vocabularyElement.getAttributes()[0]).to.be.instanceof(AttributeElement);
      expect(vocabularyElement.toObject()).to.deep.equal(exampleVocabularyElements[2]);
    });

    it('should add and remove attribute', async () => {
      const vocabularyElement = new VocabularyElement();
      vocabularyElement.addAttribute(attributeList[0]);
      expect(vocabularyElement.getAttributes()[0]).to.deep.equal(attributeList[0]);
      vocabularyElement.addAttribute(attributeList[1]);
      expect(vocabularyElement.getAttributes()).to.deep.equal([attributeList[0], attributeList[1]]);
      vocabularyElement.removeAttribute(attributeList[0]);
      expect(vocabularyElement.getAttributes()).to.deep.equal([attributeList[1]]);
      vocabularyElement.removeAttribute(attributeList[1]);
      expect(vocabularyElement.getAttributes()).to.deep.equal([]);
    });

    it('should add and remove an attribute List', async () => {
      const vocabularyElement = new VocabularyElement();
      vocabularyElement.addAttributeList(attributeList);
      expect(vocabularyElement.getAttributes()).to.deep.equal(attributeList);
      vocabularyElement.removeAttributeList(attributeList);
      expect(vocabularyElement.getAttributes()).to.deep.equal([]);
    });

    it('should clear the attribute List', async () => {
      const vocabularyElement = new VocabularyElement();
      vocabularyElement.addAttributeList(attributeList);
      expect(vocabularyElement.getAttributes()).to.deep.equal(attributeList);
      vocabularyElement.clearAttributeList();
      expect(vocabularyElement.getAttributes()).to.be.equal(undefined);
    });

    it('should not add the attributes list to JSON if it is not defined', async () => {
      const vocabularyElement = new VocabularyElement();
      const json = vocabularyElement.toObject();
      expect(json.attributes).to.be.equal(undefined);
    });

    it('should add and remove child', async () => {
      const vocabularyElement = new VocabularyElement();
      vocabularyElement.addChild(children[0]);
      expect(vocabularyElement.getChildren()[0]).to.deep.equal(children[0]);
      vocabularyElement.addChild(children[1]);
      expect(vocabularyElement.getChildren()).to.deep.equal([children[0], children[1]]);
      vocabularyElement.removeChild(children[0]);
      expect(vocabularyElement.getChildren()).to.deep.equal([children[1]]);
      vocabularyElement.removeChild(children[1]);
      expect(vocabularyElement.getChildren()).to.deep.equal([]);
    });

    it('should add and remove a child List', async () => {
      const vocabularyElement = new VocabularyElement();
      vocabularyElement.addChildList(children);
      expect(vocabularyElement.getChildren()).to.deep.equal(children);
      vocabularyElement.removeChildList(children);
      expect(vocabularyElement.getChildren()).to.deep.equal([]);
    });

    it('should clear the child List', async () => {
      const vocabularyElement = new VocabularyElement();
      vocabularyElement.addChildList(children);
      expect(vocabularyElement.getChildren()).to.deep.equal(children);
      vocabularyElement.clearChildren();
      expect(vocabularyElement.getChildren()).to.be.equal(undefined);
    });

    it('should not add the child list to JSON if it is not defined', async () => {
      const vocabularyElement = new VocabularyElement();
      const json = vocabularyElement.toObject();
      expect(json.children).to.be.equal(undefined);
    });
  });

  describe('AttributeElement.js', () => {
    const exampleAttribute = new AttributeElement(
      exampleVocabulary.vocabularyElementList[2].attributes[0],
    );

    it('should create a valid AttributeElement object from setters', async () => {
      const attributeElement = new AttributeElement();
      attributeElement.setId(exampleAttribute.id).setAttribute(exampleAttribute.attribute);

      expect(attributeElement.getId()).to.be.equal(exampleAttribute.id);
      expect(attributeElement.getAttribute()).to.be.equal(exampleAttribute.attribute);
    });

    it('should create a valid AttributeElement object from JSON', async () => {
      const attributeElement = new AttributeElement(exampleAttribute);
      expect(attributeElement.toObject()).to.deep.equal(exampleAttribute);
    });
  });

  describe('Ilmd.js', () => {
    it('should create a valid AttributeElement object from setters', async () => {
      const ilmd = new Ilmd();
      ilmd.setType(exampleIlmd.type).setFormat(exampleIlmd.format);

      expect(ilmd.getType()).to.be.equal(exampleIlmd.type);
      expect(ilmd.getFormat()).to.be.equal(exampleIlmd.format);
    });

    it('should create a valid AttributeElement object from JSON', async () => {
      const ilmd = new Ilmd(exampleIlmd);
      expect(ilmd.toObject()).to.deep.equal(exampleIlmd);
    });
  });
});
