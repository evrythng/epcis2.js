import { assert, expect } from 'chai';
import {
  addATrailingZ, addMillisecondPrecisionToDate,
  formatTheDate, getEventContexts,
  isADate,
  isAString, removeTimeZoneProperty,
  removeWhiteSpaceAtTheBeginningOrEndOfString,
} from '../../src/hash_generator/hashAlgorithmUtils';
import { preHashedStringToHashedString } from '../../src/hash_generator/EPCISEventToHashedString';

describe('Hashing algorithm utils', () => {
  describe('isAString function', () => {
    it('Should never throw', () => {
      expect(() => isAString(2)).to.not.throw();
      expect(() => isAString('foo')).to.not.throw();
      expect(() => isAString({})).to.not.throw();
      expect(() => isAString(2.5)).to.not.throw();
      expect(() => isAString([])).to.not.throw();
    });

    it('Should return false', () => {
      expect(isAString(2)).to.be.equal(false);
      expect(isAString(2.4)).to.be.equal(false);
      expect(isAString({})).to.be.equal(false);
      expect(isAString([])).to.be.equal(false);
    });

    it('Should return true', () => {
      expect(isAString('foo')).to.be.equal(true);
      expect(isAString('2.187968')).to.be.equal(true);
      expect(isAString(String('foo'))).to.be.equal(true);
    });
  });

  describe('removeWhiteSpaceAtTheBeginningOrEndOfString function', () => {
    it('Should return the parameter', () => {
      expect(removeWhiteSpaceAtTheBeginningOrEndOfString('foo')).to.be.equal('foo');
      expect(removeWhiteSpaceAtTheBeginningOrEndOfString('2.187968'))
        .to.be.equal('2.187968');
      expect(removeWhiteSpaceAtTheBeginningOrEndOfString(String('foo')))
        .to.be.equal('foo');
      expect(removeWhiteSpaceAtTheBeginningOrEndOfString(2)).to.be.equal(2);
      expect(removeWhiteSpaceAtTheBeginningOrEndOfString({}).toString())
        .to.be.equal({}.toString());
    });

    it('Should remove useless spaces', () => {
      expect(removeWhiteSpaceAtTheBeginningOrEndOfString(' foo')).to.be.equal('foo');
      expect(removeWhiteSpaceAtTheBeginningOrEndOfString(' 2.187968   '))
        .to.be.equal('2.187968');
      expect(removeWhiteSpaceAtTheBeginningOrEndOfString(String('        foo        ')))
        .to.be.equal('foo');
    });
  });

  describe('isADate function', () => {
    it('Should never throw', () => {
      assert.doesNotThrow(() => isADate(2));
      assert.doesNotThrow(() => isADate('foo'));
      assert.doesNotThrow(() => isADate({}));
      assert.doesNotThrow(() => isADate(2.5));
      assert.doesNotThrow(() => isADate([]));
    });

    it('Should return false', () => {
      expect(isADate(2)).to.be.equal(false);
      expect(isADate(2.4)).to.be.equal(false);
      expect(isADate({})).to.be.equal(false);
      expect(isADate([])).to.be.equal(false);
      expect(isADate('foo')).to.be.equal(false);
      expect(isADate('2005-07-11T11:3')).to.be.equal(false);
    });

    it('Should return true', () => {
      expect(isADate('2005-07-11T11:30:47.0Z')).to.be.equal(true);
      expect(isADate('2005-04-03T20:33:31.116000-06:00')).to.be.equal(true);
    });
  });

  describe('formatTheDateToFollowTheAlgorithmRules function', () => {
    it('Should return the parameter', () => {
      expect(formatTheDate('foo')).to.be.equal('foo');
      expect(formatTheDate('2.187968'))
        .to.be.equal('2.187968');
      expect(formatTheDate(String('foo')))
        .to.be.equal('foo');
      expect(formatTheDate(2)).to.be.equal(2);
      expect(formatTheDate({}).toString())
        .to.be.equal({}.toString());
    });

    it('Should not add a Z at the end', () => {
      expect(addATrailingZ('2005-07-11T11:30:47.0Z'))
        .to.be.equal('2005-07-11T11:30:47.0Z');
      expect(addATrailingZ('2005-04-03T20:33:31.116000-06:00'))
        .to.be.equal('2005-04-03T20:33:31.116000-06:00');
    });

    it('Should add a Z at the end', () => {
      expect(addATrailingZ('2005-07-11T11:30:47.0'))
        .to.be.equal('2005-07-11T11:30:47.0Z');
    });

    it('Should not add millisecond precision', () => {
      expect(formatTheDate('2005-07-11T11:30:47.000Z'))
        .to.be.equal('2005-07-11T11:30:47.000Z');
    });

    it('Should add millisecond precision', () => {
      expect(addMillisecondPrecisionToDate('2005-07-11T11:30:47Z'))
        .to.be.equal('2005-07-11T11:30:47.000Z');
      expect(addMillisecondPrecisionToDate('2005-07-11T11:30:47-06:00'))
        .to.be.equal('2005-07-11T11:30:47.000-06:00');
      expect(addMillisecondPrecisionToDate('2005-07-11T11:30:47.0Z'))
        .to.be.equal('2005-07-11T11:30:47.000Z');
      expect(addMillisecondPrecisionToDate('2005-07-11T11:30:47.0-06:00'))
        .to.be.equal('2005-07-11T11:30:47.000-06:00');
      expect(addMillisecondPrecisionToDate('2005-07-11T11:30:47.00Z'))
        .to.be.equal('2005-07-11T11:30:47.000Z');
      expect(addMillisecondPrecisionToDate('2005-07-11T11:30:47.00-06:00'))
        .to.be.equal('2005-07-11T11:30:47.000-06:00');
    });

    it('Should remove millisecond precision', () => {
      expect(addMillisecondPrecisionToDate('2005-04-03T20:33:31.116000-06:00'))
        .to.be.equal('2005-04-03T20:33:31.116-06:00');
    });

    it('Should return valid UTC dates without offsets', () => {
      expect(formatTheDate('2005-04-03T20:33:31.116000-06:00'))
        .to.be.equal('2005-04-04T02:33:31.116Z');
      expect(formatTheDate('2005-04-03T20:33:31.116')).to.be.equal('2005-04-03T20:33:31.116Z');
      expect(formatTheDate('2019-10-21T11:00:30+01:00')).to.be.equal('2019-10-21T10:00:30.000Z');
    });
  });

  describe('removeTimeZonePropertyIfItIsNeeded function', () => {
    it('Should return the parameter', () => {
      expect(removeTimeZoneProperty('2005-04-03T20:33:31.116Z')).to.be.equal('2005-04-03T20:33:31.116Z');
    });

    it('Should remove the timezone', () => {
      expect(removeTimeZoneProperty('2019-10-21T11:00:30.000+01:00')).to.be.equal('2019-10-21T10:00:30.000Z');
      expect(removeTimeZoneProperty('2005-04-03T20:33:31.116-06:00')).to.be.equal('2005-04-04T02:33:31.116Z');
    });
  });

  describe('readAllTheContextProvidedInTheObject function', () => {
    it('Should return an empty object', () => {
      expect(getEventContexts({}).toString()).to.be.equal({}.toString());
      expect(getEventContexts({ foo: 'foo' }).toString())
        .to.be.equal({}.toString());
    });

    it('Should return the context', () => {
      expect(getEventContexts({
        'example:userExt': {
          '@xmlns:example': 'https://ns.example.com/epcis',
          '#text': 'CD-34',
        },
        readPoint:
          {
            id: 'https://id.gs1.org/414/4012345000115', // urn:epc:id:sgln:4012345.00011.0
            'example:myField1': 'AB-12',
          },
      }))
        .to.be.deep.equal({ example: 'https://ns.example.com/epcis' });
    });
  });

  it('Should return a valid Hash string', () => {
    const res = preHashedStringToHashedString('eventType=ObjectEventeventTime=2020-03-04T10:00:30.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/01/00614141111114/21/987action=OBSERVEbizStep=https://ns.gs1.org/voc/Bizstep-departingdisposition=https://ns.gs1.org/voc/Disp-in_transitreadPointid=https://id.gs1.org/414/4012345000115bizTransactionListbizTransaction=https://id.gs1.org/253/4012345111118123type=https://ns.gs1.org/voc/BTT-posourceListsource=https://id.gs1.org/417/4012345000009type=https://ns.gs1.org/voc/SDT-owning_partydestinationListdestination=https://id.gs1.org/417/0614141000005type=https://ns.gs1.org/voc/SDT-owning_partyreadPoint{https://ns.example.com/epcis}myField1=AB-12{https://ns.example.com/epcis}userExt=CD-34');
    expect(res).to.be.equal('ni:///sha-256;b19f1beb88382b7a670c276a699a61c9805174586eaeb1845c4a1dbce8b75aa3?ver=CBV2.0');
  });
});
