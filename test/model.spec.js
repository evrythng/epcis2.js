import { expect } from 'chai'
import ErrorDeclaration from '../src/entity/model/ErrorDeclaration'
import QuantityElement from '../src/entity/model/QuantityElement'

const anotherDate = '2005-04-03T20:33:31.116-06:00'
const correctiveEventID1 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'
const correctiveEventID2 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7'
const correctiveEventID3 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a6'
const reason = 'urn:epcglobal:cbv:er:incorrect_data'

const JSONQuantityElement = { epcClass: 'urn:epc:class:lgtin:4012345.012345.998877', quantity: 200, uom: 'KGM' }

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
      expect(errorDeclaration.correctiveEventIDs.toString()).to.be.equal([].toString())
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
})
