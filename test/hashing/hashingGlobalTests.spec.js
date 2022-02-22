/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { expect } from 'chai';
import { eventToHashedId } from '../../src';
import { sampleContext } from '../data/hashing/samplePrehashesAndHashes';

describe('hashing of an EPCIS Event', () => {
  it('should hash the event', () => {
    const str = eventToHashedId({
      type: 'ObjectEvent',
    }, sampleContext, true);
    expect(str).to.be.equal('ni:///sha-256;7aa6d15415d4b429d7c4f7b3f1aaebcdbd9a12ad5c6ff4951247b61e621b9659?ver=CBV2.0');
  });
});
