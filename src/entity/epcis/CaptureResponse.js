/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import request from '../../request/request';
import { timer } from '../../utils/utils';

export default class CaptureResponse {
  /**
   * You can only provide an already existing CaptureResponse
   * via Object
   * @param {Object} [captureResponse] - The object that will be used to create the epcisHeader
   * entity
   */
  constructor(captureResponse) {
    if (!captureResponse) {
      throw new Error('A capture response must be provided to the constructor');
    }
    if (!captureResponse.headers) {
      throw new Error('A capture response must have headers');
    }
    if (!captureResponse.headers.get('location')) {
      throw new Error('A capture response must have a location property in the headers');
    }
    this.location = captureResponse.headers.get('location');
    this.fetched = null;
  }

  /**
   * Getter for the location
   * @return {string}
   */
  getLocation() {
    return this.location;
  }

  /**
   * Getter for the running property
   * @return {boolean}
   */
  getRunningStatus() {
    if (!this.fetched) throw new Error('The capture job needs to be fetched to get the running status');
    return this.running;
  }

  /**
   * Getter for the success property
   * @return {boolean}
   */
  getSuccessStatus() {
    if (!this.fetched) throw new Error('The capture job needs to be fetched to get the success status');
    return this.success;
  }

  /**
   * Getter for the errors property
   * @return {Array<string>}
   */
  getErrors() {
    if (!this.fetched) throw new Error('The capture job needs to be fetched to get the errors');
    return this.errors;
  }

  /**
   * Getter for the error file property
   * @return {Object}
   */
  getErrorFile() {
    if (!this.fetched) throw new Error('The capture job needs to be fetched to get the error file');
    return this.errorFile;
  }

  async getCaptureJob(options = {}) {
    const captureId = this.location.split('/').pop();
    const endpoint = `capture/${captureId}`;
    const res = await request(endpoint, options);
    const json = await res.json();

    this.success = json.success;
    this.errors = json.errors;
    this.running = json.running;
    this.errorFile = json.errorFile;
    this.fetched = true;

    return json;
  }

  /**
   * Fetch the capture job information until the running field is equal to false. Stop trying after
   * [nbRetry] tries.
   * @param {number} nbRetry - how much time should it fetch the capture job until aborted
   * @param {number} delay - the delay between each call, in ms (2000 by default)
   * @param {Object} options - the request options
   * @returns {Promise<void>}
   */
  async pollForTheCaptureToFinish(nbRetry = 5, delay = 2000, options = {}) {
    let tries = 0;

    /* eslint-disable no-await-in-loop */
    do {
      if (tries !== 0) {
        await timer(delay);
      }

      await this.getCaptureJob(options);
      tries += 1;
    } while (tries < nbRetry && this.running);
    /* eslint-enable no-await-in-loop */
  }
}
