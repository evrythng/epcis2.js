/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-disable max-len */

import { expect } from 'chai';
import {
  addCheckDigitAndZeroPad,
  normalizeDigitalLinks,
} from '../../src/hash_generator/dlNormalizer';

describe('dl normalizer', () => {
  it('Should return a valid gtin', () => {
    expect(addCheckDigitAndZeroPad('7447010150', true)).to.be.equal('00074470101505');
    expect(addCheckDigitAndZeroPad('7447010150', true, 13)).to.be.equal('0074470101505');
    expect(addCheckDigitAndZeroPad('7447010150', true, 12)).to.be.equal('074470101505');
  });

  it('Should return the input since it is not a normalisable uri', () => {
    expect(normalizeDigitalLinks('foo')).to.be.equal('foo');
    expect(normalizeDigitalLinks('')).to.be.equal('');
  });

  it('Should normalize an urn with sgtin', () => {
    expect(normalizeDigitalLinks('urn:epc:id:sgtin:0614141.011111.987')).to.be.equal(
      'https://id.gs1.org/01/00614141111114/21/987',
    );
  });

  it('Should normalize an urn with sscc', () => {
    expect(normalizeDigitalLinks('urn:epc:id:sscc:4047023.0111111122')).to.be.equal(
      'https://id.gs1.org/00/0404702301111111225',
    );
  });

  it('Should normalize an urn with sgln', () => {
    expect(normalizeDigitalLinks('urn:epc:id:sgln:4012345.00012.0')).to.be.equal(
      'https://id.gs1.org/414/4012345000122',
    );
    expect(normalizeDigitalLinks('urn:epc:id:sgln:0012345.11111.0')).to.be.equal(
      'https://id.gs1.org/414/0012345111112',
    );
    expect(normalizeDigitalLinks('urn:epc:id:sgln:4012345.00011.0')).to.be.equal(
      'https://id.gs1.org/414/4012345000115',
    );
  });

  it('Should normalize an urn with grai', () => {
    expect(normalizeDigitalLinks('urn:epc:id:grai:4012345.00022.334455')).to.be.equal(
      'https://id.gs1.org/8003/04012345000221334455',
    );
  });

  it('Should normalize an urn with giai', () => {
    expect(normalizeDigitalLinks('urn:epc:id:giai:4000001.111')).to.be.equal(
      'https://id.gs1.org/8004/4000001111',
    );
  });

  it('Should normalize an urn with gsrn', () => {
    expect(normalizeDigitalLinks('urn:epc:id:gsrn:4012345.0000006765')).to.be.equal(
      'https://id.gs1.org/8018/401234500000067657',
    );
  });

  it('Should normalize an urn with gsrnp', () => {
    expect(normalizeDigitalLinks('urn:epc:id:gsrnp:4012345.0000000007')).to.be.equal(
      'https://id.gs1.org/8017/401234500000000074',
    );
  });

  it('Should normalize an urn with gdti', () => {
    expect(normalizeDigitalLinks('urn:epc:id:gdti:4012345.55555.1234')).to.be.equal(
      'https://id.gs1.org/253/40123455555541234',
    );
  });

  it('Should normalize an urn with cpi', () => {
    expect(normalizeDigitalLinks('urn:epc:id:cpi:0614141.11111111111111-A%23%2F.1234')).to.be.equal(
      'https://id.gs1.org/8010/061414111111111111111-A%23%2F/8011/1234',
    );
  });

  it('Should normalize an urn with sgcn');

  it('Should normalize an urn with ginc', () => {
    expect(normalizeDigitalLinks('urn:epc:id:ginc:0614141.xyz47%2F11')).to.be.equal(
      'https://id.gs1.org/401/0614141xyz47%2F11',
    );
  });

  it('Should normalize an urn with gsin', () => {
    expect(normalizeDigitalLinks('urn:epc:id:gsin:4012345.222333444')).to.be.equal(
      'https://id.gs1.org/402/40123452223334442',
    );
  });

  it('Should normalize an urn with itip', () => {
    expect(normalizeDigitalLinks('urn:epc:id:itip:4012345.011111.01.02.987')).to.be.equal(
      'https://id.gs1.org/8006/040123451111180102/21/987',
    );
  });

  it('Should normalize an urn with upui', () => {
    expect(
      normalizeDigitalLinks('urn:epc:id:upui:1234567.098765.51qIgY)%3C%26Jp3*j7SDB'),
    ).to.be.equal('https://id.gs1.org/01/01234567987651/235/51qIgY%29%3C%26Jp3%2Aj7SDB');
  });

  it('Should normalize an urn with pgln', () => {
    expect(normalizeDigitalLinks('urn:epc:id:pgln:4012345.00000')).to.be.equal(
      'https://id.gs1.org/417/4012345000009',
    );
    expect(normalizeDigitalLinks('urn:epc:id:pgln:4000001.00000')).to.be.equal(
      'https://id.gs1.org/417/4000001000005',
    );
  });

  it('Should normalize an urn with lgtin', () => {
    expect(normalizeDigitalLinks('urn:epc:class:lgtin:4012345.099988.2014-02-10')).to.be.equal(
      'https://id.gs1.org/01/04012345999884/10/2014-02-10',
    );
    expect(normalizeDigitalLinks('urn:epc:class:lgtin:4054739.099914.20160711')).to.be.equal(
      'https://id.gs1.org/01/04054739999148/10/20160711',
    );
    expect(normalizeDigitalLinks('urn:epc:class:lgtin:4012345.012345.Lot987')).to.be.equal(
      'https://id.gs1.org/01/04012345123456/10/Lot987',
    );
  });

  it('Should normalize an urn with idpat sgtin', () => {
    expect(normalizeDigitalLinks('urn:epc:idpat:sgtin:4012345.012345.*')).to.be.equal(
      'https://id.gs1.org/01/04012345123456',
    );
  });

  it('Should normalize an urn with idpat grai', () => {
    expect(normalizeDigitalLinks('urn:epc:idpat:grai:4012345.99999.*')).to.be.equal(
      'https://id.gs1.org/8003/04012345999990',
    );
  });

  it('Should normalize an urn with idpat gdti', () => {
    expect(normalizeDigitalLinks('urn:epc:idpat:gdti:4012345.11111.*')).to.be.equal(
      'https://id.gs1.org/253/4012345111118',
    );
  });

  it('Should normalize an urn with idpat sgcn', () => {
    expect(normalizeDigitalLinks('urn:epc:idpat:sgcn:4012345.22222.*')).to.be.equal(
      'https://id.gs1.org/255/4012345222227',
    );
  });

  it('Should normalize an urn with idpat cpi', () => {
    expect(normalizeDigitalLinks('urn:epc:idpat:cpi:4012345.AB12.*')).to.be.equal(
      'https://id.gs1.org/8010/4012345AB12',
    );
  });

  it('Should normalize an urn with idpat itip', () => {
    expect(normalizeDigitalLinks('urn:epc:idpat:itip:4012345.012345.01.02.*')).to.be.equal(
      'https://id.gs1.org/8006/040123451234560102',
    );
  });

  it('Should normalize an urn with idpat upui', () => {
    expect(normalizeDigitalLinks('urn:epc:idpat:upui:4012345.012345.*')).to.be.equal(
      'https://id.gs1.org/01/04012345123456',
    );
  });

  it('Should normalize an uri with letters and ais', () => {
    expect(normalizeDigitalLinks('https://id.gs1.org/gtin/09780345418913')).to.be.equal(
      'https://id.gs1.org/01/09780345418913',
    );
    expect(
      normalizeDigitalLinks('https://example.com/gtin/09780345418913/21/765tz?abc=211121'),
    ).to.be.equal('https://id.gs1.org/01/09780345418913/21/765tz');
  });

  it('Should normalize a GTIN 8 12 13', () => {
    expect(normalizeDigitalLinks('http://example.de/gtin-8/01/97803111')).to.be.equal(
      'https://id.gs1.org/01/00000097803111',
    );
    expect(normalizeDigitalLinks('http://us-company-with-UPC.com/01/001122334455')).to.be.equal(
      'https://id.gs1.org/01/00001122334455',
    );
    expect(
      normalizeDigitalLinks('http://us-company-with-UPC.com/01/001122334455/ser/GHB'),
    ).to.be.equal('https://id.gs1.org/01/00001122334455/21/GHB');
    expect(normalizeDigitalLinks('https://ean-13.de/gtin/4012345123456/ser/ABC524')).to.be.equal(
      'https://id.gs1.org/01/04012345123456/21/ABC524',
    );
  });

  it('Should replace http', () => {
    expect(normalizeDigitalLinks('http://id.gs1.org/gtin/9780345418913')).to.be.equal(
      'https://id.gs1.org/01/09780345418913',
    );
  });

  it('Should replace subdomains', () => {
    expect(
      normalizeDigitalLinks('https://gs1.test.example.org/01/9780345418913/10/1223'),
    ).to.be.equal('https://id.gs1.org/01/09780345418913/10/1223');
  });

  it('Should remove qualifier and custom data attributes', () => {
    expect(
      normalizeDigitalLinks('https://example.org/01/9780345418913/21/765tz?11=221109'),
    ).to.be.equal('https://id.gs1.org/01/09780345418913/21/765tz');
    expect(
      normalizeDigitalLinks('https://example.org/01/9780345418913/21/765tz?abc=211121'),
    ).to.be.equal('https://id.gs1.org/01/09780345418913/21/765tz');
  });
  it('Should replace other gs1 keys', () => {
    expect(normalizeDigitalLinks('https://id.gs1.org/00/340123453111111115')).to.be.equal(
      'https://id.gs1.org/00/340123453111111115',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/414/4226350800008')).to.be.equal(
      'https://id.gs1.org/414/4226350800008',
    );
    expect(normalizeDigitalLinks('https://example.co.uk/party/4226350800008')).to.be.equal(
      'https://id.gs1.org/417/4226350800008',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/414/4280000000002/254/12')).to.be.equal(
      'https://id.gs1.org/414/4280000000002/254/12',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/8003/03870585000552987')).to.be.equal(
      'https://id.gs1.org/8003/03870585000552987',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/8004/0180451111ABC987')).to.be.equal(
      'https://id.gs1.org/8004/0180451111ABC987',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/8018/385888700111111111')).to.be.equal(
      'https://id.gs1.org/8018/385888700111111111',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/8017/440018922222222226')).to.be.equal(
      'https://id.gs1.org/8017/440018922222222226',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/253/4602443000331XYZ')).to.be.equal(
      'https://id.gs1.org/253/4602443000331XYZ',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/8010/0628165987/8011/9876')).to.be.equal(
      'https://id.gs1.org/8010/0628165987/8011/9876',
    );
    expect(normalizeDigitalLinks('https://id.gs1.org/255/0811625999996554433')).to.be.equal(
      'https://id.gs1.org/255/0811625999996554433',
    );
    expect(
      normalizeDigitalLinks('http://fashion.com/itip/040123451234560102/ser/ABC145'),
    ).to.be.equal('https://id.gs1.org/8006/040123451234560102/21/ABC145');
  });
  it('Should not replace non existent key ai', () => {
    expect(normalizeDigitalLinks('http://example.org/123/4012345ABC987/456/4711')).to.be.equal(
      'http://example.org/123/4012345ABC987/456/4711',
    );
    expect(normalizeDigitalLinks('http://id.gs1.org/99/9780345418913')).to.be.equal(
      'http://id.gs1.org/99/9780345418913',
    );
    expect(normalizeDigitalLinks('http://id.gs1.org/01/9780345418913/99/utfgf')).to.be.equal(
      'http://id.gs1.org/01/9780345418913/99/utfgf',
    );
  });
  it('Should not replace ordinary web uri', () => {
    expect(normalizeDigitalLinks('http://example.org/123/4012345ABC987/456/4711')).to.be.equal(
      'http://example.org/123/4012345ABC987/456/4711',
    );
    expect(normalizeDigitalLinks('http://id.gs1.org/99/9780345418913')).to.be.equal(
      'http://id.gs1.org/99/9780345418913',
    );
    expect(normalizeDigitalLinks('http://id.gs1.org/01/9780345418913/99/utfgf')).to.be.equal(
      'http://id.gs1.org/01/9780345418913/99/utfgf',
    );
  });
});
