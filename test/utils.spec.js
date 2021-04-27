import ObjectEvent from '../src/entity/ObjectEvent'
import { expect } from 'chai'
import { getDateFromStringOrDate } from '../src/utils/utils';

describe('unit tests for util functions', () => {
  describe('* getDateFromStringOrDate', () => {
    it('should return the date', async () => {
      const date = new Date(Date.now());
      expect(getDateFromStringOrDate(date).toISOString()).to.be.equal(date.toISOString());
    })
    it('should convert the ISO string to a date', async () => {
      const date = new Date(Date.now());
      expect(getDateFromStringOrDate(date.toISOString()).toISOString()).to.be.equal(date.toISOString());
    })
    it('should not convert an invalid date object', async () => {
      const date = new Date('invalid date');
      expect(() => getDateFromStringOrDate(date)).to.throw;
    })
    it('should not accept another type', async () => {
      expect(() => getDateFromStringOrDate(10)).to.throw;
    })
    it('should not an invalid String', async () => {
      expect(() => getDateFromStringOrDate("invalid string")).to.throw;
    })
  });
});
