import { expect } from 'chai'
import { dispositions } from '../src/cbv/cbv'
import ErrorDeclaration from '../src/entity/model/ErrorDeclaration'
import QuantityElement from '../src/entity/model/QuantityElement'
import PersistentDisposition from '../src/entity/model/PersistentDisposition'
import ReadPoint from '../src/entity/model/ReadPoint'
import BizLocation from '../src/entity/model/BizLocation'
import BizTransactionElement from '../src/entity/model/BizTransactionElement'

const anotherDate = '2005-04-03T20:33:31.116-06:00'
const correctiveEventID1 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'
const correctiveEventID2 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7'
const correctiveEventID3 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a6'
const reason = 'urn:epcglobal:cbv:er:incorrect_data'

const JSONQuantityElement = { epcClass: 'urn:epc:class:lgtin:4012345.012345.998877', quantity: 200, uom: 'KGM' }
const JSONBizTransaction = {
  type: 'urn:epcglobal:cbv:btt:po',
  bizTransaction: 'http://transaction.acme.com/po/12345678'
}

describe('unit tests for model Objects', () => {
  describe('ErrorDeclaration.js', () => {
    it('should create a valid ErrorDeclaration object from setters', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration
        .setDeclarationTime(anotherDate)
        .setReason(reason)
        .addCorrectiveEventID(correctiveEventID1)
        .addCorrectiveEventID(correctiveEventID2)

      const json = errorDeclaration.toJSON()
      expect(json.reason).to.be.equal(reason)
      expect(json.declarationTime).to.be.equal(anotherDate)
      expect(json.correctiveEventIDs.toString()).to.be.equal([correctiveEventID1, correctiveEventID2].toString())
    })
    it('should create a valid ErrorDeclaration object from JSON', async () => {
      const errorDeclarationJSON = {
        declarationTime: anotherDate,
        correctiveEventIDs: [correctiveEventID1, correctiveEventID2, correctiveEventID3],
        reason: reason
      }

      const errorDeclaration = new ErrorDeclaration(errorDeclarationJSON)

      const json = errorDeclaration.toJSON()
      expect(json.reason).to.be.equal(reason)
      expect(json.declarationTime).to.be.equal(anotherDate)
      expect(json.correctiveEventIDs.toString()).to.be.equal([correctiveEventID1, correctiveEventID2, correctiveEventID3].toString())
    })
    it('should create a valid declarationTime', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration
        .setDeclarationTime(anotherDate)

      const json = errorDeclaration.toJSON()
      expect(json.declarationTime).to.be.equal(anotherDate)
    })
    it('should add and remove correctiveEventIDs', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCorrectiveEventID(correctiveEventID1)
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([correctiveEventID1].toString())
      errorDeclaration.addCorrectiveEventID(correctiveEventID2)
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([correctiveEventID1, correctiveEventID2].toString())
      errorDeclaration.removeCorrectiveEventID(correctiveEventID1)
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([correctiveEventID2].toString())
      errorDeclaration.removeCorrectiveEventID(correctiveEventID2)
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([].toString())
    })
    it('should add a correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID1, correctiveEventID2])
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([correctiveEventID1, correctiveEventID2].toString())
      errorDeclaration.removeCorrectiveEventID(correctiveEventID2)
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID2, correctiveEventID3])
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([correctiveEventID1, correctiveEventID2, correctiveEventID3].toString())
    })
    it('should remove a correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID1, correctiveEventID2, correctiveEventID3])
      errorDeclaration.removeCorrectiveEventIDList([correctiveEventID1, correctiveEventID2])
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([correctiveEventID3].toString())
    })
    it('should clear the correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID1, correctiveEventID2, correctiveEventID3])
      errorDeclaration.clearCorrectiveEventIDList()
      expect(errorDeclaration.correctiveEventIDs).to.be.equal(undefined)
    })
    it('should not add the correctiveEventID list to JSON if it is not defined', async () => {
      const errorDeclaration = new ErrorDeclaration()
      const json = errorDeclaration.toJSON()
      expect(json.correctiveEventIDs).to.be.equal(undefined)
    })
    it('should add a custom field', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCustomField('key', 'value')
      expect(errorDeclaration.toJSON().key).to.be.equal(('value'))
    })
    it('should remove a custom field', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCustomField('key', 'value')
      errorDeclaration.setReason(reason)
      errorDeclaration.removeCustomField('key', 'value')
      expect(errorDeclaration.toJSON().toString()).to.be.equal({ reason: reason, correctiveEventIDs: [] }.toString())
    })
  })
  describe('QuantityElement.js', () => {
    it('should create a valid QuantityElement object from setters', async () => {
      const quantityElement = new QuantityElement()
      quantityElement
        .setQuantity(JSONQuantityElement.quantity)
        .setEpcClass(JSONQuantityElement.epcClass)
        .setUom(JSONQuantityElement.uom)

      const json = quantityElement.toJSON()
      expect(json.quantity).to.be.equal(JSONQuantityElement.quantity)
      expect(json.uom).to.be.equal(JSONQuantityElement.uom)
      expect(json.epcClass).to.be.equal(JSONQuantityElement.epcClass)
    })
    it('should create a valid QuantityElement object from JSON', async () => {
      const quantityElement = new QuantityElement(JSONQuantityElement)

      const json = quantityElement.toJSON()
      expect(json.quantity).to.be.equal(JSONQuantityElement.quantity)
      expect(json.uom).to.be.equal(JSONQuantityElement.uom)
      expect(json.epcClass).to.be.equal(JSONQuantityElement.epcClass)
    })
  })
  describe('ReadPoint.js', () => {
    it('should create a valid ReadPoint object from setters', async () => {
      const readPoint = new ReadPoint()
      readPoint
        .setId('id')

      const json = readPoint.toJSON()
      expect(json.id).to.be.equal('id')
    })
    it('should create a valid ReadPoint object from JSON', async () => {
      const readPoint = new ReadPoint({ id: 'id' })

      const json = readPoint.toJSON()
      expect(json.id).to.be.equal('id')
    })
  })
  describe('BizLocation.js', () => {
    it('should create a valid BizLocation object from setters', async () => {
      const bizLocation = new BizLocation()
      bizLocation
        .setId('id')

      const json = bizLocation.toJSON()
      expect(json.id).to.be.equal('id')
    })
    it('should create a valid BizLocation object from JSON', async () => {
      const bizLocation = new BizLocation({ id: 'id' })

      const json = bizLocation.toJSON()
      expect(json.id).to.be.equal('id')
    })
  })
  describe('BizTransactionElement.js', () => {
    it('should create a valid BizTransactionElement object from setters', async () => {
      const bizTransaction = new BizTransactionElement()
      bizTransaction
        .setType(JSONBizTransaction.type)
        .setBizTransaction(JSONBizTransaction.bizTransaction)

      const json = bizTransaction.toJSON()
      expect(json.type).to.be.equal(JSONBizTransaction.type)
      expect(json.bizTransaction).to.be.equal(JSONBizTransaction.bizTransaction)
    })
    it('should create a valid BizTransactionElement object from JSON', async () => {
      const bizTransaction = new BizTransactionElement(JSONBizTransaction)

      const json = bizTransaction.toJSON()
      expect(json.type).to.be.equal(JSONBizTransaction.type)
      expect(json.bizTransaction).to.be.equal(JSONBizTransaction.bizTransaction)
    })
  })
  describe('PersistentDisposition.js', () => {
    const set = [dispositions.active, dispositions.unavailable]
    const unset = [dispositions.completeness_inferred, dispositions.unknown]

    it('should create a valid PersistentDisposition object from JSON', async () => {
      const persistentDispositionJSON = {
        set: set,
        unset: unset
      }

      const persistentDisposition = new PersistentDisposition(persistentDispositionJSON)

      const json = persistentDisposition.toJSON()
      expect(json.set.toString()).to.be.equal(persistentDispositionJSON.set.toString())
      expect(json.unset.toString()).to.be.equal(persistentDispositionJSON.unset.toString())
    })
    it('should add and remove set', async () => {
      const persistentDisposition = new PersistentDisposition()
      persistentDisposition.addSet(set[0])
      expect(persistentDisposition.set.toString()).to.be.equal([set[0]].toString())
      persistentDisposition.addSet(set[1])
      expect(persistentDisposition.set.toString()).to.be.equal([set[0], set[1]].toString())
      persistentDisposition.removeSet(set[0])
      expect(persistentDisposition.set.toString()).to.be.equal([set[1]].toString())
      persistentDisposition.removeSet(set[1])
      expect(persistentDisposition.set.toString()).to.be.equal([].toString())
    })
    it('should add and remove a set List', async () => {
      const persistentDisposition = new PersistentDisposition()
      persistentDisposition.addSetList(set)
      expect(persistentDisposition.set.toString()).to.be.equal(set.toString())
      persistentDisposition.removeSetList(set)
      expect(persistentDisposition.set.toString()).to.be.equal([].toString())
    })
    it('should clear the set List', async () => {
      const persistentDisposition = new PersistentDisposition()
      persistentDisposition.addSetList(set)
      expect(persistentDisposition.set.toString()).to.be.equal(set.toString())
      persistentDisposition.clearSetList()
      expect(persistentDisposition.set).to.be.equal(undefined)
    })
    it('should not add the correctiveEventID list to JSON if it is not defined', async () => {
      const persistentDisposition = new PersistentDisposition()
      const json = persistentDisposition.toJSON()
      expect(json.set).to.be.equal(undefined)
    })
    it('should add and remove unset', async () => {
      const persistentDisposition = new PersistentDisposition()
      persistentDisposition.addUnset(unset[0])
      expect(persistentDisposition.unset.toString()).to.be.equal([unset[0]].toString())
      persistentDisposition.addUnset(unset[1])
      expect(persistentDisposition.unset.toString()).to.be.equal([unset[0], unset[1]].toString())
      persistentDisposition.removeUnset(unset[0])
      expect(persistentDisposition.unset.toString()).to.be.equal([unset[1]].toString())
      persistentDisposition.removeUnset(unset[1])
      expect(persistentDisposition.unset.toString()).to.be.equal([].toString())
    })
    it('should add and remove an unset List', async () => {
      const persistentDisposition = new PersistentDisposition()
      persistentDisposition.addUnsetList(unset)
      expect(persistentDisposition.unset.toString()).to.be.equal(unset.toString())
      persistentDisposition.removeUnsetList(unset)
      expect(persistentDisposition.unset.toString()).to.be.equal([].toString())
    })
    it('should clear the unset List', async () => {
      const persistentDisposition = new PersistentDisposition()
      persistentDisposition.addUnsetList(unset)
      expect(persistentDisposition.unset.toString()).to.be.equal(unset.toString())
      persistentDisposition.clearUnsetList()
      expect(persistentDisposition.unset).to.be.equal(undefined)
    })
    it('should not add the correctiveEventID list to JSON if it is not defined', async () => {
      const persistentDisposition = new PersistentDisposition()
      const json = persistentDisposition.toJSON()
      expect(json.unset).to.be.equal(undefined)
    })
  })
})
