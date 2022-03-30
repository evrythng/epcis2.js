/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import TransactionEvent from '../../src/entity/events/TransactionEvent';
import ErrorDeclaration from '../../src/entity/model/ErrorDeclaration';
import QuantityElement from '../../src/entity/model/QuantityElement';
import PersistentDisposition from '../../src/entity/model/PersistentDisposition';
import ReadPoint from '../../src/entity/model/ReadPoint';
import BizLocation from '../../src/entity/model/BizLocation';
import BizTransactionElement from '../../src/entity/model/BizTransactionElement';
import SourceElement from '../../src/entity/model/SourceElement';
import DestinationElement from '../../src/entity/model/DestinationElement';
import SensorElement from '../../src/entity/model/sensor/SensorElement';
import Ilmd from '../../src/entity/model/Ilmd';
import EPCISDocumentTransactionEvent from '../data/EPCISDocument-TransactionEvent.json';

const exampleTransactionEvent = EPCISDocumentTransactionEvent.epcisBody.eventList[0];

describe('unit tests for the TransactionEvent class', () => {
  it('setters should set the variables correctly', async () => {
    const obj = new TransactionEvent();
    obj
      .setEventID(exampleTransactionEvent.eventID)
      .addEPCList(exampleTransactionEvent.epcList)
      .setEventTime(exampleTransactionEvent.eventTime)
      .setRecordTime(exampleTransactionEvent.recordTime)
      .setErrorDeclaration(new ErrorDeclaration(exampleTransactionEvent.errorDeclaration))
      .addExtension('example:myField', exampleTransactionEvent['example:myField'])
      .setAction(exampleTransactionEvent.action)
      .setDisposition(exampleTransactionEvent.disposition)
      .setBizStep(exampleTransactionEvent.bizStep)
      .setPersistentDisposition(
        new PersistentDisposition(exampleTransactionEvent.persistentDisposition),
      )
      .setEventTimeZoneOffset(exampleTransactionEvent.eventTimeZoneOffset)
      .setReadPoint(exampleTransactionEvent.readPoint.id)
      .setBizLocation(exampleTransactionEvent.bizLocation.id)
      .setParentId(exampleTransactionEvent.parentID);

    expect(obj.getEPCList().toString()).to.be.equal(exampleTransactionEvent.epcList.toString());
    expect(obj.getEventID()).to.be.equal(exampleTransactionEvent.eventID);
    expect(obj.getEventTime()).to.be.equal(exampleTransactionEvent.eventTime);
    expect(obj.getEventTimeZoneOffset()).to.be.equal(exampleTransactionEvent.eventTimeZoneOffset);
    expect(obj.getRecordTime()).to.be.equal(exampleTransactionEvent.recordTime);
    expect(obj['example:myField']).to.be.equal(exampleTransactionEvent['example:myField']);
    expect(obj.getErrorDeclaration().getDeclarationTime()).to.be.equal(
      exampleTransactionEvent.errorDeclaration.declarationTime,
    );
    expect(obj.getErrorDeclaration().getReason()).to.be.equal(
      exampleTransactionEvent.errorDeclaration.reason,
    );
    expect(obj.getErrorDeclaration().getCorrectiveEventIDs().toString()).to.be.equal(
      exampleTransactionEvent.errorDeclaration.correctiveEventIDs.toString(),
    );
    expect(obj.getErrorDeclaration()['example:vendorExtension']).to.be.equal(
      exampleTransactionEvent.errorDeclaration['example:vendorExtension'],
    );
    expect(obj.getAction()).to.be.equal(exampleTransactionEvent.action);
    expect(obj.getDisposition()).to.be.equal(exampleTransactionEvent.disposition);
    expect(obj.getBizStep()).to.be.equal(exampleTransactionEvent.bizStep);
    expect(obj.getPersistentDisposition().getUnset().toString()).to.be.equal(
      exampleTransactionEvent.persistentDisposition.unset.toString(),
    );
    expect(obj.getPersistentDisposition().getSet().toString()).to.be.equal(
      exampleTransactionEvent.persistentDisposition.set.toString(),
    );
    expect(obj.getReadPoint().getId()).to.be.equal(exampleTransactionEvent.readPoint.id);
    expect(obj.getParentId()).to.be.equal(exampleTransactionEvent.parentID);
  });

  it('should create an TransactionEvent from json', async () => {
    const obj = new TransactionEvent(exampleTransactionEvent);
    expect(obj.getBizLocation()).to.be.instanceof(BizLocation);
    expect(obj.getBizTransactionList()[0]).to.be.instanceof(BizTransactionElement);
    expect(obj.getDestinationList()[0]).to.be.instanceof(DestinationElement);
    expect(obj.getPersistentDisposition()).to.be.instanceof(PersistentDisposition);
    expect(obj.getQuantityList()[0]).to.be.instanceof(QuantityElement);
    expect(obj.getReadPoint()).to.be.instanceof(ReadPoint);
    expect(obj.getErrorDeclaration()).to.be.instanceof(ErrorDeclaration);
    expect(obj.getSensorElementList()[0]).to.be.instanceof(SensorElement);
    expect(obj.getSourceList()[0]).to.be.instanceof(SourceElement);
    expect(obj.toObject()).to.deep.equal(exampleTransactionEvent);
  });

  it('should throw if we access non authorized functions', async () => {
    const o = new TransactionEvent();
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
    assert.throws(() => o.setIlmd(new Ilmd()));
    assert.throws(() => o.getIlmd());
    assert.doesNotThrow(() => o.setParentId('id'));
    assert.doesNotThrow(() => o.getParentId());
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
  describe('TransactionEvent.isValid()', () => {
    it('should accept a real TransactionEvent', async () => {
      const ee = new TransactionEvent(exampleTransactionEvent)
      expect(ee.type).to.be.equal('TransactionEvent');
      assert.doesNotThrow(() => ee.isValid());
    });
    it('should reject an undefined Event', async () => {
      const ee = undefined;
      assert.throw(() => ee.isValid());
    });
    it('should reject an incomplete Event', async () => {
      const ee = new TransactionEvent({
        type: "TransactionEvent"
      })
      assert.throw(() => ee.isValid());
    });
  });
});
