/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import { eventToPreHashedString, getPreHashStringOfField } from '../src/hash_generator/EPCISEventToPreHashedString';
import {
  addATrailingZIfItIsNeeded,
  addMillisecondPrecisionToDate,
  formatTheDateToFollowTheAlgorithmRules,
  isADate,
  isAString, readAllTheContextProvidedInTheObject, removeTimeZonePropertyIfItIsNeeded,
  removeWhiteSpaceAtTheBeginningOrEndOfString,
} from '../src/hash_generator/hashAlgorithmUtils';
import { exampleObjectEvent } from './data/eventExample';
import { dlNormalizer, addCheckDigitAndZeroPad } from '../src/hash_generator/dlNormalizer';
import epcisDocHavingEventWithComment from './data/hashing/epcisDocHavingEventWithComment.json';
import epcisDocWithCustomSchemaInContext from './data/hashing/epcisDocWithCustomSchemaInContext.json';
import epcisDocWithDefaultSchemaInContext from './data/hashing/epcisDocWithDefaultSchemaInContext.json';
import epcisDocWithSensorDataObjectEvent from './data/hashing/epcisDocWithSensorDataObjectEvent.json';
import epcisDocWithShippingAndTransportingEvent from './data/hashing/epcisDocWithShippingAndTransportingEvent.json';
import epcisDocWithSingleEvent from './data/hashing/epcisDocWithSingleEvent.json';
import epcisDocWithVariousEventTypes from './data/hashing/epcisDocWithVariousEventTypes.json';
import epcisDocWithXMLstartTagAndErrorDeclaration from './data/hashing/epcisDocWithXMLstartTagAndErrorDeclaration.json';
import epclistNormalisation from './data/hashing/epclist_normalisation.json';
import ReferenceEventHashAlgorithm from './data/hashing/ReferenceEventHashAlgorithm.json';
import ReferenceEventHashAlgorithm2 from './data/hashing/ReferenceEventHashAlgorithm2.json';
import ReferenceEventHashAlgorithm3 from './data/hashing/ReferenceEventHashAlgorithm3.json';
import {
  epcisDocHavingEventWithCommentPreHash,
  epcisDocWithCustomSchemaInContextPreHash,
  epcisDocWithDefaultSchemaInContextPreHash,
  epcisDocWithSensorDataObjectEventPreHash,
  epcisDocWithShippingAndTransportingEventPreHash,
  epcisDocWithSingleEventPreHash,
  epcisDocWithVariousEventTypesPreHash,
  epcisDocWithXMLStartTagAndErrorDeclarationPreHash,
  epcListNormalisationPreHash,
  ReferenceEventHashAlgorithm2PreHash, ReferenceEventHashAlgorithm3PreHash,
  ReferenceEventHashAlgorithmPreHash,
} from './data/hashing/samplePrehashesAndHashes';
import { eventToHashedId, preHashedStringToHashedString } from '../src/hash_generator/EPCISEventToHashedString';

/* eslint-disable max-len */

const objectEventExample1 = {
  isA: 'ObjectEvent',
  eventTime: '2020-03-04T11:00:30.000+01:00',
  eventTimeZoneOffset: '+01:00',
  recordTime: '2020-03-04T11:00:30.999+01:00',
  epcList: [
    'urn:epc:id:sscc:4012345.0000000333',
    'urn:epc:id:sscc:4012345.0000000111',
    'urn:epc:id:sscc:4012345.0000000222',
  ],
  action: 'OBSERVE',
  bizStep: 'urn:epcglobal:cbv:bizstep:departing',
  readPoint: { id: 'urn:epc:id:sgln:4012345.00011.987' },
  'example:myField1': {
    '@xmlns:example': 'https://ns.example.com/epcis',
    'example:mySubField1': '2',
    'example:mySubField2': '5',
  },
  'example:myField2': {
    '@xmlns:example': 'https://ns.example.com/epcis',
    '#text': '0',
  },
  'example:myField3': {
    '@xmlns:example': 'https://ns.example.com/epcis',
    'example:mySubField3': [
      '3',
      '1',
    ],
  },
};
const context = {
  example: 'http://ns.example.com/epcis/',
};

