/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import AggregationEvent from '../../src/entity/events/AggregationEvent';
import ErrorDeclaration from '../../src/entity/model/ErrorDeclaration';
import QuantityElement from '../../src/entity/model/QuantityElement';
import ReadPoint from '../../src/entity/model/ReadPoint';
import BizLocation from '../../src/entity/model/BizLocation';
import BizTransactionElement from '../../src/entity/model/BizTransactionElement';
import SourceElement from '../../src/entity/model/SourceElement';
import DestinationElement from '../../src/entity/model/DestinationElement';
import EPCISDocumentAggregationEvent from '../data/EPCISDocument-AggregationEvent.json';
import Ilmd from '../../src/entity/model/Ilmd';
import PersistentDisposition from '../../src/entity/model/PersistentDisposition';
import SensorElement from '../../src/entity/model/sensor/SensorElement';

const exampleAggregationEvent = EPCISDocumentAggregationEvent.epcisBody.eventList[0];

describe('unit tests for the AggregationEvent class', () => {
  it('setters should set the variables correctly', async () => {
    const obj = new AggregationEvent();
    obj
      .setEventID(exampleAggregationEvent.eventID)
      .addChildEPCList(exampleAggregationEvent.childEPCs)
      .setEventTime(exampleAggregationEvent.eventTime)
      .setRecordTime(exampleAggregationEvent.recordTime)
      .setErrorDeclaration(new ErrorDeclaration(exampleAggregationEvent.errorDeclaration))
      .setAction(exampleAggregationEvent.action)
      .setDisposition(exampleAggregationEvent.disposition)
      .setBizStep(exampleAggregationEvent.bizStep)
      .setReadPoint(exampleAggregationEvent.readPoint.id)
      .setBizLocation(exampleAggregationEvent.bizLocation.id)
      .setParentId(exampleAggregationEvent.parentID);

    expect(obj.getChildEPCList().toString()).to.be.equal(
      exampleAggregationEvent.childEPCs.toString(),
    );
    expect(obj.getEventID()).to.be.equal(exampleAggregationEvent.eventID);
    expect(obj.getEventTime()).to.be.equal(exampleAggregationEvent.eventTime);
    expect(obj.getRecordTime()).to.be.equal(exampleAggregationEvent.recordTime);
    expect(obj.getAction()).to.be.equal(exampleAggregationEvent.action);
    expect(obj.getDisposition()).to.be.equal(exampleAggregationEvent.disposition);
    expect(obj.getBizStep()).to.be.equal(exampleAggregationEvent.bizStep);
    expect(obj.getReadPoint().getId()).to.be.equal(exampleAggregationEvent.readPoint.id);
    expect(obj.getParentId()).to.be.equal(exampleAggregationEvent.parentID);
  });

  it('should create an AggregationEvent from json', async () => {
    const obj = new AggregationEvent(exampleAggregationEvent);
    expect(obj.getBizLocation()).to.be.instanceof(BizLocation);
    expect(obj.getChildQuantityList()[0]).to.be.instanceof(QuantityElement);
    expect(obj.getReadPoint()).to.be.instanceof(ReadPoint);
    expect(obj.toObject()).to.deep.equal(exampleAggregationEvent);
  });

  it('should throw if we access non authorized functions', async () => {
    const o = new AggregationEvent();
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
    assert.doesNotThrow(() => o.addChildEPCList(['']));
    assert.doesNotThrow(() => o.removeChildEPCList(['']));
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
    assert.doesNotThrow(() => o.setCertificationInfo('a:b:c'));
    assert.doesNotThrow(() => o.setCertificationInfo(['a:b:c', 'c:b:a']));
  });
  describe('AggregationEvent.isValid()', () => {
    it('should accept a real AggregationEvent', async () => {
      const ae = new AggregationEvent(exampleAggregationEvent);
      expect(ae.type).to.be.equal('AggregationEvent');
      assert.doesNotThrow(() => ae.isValid());
    });
    it('should reject an undefined Event', async () => {
      const ae = undefined;
      assert.throw(() => ae.isValid());
    });
    it('should reject an incomplete Event', async () => {
      const ae = new AggregationEvent({
        type: 'AggregationEvent',
      });
      assert.throw(() => ae.isValid());
    });
    it('should accept an Aggregation Event with a @context field', async () => {
      const exampleContext = [
        'https://www.w3.org/2019/wot/td/v1',
        { example: 'http://www.w3.org/2019/02/sparql-update' },
      ];
      const ee = new AggregationEvent(exampleAggregationEvent);
      ee.setContext(exampleContext);
      assert.doesNotThrow(() => ee.isValid());
    });
  });
});
