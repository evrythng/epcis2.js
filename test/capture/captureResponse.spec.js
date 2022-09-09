/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { expect } from 'chai';
import { CaptureResponse } from '../../src';
import * as sdk from '../../src';
import { prepare, tearDown } from '../helper/apiMock';
import setup from '../../src/setup';
import settings from '../../src/settings';

const initialSettings = { ...settings };

let req;

const captureResponse = { headers: new Map() };
captureResponse.headers.set('location', '/epcis/capture/CAPTURE_JOB_ID');

describe('Unit tests: Capture response', () => {
  beforeEach((done) => {
    prepare();
    done();
  });

  afterEach((done) => {
    setup(initialSettings);
    if (req) {
      req.then(() => tearDown(done)).catch(done.fail);
    } else {
      done();
    }
  });

  it('should create a valid capture reponse', async () => {
    const cr = new sdk.CaptureResponse(captureResponse);
    expect(cr.getLocation()).to.be.equal('capture/CAPTURE_JOB_ID');
  });

  it('should throw when passing a wrong object', async () => {
    const error = 'A capture response needs to be provided to the constructor';
    expect(() => new CaptureResponse()).to.throw(error);
  });

  it('should not be able to access capture job field before fetching them', async () => {
    const cr = new sdk.CaptureResponse(captureResponse);
    expect(() => cr.getErrors()).to.throw('The capture job needs to be fetched to get the errors');
    expect(() => cr.getErrorFile()).to.throw('The capture job needs to be fetched to get the error file');
    expect(() => cr.getSuccessStatus()).to.throw('The capture job needs to be fetched to get the success status');
    expect(() => cr.getRunningStatus()).to.throw('The capture job needs to be fetched to get the running status');
  });

  it('should fetch the capture job information', async () => {
    const cr = new sdk.CaptureResponse(captureResponse);
    const res = await cr.getCaptureJob();
    expect(res).to.be.deep.equal({
      captureID: '28913f92-0de4-4fa9-9d64-bc762b694ae5',
      createdAt: '2022-09-01T11:29:30.927Z',
      running: false,
      success: true,
      errors: [],
    });
  });

  it('should automatically update the information', async () => {
    const cr = new sdk.CaptureResponse(captureResponse);
    await cr.getCaptureJob();
    expect(cr.getErrors()).to.be.deep.equal([]);
    expect(cr.getSuccessStatus()).to.be.deep.equal(true);
    expect(cr.getRunningStatus()).to.be.deep.equal(false);
  });

  it('should wait for the capture job to be complete', async () => {
    const cr = new sdk.CaptureResponse(captureResponse);
    await cr.waitForTheCaptureToFinish(5, 2000);
    expect(cr.getRunningStatus()).to.be.equal(false);
  });
});
