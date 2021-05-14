import { assert, expect } from 'chai';
import fetchMock from 'fetch-mock';
import settings from '../src/settings';
import request, { buildUrl } from '../src/request/request';
import setup from '../src/setup';
import { prepare, tearDown } from './helper/apiMock';
import EPCISDocument from '../src/entity/epcis/EPCISDocument';
import capture from '../src/request/capture';
import EPCISDocumentObjectEvent from './data/EPCISDocument-ObjectEvent.json';

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
          expect(fetchMock.lastOptions().headers['content-type']).to.be.equal('application/json');
        });
      });
    });

    describe('custom', () => {
      it('should add Authorization to request header and override apiUrl', () => {
        req = request('', {
          headers: {
            'content-type': 'application/json',
            Authorization: 'key',
          },
          apiUrl: 'https://evrythng.com',
        }).then(() => {
          expect(fetchMock.lastUrl()).to.be.equal('https://evrythng.com/');
          expect(fetchMock.lastOptions().headers['content-type']).to
            .be.equal('application/json');
          expect(fetchMock.lastOptions().headers.Authorization).to.be.equal('key');
        });
      });
    });
  });

  describe('request', () => {
    it('should throw an error when the request timeout', () => {
      // test with and without fast request
      setup({ timeout: 750, apiUrl: 'https://google.com' });
      req = request('').catch((e) => {
        expect(e.toString()).to.be.equal('Request timeout');
      });
    });

    it('should not throw an error when the request does not timeout', () => {
      // test with and without fast request
      setup({ timeout: 1750, apiUrl: 'https://google.com' });
      req = request('').then((res) => {
        expect(res.status).to.be.equal(200);
      });
    });

    it('should not throw an error when the request does not timeout', () => {
      // test with and without fast request
      setup({ timeout: 750 });
      req = request('').then((res) => {
        expect(res.status).to.be.equal(200);
      });
    });
  });

  describe('capture', () => {
    it('should send a valid EPCISDocument via POST', () => {
      const doc = new EPCISDocument(EPCISDocumentObjectEvent);
      req = capture(doc).then(() => {
        expect(fetchMock.lastOptions().method).to.be.equal('POST');
        const docSent = JSON.parse(fetchMock.lastOptions().body);
        expect(docSent).to.deep.equal(doc.toObject());
      });
    });

    it('should not send an invalid EPCISDocument via POST', () => {
      const doc = new EPCISDocument();
      doc.setContext(undefined);
      assert.throws(() => {
        req = capture(doc);
      });
    });

    it('should send an invalid EPCISDocument via POST (override documentValidation locally)',
      () => {
        const doc = new EPCISDocument();
        delete doc['@context'];
        req = capture(doc, { documentValidation: false }).then(() => {
          const docSent = JSON.parse(fetchMock.lastOptions().body);
          expect(docSent).to.deep.equal(doc.toObject());
        });
      });

    it('should send an invalid EPCISDocument via POST (override documentValidation globally)', () => {
      const doc = new EPCISDocument();
      delete doc['@context'];
      setup({ documentValidation: false });
      req = capture(doc).then(() => {
        const docSent = JSON.parse(fetchMock.lastOptions().body);
        expect(docSent).to.deep.equal(doc.toObject());
      });
    });
  });
});
