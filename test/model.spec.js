import { expect } from 'chai';
import { dispositions } from '../src';
import ErrorDeclaration from '../src/entity/model/ErrorDeclaration';
import QuantityElement from '../src/entity/model/QuantityElement';
import PersistentDisposition from '../src/entity/model/PersistentDisposition';
import ReadPoint from '../src/entity/model/ReadPoint';
import BizLocation from '../src/entity/model/BizLocation';
import BizTransactionElement from '../src/entity/model/BizTransactionElement';
import SourceElement from '../src/entity/model/SourceElement';
import DestinationElement from '../src/entity/model/DestinationElement';

const anotherDate = '2005-04-03T20:33:31.116-06:00';
const correctiveEventID1 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8';
const correctiveEventID2 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7';
const correctiveEventID3 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a6';
const reason = 'urn:epcglobal:cbv:er:incorrect_data';

const JSONQuantityElement = {
  epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
  quantity: 200,
  uom: 'KGM',
};
const JSONBizTransactionElement = {
  type: 'urn:epcglobal:cbv:btt:po',
  bizTransaction: 'http://transaction.acme.com/po/12345678',
};
const JSONSourceElement = {
  type: 'urn:epcglobal:cbv:sdt:owning_party',
  source: 'urn:epc:id:pgln:9520001.11111',
};
const JSONDestinationElement = {
  type: 'urn:epcglobal:cbv:sdt:owning_party',
  destination: 'urn:epc:id:pgln:9520999.99999',
};

