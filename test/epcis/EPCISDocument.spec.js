/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import setup from '../../src/setup';
import settings, { defaultSettings } from '../../src/settings';
import EPCISDocument from '../../src/entity/epcis/EPCISDocument';
import EPCISHeader from '../../src/entity/epcis/EPCISHeader';
import { AssociationEvent, ObjectEvent } from '../../src';
import EPCISDocumentObjectEvent from '../data/EPCISDocument-ObjectEvent.json';
import EPCISDocumentAggregationEvent from '../data/EPCISDocument-AggregationEvent.json';
import EPCISDocumentTransformationEvent from '../data/EPCISDocument-TransformationEvent.json';
import EPCISDocumentAssociationEvent from '../data/EPCISDocument-AssociationEvent.json';
import { exampleEPCISDocumentWithEPCISHeader } from '../data/eventExample';

describe('unit tests for the EPCISDocument class', () => {
  const events = [
    new ObjectEvent(EPCISDocumentObjectEvent.epcisBody.eventList[0]),
    new AssociationEvent(EPCISDocumentAssociationEvent.epcisBody.eventList[0]),
  ];

  describe('setup function and EPCISDocument class', () => {
    afterEach((done) => {
      setup(defaultSettings);
      done();
    });

    it('should use default values', async () => {
      const e = new EPCISDocument();
      expect(e.getType()).to.be.equal('EPCISDocument');
      expect(e.getSchemaVersion()).to.be.equal('2');
      expect(e.getContext()).to.be.equal(settings.EPCISDocumentContext);
      expect(e.getCreationDate().length).to.not.be.equal(0);
    });

    it('should set the correct context and schema version', async () => {
      setup({ EPCISDocumentSchemaVersion: 3, EPCISDocumentContext: 'foo' });
      const e = new EPCISDocument();
      expect(e.getSchemaVersion()).to.be.equal(3);
      expect(e.getContext()).to.be.equal('foo');
      setup({ EPCISDocumentSchemaVersion: undefined, EPCISDocumentContext: undefined });
      const e2 = new EPCISDocument();
      expect(e2.toObject().schemaVersion).to.be.equal(undefined);
      expect(e2.toObject()['@context']).to.be.equal(undefined);
    });
  });

  it('setters should set the variables correctly', async () => {
    const e = new EPCISDocument()
      .setContext(EPCISDocumentObjectEvent['@context'])
      .setCreationDate(EPCISDocumentObjectEvent.creationDate)
      .setSchemaVersion(EPCISDocumentObjectEvent.schemaVersion)
      .setEPCISHeader(new EPCISHeader(exampleEPCISDocumentWithEPCISHeader.epcisHeader))
      .addEventList(events);
    expect(e.getContext()).to.be.equal(EPCISDocumentObjectEvent['@context']);
    expect(e.getCreationDate()).to.be.equal(EPCISDocumentObjectEvent.creationDate);
    expect(e.getSchemaVersion()).to.be.equal(EPCISDocumentObjectEvent.schemaVersion);
    expect(e.getEPCISHeader().toObject()).to.deep.equal(
      exampleEPCISDocumentWithEPCISHeader.epcisHeader,
    );
    expect(e.getEventList()).to.deep.equal(events);
  });

  it('creation from object should set the variables correctly', async () => {
    const e = new EPCISDocument(EPCISDocumentObjectEvent);
    expect(e.getEventList()[0]).to.be.instanceof(ObjectEvent);
    expect(e.toObject()).to.deep.equal(EPCISDocumentObjectEvent);
  });

  it('should set the object event in the eventList field', async () => {
    const o = new ObjectEvent();
    const e = new EPCISDocument().addEvent(o);
    expect(e.toObject().epcisBody.eventList).to.deep.equal([o.toObject()]);
  });

  it('should set the object event in the event field', async () => {
    const o = new ObjectEvent();
    const e = new EPCISDocument().addEvent(o);
    expect(e.toObject().epcisBody.eventList).to.deep.equal([o.toObject()]);
  });

  it('should not validate the document', async () => {
    const e = new EPCISDocument();
    assert.throws(() => e.isValid());
  });

  it('should validate the document', async () => {
    const e = new EPCISDocument(EPCISDocumentObjectEvent);
    expect(e.isValid()).to.be.equal(true);
    const e2 = new EPCISDocument(EPCISDocumentAggregationEvent);
    expect(e2.isValid()).to.be.equal(true);
    const e4 = new EPCISDocument(EPCISDocumentTransformationEvent);
    expect(e4.isValid()).to.be.equal(true);
    const e5 = new EPCISDocument(EPCISDocumentAssociationEvent);
    expect(e5.isValid()).to.be.equal(true);
  });

  it('should output the document passed in input', async () => {
    const e = new EPCISDocument(EPCISDocumentObjectEvent);
    expect(e.toObject()).to.deep.equal(EPCISDocumentObjectEvent);
    const e2 = new EPCISDocument(EPCISDocumentAggregationEvent);
    expect(e2.toObject()).to.deep.equal(EPCISDocumentAggregationEvent);
    const e4 = new EPCISDocument(EPCISDocumentTransformationEvent);
    expect(e4.toObject()).to.deep.equal(EPCISDocumentTransformationEvent);
    const e5 = new EPCISDocument(EPCISDocumentAssociationEvent);
    expect(e5.toObject()).to.deep.equal(EPCISDocumentAssociationEvent);
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
      const context = [
        { key3: 'value3', key2: 'value2' },
        { key: 'value', key2: 'value2' },
      ];
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
