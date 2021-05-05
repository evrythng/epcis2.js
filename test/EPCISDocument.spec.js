import { expect } from 'chai';
import setup from '../src/setup';
import { defaultSettings } from '../src/settings';
import EPCISDocument from '../src/entity/EPCISDocument';

const exampleEPCISDocument = {
  '@context': ['https://gs1.github.io/EPCIS/epcis-context.jsonld', { example: 'http://ns.example.com/epcis/' }],
  id: '_:document1',
  isA: 'EPCISDocument',
  schemaVersion: '2.0',
  creationDate: '2005-07-11T11:30:47.0Z',
  format: 'application/ld+json',
  epcisBody: {
    eventList: [
      {
        eventID: 'ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0',
        isA: 'ObjectEvent',
        action: 'OBSERVE',
        bizStep: 'urn:epcglobal:cbv:bizstep:shipping',
        disposition: 'urn:epcglobal:cbv:disp:in_transit',
        epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
        eventTime: '2005-04-03T20:33:31.116000-06:00',
        eventTimeZoneOffset: '-06:00',
        readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
        bizTransactionList: [{
          type: 'urn:epcglobal:cbv:btt:po',
          bizTransaction: 'http://transaction.acme.com/po/12345678',
        }],
      },
      {
        eventID: 'ni:///sha-256;00e1e6eba3a7cc6125be4793a631f0af50f8322e0ab5f2c0bab994a11cec1d79?ver=CBV2.0',
        isA: 'ObjectEvent',
        action: 'OBSERVE',
        bizStep: 'urn:epcglobal:cbv:bizstep:receiving',
        disposition: 'urn:epcglobal:cbv:disp:in_progress',
        epcList: ['urn:epc:id:sgtin:0614141.107346.2018'],
        eventTime: '2005-04-04T20:33:31.116-06:00',
        eventTimeZoneOffset: '-06:00',
        readPoint: { id: 'urn:epc:id:sgln:0012345.11111.400' },
        bizLocation: { id: 'urn:epc:id:sgln:0012345.11111.0' },
        bizTransactionList: [
          { type: 'urn:epcglobal:cbv:btt:po', bizTransaction: 'http://transaction.acme.com/po/12345678' },
          { type: 'urn:epcglobal:cbv:btt:desadv', bizTransaction: 'urn:epcglobal:cbv:bt:0614141073467:1152' },
        ],
        'example:myField': 'Example of a vendor/user extension',
      },
    ],
  },
};

describe('unit tests for the ObjectEvent class', () => {
  describe('setup function and EPCISDocument class', () => {
    afterEach((done) => {
      setup(defaultSettings);
      done();
    });
    it('should use default values', async () => {
      const e = new EPCISDocument();
      expect(e.isA).to.be.equal('EPCISDocument');
    });
  });

  it('setters should set the variables correctly', async () => {
    const e = new EPCISDocument()
      .setContext(exampleEPCISDocument['@context'])
      .setCreationDate(exampleEPCISDocument.creationDate)
      .setSchemaVersion(exampleEPCISDocument.schemaVersion)
      .setFormat(exampleEPCISDocument.format);
    expect(e.getContext()).to.be.equal(exampleEPCISDocument['@context']);
    expect(e.getCreationDate()).to.be.equal(exampleEPCISDocument.creationDate);
    expect(e.getSchemaVersion()).to.be.equal(exampleEPCISDocument.schemaVersion);
    expect(e.getSchemaVersion()).to.be.equal(exampleEPCISDocument.schemaVersion);
  });
  it('creation from object should set the variables correctly', async () => {
    const e = new EPCISDocument(exampleEPCISDocument);
    // expect(e.toObject()).to.deep.equal(exampleEPCISDocument);
    expect(e.getContext()).to.be.equal(exampleEPCISDocument['@context']);
    expect(e.getCreationDate()).to.be.equal(exampleEPCISDocument.creationDate);
    expect(e.getSchemaVersion()).to.be.equal(exampleEPCISDocument.schemaVersion);
  });

  describe('Context can have different types', () => {
    it('context can be a string', async () => {
      const context = 'context';
      let e = new EPCISDocument({ '@context': context });
      expect(e.toObject()['@context']).to.deep.equal(context);
      e = new EPCISDocument().setContext(context);
      expect(e.toObject()['@context']).to.deep.equal(context);
    });
    it('context can be an object', async () => {
      const context = { key: 'value', key2: 'value2' };
      let e = new EPCISDocument({ '@context': context });
      expect(e.toObject()['@context']).to.deep.equal(context);
      e = new EPCISDocument().setContext(context);
      expect(e.toObject()['@context']).to.deep.equal(context);
    });
    it('context can be an array of string', async () => {
      const context = ['v', 'v2', 'v3'];
      let e = new EPCISDocument({ '@context': context });
      expect(e.toObject()['@context']).to.deep.equal(context);
      e = new EPCISDocument().setContext(context);
      expect(e.toObject()['@context']).to.deep.equal(context);
    });
    it('context can be an array of object', async () => {
      const context = [{ key3: 'value3', key2: 'value2' }, { key: 'value', key2: 'value2' }];
      let e = new EPCISDocument({ '@context': context });
      expect(e.toObject()['@context']).to.deep.equal(context);
      e = new EPCISDocument().setContext(context);
      expect(e.toObject()['@context']).to.deep.equal(context);
    });
  });
});
