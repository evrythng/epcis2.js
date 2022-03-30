/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import ErrorDeclaration from '../../src/entity/model/ErrorDeclaration';
import QuantityElement from '../../src/entity/model/QuantityElement';
import BizTransactionElement from '../../src/entity/model/BizTransactionElement';
import SourceElement from '../../src/entity/model/SourceElement';
import DestinationElement from '../../src/entity/model/DestinationElement';
import EPCISDocumentTransformationEvent from '../data/EPCISDocument-TransformationEvent.json';
import EPCISDocumentObjectEvent from '../data/EPCISDocument-ObjectEvent.json';
import Ilmd from '../../src/entity/model/Ilmd';
import PersistentDisposition from '../../src/entity/model/PersistentDisposition';
import SensorElement from '../../src/entity/model/sensor/SensorElement';
import TransformationEvent from '../../src/entity/events/TransformationEvent';

const exampleTransformationEvent = EPCISDocumentTransformationEvent.epcisBody.eventList[0];
const exampleObjectEvent = EPCISDocumentObjectEvent.epcisBody.eventList[0];

const epc1 = exampleObjectEvent.epcList[0];
const epc2 = exampleObjectEvent.epcList[1];
const epc3 = 'urn:epc:id:sgtin:0614141.107346.2019';

describe('unit tests for the TransformationEvent class', () => {
  it('setters should set the variables correctly', async () => {
    const obj = new TransformationEvent();
    obj
      .setEventID(exampleTransformationEvent.eventID)
      .addInputEPCList(exampleTransformationEvent.inputEPCList)
      .setDisposition(exampleTransformationEvent.disposition)
      .setBizStep(exampleTransformationEvent.bizStep)
      .setReadPoint(exampleTransformationEvent.readPoint.id)
      .setIlmd(new Ilmd(exampleTransformationEvent.ilmd));

    expect(obj.getInputEPCList().toString()).to.be.equal(
      exampleTransformationEvent.inputEPCList.toString(),
    );
    expect(obj.getEventID()).to.be.equal(exampleTransformationEvent.eventID);
    expect(obj.getDisposition()).to.be.equal(exampleTransformationEvent.disposition);
    expect(obj.getBizStep()).to.be.equal(exampleTransformationEvent.bizStep);
    expect(obj.getReadPoint().getId()).to.be.equal(exampleTransformationEvent.readPoint.id);
    expect(obj.getIlmd().toObject()).to.deep.equal(exampleTransformationEvent.ilmd);
  });

  it('should create an TransformationEvent from json', async () => {
    const obj = new TransformationEvent(exampleTransformationEvent);
    expect(obj.getInputQuantityList()[0]).to.be.instanceof(QuantityElement);
    expect(obj.getOutputQuantityList()[0]).to.be.instanceof(QuantityElement);
    expect(obj.getIlmd()).to.be.instanceof(Ilmd);
    expect(obj.toObject()).to.deep.equal(exampleTransformationEvent);
  });

  describe('inputEPCList field', () => {
    it('should add and remove epc', async () => {
      const o = new TransformationEvent();
      o.addInputEPC(epc1);
      expect(o.getInputEPCList().toString()).to.be.equal([epc1].toString());
      o.addInputEPC(epc2);
      expect(o.getInputEPCList().toString()).to.be.equal([epc1, epc2].toString());
      o.removeInputEPC(epc1);
      expect(o.getInputEPCList().toString()).to.be.equal([epc2].toString());
      o.removeInputEPC(epc2);
      expect(o.getInputEPCList().toString()).to.be.equal([].toString());
    });

    it('should add an epc list', async () => {
      const o = new TransformationEvent();
      o.addInputEPCList([epc1, epc2]);
      expect(o.getInputEPCList().toString()).to.be.equal([epc1, epc2].toString());
      o.removeInputEPC(epc1);
      o.removeInputEPC(epc2);

      // trying again but with a non-empty list
      o.addInputEPC(epc3);
      expect(o.getInputEPCList().toString()).to.be.equal([epc3].toString());
      o.addInputEPCList([epc1, epc2]);
      expect(o.getInputEPCList().toString()).to.be.equal([epc3, epc1, epc2].toString());
    });

    it('should remove an epc list', async () => {
      const o = new TransformationEvent();
      o.addInputEPCList([epc1, epc2, epc3]);
      o.removeInputEPCList([epc1, epc2]);
      expect(o.getInputEPCList().toString()).to.be.equal([epc3].toString());

      // trying again but removing the whole list
      o.addInputEPC(epc2);
      o.removeInputEPCList([epc2, epc3]);
      expect(o.getInputEPCList().toString()).to.be.equal([].toString());
    });

    it('should clear the epc list', async () => {
      const o = new TransformationEvent();
      o.addInputEPCList([epc1, epc2, epc3]);
      o.clearInputEPCList();
      expect(o.getInputEPCList()).to.be.equal(undefined);
    });

    it('should not add the epc list to JSON if it is not defined', async () => {
      const o = new TransformationEvent();
      const json = o.toObject();
      expect(json.inputEPCList).to.be.equal(undefined);
    });
  });

  describe('inputQuantityList field', () => {
    const quantity1 = new QuantityElement(exampleTransformationEvent.inputQuantityList[0]);
    const quantity2 = new QuantityElement(exampleTransformationEvent.inputQuantityList[1]);
    const quantity3 = new QuantityElement(exampleTransformationEvent.inputQuantityList[2]);

    it('should add and remove quantity', async () => {
      const o = new TransformationEvent();
      o.addInputQuantity(quantity1);
      expect(o.getInputQuantityList().toString()).to.be.equal([quantity1].toString());
      o.addInputQuantity(quantity2);
      expect(o.getInputQuantityList().toString()).to.be.equal([quantity1, quantity2].toString());
      o.removeInputQuantity(quantity1);
      expect(o.getInputQuantityList().toString()).to.be.equal([quantity2].toString());
      o.removeInputQuantity(quantity2);
      expect(o.getInputQuantityList().toString()).to.be.equal([].toString());
    });

    it('should add a quantity list', async () => {
      const o = new TransformationEvent();
      o.addInputQuantityList([quantity1, quantity2]);
      expect(o.getInputQuantityList().toString()).to.be.equal([quantity1, quantity2].toString());
      o.removeInputQuantity(quantity1);
      o.removeInputQuantity(quantity2);

      // trying again but with a non-empty list
      o.addInputQuantity(quantity3);
      expect(o.getInputQuantityList().toString()).to.be.equal([quantity3].toString());
      o.addInputQuantityList([quantity1, quantity2]);
      expect(o.getInputQuantityList().toString()).to.be.equal(
        [quantity3, quantity1, quantity2].toString(),
      );
    });

    it('should remove a quantity list', async () => {
      const o = new TransformationEvent();
      o.addInputQuantityList([quantity1, quantity2, quantity3]);
      o.removeInputQuantityList([quantity1, quantity2]);
      expect(o.getInputQuantityList().toString()).to.be.equal([quantity3].toString());

      // trying again but removing the whole list
      o.addInputQuantity(quantity2);
      o.removeInputQuantityList([quantity2, quantity3]);
      expect(o.getInputQuantityList().toString()).to.be.equal([].toString());
    });

    it('should clear the quantity list', async () => {
      const o = new TransformationEvent();
      o.addInputQuantityList([quantity1, quantity2]);
      o.clearInputQuantityList();
      expect(o.getInputQuantityList()).to.be.equal(undefined);
    });

    it('should not add the quantity list to JSON if it is not defined', async () => {
      const o = new TransformationEvent();
      const json = o.toObject();
      expect(json.inputQuantityList).to.be.equal(undefined);
    });
  });

  describe('outputEPCList field', () => {
    it('should add and remove epc', async () => {
      const o = new TransformationEvent();
      o.addOutputEPC(epc1);
      expect(o.getOutputEPCList().toString()).to.be.equal([epc1].toString());
      o.addOutputEPC(epc2);
      expect(o.getOutputEPCList().toString()).to.be.equal([epc1, epc2].toString());
      o.removeOutputEPC(epc1);
      expect(o.getOutputEPCList().toString()).to.be.equal([epc2].toString());
      o.removeOutputEPC(epc2);
      expect(o.getOutputEPCList().toString()).to.be.equal([].toString());
    });

    it('should add an epc list', async () => {
      const o = new TransformationEvent();
      o.addOutputEPCList([epc1, epc2]);
      expect(o.getOutputEPCList().toString()).to.be.equal([epc1, epc2].toString());
      o.removeOutputEPC(epc1);
      o.removeOutputEPC(epc2);

      // trying again but with a non-empty list
      o.addOutputEPC(epc3);
      expect(o.getOutputEPCList().toString()).to.be.equal([epc3].toString());
      o.addOutputEPCList([epc1, epc2]);
      expect(o.getOutputEPCList().toString()).to.be.equal([epc3, epc1, epc2].toString());
    });

    it('should remove an epc list', async () => {
      const o = new TransformationEvent();
      o.addOutputEPCList([epc1, epc2, epc3]);
      o.removeOutputEPCList([epc1, epc2]);
      expect(o.getOutputEPCList().toString()).to.be.equal([epc3].toString());

      // trying again but removing the whole list
      o.addOutputEPC(epc2);
      o.removeOutputEPCList([epc2, epc3]);
      expect(o.getOutputEPCList().toString()).to.be.equal([].toString());
    });

    it('should clear the epc list', async () => {
      const o = new TransformationEvent();
      o.addOutputEPCList([epc1, epc2, epc3]);
      o.clearOutputEPCList();
      expect(o.getOutputEPCList()).to.be.equal(undefined);
    });

    it('should not add the epc list to JSON if it is not defined', async () => {
      const o = new TransformationEvent();
      const json = o.toObject();
      expect(json.outputEPCList).to.be.equal(undefined);
    });
  });

  describe('outputQuantityList field', () => {
    const quantity1 = new QuantityElement(exampleTransformationEvent.outputQuantityList[0]);
    const quantity2 = new QuantityElement(exampleTransformationEvent.outputQuantityList[1]);
    const quantity3 = new QuantityElement(exampleTransformationEvent.outputQuantityList[2]);

    it('should add and remove quantity', async () => {
      const o = new TransformationEvent();
      o.addOutputQuantity(quantity1);
      expect(o.getOutputQuantityList().toString()).to.be.equal([quantity1].toString());
      o.addOutputQuantity(quantity2);
      expect(o.getOutputQuantityList().toString()).to.be.equal([quantity1, quantity2].toString());
      o.removeOutputQuantity(quantity1);
      expect(o.getOutputQuantityList().toString()).to.be.equal([quantity2].toString());
      o.removeOutputQuantity(quantity2);
      expect(o.getOutputQuantityList().toString()).to.be.equal([].toString());
    });

    it('should add a quantity list', async () => {
      const o = new TransformationEvent();
      o.addOutputQuantityList([quantity1, quantity2]);
      expect(o.getOutputQuantityList().toString()).to.be.equal([quantity1, quantity2].toString());
      o.removeOutputQuantity(quantity1);
      o.removeOutputQuantity(quantity2);

      // trying again but with a non-empty list
      o.addOutputQuantity(quantity3);
      expect(o.getOutputQuantityList().toString()).to.be.equal([quantity3].toString());
      o.addOutputQuantityList([quantity1, quantity2]);
      expect(o.getOutputQuantityList().toString()).to.be.equal(
        [quantity3, quantity1, quantity2].toString(),
      );
    });

    it('should remove a quantity list', async () => {
      const o = new TransformationEvent();
      o.addOutputQuantityList([quantity1, quantity2, quantity3]);
      o.removeOutputQuantityList([quantity1, quantity2]);
      expect(o.getOutputQuantityList().toString()).to.be.equal([quantity3].toString());

      // trying again but removing the whole list
      o.addOutputQuantity(quantity2);
      o.removeOutputQuantityList([quantity2, quantity3]);
      expect(o.getOutputQuantityList().toString()).to.be.equal([].toString());
    });

    it('should clear the quantity list', async () => {
      const o = new TransformationEvent();
      o.addOutputQuantityList([quantity1, quantity2]);
      o.clearOutputQuantityList();
      expect(o.getOutputQuantityList()).to.be.equal(undefined);
    });

    it('should not add the quantity list to JSON if it is not defined', async () => {
      const o = new TransformationEvent();
      const json = o.toObject();
      expect(json.outputQuantityList).to.be.equal(undefined);
    });
  });

  it('should throw if we access non authorized functions', async () => {
    const o = new TransformationEvent();
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

    assert.doesNotThrow(() => o.getInputEPCList());
    assert.doesNotThrow(() => o.clearInputEPCList());
    assert.doesNotThrow(() => o.addInputEPC('e'));
    assert.doesNotThrow(() => o.removeInputEPC('e'));
    assert.doesNotThrow(() => o.addInputEPCList(['e']));
    assert.doesNotThrow(() => o.removeInputEPCList(['e']));

    assert.doesNotThrow(() => o.addInputQuantityList([new QuantityElement()]));
    assert.doesNotThrow(() => o.removeInputQuantityList([new QuantityElement()]));
    assert.doesNotThrow(() => o.addInputQuantity(new QuantityElement()));
    assert.doesNotThrow(() => o.removeInputQuantity(new QuantityElement()));
    assert.doesNotThrow(() => o.clearInputQuantityList());
    assert.doesNotThrow(() => o.getInputQuantityList());

    assert.doesNotThrow(() => o.getOutputEPCList());
    assert.doesNotThrow(() => o.clearOutputEPCList());
    assert.doesNotThrow(() => o.addOutputEPC('e'));
    assert.doesNotThrow(() => o.removeOutputEPC('e'));
    assert.doesNotThrow(() => o.addOutputEPCList(['e']));
    assert.doesNotThrow(() => o.removeOutputEPCList(['e']));

    assert.doesNotThrow(() => o.addOutputQuantityList([new QuantityElement()]));
    assert.doesNotThrow(() => o.removeOutputQuantityList([new QuantityElement()]));
    assert.doesNotThrow(() => o.addOutputQuantity(new QuantityElement()));
    assert.doesNotThrow(() => o.removeOutputQuantity(new QuantityElement()));
    assert.doesNotThrow(() => o.clearOutputQuantityList());
    assert.doesNotThrow(() => o.getOutputQuantityList());

    assert.throws(() => o.setAction('OBSERVE'));
    assert.throws(() => o.getAction());

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

    assert.doesNotThrow(() => o.setTransformationID('id'));
    assert.doesNotThrow(() => o.getTransformationID());

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
    it('setters from TransformationEvent.js', () => {
      const transformationEvent = new TransformationEvent();
      assert.throws(() => transformationEvent.setTransformationID(1));
      assert.throws(() => transformationEvent.addInputEPC(1));
      assert.throws(() => transformationEvent.addInputEPCList([1, 2, 3]));
      assert.throws(() => transformationEvent.addOutputEPC(1));
      assert.throws(() => transformationEvent.addOutputEPCList([1, 2, 3]));
      assert.throws(() => transformationEvent.addInputQuantity(1));
      assert.throws(() => transformationEvent.addInputQuantityList([1, 2, 3]));
      assert.throws(() => transformationEvent.addOutputQuantity(1));
      assert.throws(() => transformationEvent.addOutputQuantityList([1, 2, 3]));
      assert.throws(() => transformationEvent.setTransformationID(new Ilmd()));
      assert.throws(() => transformationEvent.addInputEPC(new Ilmd()));
      assert.throws(() => transformationEvent.addInputEPCList([new Ilmd(), new Ilmd()]));
      assert.throws(() => transformationEvent.addOutputEPC(new Ilmd()));
      assert.throws(() => transformationEvent.addOutputEPCList([new Ilmd(), new Ilmd()]));
      assert.throws(() => transformationEvent.addInputQuantity(new Ilmd()));
      assert.throws(() => transformationEvent.addInputQuantityList([new Ilmd(), new Ilmd()]));
      assert.throws(() => transformationEvent.addOutputQuantity(new Ilmd()));
      assert.throws(() => transformationEvent.addOutputQuantityList([new Ilmd(), new Ilmd()]));
    });
  });
  describe('TransformationEvent.isValid()', () => {
    it('should accept a real TransformationEvent', async () => {
      const ee = new TransformationEvent(exampleTransformationEvent)
      expect(ee.type).to.be.equal('TransformationEvent');
      assert.doesNotThrow(() => ee.isValid());
    });
    it('should reject an undefined Event', async () => {
      const ee = undefined;
      assert.throw(() => ee.isValid());
    });
    it('should reject an incomplete Event', async () => {
      const ee = new TransformationEvent ({
        type: "TransformationEvent"
      })
      assert.throw(() => ee.isValid());
    });
  });
});
