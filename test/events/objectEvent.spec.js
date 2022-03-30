/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import ObjectEvent from '../../src/entity/events/ObjectEvent';
import ErrorDeclaration from '../../src/entity/model/ErrorDeclaration';
import QuantityElement from '../../src/entity/model/QuantityElement';
import setup from '../../src/setup';
import { defaultSettings } from '../../src/settings';
import PersistentDisposition from '../../src/entity/model/PersistentDisposition';
import ReadPoint from '../../src/entity/model/ReadPoint';
import BizLocation from '../../src/entity/model/BizLocation';
import BizTransactionElement from '../../src/entity/model/BizTransactionElement';
import SourceElement from '../../src/entity/model/SourceElement';
import DestinationElement from '../../src/entity/model/DestinationElement';
import SensorElement from '../../src/entity/model/sensor/SensorElement';
import Ilmd from '../../src/entity/model/Ilmd';
import { getTimeZoneOffset } from '../../src/utils/utils';
import EPCISDocumentObjectEvent from '../data/EPCISDocument-ObjectEvent.json';

const exampleObjectEvent = EPCISDocumentObjectEvent.epcisBody.eventList[0];
const epc1 = exampleObjectEvent.epcList[0];
const epc2 = exampleObjectEvent.epcList[1];
const epc3 = 'urn:epc:id:sgtin:0614141.107346.2019';

