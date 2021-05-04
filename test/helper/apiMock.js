/* eslint-env jasmine */
import fetchMock from 'fetch-mock'
import responses from './responses'
import settings from '../../src/settings'

/**
 * Delayed promise.
 *
 * @param {Number} time - Delay time in milliseconds
 */
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

/**
 * Init API mock as a whole.
 */
export function prepare () {
  // Root - generic requests handles
  fetchMock.mock(settings.endpoint, responses.ok)
}

/**
 * Wait a few milliseconds to ensure there are no pending Promises
 * chains that will call fetch.
 *
 * @param {Function} done - Jasmine done callback
 */
export async function tearDown (done) {
  delay(100).then(() => {
    fetchMock.restore()
    done()
  })
}