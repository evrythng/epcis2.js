import { assert, expect } from 'chai';
import AssociationEvent from '../../src/entity/events/AssociationEvent';
import ErrorDeclaration from '../../src/entity/model/ErrorDeclaration';
import QuantityElement from '../../src/entity/model/QuantityElement';
import ReadPoint from '../../src/entity/model/ReadPoint';
import BizLocation from '../../src/entity/model/BizLocation';
import BizTransactionElement from '../../src/entity/model/BizTransactionElement';
import SourceElement from '../../src/entity/model/SourceElement';
import DestinationElement from '../../src/entity/model/DestinationElement';
import { exampleAssociationEvent, exampleObjectEvent } from '../data/eventExample';
import Ilmd from '../../src/entity/model/Ilmd';
import PersistentDisposition from '../../src/entity/model/PersistentDisposition';
import SensorElement from '../../src/entity/model/sensor/SensorElement';

const epc1 = exampleObjectEvent.epcList[0];
const epc2 = exampleObjectEvent.epcList[1];
const epc3 = 'urn:epc:id:sgtin:0614141.107346.2019';

describe('unit tests for the AssociationEvent class', () => {
  it('setters should set the variables correctly', async () => {
    const obj = new AssociationEvent();
    obj.setEventID(exampleAssociationEvent.eventID)
      .addChildEPCList(exampleAssociationEvent.childEPCs)
      .setEventTime(exampleAssociationEvent.eventTime)
      .setRecordTime(exampleAssociationEvent.recordTime)
      .setErrorDeclaration(new ErrorDeclaration(exampleAssociationEvent.errorDeclaration))
      .setAction(exampleAssociationEvent.action)
      .setDisposition(exampleAssociationEvent.disposition)
      .setBizStep(exampleAssociationEvent.bizStep)
      .setReadPoint(exampleAssociationEvent.readPoint.id)
      .setBizLocation(exampleAssociationEvent.bizLocation.id)
      .setParentId(exampleAssociationEvent.parentID);

    expect(obj.getChildEPCList().toString()).to.be
      .equal(exampleAssociationEvent.childEPCs.toString());
    expect(obj.getEventID()).to.be.equal(exampleAssociationEvent.eventID);
    expect(obj.getEventTime()).to.be.equal(exampleAssociationEvent.eventTime);
    expect(obj.getEventTimeZoneOffset()).to.be.equal(exampleAssociationEvent.eventTimeZoneOffset);
    expect(obj.getRecordTime()).to.be.equal(exampleAssociationEvent.recordTime);
    expect(obj.getAction()).to.be.equal(exampleAssociationEvent.action);
    expect(obj.getDisposition()).to.be.equal(exampleAssociationEvent.disposition);
    expect(obj.getBizStep()).to.be.equal(exampleAssociationEvent.bizStep);
    expect(obj.getReadPoint().getId()).to.be.equal(exampleAssociationEvent.readPoint.id);
    expect(obj.getParentId()).to.be.equal(exampleAssociationEvent.parentID);
  });

  it('should create an AssociationEvent from json', async () => {
    const obj = new AssociationEvent(exampleAssociationEvent);
    expect(obj.getBizLocation()).to.be.instanceof(BizLocation);
    expect(obj.getBizTransactionList()[0]).to.be.instanceof(BizTransactionElement);
    expect(obj.getDestinationList()[0]).to.be.instanceof(DestinationElement);
    expect(obj.getChildQuantityList()[0]).to.be.instanceof(QuantityElement);
    expect(obj.getReadPoint()).to.be.instanceof(ReadPoint);
    expect(obj.getSourceList()[0]).to.be.instanceof(SourceElement);
    expect(obj.toObject()).to.deep.equal(exampleAssociationEvent);
  });

  describe('childEPCList field', () => {
    it('should add and remove epc', async () => {
      const o = new AssociationEvent();
      o.addChildEPC(epc1);
      expect(o.getChildEPCList().toString()).to.be.equal([epc1].toString());
      o.addChildEPC(epc2);
      expect(o.getChildEPCList().toString()).to.be.equal([epc1, epc2].toString());
      o.removeChildEPC(epc1);
      expect(o.getChildEPCList().toString()).to.be.equal([epc2].toString());
      o.removeChildEPC(epc2);
      expect(o.getChildEPCList().toString()).to.be.equal([].toString());
    });

    it('should add an epc list', async () => {
      const o = new AssociationEvent();
      o.addChildEPCList([epc1, epc2]);
      expect(o.getChildEPCList().toString()).to.be.equal([epc1, epc2].toString());
      o.removeChildEPC(epc1);
      o.removeChildEPC(epc2);

      // trying again but with a non-empty list
      o.addChildEPC(epc3);
      expect(o.getChildEPCList().toString()).to.be.equal([epc3].toString());
      o.addChildEPCList([epc1, epc2]);
      expect(o.getChildEPCList().toString()).to.be.equal([epc3, epc1, epc2].toString());
    });

    it('should remove an epc list', async () => {
      const o = new AssociationEvent();
      o.addChildEPCList([epc1, epc2, epc3]);
      o.removeChildEPCList([epc1, epc2]);
      expect(o.getChildEPCList().toString()).to.be.equal([epc3].toString());

      // trying again but removing the whole list
      o.addChildEPC(epc2);
      o.removeChildEPCList([epc2, epc3]);
      expect(o.getChildEPCList().toString()).to.be.equal([].toString());
    });

    it('should clear the epc list', async () => {
      const o = new AssociationEvent();
      o.addChildEPCList([epc1, epc2, epc3]);
      o.clearChildEPCList();
      expect(o.getChildEPCList()).to.be.equal(undefined);
    });

    it('should not add the epc list to JSON if it is not defined', async () => {
      const o = new AssociationEvent();
      const json = o.toObject();
      expect(json.childEPCs).to.be.equal(undefined);
    });
  });

  describe('childQuantityList field', () => {
    const quantity1 = new QuantityElement(exampleAssociationEvent.childQuantityList[0]);
    const quantity2 = new QuantityElement(exampleAssociationEvent.childQuantityList[1]);
    const quantity3 = new QuantityElement(exampleAssociationEvent.childQuantityList[2]);

    it('should add and remove quantity', async () => {
      const o = new AssociationEvent();
      o.addChildQuantity(quantity1);
      expect(o.getChildQuantityList().toString()).to.be.equal([quantity1].toString());
      o.addChildQuantity(quantity2);
      expect(o.getChildQuantityList().toString()).to.be.equal([quantity1, quantity2].toString());
      o.removeChildQuantity(quantity1);
      expect(o.getChildQuantityList().toString()).to.be.equal([quantity2].toString());
      o.removeChildQuantity(quantity2);
      expect(o.getChildQuantityList().toString()).to.be.equal([].toString());
    });

    it('should add a quantity list', async () => {
      const o = new AssociationEvent();
      o.addChildQuantityList([quantity1, quantity2]);
      expect(o.getChildQuantityList().toString()).to.be.equal([quantity1, quantity2].toString());
      o.removeChildQuantity(quantity1);
      o.removeChildQuantity(quantity2);

      // trying again but with a non-empty list
      o.addChildQuantity(quantity3);
      expect(o.getChildQuantityList().toString()).to.be.equal([quantity3].toString());
      o.addChildQuantityList([quantity1, quantity2]);
      expect(o.getChildQuantityList().toString()).to.be
        .equal([quantity3, quantity1, quantity2].toString());
    });

    it('should remove a quantity list', async () => {
      const o = new AssociationEvent();
      o.addChildQuantityList([quantity1, quantity2, quantity3]);
      o.removeChildQuantityList([quantity1, quantity2]);
      expect(o.getChildQuantityList().toString()).to.be.equal([quantity3].toString());

      // trying again but removing the whole list
      o.addChildQuantity(quantity2);
      o.removeChildQuantityList([quantity2, quantity3]);
      expect(o.getChildQuantityList().toString()).to.be.equal([].toString());
    });

    it('should clear the quantity list', async () => {
      const o = new AssociationEvent();
      o.addChildQuantityList([quantity1, quantity2]);
      o.clearChildQuantityList();
      expect(o.getChildQuantityList()).to.be.equal(undefined);
    });

    it('should not add the quantity list to JSON if it is not defined', async () => {
      const o = new AssociationEvent();
      const json = o.toObject();
      expect(json.childQuantityList).to.be.equal(undefined);
    });
  });

  it('should throw if we access non authorized functions', async () => {
    const o = new AssociationEvent();
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

    assert.throws(() => o.setIlmd(new Ilmd()));
    assert.throws(() => o.getIlmd());

    assert.doesNotThrow(() => o.setParentId('id'));
    assert.doesNotThrow(() => o.getParentId());

    assert.doesNotThrow(() => o.addChildEPC(''));
    assert.doesNotThrow(() => o.removeChildEPC(''));
    assert.doesNotThrow(() => o.removeChildEPCList(['']));
    assert.doesNotThrow(() => o.addChildEPCList(['']));
    assert.doesNotThrow(() => o.getChildEPCList());
    assert.doesNotThrow(() => o.clearChildEPCList());

    assert.doesNotThrow(() => o.addChildQuantity(new QuantityElement()));
    assert.doesNotThrow(() => o.removeChildQuantity(new QuantityElement()));
    assert.doesNotThrow(() => o.removeChildQuantityList([new QuantityElement()]));
    assert.doesNotThrow(() => o.addChildQuantityList([new QuantityElement()]));
    assert.doesNotThrow(() => o.getChildQuantityList());
    assert.doesNotThrow(() => o.clearChildQuantityList());

    assert.doesNotThrow(() => o.setPersistentDisposition(new PersistentDisposition()));
    assert.doesNotThrow(() => o.getPersistentDisposition());

    assert.doesNotThrow(() => o.addSensorElement(new SensorElement()));
    assert.doesNotThrow(() => o.removeSensorElement(new SensorElement()));
    assert.doesNotThrow(() => o.removeSensorElementList([new SensorElement()]));
    assert.doesNotThrow(() => o.addSensorElementList([new SensorElement()]));
    assert.doesNotThrow(() => o.getSensorElementList());
    assert.doesNotThrow(() => o.clearSensorElementList());
  });
});
