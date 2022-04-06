/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { expect } from 'chai';
import setup from '../src/setup';
import { defaultSettings } from '../src/settings';

describe('unit tests for setup.js', () => {
  it('should use default settings', async () => {
    const settings = setup({});
    expect(settings.eventTimeZoneOffset).to.be.equal(undefined);
    expect(settings.apiUrl).to.be.equal(defaultSettings.apiUrl);
    expect(settings.headers.toString()).to.be.equal(
      {
        'content-type': 'application/json',
      }.toString(),
    );
    expect(settings.validationMode).to.be.equal('full');
  });

  it('should use custom settings', async () => {
    const settings = setup({
      apiUrl: 'google.com',
      eventTimeZoneOffset: '-02:00',
      headers: {
        'content-type': 'application/json',
        authorization: 'abc',
      },
      validationMode: 'fast',
    });
    expect(settings.eventTimeZoneOffset).to.be.equal('-02:00');
    expect(settings.apiUrl).to.be.equal('google.com');
    expect(settings.headers.toString()).to.be.equal(
      {
        'content-type': 'application/json',
        authorization: 'abc',
      }.toString(),
    );
    expect(settings.validationMode).to.be.equal('fast');
  });
});
