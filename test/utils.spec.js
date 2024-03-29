/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { expect } from 'chai';
import {
  getTheTimeZoneOffsetFromDateString,
  getTimeZoneOffset,
  numberToZeroPadString,
  offsetToString,
  buildSGTINUri,
  buildSGLNUri,
  buildSSCCUri,
  buildGRAIUri,
  buildGIAIUri,
  buildGSRNUri,
  buildGSRNPUri,
  buildGDTIUri,
  buildCPIUri,
  buildSGCNUri,
  buildGINCUri,
  buildGSINUri,
  buildITIPUri,
  buildGIDUri,
} from '../src/utils/utils';
import objectToEvent from '../src/utils/entityUtils';
import ObjectEvent from '../src/entity/events/ObjectEvent';
import TransformationEvent from '../src/entity/events/TransformationEvent';
import TransactionEvent from '../src/entity/events/TransactionEvent';
import AggregationEvent from '../src/entity/events/AggregationEvent';
import AssociationEvent from '../src/entity/events/AssociationEvent';
import ExtendedEvent from '../src/entity/events/ExtendedEvent';
import buildDigitalLinkFromEpc from '../src/utils/epc';
import setup from '../src/setup';

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
      expect(() => getTimeZoneOffset('TEST')).to.throw('The TimeZoneOffset is invalid');
      expect(() => getTimeZoneOffset('123:08')).to.throw('The TimeZoneOffset is invalid');
      expect(() => getTimeZoneOffset('+1u:08')).to.throw('The TimeZoneOffset is invalid');
      expect(() => getTimeZoneOffset('+10:08')).to.not.throw();
      expect(() => getTimeZoneOffset(new Date(Date.now()))).to.throw(
        'The parameter provided in the constructor should be a number or a string',
      );
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
      const o = objectToEvent({});
      expect(o).to.be.instanceOf(ExtendedEvent);
      const type = o.getType();
      expect(type).to.be.equal(undefined);
      const o1 = objectToEvent({ type: 'foo' });
      expect(o1).to.be.instanceOf(ExtendedEvent);
      const type1 = o1.getType();
      expect(type1).to.be.a('string');
    });

    it('should return an ObjectEvent', async () => {
      const o = objectToEvent({ type: 'ObjectEvent' });
      expect(o).to.be.instanceof(ObjectEvent);
      const type = o.getType();
      expect(type).to.be.equal('ObjectEvent');
    });

    it('should return an AggregationEvent', async () => {
      const o = objectToEvent({ type: 'AggregationEvent' });
      expect(o).to.be.instanceof(AggregationEvent);
      const type = o.getType();
      expect(type).to.be.equal('AggregationEvent');
    });

    it('should return an TransactionEvent', async () => {
      const o = objectToEvent({ type: 'TransactionEvent' });
      expect(o).to.be.instanceof(TransactionEvent);
      const type = o.getType();
      expect(type).to.be.equal('TransactionEvent');
    });

    it('should return an TransformationEvent', async () => {
      const o = objectToEvent({ type: 'TransformationEvent' });
      expect(o).to.be.instanceof(TransformationEvent);
      const type = o.getType();
      expect(type).to.be.equal('TransformationEvent');
    });

    it('should return an AssociationEvent', async () => {
      const o = objectToEvent({ type: 'AssociationEvent' });
      expect(o).to.be.instanceof(AssociationEvent);
      const type = o.getType();
      expect(type).to.be.equal('AssociationEvent');
    });
  });

  describe('build URI functions', () => {
    it('should build sgtin uri', async () => {
      expect(buildSGTINUri('0195500', '500406', '123456786703')).to.be.equal(
        'urn:epc:id:sgtin:0195500.500406.123456786703',
      );
    });

    it('should build sgln uri', async () => {
      expect(buildSGLNUri('0195500', '00001', '0')).to.be.equal('urn:epc:id:sgln:0195500.00001.0');
    });

    it('should build sscc uri', async () => {
      expect(buildSSCCUri('0614141', '1234567890')).to.be.equal(
        'urn:epc:id:sscc:0614141.1234567890',
      );
    });

    it('should build GRAI uri', async () => {
      expect(buildGRAIUri('0614141', '12345', '400')).to.be.equal(
        'urn:epc:id:grai:0614141.12345.400',
      );
    });

    it('should build giai uri', async () => {
      expect(buildGIAIUri('0614141', '12345400')).to.be.equal('urn:epc:id:giai:0614141.12345400');
    });

    it('should build gsrn uri', async () => {
      expect(buildGSRNUri('0614141', '1234567890')).to.be.equal(
        'urn:epc:id:gsrn:0614141.1234567890',
      );
    });

    it('should build gsrnp uri', async () => {
      expect(buildGSRNPUri('0614141', '1234567890')).to.be.equal(
        'urn:epc:id:gsrnp:0614141.1234567890',
      );
    });

    it('should build gdti uri', async () => {
      expect(buildGDTIUri('0614141', '12345', '400')).to.be.equal(
        'urn:epc:id:gdti:0614141.12345.400',
      );
    });

    it('should build cpi uri', async () => {
      expect(buildCPIUri('0614141', '123ABC', '123456789')).to.be.equal(
        'urn:epc:id:cpi:0614141.123ABC.123456789',
      );
    });

    it('should build sgcn uri', async () => {
      expect(buildSGCNUri('4012345', '67890', '04711')).to.be.equal(
        'urn:epc:id:sgcn:4012345.67890.04711',
      );
    });

    it('should build ginc uri', async () => {
      expect(buildGINCUri('0614141', 'xyz3311cba')).to.be.equal(
        'urn:epc:id:ginc:0614141.xyz3311cba',
      );
    });

    it('should build gsin uri', async () => {
      expect(buildGSINUri('0614141', '123456789')).to.be.equal('urn:epc:id:gsin:0614141.123456789');
    });

    it('should build itip uri', async () => {
      expect(buildITIPUri('4012345', '012345', '01', '02', '987')).to.be.equal(
        'urn:epc:id:itip:4012345.012345.01.02.987',
      );
    });

    it('should build gid uri', async () => {
      expect(buildGIDUri('95100000', '12345', '400')).to.be.equal(
        'urn:epc:id:gid:95100000.12345.400',
      );
    });
  });

  describe('build Digital link from epc', () => {
    it('should build a valid digital link from a valid epc', async () => {
      expect(buildDigitalLinkFromEpc('3074257bf7194e4000001a85'))
        .to.be.equal('https://dlnkd.tn.gg/01/80614141123458/21/6789');
      expect(buildDigitalLinkFromEpc('3074257af7194e4000001a81'))
        .to.be.equal('https://dlnkd.tn.gg/01/80614077123454/21/6785');
      expect(buildDigitalLinkFromEpc('30740086604E20400000007B'))
        .to.be.equal('https://dlnkd.tn.gg/01/00008600800013/21/123');
    });

    it('should throw when passing invalid epc', async () => {
      expect(() => buildDigitalLinkFromEpc('40740086604E20400000007B')).to.throw();
      expect(() => buildDigitalLinkFromEpc('00740086604E20400000007B')).to.throw();
    });

    it('should set up the right domain when passing it as param', async () => {
      expect(buildDigitalLinkFromEpc('30740086604E20400000007B', {
        digitalLinkDomain: 'https://evrythng.com',
      }))
        .to.be.equal('https://evrythng.com/01/00008600800013/21/123');
    });

    it('should set up the right domain when calling the setup function', async () => {
      setup({
        digitalLinkDomain: 'https://digimarc.com',
      });
      expect(buildDigitalLinkFromEpc('30740086604E20400000007B'))
        .to.be.equal('https://digimarc.com/01/00008600800013/21/123');
    });

    it('should set up the right domain when overriding it in params', async () => {
      setup({
        digitalLinkDomain: 'https://digimarc.com',
      });
      expect(buildDigitalLinkFromEpc('30740086604E20400000007B', {
        digitalLinkDomain: 'https://evrythng.com',
      }))
        .to.be.equal('https://evrythng.com/01/00008600800013/21/123');
    });
  });
});
