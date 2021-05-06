import { expect } from 'chai';
import {
  getTheTimeZoneOffsetFromDateString,
  getTimeZoneOffsetFromStringOrNumber,
  numberToZeroPadString, offsetToString,
} from '../src/utils/utils';
import objectToEvent from '../src/utils/entityUtils';
import ObjectEvent from '../src/entity/events/ObjectEvent';

describe('unit tests for util functions', () => {
  describe('numberToTwoCharString function', () => {
    it('should return a string corresponding to the number', async () => {
      const num = 9;
      const num2 = 0;
      const num3 = 87;
      expect(numberToZeroPadString(num)).to.be.equal('09');
      expect(numberToZeroPadString(num2)).to.be.equal('00');
      expect(numberToZeroPadString(num3)).to.be.equal('87');
    });
    it('should not accept a number < 0 or > 99', async () => {
      const num1 = -1;
      const num2 = 101;
      expect(() => numberToZeroPadString(num1)).to.throw('The number has to be between 0 and 99');
      expect(() => numberToZeroPadString(num2)).to.throw('The number has to be between 0 and 99');
    });
  });
  describe('timezone functions', () => {
    it('should not accept invalid parameter in the constructor', async () => {
      expect(() => getTimeZoneOffsetFromStringOrNumber('TEST')).to.throw('The TimeZoneOffset is invalid');
      expect(() => getTimeZoneOffsetFromStringOrNumber('123:08')).to.throw('The first character of the offset shall be a \'+\' or a \'-\'');
      expect(() => getTimeZoneOffsetFromStringOrNumber('+1u:08')).to.throw('The hours and minutes shall be numbers in the string');
      expect(() => getTimeZoneOffsetFromStringOrNumber('+10:08')).to.not.throw();
      expect(() => getTimeZoneOffsetFromStringOrNumber(new Date(Date.now()))).to.throw('The parameter provided in the constructor should be a number or a string');
    });
    it('should return the corresponding string of a time zone offset', async () => {
      const offset = getTheTimeZoneOffsetFromDateString('2005-04-03T20:33:31.116-06:00');
      expect(offset).to.be.equal('-06:00');
    });
    it('offset to string', async () => {
      expect(offsetToString(-6, 30)).to.be.equal('-06:30');
      expect(offsetToString(5, 30)).to.be.equal('+05:30');
    });
  });
  describe('object to event function', () => {
    it('should not accept invalid parameter', async () => {
      expect(() => objectToEvent({})).to.throw(
        "The object passed in parameter isn't valid. The isA field should be set to a valid value",
      );
      expect(() => objectToEvent({ isA: 'foo' })).to.throw(
        "The object passed in parameter isn't valid. The isA field should be set to a valid value",
      );
    });
    it('should return an ObjectEvent', async () => {
      const o = objectToEvent({ isA: 'ObjectEvent' });
      expect(o instanceof ObjectEvent).to.equal(true);
    });
    it('should return a aggregationEvent');
    it('should return a associationEvent');
    it('should return a transactionEvent');
    it('should return a transformationEvent');
  });
});
