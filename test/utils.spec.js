import { expect } from 'chai'
import { dateToString, getDateFromStringOrDate, isAValidDate, numberToTwoCharString } from '../src/utils/utils'
import TimeZoneOffset from '../src/entity/model/TimeZoneOffset'

describe('unit tests for util functions', () => {
  describe('getDateFromStringOrDate function', () => {
    it('should return the date', async () => {
      const date = new Date(Date.now())
      expect(getDateFromStringOrDate(date).toISOString()).to.be.equal(date.toISOString())
    })
    it('should convert the ISO string to a date', async () => {
      const date = new Date(Date.now())
      expect(getDateFromStringOrDate(date.toISOString()).toISOString()).to.be.equal(date.toISOString())
    })
    it('should not convert an invalid date object', async () => {
      const date = new Date('invalid date')
      expect(() => getDateFromStringOrDate(date)).to.throw('A Date or a String shall be provided')
    })
    it('should not accept another type', async () => {
      expect(() => getDateFromStringOrDate(10)).to.throw('A Date or a String shall be provided')
    })
    it('should not an invalid String', async () => {
      expect(() => getDateFromStringOrDate('invalid string')).to.throw("The string provided doesn't have the good format")
    })
  })
  describe('numberToTwoCharString function', () => {
    it('should return a string corresponding to the number', async () => {
      const num = 9
      const num2 = 0
      const num3 = 87
      expect(numberToTwoCharString(num)).to.be.equal('09')
      expect(numberToTwoCharString(num2)).to.be.equal('00')
      expect(numberToTwoCharString(num3)).to.be.equal('87')
    })
    it('should not accept a number < 0 or > 99', async () => {
      const num1 = -1
      const num2 = 101
      expect(() => numberToTwoCharString(num1)).to.throw('The number has to be between 0 and 99')
      expect(() => numberToTwoCharString(num2)).to.throw('The number has to be between 0 and 99')
    })
  })
  describe('isAValidDate function', () => {
    it('should validate a valid date', async () => {
      const date = new Date(Date.now())
      expect(isAValidDate(date)).to.be.equal(true)
    })
    it('should not validate a invalid date', async () => {
      const date = new Date('invalid')
      expect(isAValidDate(date)).to.be.equal(false)
    })
  })
  describe('dateToString function', () => {
    it('should return the original date', async () => {
      const strDate = '2005-04-03T20:33:31.116-06:00'
      const date = new Date(strDate)
      expect(dateToString(date, new TimeZoneOffset(-6))).to.be.equal(strDate)
    })
  })
})