describe('unit tests for model Objects', () => {
  describe('ErrorDeclaration.js', () => {
    it('should create a valid ErrorDeclaration object from setters', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration
        .setDeclarationTime(anotherDate)
        .setReason(reason)
        .addCorrectiveEventID(correctiveEventID1)
        .addCorrectiveEventID(correctiveEventID2);

      expect(errorDeclaration.getReason()).to.be.equal(reason);
      expect(errorDeclaration.getDeclarationTime()).to.be.equal(anotherDate);
      expect(errorDeclaration.getCorrectiveEventIDs().toString()).to.be
        .equal([correctiveEventID1, correctiveEventID2].toString());
    });
    it('should create a valid ErrorDeclaration object from JSON', async () => {
      const errorDeclarationJSON = {
        declarationTime: anotherDate,
        correctiveEventIDs: [correctiveEventID1, correctiveEventID2, correctiveEventID3],
        reason,
      };

      const errorDeclaration = new ErrorDeclaration(errorDeclarationJSON);

      const json = errorDeclaration.toObject();
      expect(json.reason).to.be.equal(reason);
      expect(json.declarationTime).to.be.equal(anotherDate);
      expect(json.correctiveEventIDs.toString()).to.be
        .equal([correctiveEventID1, correctiveEventID2, correctiveEventID3].toString());
    });
    it('should create a valid declarationTime', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration
        .setDeclarationTime(anotherDate);

      const json = errorDeclaration.toObject();
      expect(json.declarationTime).to.be.equal(anotherDate);
    });
    it('should add and remove correctiveEventIDs', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addCorrectiveEventID(correctiveEventID1);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be
        .equal([correctiveEventID1].toString());
      errorDeclaration.addCorrectiveEventID(correctiveEventID2);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be
        .equal([correctiveEventID1, correctiveEventID2].toString());
      errorDeclaration.removeCorrectiveEventID(correctiveEventID1);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be
        .equal([correctiveEventID2].toString());
      errorDeclaration.removeCorrectiveEventID(correctiveEventID2);
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be
        .equal([].toString());
    });
    it('should add a correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addCorrectiveEventIDList(
        [correctiveEventID1, correctiveEventID2],
      );
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be
        .equal([correctiveEventID1, correctiveEventID2].toString());
      errorDeclaration.removeCorrectiveEventID(correctiveEventID2);
      errorDeclaration.addCorrectiveEventIDList(
        [correctiveEventID2, correctiveEventID3],
      );
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be
        .equal([correctiveEventID1, correctiveEventID2, correctiveEventID3].toString());
    });
    it('should remove a correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addCorrectiveEventIDList(
        [correctiveEventID1, correctiveEventID2, correctiveEventID3],
      );
      errorDeclaration.removeCorrectiveEventIDList(
        [correctiveEventID1, correctiveEventID2],
      );
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be
        .equal([correctiveEventID3].toString());
    });
    it('should clear the correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addCorrectiveEventIDList(
        [correctiveEventID1, correctiveEventID2, correctiveEventID3],
      );
      errorDeclaration.clearCorrectiveEventIDList();
      expect(errorDeclaration.correctiveEventIDs).to.be.equal(undefined);
    });
    it('should not add the correctiveEventID list to JSON if it is not defined',
      async () => {
        const errorDeclaration = new ErrorDeclaration();
        const json = errorDeclaration.toObject();
        expect(json.correctiveEventIDs).to.be.equal(undefined);
      });
    it('should add a custom field', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addExtension('key', 'value');
      expect(errorDeclaration.toObject().key).to.be.equal(('value'));
    });
    it('should remove a custom field', async () => {
      const errorDeclaration = new ErrorDeclaration();
      errorDeclaration.addExtension('key', 'value');
      errorDeclaration.setReason(reason);
      errorDeclaration.removeExtension('key');
      expect(errorDeclaration.toObject().toString()).to.be
        .equal({ reason, correctiveEventIDs: [] }.toString());
    });
  });
  describe('QuantityElement.js', () => {
    it('should create a valid QuantityElement object from setters', async () => {
      const quantityElement = new QuantityElement();
      quantityElement
        .setQuantity(JSONQuantityElement.quantity)
        .setEpcClass(JSONQuantityElement.epcClass)
        .setUom(JSONQuantityElement.uom);

      expect(quantityElement.getQuantity()).to.be.equal(JSONQuantityElement.quantity);
      expect(quantityElement.getUom()).to.be.equal(JSONQuantityElement.uom);
      expect(quantityElement.getEpcClass()).to.be.equal(JSONQuantityElement.epcClass);
    });
    it('should create a valid QuantityElement object from JSON', async () => {
      const quantityElement = new QuantityElement(JSONQuantityElement);

      const json = quantityElement.toObject();
      expect(json.quantity).to.be.equal(JSONQuantityElement.quantity);
      expect(json.uom).to.be.equal(JSONQuantityElement.uom);
      expect(json.epcClass).to.be.equal(JSONQuantityElement.epcClass);
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
      readPoint
        .setId('id');

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
      bizLocation
        .setId('id');

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
        .setType(JSONBizTransactionElement.type)
        .setBizTransaction(JSONBizTransactionElement.bizTransaction);

      expect(bizTransaction.getType()).to.be.equal(JSONBizTransactionElement.type);
      expect(bizTransaction.getBizTransaction()).to.be
        .equal(JSONBizTransactionElement.bizTransaction);
    });
    it('should create a valid BizTransactionElement object from JSON', async () => {
      const bizTransaction = new BizTransactionElement(JSONBizTransactionElement);

      const json = bizTransaction.toObject();
      expect(json.type).to.be.equal(JSONBizTransactionElement.type);
      expect(json.bizTransaction).to.be.equal(JSONBizTransactionElement.bizTransaction);
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
      sourceElement
        .setType(JSONSourceElement.type)
        .setSource(JSONSourceElement.source);

      expect(sourceElement.getType()).to.be.equal(JSONSourceElement.type);
      expect(sourceElement.getSource()).to.be.equal(JSONSourceElement.source);
    });
    it('should create a valid SourceElement object from JSON', async () => {
      const sourceElement = new SourceElement(JSONSourceElement);

      const json = sourceElement.toObject();
      expect(json.type).to.be.equal(JSONSourceElement.type);
      expect(json.source).to.be.equal(JSONSourceElement.source);
    });
    it('should add and remove custom fields', async () => {
      const obj = new SourceElement();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });
  describe('DestinationElement.js', () => {
    it('should create a valid DestinationElement object from setters', async () => {
      const destinationElement = new DestinationElement();
      destinationElement
        .setType(JSONDestinationElement.type)
        .setDestination(JSONDestinationElement.destination);

      expect(destinationElement.getType()).to.be.equal(JSONDestinationElement.type);
      expect(destinationElement.getDestination()).to.be.equal(JSONDestinationElement.destination);
    });
    it('should create a valid DestinationElement object from JSON', async () => {
      const destinationElement = new DestinationElement(JSONDestinationElement);

      const json = destinationElement.toObject();
      expect(json.type).to.be.equal(JSONDestinationElement.type);
      expect(json.destination).to.be.equal(JSONDestinationElement.destination);
    });
    it('should add and remove custom fields', async () => {
      const obj = new DestinationElement();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
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

      expect(persistentDisposition.getSet().toString()).to.be
        .equal(persistentDispositionJSON.set.toString());
      expect(persistentDisposition.getUnset().toString()).to.be
        .equal(persistentDispositionJSON.unset.toString());
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
    it('should not add the correctiveEventID list to JSON if it is not defined',
      async () => {
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
    it('should not add the correctiveEventID list to JSON if it is not defined',
      async () => {
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
});
