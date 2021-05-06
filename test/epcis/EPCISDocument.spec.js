import { assert, expect } from 'chai';
import setup from '../../src/setup';
import { defaultSettings } from '../../src/settings';
import EPCISDocument from '../../src/entity/epcis/EPCISDocument';
import EPCISHeader from '../../src/entity/epcis/EPCISHeader';
import { ObjectEvent } from '../../src';
import { exampleEPCISDocument } from '../data/eventExample';
import exampleValidEPCISDocument from '../data/EPCISDocument-ObjectEvent.json';

describe('unit tests for the EPCISDocument class', () => {
  const events = [
    new ObjectEvent(exampleEPCISDocument.epcisBody.eventList[0]),
    new ObjectEvent(exampleEPCISDocument.epcisBody.eventList[1]),
  ];

  describe('setup function and EPCISDocument class', () => {
    afterEach((done) => {
      setup(defaultSettings);
      done();
    });
    it('should use default values', async () => {
      const e = new EPCISDocument();
      expect(e.isA).to.be.equal('EPCISDocument');
      expect(e.useEventListByDefault).to.be.equal(true);
    });
    it('should set the object event in the event field', async () => {
      setup({ useEventListByDefault: false });
      const o = new ObjectEvent();
      const e = new EPCISDocument().addEvent(o);
      expect(e.getUseEventListByDefault()).to.be.equal(false);
      expect(e.toObject().epcisBody.eventList).to.be.equal(undefined);
      expect(e.toObject().epcisBody.event).to.deep.equal(o.toObject());
      e.addEvent(events[0]);
      expect(e.toObject().epcisBody.eventList.length).to.be.equal(2);
      expect(e.toObject().epcisBody.event).to.deep.equal(undefined);
    });
  });

  it('setters should set the variables correctly', async () => {
    const e = new EPCISDocument()
      .setContext(exampleEPCISDocument['@context'])
      .setCreationDate(exampleEPCISDocument.creationDate)
      .setSchemaVersion(exampleEPCISDocument.schemaVersion)
      .setFormat(exampleEPCISDocument.format)
      .setEPCISHeader(new EPCISHeader(exampleEPCISDocument.epcisHeader))
      .addEventList(events);
    expect(e.getContext()).to.be.equal(exampleEPCISDocument['@context']);
    expect(e.getCreationDate()).to.be.equal(exampleEPCISDocument.creationDate);
    expect(e.getSchemaVersion()).to.be.equal(exampleEPCISDocument.schemaVersion);
    expect(e.getFormat()).to.be.equal(exampleEPCISDocument.format);
    expect(e.getEPCISHeader().toObject()).to.deep.equal(exampleEPCISDocument.epcisHeader);
    expect(e.getEventList()).to.deep.equal(events);
  });
  it('creation from object should set the variables correctly', async () => {
    const e = new EPCISDocument(exampleEPCISDocument);
    expect(e.getEventList()[0]).to.be.instanceof(ObjectEvent);
    expect(e.toObject()).to.deep.equal(exampleEPCISDocument);
  });
  it('should set the object event in the eventList field', async () => {
    const o = new ObjectEvent();
    const e = new EPCISDocument().addEvent(o);
    expect(e.getUseEventListByDefault()).to.be.equal(true);
    expect(e.toObject().epcisBody.event).to.be.equal(undefined);
    expect(e.toObject().epcisBody.eventList).to.deep.equal([o.toObject()]);
  });
  it('should set the object event in the event field', async () => {
    const o = new ObjectEvent();
    const e = new EPCISDocument().addEvent(o);
    e.setUseEventListByDefault(false);
    expect(e.getUseEventListByDefault()).to.be.equal(false);
    expect(e.toObject().epcisBody.eventList).to.be.equal(undefined);
    expect(e.toObject().epcisBody.event).to.deep.equal(o.toObject());
  });
  it('should not validate the document', async () => {
    const e = new EPCISDocument();
    assert.throws(() => e.isValid());
  });
  it('should validate the document', async () => {
    const e = new EPCISDocument(exampleValidEPCISDocument);
    expect(e.isValid()).to.be.equal(true);
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
  describe('eventList field', () => {
    it('should add and remove event', async () => {
      const o = new EPCISDocument();
      o.addEvent(events[1]);
      expect(o.getEventList()).to.deep.equal([events[1]]);
      o.addEvent(events[0]);
      expect(o.getEventList()).to.deep.equal([events[1], events[0]]);
      o.removeEvent(events[0]);
      expect(o.getEventList()).to.deep.equal([events[1]]);
      o.removeEvent(events[1]);
      expect(o.getEventList()).to.deep.equal([]);
    });
    it('should add an event list', async () => {
      const o = new EPCISDocument();
      o.addEventList(events);
      expect(o.getEventList()).to.deep.equal(events);
    });
    it('should remove an event list', async () => {
      const o = new EPCISDocument();
      o.addEventList(events);
      expect(o.getEventList()).to.deep.equal(events);
      o.removeEventList(events);
      expect(o.getEventList()).to.deep.equal([]);
    });
    it('should clear the event list', async () => {
      const o = new EPCISDocument();
      o.addEventList(events);
      o.clearEventList();
      expect(o.eventList).to.be.equal(undefined);
    });
    it('should not add the event list to JSON if it is not defined', async () => {
      const o = new EPCISDocument();
      const json = o.toObject();
      expect(json.eventList).to.be.equal(undefined);
    });
  });
});
