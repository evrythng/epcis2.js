import { expect } from 'chai';
import fetchMock from 'fetch-mock';
import settings from '../src/settings';
import request, { buildUrl } from '../src/request/request';
import setup from '../src/setup';
import { prepare, tearDown } from './helper/apiMock';

// Copy initial settings
const initialSettings = { ...settings };

let req;

describe('requests utils', () => {
  it('should build a valid url', () => {
    expect(buildUrl(initialSettings, '')).to.be.equal(initialSettings.apiUrl);
    expect(buildUrl(initialSettings, 'capture')).to.be.equal(`${initialSettings.apiUrl}capture`);
    expect(buildUrl({ apiUrl: 'https://example.com' }, 'capture')).to.be.equal('https://example.com/capture');
  });
});

describe('requests', () => {
  beforeEach((done) => {
    prepare();
    done();
  });

  afterEach((done) => {
    setup(initialSettings);
    req.then(() => tearDown(done)).catch(done.fail);
  });

  describe('options', () => {
    describe('defaults', () => {
      it('should have default url and method', () => {
        req = request('').then(() => {
          expect(fetchMock.lastUrl()).to.be.equal(initialSettings.apiUrl);
        });
      });
    });
  });
});