describe('unit tests for the ObjectEvent class', () => {
  describe('setup function and ObjectEvent class', () => {
    afterEach((done) => {
      setup(defaultSettings);
      done();
    });

    it('should use default values', async () => {
      const o = new ObjectEvent();
      expect(o.type).to.be.equal('ObjectEvent');
    });

    it('should not use eventTimeZoneOffset from settings if it is not overridden', async () => {
      setup({});
      const o = new ObjectEvent();
      expect(o.eventTimeZoneOffset).to.be.equal(
        getTimeZoneOffset(new Date().getTimezoneOffset() / 60),
      );
    });

    it('should use eventTimeZoneOffset from settings if it is overridden', async () => {
      setup({ eventTimeZoneOffset: '+04:00' });
      const o = new ObjectEvent();
      expect(o.eventTimeZoneOffset).to.be.equal('+04:00');
    });
  });

  it('setters should set the variables correctly', async () => {
    const obj = new ObjectEvent();
    obj
      .setEventID(exampleObjectEvent.eventID)
      .addEPCList(exampleObjectEvent.epcList)
      .setEventTime(exampleObjectEvent.eventTime)
      .setEventTimeZoneOffset(exampleObjectEvent.eventTimeZoneOffset)
      .setRecordTime(exampleObjectEvent.recordTime)
      .setErrorDeclaration(new ErrorDeclaration(exampleObjectEvent.errorDeclaration))
      .addExtension('example:myField', exampleObjectEvent['example:myField'])
      .setAction(exampleObjectEvent.action)
      .setDisposition(exampleObjectEvent.disposition)
      .setBizStep(exampleObjectEvent.bizStep)
      .setPersistentDisposition(new PersistentDisposition(exampleObjectEvent.persistentDisposition))
      .setReadPoint(exampleObjectEvent.readPoint.id)
      .setBizLocation(exampleObjectEvent.bizLocation.id)
      .setContext('https://gs1.github.io/EPCIS/epcis-context.jsonld')
      .setIlmd(new Ilmd(exampleObjectEvent.ilmd));

    expect(obj.getEPCList().toString()).to.be.equal(exampleObjectEvent.epcList.toString());
    expect(obj.getEventID()).to.be.equal(exampleObjectEvent.eventID);
    expect(obj.getEventTime()).to.be.equal(exampleObjectEvent.eventTime);
    expect(obj.getEventTimeZoneOffset()).to.be.equal(exampleObjectEvent.eventTimeZoneOffset);
    expect(obj.getRecordTime()).to.be.equal(exampleObjectEvent.recordTime);
    expect(obj.getContext()).to.be.equal('https://gs1.github.io/EPCIS/epcis-context.jsonld');
    expect(obj['example:myField']).to.be.equal(exampleObjectEvent['example:myField']);
    expect(obj.getErrorDeclaration().getDeclarationTime()).to.be.equal(
      exampleObjectEvent.errorDeclaration.declarationTime,
    );
    expect(obj.getErrorDeclaration().getReason()).to.be.equal(
      exampleObjectEvent.errorDeclaration.reason,
    );
    expect(obj.getErrorDeclaration().getCorrectiveEventIDs().toString()).to.be.equal(
      exampleObjectEvent.errorDeclaration.correctiveEventIDs.toString(),
    );
    expect(obj.getErrorDeclaration()['example:vendorExtension']).to.be.equal(
      exampleObjectEvent.errorDeclaration['example:vendorExtension'],
    );
    expect(obj.getAction()).to.be.equal(exampleObjectEvent.action);
    expect(obj.getDisposition()).to.be.equal(exampleObjectEvent.disposition);
    expect(obj.getBizStep()).to.be.equal(exampleObjectEvent.bizStep);
    expect(obj.getPersistentDisposition().getUnset().toString()).to.be.equal(
      exampleObjectEvent.persistentDisposition.unset.toString(),
    );
    expect(obj.getPersistentDisposition().getSet().toString()).to.be.equal(
      exampleObjectEvent.persistentDisposition.set.toString(),
    );
    expect(obj.getReadPoint().getId()).to.be.equal(exampleObjectEvent.readPoint.id);
    expect(obj.getIlmd()['example:bestBeforeDate']).to.be.equal(
      exampleObjectEvent.ilmd['example:bestBeforeDate'],
    );
    expect(obj.getExtension('example:myField')).to.be.equal(exampleObjectEvent['example:myField']);
  });

  it('should create an ObjectEvent from json and generate a hashed ID', async () => {
    const obj = new ObjectEvent(exampleObjectEvent);
    expect(obj.getBizLocation()).to.be.instanceof(BizLocation);
    expect(obj.getBizTransactionList()[0]).to.be.instanceof(BizTransactionElement);
    expect(obj.getDestinationList()[0]).to.be.instanceof(DestinationElement);
    expect(obj.getPersistentDisposition()).to.be.instanceof(PersistentDisposition);
    expect(obj.getQuantityList()[0]).to.be.instanceof(QuantityElement);
    expect(obj.getReadPoint()).to.be.instanceof(ReadPoint);
    expect(obj.getErrorDeclaration()).to.be.instanceof(ErrorDeclaration);
    expect(obj.getSensorElementList()[0]).to.be.instanceof(SensorElement);
    expect(obj.getSourceList()[0]).to.be.instanceof(SourceElement);
    expect(obj.getIlmd()).to.be.instanceof(Ilmd);
    expect(obj.toObject()).to.deep.equal(exampleObjectEvent);
    expect(() => obj.generateHashID({})).to.throw();
    expect(() => obj.generateHashID({
      example: 'http://ns.example.com/epcis/',
      ext1: 'http://ns.example.com/epcis/',
      ext2: 'http://ns.example.com/epcis/',
      ext3: 'http://ns.example.com/epcis/',
      cbvmda: 'http://ns.example.com/epcis/',
    })).to.not.throw();
    expect(obj.getEventID().startsWith('ni:///')).to.be.equal(true);
  });

  it('should be able to set the time zone offset from number or string', async () => {
    const o1 = new ObjectEvent();
    const o2 = new ObjectEvent();
    o1.setEventTimeZoneOffset('-06:00');
    o2.setEventTimeZoneOffset(-6);
    expect(o1.toObject().eventTimeZoneOffset).to.be.equal(o2.toObject().eventTimeZoneOffset);
  });

  it('should override the eventTimeZoneOffset field', async () => {
    const objectEvent = new ObjectEvent();
    objectEvent.setEventTimeZoneOffset('+03:00');
    objectEvent.setEventTime('2005-04-03T20:33:31.116-06:00');
    expect(objectEvent.getEventTimeZoneOffset()).to.be.equal('-06:00');
  });

  it('should not override the eventTimeZoneOffset field', async () => {
    const objectEvent = new ObjectEvent();
    objectEvent.setEventTimeZoneOffset('+03:00');
    objectEvent.setEventTime('2005-04-03T20:33:31.116-06:00', false);
    expect(objectEvent.getEventTimeZoneOffset()).to.be.equal('+03:00');
  });

  it('should add a custom field', async () => {
    const objectEvent = new ObjectEvent();
    objectEvent.addExtension('key', 'value');
    expect(objectEvent.toObject().key).to.be.equal('value');
  });

  it('should remove a custom field', async () => {
    const objectEvent = new ObjectEvent();
    objectEvent.addExtension('key', 'value');
    objectEvent.addEPC(epc1);
    objectEvent.removeExtension('key');
    expect(objectEvent.toObject().toString()).to.be.equal({ epcList: [epc1] }.toString());
  });

  it('should set the readPoint with ID or ReadPoint instance', async () => {
    const o = new ObjectEvent();
    const o2 = new ObjectEvent();
    o.setReadPoint('readPointID');
    o2.setReadPoint(new ReadPoint({ id: 'readPointID' }));
    expect(o.readPoint.id).to.be.equal('readPointID');
    expect(o2.readPoint.id).to.be.equal('readPointID');
  });

  it('should set the bizLocation with ID or BizLocation instance', async () => {
    const o = new ObjectEvent();
    const o2 = new ObjectEvent();
    o.setBizLocation('id');
    o2.setBizLocation(new BizLocation({ id: 'id' }));
    expect(o.bizLocation.id).to.be.equal('id');
    expect(o2.bizLocation.id).to.be.equal('id');
  });

  describe('epcList field', () => {
    it('should add and remove epc', async () => {
      const o = new ObjectEvent();
      o.addEPC(epc1);
      expect(o.epcList.toString()).to.be.equal([epc1].toString());
      o.addEPC(epc2);
      expect(o.epcList.toString()).to.be.equal([epc1, epc2].toString());
      o.removeEPC(epc1);
      expect(o.epcList.toString()).to.be.equal([epc2].toString());
      o.removeEPC(epc2);
      expect(o.epcList.toString()).to.be.equal([].toString());
    });

    it('should add an epc list', async () => {
      const o = new ObjectEvent();
      o.addEPCList(exampleObjectEvent.epcList);
      expect(o.epcList.toString()).to.be.equal(exampleObjectEvent.epcList.toString());
      o.removeEPC(epc1);
      o.removeEPC(epc2);

      // trying again but with a non-empty list
      o.addEPC(epc3);
      expect(o.epcList.toString()).to.be.equal([epc3].toString());
      o.addEPCList(exampleObjectEvent.epcList);
      expect(o.epcList.toString()).to.be.equal([epc3, epc1, epc2].toString());
    });

    it('should remove an epc list', async () => {
      const o = new ObjectEvent();
      o.addEPCList([...exampleObjectEvent.epcList, epc3]);
      o.removeEPCList(exampleObjectEvent.epcList);
      expect(o.epcList.toString()).to.be.equal([epc3].toString());

      // trying again but removing the whole list
      o.addEPC(epc2);
      o.removeEPCList([epc2, epc3]);
      expect(o.epcList.toString()).to.be.equal([].toString());
    });

    it('should clear the epc list', async () => {
      const o = new ObjectEvent();
      o.addEPCList([...exampleObjectEvent.epcList, epc3]);
      o.clearEPCList();
      expect(o.epcList).to.be.equal(undefined);
    });

    it('should not add the epc list to JSON if it is not defined', async () => {
      const o = new ObjectEvent();
      const json = o.toObject();
      expect(json.epcList).to.be.equal(undefined);
    });
  });

  describe('quantityList field', () => {
    const quantity1 = new QuantityElement(exampleObjectEvent.quantityList[0]);
    const quantity2 = new QuantityElement(exampleObjectEvent.quantityList[1]);
    const quantity3 = new QuantityElement(exampleObjectEvent.quantityList[2]);

    it('should add and remove quantity', async () => {
      const o = new ObjectEvent();
      o.addQuantity(quantity1);
      expect(o.quantityList.toString()).to.be.equal([quantity1].toString());
      o.addQuantity(quantity2);
      expect(o.quantityList.toString()).to.be.equal([quantity1, quantity2].toString());
      o.removeQuantity(quantity1);
      expect(o.quantityList.toString()).to.be.equal([quantity2].toString());
      o.removeQuantity(quantity2);
      expect(o.quantityList.toString()).to.be.equal([].toString());
    });

    it('should add a quantity list', async () => {
      const o = new ObjectEvent();
      o.addQuantityList([quantity1, quantity2]);
      expect(o.quantityList.toString()).to.be.equal([quantity1, quantity2].toString());
      o.removeQuantity(quantity1);
      o.removeQuantity(quantity2);

      // trying again but with a non-empty list
      o.addQuantity(quantity3);
      expect(o.quantityList.toString()).to.be.equal([quantity3].toString());
      o.addQuantityList([quantity1, quantity2]);
      expect(o.quantityList.toString()).to.be.equal([quantity3, quantity1, quantity2].toString());
    });

    it('should remove a quantity list', async () => {
      const o = new ObjectEvent();
      o.addQuantityList([quantity1, quantity2, quantity3]);
      o.removeQuantityList([quantity1, quantity2]);
      expect(o.quantityList.toString()).to.be.equal([quantity3].toString());

      // trying again but removing the whole list
      o.addQuantity(quantity2);
      o.removeQuantityList([quantity2, quantity3]);
      expect(o.quantityList.toString()).to.be.equal([].toString());
    });

    it('should clear the quantity list', async () => {
      const o = new ObjectEvent();
      o.addQuantityList([quantity1, quantity2]);
      o.clearQuantityList();
      expect(o.quantityList).to.be.equal(undefined);
    });

    it('should not add the quantity list to JSON if it is not defined', async () => {
      const o = new ObjectEvent();
      const json = o.toObject();
      expect(json.quantityList).to.be.equal(undefined);
    });
  });

  describe('bizTransactionList field', () => {
    const bizTransaction1 = new BizTransactionElement(exampleObjectEvent.bizTransactionList[0]);
    const bizTransaction2 = new BizTransactionElement(exampleObjectEvent.bizTransactionList[1]);

    it('should add and remove bizTransaction', async () => {
      const o = new ObjectEvent();
      o.addBizTransaction(bizTransaction1);
      expect(o.bizTransactionList.toString()).to.be.equal([bizTransaction1].toString());
      o.addBizTransaction(bizTransaction2);
      expect(o.bizTransactionList.toString()).to.be.equal(
        [bizTransaction1, bizTransaction2].toString(),
      );
      o.removeBizTransaction(bizTransaction1);
      expect(o.bizTransactionList.toString()).to.be.equal([bizTransaction2].toString());
      o.removeBizTransaction(bizTransaction2);
      expect(o.bizTransactionList.toString()).to.be.equal([].toString());
    });

    it('should add a bizTransaction list', async () => {
      const o = new ObjectEvent();
      o.addBizTransactionList([bizTransaction1, bizTransaction2]);
      expect(o.bizTransactionList.toString()).to.be.equal(
        [bizTransaction1, bizTransaction2].toString(),
      );
    });

    it('should remove a bizTransaction list', async () => {
      const o = new ObjectEvent();
      o.addBizTransactionList([bizTransaction1, bizTransaction2]);
      expect(o.bizTransactionList.toString()).to.be.equal(
        [bizTransaction1, bizTransaction2].toString(),
      );
      o.removeBizTransactionList([bizTransaction1, bizTransaction2]);
      expect(o.bizTransactionList.toString()).to.be.equal([].toString());
    });

    it('should clear the bizTransaction list', async () => {
      const o = new ObjectEvent();
      o.addBizTransactionList([bizTransaction1, bizTransaction2]);
      o.clearBizTransactionList();
      expect(o.bizTransactionList).to.be.equal(undefined);
    });

    it('should not add the bizTransaction list to JSON if it is not defined', async () => {
      const o = new ObjectEvent();
      const json = o.toObject();
      expect(json.bizTransactionList).to.be.equal(undefined);
    });
  });

  describe('sourceList field', () => {
    const source1 = new SourceElement(exampleObjectEvent.sourceList[0]);
    const source2 = new SourceElement(exampleObjectEvent.sourceList[1]);

    it('should add and remove source', async () => {
      const o = new ObjectEvent();
      o.addSource(source1);
      expect(o.sourceList.toString()).to.be.equal([source1].toString());
      o.addSource(source2);
      expect(o.sourceList.toString()).to.be.equal([source1, source2].toString());
      o.removeSource(source1);
      expect(o.sourceList.toString()).to.be.equal([source2].toString());
      o.removeSource(source2);
      expect(o.sourceList.toString()).to.be.equal([].toString());
    });

    it('should add a source list', async () => {
      const o = new ObjectEvent();
      o.addSourceList([source1, source2]);
      expect(o.sourceList.toString()).to.be.equal([source1, source2].toString());
    });

    it('should remove a source list', async () => {
      const o = new ObjectEvent();
      o.addSourceList([source1, source2]);
      expect(o.sourceList.toString()).to.be.equal([source1, source2].toString());
      o.removeSourceList([source1, source2]);
      expect(o.sourceList.toString()).to.be.equal([].toString());
    });

    it('should clear the source list', async () => {
      const o = new ObjectEvent();
      o.addSourceList([source1, source2]);
      o.clearSourceList();
      expect(o.sourceList).to.be.equal(undefined);
    });

    it('should not add the source list to JSON if it is not defined', async () => {
      const o = new ObjectEvent();
      const json = o.toObject();
      expect(json.sourceList).to.be.equal(undefined);
    });
  });

  describe('destinationList field', () => {
    const destination1 = new DestinationElement(exampleObjectEvent.destinationList[0]);
    const destination2 = new DestinationElement(exampleObjectEvent.destinationList[1]);

    it('should add and remove destination', async () => {
      const o = new ObjectEvent();
      o.addDestination(destination1);
      expect(o.destinationList.toString()).to.be.equal([destination1].toString());
      o.addDestination(destination2);
      expect(o.destinationList.toString()).to.be.equal([destination1, destination2].toString());
      o.removeDestination(destination1);
      expect(o.destinationList.toString()).to.be.equal([destination2].toString());
      o.removeDestination(destination2);
      expect(o.destinationList.toString()).to.be.equal([].toString());
    });

    it('should add a destination list', async () => {
      const o = new ObjectEvent();
      o.addDestinationList([destination1, destination2]);
      expect(o.destinationList.toString()).to.be.equal([destination1, destination2].toString());
    });

    it('should remove a destination list', async () => {
      const o = new ObjectEvent();
      o.addDestinationList([destination1, destination2]);
      expect(o.destinationList.toString()).to.be.equal([destination1, destination2].toString());
      o.removeDestinationList([destination1, destination2]);
      expect(o.destinationList.toString()).to.be.equal([].toString());
    });

    it('should clear the destination list', async () => {
      const o = new ObjectEvent();
      o.addDestinationList([destination1, destination2]);
      o.clearDestinationList();
      expect(o.destinationList).to.be.equal(undefined);
    });

    it('should not add the destination list to JSON if it is not defined', async () => {
      const o = new ObjectEvent();
      const json = o.toObject();
      expect(json.destinationList).to.be.equal(undefined);
    });
  });

  describe('sensorElementList field', () => {
    const sensorElement1 = new SensorElement(exampleObjectEvent.destinationList[0]);
    const sensorElement2 = new SensorElement(exampleObjectEvent.destinationList[1]);

    it('should add and remove sensorElement', async () => {
      const o = new ObjectEvent();
      o.addSensorElement(sensorElement1);
      expect(o.sensorElementList.toString()).to.be.equal([sensorElement1].toString());
      o.addSensorElement(sensorElement2);
      expect(o.sensorElementList.toString()).to.be.equal(
        [sensorElement1, sensorElement2].toString(),
      );
      o.removeSensorElement(sensorElement1);
      expect(o.sensorElementList.toString()).to.be.equal([sensorElement2].toString());
      o.removeSensorElement(sensorElement2);
      expect(o.sensorElementList.toString()).to.be.equal([].toString());
    });

    it('should add a sensorElement list', async () => {
      const o = new ObjectEvent();
      o.addSensorElementList([sensorElement1, sensorElement2]);
      expect(o.sensorElementList.toString()).to.be.equal(
        [sensorElement1, sensorElement2].toString(),
      );
    });

    it('should remove a sensorElement list', async () => {
      const o = new ObjectEvent();
      o.addSensorElementList([sensorElement1, sensorElement2]);
      expect(o.sensorElementList.toString()).to.be.equal(
        [sensorElement1, sensorElement2].toString(),
      );
      o.removeSensorElementList([sensorElement1, sensorElement2]);
      expect(o.sensorElementList.toString()).to.be.equal([].toString());
    });

    it('should clear the sensorElement list', async () => {
      const o = new ObjectEvent();
      o.addSensorElementList([sensorElement1, sensorElement2]);
      o.clearSensorElementList();
      expect(o.sensorElementList).to.be.equal(undefined);
    });

    it('should not add the sensorElement list to JSON if it is not defined', async () => {
      const o = new ObjectEvent();
      const json = o.toObject();
      expect(json.sensorElementList).to.be.equal(undefined);
    });
  });

  it('should throw if we access non authorized functions', async () => {
    const o = new ObjectEvent();
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
    assert.doesNotThrow(() => o.getEPCList());
    assert.doesNotThrow(() => o.clearEPCList());
    assert.doesNotThrow(() => o.addEPC('e'));
    assert.doesNotThrow(() => o.removeEPC('e'));
    assert.doesNotThrow(() => o.addEPCList(['e']));
    assert.doesNotThrow(() => o.removeEPCList(['e']));
    assert.doesNotThrow(() => o.addQuantityList([new QuantityElement()]));
    assert.doesNotThrow(() => o.removeQuantityList([new QuantityElement()]));
    assert.doesNotThrow(() => o.addQuantity(new QuantityElement()));
    assert.doesNotThrow(() => o.removeQuantity(new QuantityElement()));
    assert.doesNotThrow(() => o.clearQuantityList());
    assert.doesNotThrow(() => o.getQuantityList());
    assert.doesNotThrow(() => o.setAction('OBSERVE'));
    assert.doesNotThrow(() => o.getAction());
    assert.doesNotThrow(() => o.setBizStep('foo'));
    assert.doesNotThrow(() => o.getBizStep());
    assert.doesNotThrow(() => o.setDisposition('foo'));
    assert.doesNotThrow(() => o.getDisposition());
    assert.doesNotThrow(() => o.setReadPoint('foo'));
    assert.doesNotThrow(() => o.getReadPoint());
    assert.doesNotThrow(() => o.setBizLocation('foo'));
    assert.doesNotThrow(() => o.getBizLocation());
    assert.doesNotThrow(() => o.addBizTransaction(new BizTransactionElement()));
    assert.doesNotThrow(() => o.removeBizTransaction(new BizTransactionElement()));
    assert.doesNotThrow(() => o.removeBizTransactionList([new BizTransactionElement()]));
    assert.doesNotThrow(() => o.addBizTransactionList([new BizTransactionElement()]));
    assert.doesNotThrow(() => o.getBizTransactionList());
    assert.doesNotThrow(() => o.clearBizTransactionList());
    assert.doesNotThrow(() => o.addSource(new SourceElement()));
    assert.doesNotThrow(() => o.removeSource(new SourceElement()));
    assert.doesNotThrow(() => o.removeSourceList([new SourceElement()]));
    assert.doesNotThrow(() => o.addSourceList([new SourceElement()]));
    assert.doesNotThrow(() => o.getSourceList());
    assert.doesNotThrow(() => o.clearSourceList());
    assert.doesNotThrow(() => o.addDestination(new DestinationElement()));
    assert.doesNotThrow(() => o.removeDestination(new DestinationElement()));
    assert.doesNotThrow(() => o.removeDestinationList([new DestinationElement()]));
    assert.doesNotThrow(() => o.addDestinationList([new DestinationElement()]));
    assert.doesNotThrow(() => o.getDestinationList());
    assert.doesNotThrow(() => o.clearDestinationList());
    assert.doesNotThrow(() => o.setIlmd(new Ilmd()));
    assert.doesNotThrow(() => o.getIlmd());

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

    assert.doesNotThrow(() => o.setPersistentDisposition(new PersistentDisposition()));
    assert.doesNotThrow(() => o.getPersistentDisposition());

    assert.doesNotThrow(() => o.addSensorElement(new SensorElement()));
    assert.doesNotThrow(() => o.removeSensorElement(new SensorElement()));
    assert.doesNotThrow(() => o.removeSensorElementList([new SensorElement()]));
    assert.doesNotThrow(() => o.addSensorElementList([new SensorElement()]));
    assert.doesNotThrow(() => o.getSensorElementList());
    assert.doesNotThrow(() => o.clearSensorElementList());
  });

  describe('setters should throw if we provide a non-expected type', () => {
    it('setters from Event.js', () => {
      const ov = new ObjectEvent();
      assert.throws(() => ov.setType(1));
      assert.throws(() => ov.setEventID(1));
      assert.throws(() => ov.setRecordTime(1));
      assert.throws(() => ov.setErrorDeclaration(1));
      assert.throws(() => ov.addEPC(1));
      assert.throws(() => ov.addEPCList([1, 2, 3]));
      assert.throws(() => ov.addQuantity(1));
      assert.throws(() => ov.addQuantityList([1, 2, 3]));
      assert.throws(() => ov.setAction(1));
      assert.throws(() => ov.setBizStep(1));
      assert.throws(() => ov.setDisposition(1));
      assert.throws(() => ov.setPersistentDisposition(1));
      assert.throws(() => ov.addBizTransaction(1));
      assert.throws(() => ov.addBizTransactionList([1, 2, 3]));
      assert.throws(() => ov.addSource(1));
      assert.throws(() => ov.addSourceList([1, 2, 3]));
      assert.throws(() => ov.addDestination(1));
      assert.throws(() => ov.addDestinationList([1, 2, 3]));
      assert.throws(() => ov.setType(new Ilmd()));
      assert.throws(() => ov.setEventID(new Ilmd()));
      assert.throws(() => ov.setRecordTime(new Ilmd()));
      assert.throws(() => ov.setErrorDeclaration(new Ilmd()));
      assert.throws(() => ov.addEPC(new Ilmd()));
      assert.throws(() => ov.addEPCList([new Ilmd(), new Ilmd(), new Ilmd()]));
      assert.throws(() => ov.addQuantity(new Ilmd()));
      assert.throws(() => ov.addQuantityList([new Ilmd(), new Ilmd(), new Ilmd()]));
      assert.throws(() => ov.setAction(new Ilmd()));
      assert.throws(() => ov.setBizStep(new Ilmd()));
      assert.throws(() => ov.setDisposition(new Ilmd()));
      assert.throws(() => ov.setPersistentDisposition(new Ilmd()));
      assert.throws(() => ov.addBizTransaction(new Ilmd()));
      assert.throws(() => ov.addBizTransactionList([new Ilmd(), new Ilmd(), new Ilmd()]));
      assert.throws(() => ov.addSource(new Ilmd()));
      assert.throws(() => ov.addSourceList([new Ilmd(), new Ilmd(), new Ilmd()]));
      assert.throws(() => ov.addDestination(new Ilmd()));
      assert.throws(() => ov.addDestinationList([new Ilmd(), new Ilmd(), new Ilmd()]));
    });
  });

  describe('ObjectEvent.isValid()', () => {
    it('should accept a real ObjectEvent', async () => {
      const oe = new ObjectEvent(exampleObjectEvent);
      expect(oe.type).to.be.equal('ObjectEvent');
      assert.doesNotThrow(() => oe.isValid());
    });
    it('should reject an undefined Event', async () => {
      const oe = undefined;
      assert.throw(() => oe.isValid());
    });
    it('should reject an incomplete Event', async () => {
      const oe = {
        type: 'ObjectEvent',
      };
      assert.throw(() => oe.isValid());
    });
  });
});
