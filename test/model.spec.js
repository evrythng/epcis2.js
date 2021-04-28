import { expect } from 'chai'
import TimeZoneOffset from '../src/entity/model/TimeZoneOffset'
import ErrorDeclaration from '../src/entity/model/ErrorDeclaration'
import ObjectEvent from '../src/entity/events/ObjectEvent'
import { dateToString } from '../src/utils/utils'

const anotherDate = '2005-04-03T20:33:31.116-06:00'
const correctiveEventID1 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'
const correctiveEventID2 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7'
const correctiveEventID3 = 'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a6'

describe('unit tests for model Objects', () => {
  describe('TimeZoneOffset.js', () => {
    it('should not accept invalid parameter in the constructor', async () => {
      expect(() => new TimeZoneOffset('TEST')).to.throw('The TimeZoneOffset is invalid')
      expect(() => new TimeZoneOffset('123:08')).to.throw('The first character of the offset shall be a \'+\' or a \'-\'')
      expect(() => new TimeZoneOffset('+1u:08')).to.throw('The hours and minutes shall be numbers in the string')
      expect(() => new TimeZoneOffset('+10:08')).to.not.throw()
      expect(() => new TimeZoneOffset(new Date(Date.now()))).to.throw('The parameter provided in the constructor should be a number of a String')
    })
    it('should create valid time offset', async () => {
      const timeOffset1 = new TimeZoneOffset('-06:00')
      const timeOffset2 = new TimeZoneOffset(2.5)
      expect(timeOffset1.hours).to.be.equal(-6)
      expect(timeOffset2.hours).to.be.equal(2)
      expect(timeOffset1.minutes).to.be.equal(0)
      expect(timeOffset2.minutes).to.be.equal(30)
    })
    it('should create a valid offset string', async () => {
      const timeOffset1 = new TimeZoneOffset('-06:00')
      const timeOffset2 = new TimeZoneOffset(2.5)
      expect(timeOffset1.toString()).to.be.equal('-06:00')
      expect(timeOffset2.toString()).to.be.equal('+02:30')
    })
    it('should return the corresponding minutes of a time zone offset', async () => {
      const timeOffset1 = new TimeZoneOffset('-06:00')
      const timeOffset2 = new TimeZoneOffset(2.5)
      expect(timeOffset1.toMinutes()).to.be.equal(-360)
      expect(timeOffset2.toMinutes()).to.be.equal(150)
    })
  })
  describe('ErrorDeclaration.js', () => {
    it('should create a valid ErrorDeclaration object', async () => {
      const errorDeclaration = new ErrorDeclaration()
      const reason = 'urn:epcglobal:cbv:er:incorrect_data'
      const date = new Date(Date.now())
      errorDeclaration
        .setDeclarationTime(new Date(date))
        .setReason(reason)
        .addCorrectiveEventID(correctiveEventID1)
        .addCorrectiveEventID(correctiveEventID2)

      const json = errorDeclaration.toJSON()

      expect(json.reason).to.be.equal(reason)
      expect(json.declarationTime).to.be.equal(dateToString(date))
      expect(json.correctiveEventIDs.toString()).to.be.equal([correctiveEventID1, correctiveEventID2].toString())
    })
    it('should create a valid declarationTime with time offset', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration
        .setDeclarationTime(new Date(anotherDate), new TimeZoneOffset(-6))

      const errorDeclaration2 = new ErrorDeclaration()
      errorDeclaration2
        .setDeclarationTime(new Date(anotherDate))
        .setTimeZoneOffset(-6)

      const json = errorDeclaration.toJSON()
      const json2 = errorDeclaration2.toJSON()
      expect(json.declarationTime).to.be.equal(anotherDate)
      expect(json2.declarationTime).to.be.equal(anotherDate)
    })
    it('should add and remove correctiveEventIDs', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCorrectiveEventID(correctiveEventID1)
      expect(errorDeclaration.correctiveEventIDList.toString()).to.be.equal([correctiveEventID1].toString())
      errorDeclaration.addCorrectiveEventID(correctiveEventID2)
      expect(errorDeclaration.correctiveEventIDList.toString()).to.be.equal([correctiveEventID1, correctiveEventID2].toString())
      errorDeclaration.removeCorrectiveEventID(correctiveEventID1)
      expect(errorDeclaration.correctiveEventIDList.toString()).to.be.equal([correctiveEventID2].toString())
      errorDeclaration.removeCorrectiveEventID(correctiveEventID2)
      expect(errorDeclaration.correctiveEventIDList.toString()).to.be.equal([].toString())
    })
    it('should add a correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID1, correctiveEventID2])
      expect(errorDeclaration.correctiveEventIDList.toString()).to.be.equal([correctiveEventID1, correctiveEventID2].toString())
      errorDeclaration.removeCorrectiveEventID(correctiveEventID2)
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID2, correctiveEventID3])
      expect(errorDeclaration.correctiveEventIDList.toString()).to.be.equal([correctiveEventID1, correctiveEventID2, correctiveEventID3].toString())
    })
    it('should remove a correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID1, correctiveEventID2, correctiveEventID3])
      errorDeclaration.removeCorrectiveEventIDList([correctiveEventID1, correctiveEventID2])
      expect(errorDeclaration.correctiveEventIDList.toString()).to.be.equal([correctiveEventID3].toString())
    })
    it('should clear the correctiveEventID List', async () => {
      const errorDeclaration = new ErrorDeclaration()
      errorDeclaration.addCorrectiveEventIDList([correctiveEventID1, correctiveEventID2, correctiveEventID3])
      errorDeclaration.clearCorrectiveEventIDList()
      expect(errorDeclaration.correctiveEventIDList.toString()).to.be.equal([].toString())
    })
  })
})
