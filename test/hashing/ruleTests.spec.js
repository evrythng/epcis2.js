/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { expect } from 'chai';
import {
  eventToPreHashedString,
  getPreHashStringOfField,
} from '../../src/hash_generator/EPCISEventToPreHashedString';

describe('rule tests', () => {
  // The rules are defined here : https://github.com/RalphTro/epcis-event-hash-generator#algorithm

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
    str = getPreHashStringOfField('field', 10.1, true);
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
    const str = eventToPreHashedString(
      {
        bizStep: 'repairing',
      },
      {},
    );
    expect(str).to.be.equal('bizStep=https://ns.gs1.org/cbv/BizStep-repairing');
  });

  it('should follow rule n°15', () => {
    const str = getPreHashStringOfField('field', 'urn:epc:id:sgtin:0614141.011111.987', true);
    expect(str).to.be.equal('field=https://id.gs1.org/01/00614141111114/21/987');
  });

  it('should follow rule n°16', () => {
    const str = getPreHashStringOfField('field', '', true);
    expect(str).to.be.equal('field=');
  });
});