describe('Hashing algorithm utils', () => {
  describe('isAString function', () => {
    it('Should never throw', () => {
      assert.doesNotThrow(() => isAString(2));
      assert.doesNotThrow(() => isAString('foo'));
      assert.doesNotThrow(() => isAString({}));
      assert.doesNotThrow(() => isAString(2.5));
      assert.doesNotThrow(() => isAString([]));
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
      expect(formatTheDateToFollowTheAlgorithmRules('foo')).to.be.equal('foo');
      expect(formatTheDateToFollowTheAlgorithmRules('2.187968'))
        .to.be.equal('2.187968');
      expect(formatTheDateToFollowTheAlgorithmRules(String('foo')))
        .to.be.equal('foo');
      expect(formatTheDateToFollowTheAlgorithmRules(2)).to.be.equal(2);
      expect(formatTheDateToFollowTheAlgorithmRules({}).toString())
        .to.be.equal({}.toString());
    });

    it('Should not add a Z at the end', () => {
      expect(addATrailingZIfItIsNeeded('2005-07-11T11:30:47.0Z'))
        .to.be.equal('2005-07-11T11:30:47.0Z');
      expect(addATrailingZIfItIsNeeded('2005-04-03T20:33:31.116000-06:00'))
        .to.be.equal('2005-04-03T20:33:31.116000-06:00');
    });

    it('Should add a Z at the end', () => {
      expect(addATrailingZIfItIsNeeded('2005-07-11T11:30:47.0'))
        .to.be.equal('2005-07-11T11:30:47.0Z');
    });

    it('Should not add millisecond precision', () => {
      expect(formatTheDateToFollowTheAlgorithmRules('2005-07-11T11:30:47.000Z'))
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
      expect(formatTheDateToFollowTheAlgorithmRules('2005-04-03T20:33:31.116000-06:00'))
        .to.be.equal('2005-04-04T02:33:31.116Z');
      expect(formatTheDateToFollowTheAlgorithmRules('2005-04-03T20:33:31.116')).to.be.equal('2005-04-03T20:33:31.116Z');
      expect(formatTheDateToFollowTheAlgorithmRules('2019-10-21T11:00:30+01:00')).to.be.equal('2019-10-21T10:00:30.000Z');
    });
  });

  describe('removeTimeZonePropertyIfItIsNeeded function', () => {
    it('Should return the parameter', () => {
      expect(removeTimeZonePropertyIfItIsNeeded('2005-04-03T20:33:31.116Z')).to.be.equal('2005-04-03T20:33:31.116Z');
    });

    it('Should remove the timezone', () => {
      expect(removeTimeZonePropertyIfItIsNeeded('2019-10-21T11:00:30.000+01:00')).to.be.equal('2019-10-21T10:00:30.000Z');
      expect(removeTimeZonePropertyIfItIsNeeded('2005-04-03T20:33:31.116-06:00')).to.be.equal('2005-04-04T02:33:31.116Z');
    });
  });

  describe('readAllTheContextProvidedInTheObject function', () => {
    it('Should return an empty object', () => {
      expect(readAllTheContextProvidedInTheObject({}).toString()).to.be.equal({}.toString());
      expect(readAllTheContextProvidedInTheObject({ foo: 'foo' }).toString())
        .to.be.equal({}.toString());
    });

    it('Should return the context', () => {
      expect(readAllTheContextProvidedInTheObject({
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

describe('dl normalizer', () => {
  it('Should return a valid gtin', () => {
    expect(addCheckDigitAndZeroPad('7447010150', true)).to.be.equal('00074470101505');
    expect(addCheckDigitAndZeroPad('7447010150', true, 13)).to.be.equal('0074470101505');
    expect(addCheckDigitAndZeroPad('7447010150', true, 12)).to.be.equal('074470101505');
  });

  it('Should return the input since it is not a normalisable uri', () => {
    expect(dlNormalizer('foo')).to.be.equal('foo');
    expect(dlNormalizer('')).to.be.equal('');
  });

  it('Should normalize an urn with sgtin', () => {
    expect(dlNormalizer('urn:epc:id:sgtin:0614141.011111.987')).to.be.equal('https://id.gs1.org/01/00614141111114/21/987');
  });

  it('Should normalize an urn with sscc', () => {
    expect(dlNormalizer('urn:epc:id:sscc:4047023.0111111122')).to.be.equal('https://id.gs1.org/00/0404702301111111225');
  });

  it('Should normalize an urn with sgln', () => {
    expect(dlNormalizer('urn:epc:id:sgln:4012345.00012.0')).to.be.equal('https://id.gs1.org/414/4012345000122');
    expect(dlNormalizer('urn:epc:id:sgln:0012345.11111.0')).to.be.equal('https://id.gs1.org/414/0012345111112');
    expect(dlNormalizer('urn:epc:id:sgln:4012345.00011.0')).to.be.equal('https://id.gs1.org/414/4012345000115');
  });

  it('Should normalize an urn with grai', () => {
    expect(dlNormalizer('urn:epc:id:grai:4012345.00022.334455')).to.be.equal('https://id.gs1.org/8003/04012345000221334455');
  });

  it('Should normalize an urn with giai', () => {
    expect(dlNormalizer('urn:epc:id:giai:4000001.111')).to.be.equal('https://id.gs1.org/8004/4000001111');
  });

  it('Should normalize an urn with gsrn', () => {
    expect(dlNormalizer('urn:epc:id:gsrn:4012345.0000006765')).to.be.equal('https://id.gs1.org/8018/401234500000067657');
  });

  it('Should normalize an urn with gsrnp', () => {
    expect(dlNormalizer('urn:epc:id:gsrnp:4012345.0000000007')).to.be.equal('https://id.gs1.org/8017/401234500000000074');
  });

  it('Should normalize an urn with gdti', () => {
    expect(dlNormalizer('urn:epc:id:gdti:4012345.55555.1234')).to.be.equal('https://id.gs1.org/253/40123455555541234');
  });

  it('Should normalize an urn with cpi', () => {
    expect(dlNormalizer('urn:epc:id:cpi:0614141.11111111111111-A%23%2F.1234')).to.be.equal('https://id.gs1.org/8010/061414111111111111111-A%23%2F/8011/1234');
  });

  it('Should normalize an urn with sgcn');

  it('Should normalize an urn with ginc', () => {
    expect(dlNormalizer('urn:epc:id:ginc:0614141.xyz47%2F11')).to.be.equal('https://id.gs1.org/401/0614141xyz47%2F11');
  });

  it('Should normalize an urn with gsin', () => {
    expect(dlNormalizer('urn:epc:id:gsin:4012345.222333444')).to.be.equal('https://id.gs1.org/402/40123452223334442');
  });

  it('Should normalize an urn with itip', () => {
    expect(dlNormalizer('urn:epc:id:itip:4012345.011111.01.02.987')).to.be.equal('https://id.gs1.org/8006/040123451111180102/21/987');
  });

  it('Should normalize an urn with upui', () => {
    expect(dlNormalizer('urn:epc:id:upui:1234567.098765.51qIgY)%3C%26Jp3*j7SDB')).to.be.equal('https://id.gs1.org/01/01234567987651/235/51qIgY%29%3C%26Jp3%2Aj7SDB');
  });

  it('Should normalize an urn with pgln', () => {
    expect(dlNormalizer('urn:epc:id:pgln:4012345.00000')).to.be.equal('https://id.gs1.org/417/4012345000009');
    expect(dlNormalizer('urn:epc:id:pgln:4000001.00000')).to.be.equal('https://id.gs1.org/417/4000001000005');
  });

  it('Should normalize an urn with lgtin', () => {
    expect(dlNormalizer('urn:epc:class:lgtin:4012345.099988.2014-02-10')).to.be.equal('https://id.gs1.org/01/04012345999884/10/2014-02-10');
    expect(dlNormalizer('urn:epc:class:lgtin:4054739.099914.20160711')).to.be.equal('https://id.gs1.org/01/04054739999148/10/20160711');
    expect(dlNormalizer('urn:epc:class:lgtin:4012345.012345.Lot987')).to.be.equal('https://id.gs1.org/01/04012345123456/10/Lot987');
  });

  it('Should normalize an urn with idpat sgtin', () => {
    expect(dlNormalizer('urn:epc:idpat:sgtin:4012345.012345.*')).to.be.equal('https://id.gs1.org/01/04012345123456');
  });

  it('Should normalize an urn with idpat grai', () => {
    expect(dlNormalizer('urn:epc:idpat:grai:4012345.99999.*')).to.be.equal('https://id.gs1.org/8003/04012345999990');
  });

  it('Should normalize an urn with idpat gdti', () => {
    expect(dlNormalizer('urn:epc:idpat:gdti:4012345.11111.*')).to.be.equal('https://id.gs1.org/253/4012345111118');
  });

  it('Should normalize an urn with idpat sgcn', () => {
    expect(dlNormalizer('urn:epc:idpat:sgcn:4012345.22222.*')).to.be.equal('https://id.gs1.org/255/4012345222227');
  });

  it('Should normalize an urn with idpat cpi', () => {
    expect(dlNormalizer('urn:epc:idpat:cpi:4012345.AB12.*')).to.be.equal('https://id.gs1.org/8010/4012345AB12');
  });

  it('Should normalize an urn with idpat itip', () => {
    expect(dlNormalizer('urn:epc:idpat:itip:4012345.012345.01.02.*')).to.be.equal('https://id.gs1.org/8006/040123451234560102');
  });

  it('Should normalize an urn with idpat upui', () => {
    expect(dlNormalizer('urn:epc:idpat:upui:4012345.012345.*')).to.be.equal('https://id.gs1.org/01/04012345123456');
  });

  it('Should normalize an uri with letters and ais', () => {
    expect(dlNormalizer('https://id.gs1.org/gtin/09780345418913')).to.be.equal('https://id.gs1.org/01/09780345418913');
    expect(dlNormalizer('https://example.com/gtin/09780345418913/21/765tz?abc=211121')).to.be.equal('https://id.gs1.org/01/09780345418913/21/765tz');
  });

  it('Should normalize a GTIN 8 12 13', () => {
    expect(dlNormalizer('http://example.de/gtin-8/01/97803111')).to.be.equal('https://id.gs1.org/01/00000097803111');
    expect(dlNormalizer('http://us-company-with-UPC.com/01/001122334455')).to.be.equal('https://id.gs1.org/01/00001122334455');
    expect(dlNormalizer('http://us-company-with-UPC.com/01/001122334455/ser/GHB')).to.be.equal('https://id.gs1.org/01/00001122334455/21/GHB');
    expect(dlNormalizer('https://ean-13.de/gtin/4012345123456/ser/ABC524')).to.be.equal('https://id.gs1.org/01/04012345123456/21/ABC524');
  });

  it('Should replace http', () => {
    expect(dlNormalizer('http://id.gs1.org/gtin/9780345418913')).to.be.equal('https://id.gs1.org/01/09780345418913');
  });

  it('Should replace subdomains', () => {
    expect(dlNormalizer('https://gs1.test.example.org/01/9780345418913/10/1223')).to.be.equal('https://id.gs1.org/01/09780345418913/10/1223');
  });

  it('Should remove qualifier and custom data attributes', () => {
    expect(dlNormalizer('https://example.org/01/9780345418913/21/765tz?11=221109')).to.be.equal('https://id.gs1.org/01/09780345418913/21/765tz');
    expect(dlNormalizer('https://example.org/01/9780345418913/21/765tz?abc=211121')).to.be.equal('https://id.gs1.org/01/09780345418913/21/765tz');
  });
  it('Should replace other gs1 keys', () => {
    expect(dlNormalizer('https://id.gs1.org/00/340123453111111115')).to.be.equal('https://id.gs1.org/00/340123453111111115');
    expect(dlNormalizer('https://id.gs1.org/414/4226350800008')).to.be.equal('https://id.gs1.org/414/4226350800008');
    expect(dlNormalizer('https://example.co.uk/party/4226350800008')).to.be.equal('https://id.gs1.org/417/4226350800008');
    expect(dlNormalizer('https://id.gs1.org/414/4280000000002/254/12')).to.be.equal('https://id.gs1.org/414/4280000000002/254/12');
    expect(dlNormalizer('https://id.gs1.org/8003/03870585000552987')).to.be.equal('https://id.gs1.org/8003/03870585000552987');
    expect(dlNormalizer('https://id.gs1.org/8004/0180451111ABC987')).to.be.equal('https://id.gs1.org/8004/0180451111ABC987');
    expect(dlNormalizer('https://id.gs1.org/8018/385888700111111111')).to.be.equal('https://id.gs1.org/8018/385888700111111111');
    expect(dlNormalizer('https://id.gs1.org/8017/440018922222222226')).to.be.equal('https://id.gs1.org/8017/440018922222222226');
    expect(dlNormalizer('https://id.gs1.org/253/4602443000331XYZ')).to.be.equal('https://id.gs1.org/253/4602443000331XYZ');
    expect(dlNormalizer('https://id.gs1.org/8010/0628165987/8011/9876')).to.be.equal('https://id.gs1.org/8010/0628165987/8011/9876');
    expect(dlNormalizer('https://id.gs1.org/255/0811625999996554433')).to.be.equal('https://id.gs1.org/255/0811625999996554433');
    expect(dlNormalizer('http://fashion.com/itip/040123451234560102/ser/ABC145')).to.be.equal('https://id.gs1.org/8006/040123451234560102/21/ABC145');
  });
  it('Should not replace non existent key ai', () => {
    expect(dlNormalizer('http://example.org/123/4012345ABC987/456/4711')).to.be.equal('http://example.org/123/4012345ABC987/456/4711');
    expect(dlNormalizer('http://id.gs1.org/99/9780345418913')).to.be.equal('http://id.gs1.org/99/9780345418913');
    expect(dlNormalizer('http://id.gs1.org/01/9780345418913/99/utfgf')).to.be.equal('http://id.gs1.org/01/9780345418913/99/utfgf');
  });
  it('Should not replace ordinary web uri', () => {
    expect(dlNormalizer('http://example.org/123/4012345ABC987/456/4711')).to.be.equal('http://example.org/123/4012345ABC987/456/4711');
    expect(dlNormalizer('http://id.gs1.org/99/9780345418913')).to.be.equal('http://id.gs1.org/99/9780345418913');
    expect(dlNormalizer('http://id.gs1.org/01/9780345418913/99/utfgf')).to.be.equal('http://id.gs1.org/01/9780345418913/99/utfgf');
  });
});

describe('rule tests', () => {
  it('should follow rule n°3', () => {
    const str = getPreHashStringOfField('field', 'value', true);
    expect(str).to.be.equal('field=value');
  });

  it('should follow rule n°5', () => {
    const str = getPreHashStringOfField('field', '  value  ', true);
    expect(str).to.be.equal('field=value');
  });

  it('should follow rule n°6', () => {
    let str = getPreHashStringOfField('field', 10.0, true);
    expect(str).to.be.equal('field=10');
    str = getPreHashStringOfField('field', 10.1, true);
    expect(str).to.be.equal('field=10.1');
    str = getPreHashStringOfField('field', 10.100, true);
    expect(str).to.be.equal('field=10.1');
  });

  it('should follow rule n°8', () => {
    const str = getPreHashStringOfField('field', '2020-01-15T00:00:00.000+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
  });

  it('should follow rule n°9', () => {
    let str = getPreHashStringOfField('field', '2020-01-15T00:00:00+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-15T00:00:00.0+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-15T00:00:00.00+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-15T00:00:00.000+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-15T00:00:00.0000+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-14T23:00:00.0000000Z', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
  });

  it('should follow rule n°14', () => {
    const str = eventToPreHashedString({
      bizStep: 'urn:epcglobal:cbv:bizstep:repairing',
    }, {});
    expect(str).to.be.equal('bizStep=https://ns.gs1.org/cbv/BizStep-repairing');
  });

  it('should follow rule n°15', () => {
    const str = getPreHashStringOfField(
      'field', 'urn:epc:id:sgtin:0614141.011111.987', true,
    );
    expect(str).to.be.equal('field=https://id.gs1.org/01/00614141111114/21/987');
  });

  it('should follow rule n°16', () => {
    const str = getPreHashStringOfField('field', '', true);
    expect(str).to.be.equal('field=');
  });
});

describe('pre-hashing of an EPCIS Event', () => {
  describe('unit tests for pre-hashing', () => {
    it('Should return a valid pre-hash', () => {
      const str = eventToPreHashedString(objectEventExample1, context);
      assert.doesNotThrow(() => str);
    });

    it('Should return the same pre-hash (leading and trailing spaces in string test)', () => {
      const str = eventToPreHashedString(objectEventExample1, context);
      const obj2 = objectEventExample1;
      obj2.action = ` ${objectEventExample1.action} `;
      const str2 = eventToPreHashedString(obj2, context);
      expect(str2).to.be.equal(str);
    });

    describe('date pre-has tests', () => {
      it('Should return the same pre-hash (add a Z test)', () => {
        const str = eventToPreHashedString({
          eventTime: '2020-03-04T10:00:30.000',
        }, context);
        const str2 = eventToPreHashedString({
          eventTime: '2020-03-04T10:00:30.000Z',
        }, context);
        const str3 = eventToPreHashedString({
          eventTime: objectEventExample1.eventTime,
        }, context);
        expect(str2).to.be.equal(str);
        expect(str3).to.be.equal(str);
      });

      it('Should return the same pre-hash (3 digits milliseconds test)', () => {
        const str = eventToPreHashedString(objectEventExample1, context);
        const obj2 = objectEventExample1;
        const obj3 = objectEventExample1;
        obj2.eventTime = '2020-03-04T11:00:30+01:00';
        obj3.eventTime = '2020-03-04T11:00:30.0+01:00';
        const str2 = eventToPreHashedString(obj2, context);
        const str3 = eventToPreHashedString(obj3, context);
        expect(str2).to.be.equal(str);
        expect(str3).to.be.equal(str);
      });

      it('Should return the same pre-hash (remove offset test)', () => {
        const str = eventToPreHashedString(objectEventExample1, context);
        const obj2 = objectEventExample1;
        const obj3 = objectEventExample1;
        obj2.eventTime = '2020-03-04T10:00:30Z';
        const str2 = eventToPreHashedString(obj2, context);
        const str3 = eventToPreHashedString(obj3, context);
        expect(str2).to.be.equal(str);
        expect(str3).to.be.equal(str);
      });

      it('Should remove offset', () => {
        const str = eventToPreHashedString({
          errorDeclaration: {
            declarationTime: '2020-01-15T00:00:00.000+01:00',
          },
        }, context);
        expect(str).to.be.equal('errorDeclarationdeclarationTime=2020-01-14T23:00:00.000Z');
      });
    });

    describe('lists pre-has tests', () => {
      it('should pre-hash an epc list that has an URI format', () => {
        const str = eventToPreHashedString({
          epcList: [
            'urn:epc:id:sgtin:0614141.011111.987',
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
          ],
        }, {});
        const str2 = eventToPreHashedString({
          epcList: [
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
            'urn:epc:id:sgtin:0614141.011111.987',
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('epcListepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987');
      });

      it('should pre-hash an epc list that has a DL format', () => {
        const str = eventToPreHashedString({
          epcList: [
            'https://id.gs1.org/01/00614141111114/21/987',
            'https://id.gs1.org/01/00614141111114/21/986',
            'https://id.gs1.org/01/00614141111114/21/985',
          ],
        }, {});
        const str2 = eventToPreHashedString({
          epcList: [
            'https://id.gs1.org/01/00614141111114/21/986',
            'https://id.gs1.org/01/00614141111114/21/985',
            'https://id.gs1.org/01/00614141111114/21/987',
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('epcListepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987');
      });

      it('should pre-hash a child epc list', () => {
        const str = eventToPreHashedString({
          childEPCs: [
            'urn:epc:id:sgtin:0614141.011111.987',
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
          ],
        }, {});
        const str2 = eventToPreHashedString({
          childEPCs: [
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
            'urn:epc:id:sgtin:0614141.011111.987',
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('childEPCsepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987');
      });

      it('should pre-hash an input epc list', () => {
        const str = eventToPreHashedString({
          inputEPCList: [
            'urn:epc:id:sgtin:0614141.011111.987',
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
          ],
        }, {});
        const str2 = eventToPreHashedString({
          inputEPCList: [
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
            'urn:epc:id:sgtin:0614141.011111.987',
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('inputEPCListepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987');
      });

      it('should pre-hash an output epc list', () => {
        const str = eventToPreHashedString({
          outputEPCList: [
            'urn:epc:id:sgtin:0614141.011111.987',
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
          ],
        }, {});
        const str2 = eventToPreHashedString({
          outputEPCList: [
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
            'urn:epc:id:sgtin:0614141.011111.987',
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('outputEPCListepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987');
      });

      it('should pre-hash a biz transaction list', () => {
        const str = eventToPreHashedString({
          bizTransactionList: [
            {
              type: 'urn:epcglobal:cbv:btt:desadv',
              bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:4711',
            },
            {
              type: 'urn:epcglobal:cbv:btt:inv',
              bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:RE1099',
            },
          ],
        }, {});
        const str2 = eventToPreHashedString({
          bizTransactionList: [
            {
              type: 'urn:epcglobal:cbv:btt:inv',
              bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:RE1099',
            },
            {
              bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:4711',
              type: 'urn:epcglobal:cbv:btt:desadv',
            },
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('bizTransactionListbizTransaction=urn:epcglobal:cbv:bt:5200001000008:4711type=https://ns.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:5200001000008:RE1099type=https://ns.gs1.org/cbv/BTT-inv');
      });

      it('should pre-hash a source list', () => {
        const str = eventToPreHashedString({
          sourceList: [
            {
              type: 'urn:epcglobal:cbv:sdt:possessing_party',
              source: 'urn:epc:id:pgln:4000001.00012',
            },
            {
              type: 'urn:epcglobal:cbv:sdt:owning_party',
              source: 'urn:epc:id:pgln:4000001.00012',
            },
          ],
        }, {});
        const str2 = eventToPreHashedString({
          sourceList: [
            {
              source: 'urn:epc:id:pgln:4000001.00012',
              type: 'urn:epcglobal:cbv:sdt:owning_party',
            },
            {
              type: 'urn:epcglobal:cbv:sdt:possessing_party',
              source: 'urn:epc:id:pgln:4000001.00012',
            },
          ],
        }, {});

        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('sourceListsource=https://id.gs1.org/417/4000001000128type=https://ns.gs1.org/cbv/SDT-owning_partysource=https://id.gs1.org/417/4000001000128type=https://ns.gs1.org/cbv/SDT-possessing_party');
      });

      it('should pre-hash a destination list', () => {
        const str = eventToPreHashedString({
          destinationList: [
            {
              type: 'urn:epcglobal:cbv:sdt:possessing_party',
              destination: 'urn:epc:id:pgln:4012345.00000',
            },
            {
              type: 'urn:epcglobal:cbv:sdt:owning_party',
              destination: 'urn:epc:id:pgln:4012345.00000',
            },
            {
              type: 'urn:epcglobal:cbv:sdt:location',
              destination: 'urn:epc:id:sgln:4012345.00012.0',
            },
          ],
        }, {});
        const str2 = eventToPreHashedString({
          destinationList: [
            {
              destination: 'urn:epc:id:sgln:4012345.00012.0',
              type: 'urn:epcglobal:cbv:sdt:location',
            },
            {
              destination: 'urn:epc:id:pgln:4012345.00000',
              type: 'urn:epcglobal:cbv:sdt:owning_party',
            },
            {
              type: 'urn:epcglobal:cbv:sdt:possessing_party',
              destination: 'urn:epc:id:pgln:4012345.00000',
            },
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('destinationListdestination=https://id.gs1.org/414/4012345000122type=https://ns.gs1.org/cbv/SDT-locationdestination=https://id.gs1.org/417/4012345000009type=https://ns.gs1.org/cbv/SDT-owning_partydestination=https://id.gs1.org/417/4012345000009type=https://ns.gs1.org/cbv/SDT-possessing_party');
      });

      it('should pre-hash a quantity list', () => {
        const str = eventToPreHashedString({
          quantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
              quantity: 2030,
              uom: 'KGM',
            },
          ],
        }, {});
        const str2 = eventToPreHashedString({
          quantityList: [
            {
              uom: 'KGM',
              quantity: 2030,
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
            },
            {
              uom: 'KGM',
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
            },
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('quantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGM');
      });

      it('should pre-hash an input quantity list', () => {
        const str = eventToPreHashedString({
          inputQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
              quantity: 2030,
              uom: 'KGM',
            },
          ],
        }, {});
        const str2 = eventToPreHashedString({
          inputQuantityList: [
            {
              uom: 'KGM',
              quantity: 2030,
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
            },
            {
              uom: 'KGM',
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
            },
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('inputQuantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGM');
      });

      it('should pre-hash an output quantity list', () => {
        const str = eventToPreHashedString({
          outputQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
              quantity: 2030,
              uom: 'KGM',
            },
          ],
        }, {});
        const str2 = eventToPreHashedString({
          outputQuantityList: [
            {
              uom: 'KGM',
              quantity: 2030,
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
            },
            {
              uom: 'KGM',
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
            },
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('outputQuantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGM');
      });

      it('should pre-hash a child quantity list', () => {
        const str = eventToPreHashedString({
          childQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
              quantity: 2030,
              uom: 'KGM',
            },
          ],
        }, {});
        const str2 = eventToPreHashedString({
          childQuantityList: [
            {
              uom: 'KGM',
              quantity: 2030,
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
            },
            {
              uom: 'KGM',
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
            },
          ],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('childQuantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGM');
      });

      it('should pre-hash a sensor element list', () => {
        const list = [
          {
            sensorMetadata: {
              time: '2019-04-02T14:05:00.000+01:00',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
            },
            sensorReport: [
              {
                type: 'gs1:MT-Temperature',
                value: 26,
                uom: 'CEL',
              },
              {
                type: 'gs1:MT-Humidity',
                value: 12.1,
                uom: 'A93',
              },
              {
                type: 'gs1:MT-Speed',
                value: 160,
                uom: 'KMH',
              },
              {
                type: 'gs1:MT-Illuminance',
                value: 800,
                uom: 'LUX',
              },
            ],
          },
          {
            sensorMetadata: {
              time: '2019-04-02T14:35:00.000+01:00',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
            },
            sensorReport: [
              {
                type: 'gs1:MT-Temperature',
                value: 26.1,
                uom: 'CEL',
              },
              {
                type: 'gs1:MT-Humidity',
                value: 12.2,
                uom: 'A93',
              },
              {
                type: 'gs1:MT-Speed',
                value: 161,
                uom: 'KMH',
              },
              {
                type: 'gs1:MT-Illuminance',
                value: 801,
                uom: 'LUX',
              },
            ],
          },
          {
            sensorMetadata: {
              time: '2019-04-02T14:55:00.000+01:00',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
            },
            sensorReport: [
              {
                type: 'gs1:MT-Temperature',
                value: 26.2,
                uom: 'CEL',
              },
              {
                type: 'gs1:MT-Humidity',
                value: 12.2,
                uom: 'A93',
              },
              {
                type: 'gs1:MT-Speed',
                value: 162,
                uom: 'KMH',
              },
              {
                type: 'gs1:MT-Illuminance',
                value: 802,
                uom: 'LUX',
              },
            ],
          },
        ];

        const str = eventToPreHashedString({
          sensorElementList: list,
        }, {});
        const str2 = eventToPreHashedString({
          sensorElementList: [list[2], list[1], list[0]],
        }, {});
        expect(str).to.be.equal(str2);
        expect(str).to.be.equal('sensorElementListsensorElementsensorMetadatatime=2019-04-02T13:05:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=gs1:MT-Humidityvalue=12.1uom=A93sensorReporttype=gs1:MT-Illuminancevalue=800uom=LUXsensorReporttype=gs1:MT-Speedvalue=160uom=KMHsensorReporttype=gs1:MT-Temperaturevalue=26uom=CELsensorElementsensorMetadatatime=2019-04-02T13:35:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=gs1:MT-Humidityvalue=12.2uom=A93sensorReporttype=gs1:MT-Illuminancevalue=801uom=LUXsensorReporttype=gs1:MT-Speedvalue=161uom=KMHsensorReporttype=gs1:MT-Temperaturevalue=26.1uom=CELsensorElementsensorMetadatatime=2019-04-02T13:55:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=gs1:MT-Humidityvalue=12.2uom=A93sensorReporttype=gs1:MT-Illuminancevalue=802uom=LUXsensorReporttype=gs1:MT-Speedvalue=162uom=KMHsensorReporttype=gs1:MT-Temperaturevalue=26.2uom=CEL');
      });
    });

    it('Should return the same pre-hash (URN voc to URI equivalent)', () => {
      const str = eventToPreHashedString(exampleObjectEvent, context);
      const obj2 = exampleObjectEvent;
      obj2.bizStep = 'https://ns.gs1.org/cbv/BizStep-shipping';
      obj2.disposition = 'https://ns.gs1.org/cbv/Disp-in_transit';
      obj2.bizTransactionList[0].type = 'https://ns.gs1.org/cbv/BTT-po';
      obj2.destinationList[0].type = 'https://ns.gs1.org/cbv/SDT-owning_party';
      obj2.errorDeclaration.reason = 'https://ns.gs1.org/cbv/ER-incorrect_data';
      const str2 = eventToPreHashedString(obj2, context);
      expect(str2).to.be.equal(str);
    });

    it('should return a valid pre-hash of ilmd field', () => {
      const str = eventToPreHashedString({
        ilmd: {
          'cbvmda:lotNumber': 'LOTABC',
          'example:grading': 'A',
          'example2:userMasterData': {
            'example2:sizeCode': 'B-2',
          },
        },
      }, {
        example: 'https://ns.example.com/epcis',
        example2: 'https://ns.example2.com/epcis',
        cbvmda: 'urn:epcglobal:cbv:mda',
      });
      expect(str).to.be.equal('ilmd{https://ns.example.com/epcis}grading=A{https://ns.example2.com/epcis}userMasterData{https://ns.example2.com/epcis}sizeCode=B-2{urn:epcglobal:cbv:mda}lotNumber=LOTABC');
    });

    it('should return a valid pre-hash of custom fields', () => {
      const str = eventToPreHashedString({
        'example:userExt': {
          '#text': 'CD-34',
        },
        readPoint:
          {
            id: 'https://id.gs1.org/414/4012345000115',
            'example:myField1': 'AB-12',
          },
      }, {
        example: 'https://ns.example.com/epcis',
      });
      expect(str).to.be.equal('readPointid=https://id.gs1.org/414/4012345000115readPoint{https://ns.example.com/epcis}myField1=AB-12{https://ns.example.com/epcis}userExt=CD-34');

      const str2 = eventToPreHashedString({
        'example:myField3': {
          '@xmlns:example': 'https://ns.example.com/epcis',
          'example:mySubField3': [
            '3',
            '1',
          ],
        },
      }, {});
      expect(str2).to.be.equal('{https://ns.example.com/epcis}myField3{https://ns.example.com/epcis}mySubField3=1{https://ns.example.com/epcis}mySubField3=3');

      // don't throw error
      const str3 = eventToPreHashedString({
        action: 'OBSERVE',
        'example:myField3': {
          'example:mySubField3': [
            '3',
            '1',
          ],
        },
      }, {}, false);
      expect(str3).to.be.equal('action=OBSERVE');

      // throw an error
      expect(() => eventToPreHashedString({
        action: 'OBSERVE',
        'example:myField3': {
          'example:mySubField3': [
            '3',
            '1',
          ],
        },
      }, {})).to.throw();
    });

    it('should automatically add the context from custom fields', () => {
      const str = eventToPreHashedString({
        'example:userExt': {
          '@xmlns:example': 'https://ns.example.com/epcis',
          '#text': 'CD-34',
        },
        readPoint:
          {
            id: 'https://id.gs1.org/414/4012345000115', // urn:epc:id:sgln:4012345.00011.0
            'example:myField1': 'AB-12',
          },
      }, {});
      expect(str).to.be.equal('readPointid=https://id.gs1.org/414/4012345000115readPoint{htt' +
        'ps://ns.example.com/epcis}myField1=AB-12{https://ns.example.com/epcis}userExt=CD-34');
    });

    it('should pre-hash the event Type field', () => {
      const str = eventToPreHashedString({
        isA: 'TransformationEvent',
      }, {});
      expect(str).to.be.equal('eventType=TransformationEvent');
    });

    it('should pre-hash the action field', () => {
      const str = eventToPreHashedString({
        action: 'OBSERVE',
      }, {});
      expect(str).to.be.equal('action=OBSERVE');
    });

    it('should pre-hash a bizStep', () => {
      const str = eventToPreHashedString({
        bizStep: 'urn:epcglobal:cbv:bizstep:repairing',
      }, {});
      expect(str).to.be.equal('bizStep=https://ns.gs1.org/cbv/BizStep-repairing');
    });

    it('should pre-hash a disposition', () => {
      const str = eventToPreHashedString({
        disposition: 'urn:epcglobal:cbv:disp:damaged',
      }, {});
      expect(str).to.be.equal('disposition=https://ns.gs1.org/cbv/Disp-damaged');
    });

    it('should pre-hash a persistentDisposition - wait for issues on Github to be resolved');

    it('should pre-hash a readPoint', () => {
      const str = eventToPreHashedString({
        readPoint: { id: 'urn:epc:id:sgln:4012345.00011.0' },
      }, {});
      expect(str).to.be.equal('readPointid=https://id.gs1.org/414/4012345000115');
    });

    it('should pre-hash a bizLocation', () => {
      const str = eventToPreHashedString({
        bizLocation: { id: 'urn:epc:id:sgln:0012345.11111.0' },
      }, {});
      expect(str).to.be.equal('bizLocationid=https://id.gs1.org/414/0012345111112');
    });

    it('should pre-hash a parentID', () => {
      const str = eventToPreHashedString({
        parentID: 'urn:epc:id:sscc:4047023.0111111122',
      }, {});
      expect(str).to.be.equal('parentID=https://id.gs1.org/00/0404702301111111225');
    });

    it('should not pre-hash an eventID', () => {
      const str = eventToPreHashedString({
        eventID: 'id',
      }, {});
      expect(str).to.be.equal('');
    });

    it('should not pre-hash a recordTime', () => {
      const str = eventToPreHashedString({
        recordTime: exampleObjectEvent.recordTime,
      }, {});
      expect(str).to.be.equal('');
    });

    it('should pre-hash an eventTime', () => {
      const str = eventToPreHashedString({
        eventTime: '2019-10-21T11:00:30.000+01:00',
      }, {});
      expect(str).to.be.equal('eventTime=2019-10-21T10:00:30.000Z');
    });

    it('should pre-hash an eventTimeZoneOffset', () => {
      const str = eventToPreHashedString({
        eventTimeZoneOffset: '+01:00',
      }, {});
      expect(str).to.be.equal('eventTimeZoneOffset=+01:00');
    });

    it('should pre-hash an error Declaration', () => {
      const str = eventToPreHashedString({
        errorDeclaration: {
          declarationTime: '2020-01-15T00:00:00.000+01:00',
          reason: 'urn:epcglobal:cbv:er:incorrect_data',
          'example:vendorExtension': {
            '@xmlns:example': 'http://ns.example.com/epcis',
            '#text': 'Test1',
          },
        },
      }, {});
      expect(str).to.be.equal('errorDeclarationdeclarationTime=2020-01-14T23:00:00.000Zreason=https://ns.gs1.org/cbv/ER-incorrect_dataerrorDeclaration{http://ns.example.com/epcis}vendorExtension=Test1');
    });

    it('should pre-hash a transformation ID', () => {
      const str = eventToPreHashedString({
        transformationID: 'urn:epc:id:gdti:4012345.55555.1234',
      }, {});
      expect(str).to.be.equal('transformationID=https://id.gs1.org/253/40123455555541234');
    });

    it('should pre-hash a sensor metadata', () => {
      const str = eventToPreHashedString({
        sensorElementList: [
          {
            sensorMetadata: {
              time: '2019-04-02T14:05:00.000+01:00',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
            },
          },
        ],
      }, {});
      expect(str).to.be.equal('sensorElementListsensorElementsensorMetadatatime=2019-04-02T13:05:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999');
    });

    it('should replace cbv vocabulary', () => {
      const str = eventToPreHashedString({
        bizStep: 'repairing',
      }, {});
      expect(str).to.be.equal('bizStep=https://ns.gs1.org/cbv/BizStep-repairing');
      const str2 = eventToPreHashedString({
        disposition: 'damaged',
      }, {});
      expect(str2).to.be.equal('disposition=https://ns.gs1.org/cbv/Disp-damaged');
      const str3 = eventToPreHashedString({
        bizTransactionList: [
          {
            type: 'desadv',
            bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:4711',
          },
          {
            type: 'inv',
            bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:RE1099',
          },
        ],
      }, {});
      expect(str3).to.be.equal('bizTransactionListbizTransaction=urn:epcglobal:cbv:bt:5200001000008:4711type=https://ns.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:5200001000008:RE1099type=https://ns.gs1.org/cbv/BTT-inv');
      const str4 = eventToPreHashedString({
        destinationList: [
          {
            destination: 'urn:epc:id:sgln:4012345.00012.0',
            type: 'location',
          },
          {
            destination: 'urn:epc:id:pgln:4012345.00000',
            type: 'owning_party',
          },
          {
            type: 'possessing_party',
            destination: 'urn:epc:id:pgln:4012345.00000',
          },
        ],
      }, {});
      expect(str4).to.be.equal('destinationListdestination=https://id.gs1.org/414/4012345000122type=https://ns.gs1.org/cbv/SDT-locationdestination=https://id.gs1.org/417/4012345000009type=https://ns.gs1.org/cbv/SDT-owning_partydestination=https://id.gs1.org/417/4012345000009type=https://ns.gs1.org/cbv/SDT-possessing_party');
      const str5 = eventToPreHashedString({
        errorDeclaration: {
          declarationTime: '2020-01-15T00:00:00.000+01:00',
          reason: 'incorrect_data',
          'example:vendorExtension': {
            '@xmlns:example': 'http://ns.example.com/epcis',
            '#text': 'Test1',
          },
        },
      }, {});
      expect(str5).to.be.equal('errorDeclarationdeclarationTime=2020-01-14T23:00:00.000Zreason=https://ns.gs1.org/cbv/ER-incorrect_dataerrorDeclaration{http://ns.example.com/epcis}vendorExtension=Test1');
    });
  });

  describe('global tests for pre-hashing', () => {
    it('epcisDocHavingEventWithComment', () => {
      for (let i = 0; i < epcisDocHavingEventWithComment.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(epcisDocHavingEventWithComment.epcisBody.eventList[i],
          epcisDocHavingEventWithComment['@context'][1], false);
        expect(str).to.be.equal(epcisDocHavingEventWithCommentPreHash[i]);
      }
    });

    it('epcisDocWithCustomSchemaInContext', () => {
      for (let i = 0; i < epcisDocWithCustomSchemaInContext.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(epcisDocWithCustomSchemaInContext.epcisBody.eventList[i],
          epcisDocWithCustomSchemaInContext['@context'][1]);
        expect(str).to.be.equal(epcisDocWithCustomSchemaInContextPreHash[i]);
      }
    });

    it('epcisDocWithDefaultSchemaInContext', () => {
      for (let i = 0; i < epcisDocWithDefaultSchemaInContext.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(
          epcisDocWithDefaultSchemaInContext.epcisBody.eventList[i],
          {},
        );
        expect(str).to.be.equal(epcisDocWithDefaultSchemaInContextPreHash[i]);
      }
    });

    it('epcisDocWithSensorDataObjectEvent', () => {
      for (let i = 0; i < epcisDocWithSensorDataObjectEvent.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(epcisDocWithSensorDataObjectEvent.epcisBody.eventList[i],
          epcisDocWithSensorDataObjectEvent['@context'][1]);
        expect(str).to.be.equal(epcisDocWithSensorDataObjectEventPreHash[i]);
      }
    });

    it('epcisDocWithShippingAndTransportingEvent', () => {
      for (let i = 0;
        i < epcisDocWithShippingAndTransportingEvent.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(
          epcisDocWithShippingAndTransportingEvent.epcisBody.eventList[i],
          {},
        );
        expect(str).to.be.equal(epcisDocWithShippingAndTransportingEventPreHash[i]);
      }
    });

    it('epcisDocWithSingleEvent', () => {
      const str = eventToPreHashedString(epcisDocWithSingleEvent.epcisBody.event,
        epcisDocWithSingleEvent['@context'][1]);
      expect(str).to.be.equal(epcisDocWithSingleEventPreHash[0]);
    });

    it('epcisDocWithVariousEventTypes', () => {
      for (let i = 0; i < epcisDocWithVariousEventTypes.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(epcisDocWithVariousEventTypes.epcisBody.eventList[i],
          {});
        expect(str).to.be.equal(epcisDocWithVariousEventTypesPreHash[i]);
      }
    });

    it('epcisDocWithXMLstartTagAndErrorDeclaration', () => {
      for (let i = 0;
        i < epcisDocWithXMLstartTagAndErrorDeclaration.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(
          epcisDocWithXMLstartTagAndErrorDeclaration.epcisBody.eventList[i],
          {},
        );
        expect(str).to.be.equal(epcisDocWithXMLStartTagAndErrorDeclarationPreHash[i]);
      }
    });

    it('epclist_normalisation', () => {
      for (let i = 0; i < epclistNormalisation.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(epclistNormalisation.epcisBody.eventList[i],
          {});
        expect(str).to.be.equal(epcListNormalisationPreHash[i]);
      }
    });

    it('ReferenceEventHashAlgorithm', () => {
      for (let i = 0; i < ReferenceEventHashAlgorithm.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(ReferenceEventHashAlgorithm.epcisBody.eventList[i],
          {});
        expect(str).to.be.equal(ReferenceEventHashAlgorithmPreHash[i]);
      }
    });

    it('ReferenceEventHashAlgorithm2', () => {
      for (let i = 0; i < ReferenceEventHashAlgorithm2.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(ReferenceEventHashAlgorithm2.epcisBody.eventList[i],
          ReferenceEventHashAlgorithm2['@context'][1]);
        expect(str).to.be.equal(ReferenceEventHashAlgorithm2PreHash[i]);
      }
    });

    it('ReferenceEventHashAlgorithm3', () => {
      for (let i = 0; i < ReferenceEventHashAlgorithm3.epcisBody.eventList.length; i += 1) {
        const str = eventToPreHashedString(ReferenceEventHashAlgorithm3.epcisBody.eventList[i],
          ReferenceEventHashAlgorithm3['@context'][1]);
        expect(str).to.be.equal(ReferenceEventHashAlgorithm3PreHash[i]);
      }
    });
  });
});

describe('hashing of an EPCIS Event', () => {
  it('should hash the event', () => {
    const str = eventToHashedId({
      isA: 'ObjectEvent',
    }, context, true);
    expect(str).to.be.equal('ni:///sha-256;7aa6d15415d4b429d7c4f7b3f1aaebcdbd9a12ad5c6ff4951247b61e621b9659?ver=CBV2.0');
  });
});
