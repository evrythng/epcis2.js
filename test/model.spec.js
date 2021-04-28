import { expect } from 'chai'
import TimeZoneOffset from '../src/entity/model/TimeZoneOffset'

describe('unit tests for model Objects', () => {
  describe('TimeZoneOffset.js', () => {
    it('should not accept invalid parameter in the constructor', async () => {
      expect(() => new TimeZoneOffset('TEST')).to.throw('The TimeZoneOffset is invalid')
      expect(() => new TimeZoneOffset('123:08')).to.throw("The first character of the offset shall be a '+' or a '-'")
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
})
