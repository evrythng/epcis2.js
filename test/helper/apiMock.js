/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-env jasmine */
import fetchMock from 'fetch-mock';
import responses from './responses';
import settings from '../../src/settings';

/**
 * Delayed promise.
 *
 * @param {Number} time - Delay time in milliseconds
 */
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * Init API mock as a whole.
 */
export function prepare() {
  // Root - generic requests handles
  fetchMock.mock(settings.apiUrl, responses.ok, { overwriteRoutes: false });
  fetchMock.mock('https://evrythng.com', responses.ok, { overwriteRoutes: false });
  fetchMock.mock('https://google.com', () => delay(1500).then(() => ({ Ack: true })), { overwriteRoutes: false });
  fetchMock.post('end:/capture', responses.ok, { overwriteRoutes: false });
  fetchMock.get('end:/capture/CAPTURE_JOB_ID', responses.captureJob, { overwriteRoutes: false });
}

/**
 * Wait a few milliseconds to ensure there are no pending Promises
 * chains that will call fetch.
 *
 * @param {Function} done - Jasmine done callback
 */
export async function tearDown(done) {
  await delay(100);
  fetchMock.restore();
  done();
}
