/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import ExtendedEvent from '../../src/entity/events/ExtendedEvent';
import BizTransactionElement from '../../src/entity/model/BizTransactionElement';
import SourceElement from '../../src/entity/model/SourceElement';
import DestinationElement from '../../src/entity/model/DestinationElement';
import QuantityElement from '../../src/entity/model/QuantityElement';
import PersistentDisposition from '../../src/entity/model/PersistentDisposition';
import SensorElement from '../../src/entity/model/sensor/SensorElement';
import ErrorDeclaration from '../../src/entity/model/ErrorDeclaration';
import { extendedEvent } from '../data/eventExample';
import { EPCISDocument, Ilmd } from '../../src';

describe('unit tests for the ExtendedEvent class', () => {
  it('setters should set the variables correctly', async () => {
    const obj = new ExtendedEvent();
    obj.setType(extendedEvent.type);
    obj.setEventID(extendedEvent.eventID);
    obj.setEventTime(extendedEvent.eventTime);
    obj.setEventTimeZoneOffset(extendedEvent.eventTimeZoneOffset);
    obj.addExtension('ext1:float', extendedEvent['ext1:float']);

    expect(obj.getType()).to.be.eq(extendedEvent.type);
    expect(obj.getEventID()).to.be.eq(extendedEvent.eventID);
    expect(obj.getEventTime()).to.be.eq(extendedEvent.eventTime);
    expect(obj.getEventTimeZoneOffset()).to.be.eq(extendedEvent.eventTimeZoneOffset);
    expect(obj.getExtension('ext1:float')).to.be.eq(extendedEvent['ext1:float']);
  });

  it('should create an ExtendedEvent from json', async () => {
    const obj = new ExtendedEvent(extendedEvent);
    expect(obj.toObject()).to.deep.eq(extendedEvent);
  });

  it('should create a valid ExtendedEvent from json EPCISDocument', async () => {
    const doc = {
      type: 'EPCISDocument',
      '@context': 'https://gs1.github.io/EPCIS/epcis-context.jsonld',
      schemaVersion: '2',
      creationDate: '2022-02-21T16:28:08.813Z',
      epcisBody: {
        eventList: [extendedEvent],
      },
    };
    const obj = new EPCISDocument(doc);
    expect(obj.toObject()).to.deep.eq(doc);
  });

  it('should throw if we access non authorized functions', async () => {
    const o = new ExtendedEvent();
    assert.doesNotThrow(() => o.setEventID('id'));
    assert.doesNotThrow(() => o.getEventID());
    assert.doesNotThrow(() => o.setEventTimeZoneOffset(6));
    assert.doesNotThrow(() => o.getEventTimeZoneOffset());
    assert.doesNotThrow(() => o.setEventTime('time'));
    assert.doesNotThrow(() => o.getEventTime());
    assert.doesNotThrow(() => o.setRecordTime('time'));
    assert.doesNotThrow(() => o.getRecordTime());
    assert.doesNotThrow(() => o.setErrorDeclaration(new ErrorDeclaration()));
    assert.doesNotThrow(() => o.getErrorDeclaration());

    assert.throws(() => o.getEPCList());
    assert.throws(() => o.clearEPCList());
    assert.throws(() => o.addEPC('e'));
    assert.throws(() => o.removeEPC('e'));
    assert.throws(() => o.addEPCList(['e']));
    assert.throws(() => o.removeEPCList(['e']));

    assert.throws(() => o.addQuantityList([new QuantityElement()]));
    assert.throws(() => o.removeQuantityList([new QuantityElement()]));
    assert.throws(() => o.addQuantity(new QuantityElement()));
    assert.throws(() => o.removeQuantity(new QuantityElement()));
    assert.throws(() => o.clearQuantityList());
    assert.throws(() => o.getQuantityList());

    assert.throws(() => o.setAction('OBSERVE'));
    assert.throws(() => o.getAction());

    assert.throws(() => o.setBizStep('foo'));
    assert.throws(() => o.getBizStep());

    assert.throws(() => o.setDisposition('foo'));
    assert.throws(() => o.getDisposition());

    assert.throws(() => o.setReadPoint('foo'));
    assert.throws(() => o.getReadPoint());

    assert.throws(() => o.setBizLocation('foo'));
    assert.throws(() => o.getBizLocation());

    assert.throws(() => o.addBizTransaction(new BizTransactionElement()));
    assert.throws(() => o.removeBizTransaction(new BizTransactionElement()));
    assert.throws(() => o.removeBizTransactionList([new BizTransactionElement()]));
    assert.throws(() => o.addBizTransactionList([new BizTransactionElement()]));
    assert.throws(() => o.getBizTransactionList());
    assert.throws(() => o.clearBizTransactionList());

    assert.throws(() => o.addSource(new SourceElement()));
    assert.throws(() => o.removeSource(new SourceElement()));
    assert.throws(() => o.removeSourceList([new SourceElement()]));
    assert.throws(() => o.addSourceList([new SourceElement()]));
    assert.throws(() => o.getSourceList());
    assert.throws(() => o.clearSourceList());

    assert.throws(() => o.addDestination(new DestinationElement()));
    assert.throws(() => o.removeDestination(new DestinationElement()));
    assert.throws(() => o.removeDestinationList([new DestinationElement()]));
    assert.throws(() => o.addDestinationList([new DestinationElement()]));
    assert.throws(() => o.getDestinationList());
    assert.throws(() => o.clearDestinationList());

    assert.throws(() => o.setIlmd(new Ilmd()));
    assert.throws(() => o.getIlmd());

    assert.throws(() => o.setParentId('id'));
    assert.throws(() => o.getParentId());

    assert.throws(() => o.addChildEPC(''));
    assert.throws(() => o.removeChildEPC(''));
    assert.throws(() => o.removeChildEPCList(['']));
    assert.throws(() => o.addChildEPCList(['']));
    assert.throws(() => o.getChildEPCList());
    assert.throws(() => o.clearChildEPCList());

    assert.throws(() => o.addChildQuantity(new QuantityElement()));
    assert.throws(() => o.removeChildQuantity(new QuantityElement()));
    assert.throws(() => o.removeChildQuantityList([new QuantityElement()]));
    assert.throws(() => o.addChildQuantityList([new QuantityElement()]));
    assert.throws(() => o.getChildQuantityList());
    assert.throws(() => o.clearChildQuantityList());

    assert.throws(() => o.setPersistentDisposition(new PersistentDisposition()));
    assert.throws(() => o.getPersistentDisposition());

    assert.throws(() => o.addSensorElement(new SensorElement()));
    assert.throws(() => o.removeSensorElement(new SensorElement()));
    assert.throws(() => o.removeSensorElementList([new SensorElement()]));
    assert.throws(() => o.addSensorElementList([new SensorElement()]));
    assert.throws(() => o.getSensorElementList());
    assert.throws(() => o.clearSensorElementList());
  });

  describe('setters should throw if we provide a non-expected type', () => {
    it('setters from ExtendedEvent.js', () => {
      const eev = new ExtendedEvent();
      assert.throws(() => eev.setType(1));
      assert.throws(() => eev.setType(new Ilmd()));
    });
  });
  describe('ExtendedEvent.isValid()', () => {
    it('should accept a real ExtendedEvent', async () => {
      const ee = new ExtendedEvent({
        type: 'test:type',
        eventID: 'uri:_eventID',
        eventTime: '2013-06-08T14:58:56.591Z',
        eventTimeZoneOffset: '+02:00',
        'ext1:float': '20',
      })
      ee.isValid()
      assert.doesNotThrow(() => ee.isValid());
    });
    it('should reject an undefined Event', async () => {
      const ee = undefined;
      assert.throw(() => ee.isValid());
    });
    it('should reject an incomplete Event', async () => {
      const ee = new ExtendedEvent({})
      assert.throw(() => ee.isValid());
    });
  });
});
