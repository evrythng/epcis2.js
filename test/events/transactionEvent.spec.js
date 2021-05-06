import { expect } from 'chai';
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
import { exampleTransactionEvent } from '../data/eventExample';

describe('unit tests for the TransactionEvent class', () => {
  it('setters should set the variables correctly', async () => {
    const obj = new TransactionEvent();
    obj.setEventID(exampleTransactionEvent.eventID)
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
      .setReadPoint(exampleTransactionEvent.readPoint.id)
      .setBizLocation(exampleTransactionEvent.bizLocation.id)
      .setParentId(exampleTransactionEvent.parentID);

    expect(obj.getEPCList().toString()).to.be.equal(exampleTransactionEvent.epcList.toString());
    expect(obj.getEventID()).to.be.equal(exampleTransactionEvent.eventID);
    expect(obj.getEventTime()).to.be.equal(exampleTransactionEvent.eventTime);
    expect(obj.getEventTimeZoneOffset()).to.be.equal(exampleTransactionEvent.eventTimeZoneOffset);
    expect(obj.getRecordTime()).to.be.equal(exampleTransactionEvent.recordTime);
    expect(obj['example:myField']).to.be.equal(exampleTransactionEvent['example:myField']);
    expect(obj.getErrorDeclaration().getDeclarationTime()).to
      .be.equal(exampleTransactionEvent.errorDeclaration.declarationTime);
    expect(obj.getErrorDeclaration().getReason()).to
      .be.equal(exampleTransactionEvent.errorDeclaration.reason);
    expect(obj.getErrorDeclaration().getCorrectiveEventIDs().toString())
      .to.be.equal(exampleTransactionEvent.errorDeclaration.correctiveEventIDs.toString());
    expect(obj.getErrorDeclaration()['example:vendorExtension']).to
      .be.equal(exampleTransactionEvent.errorDeclaration['example:vendorExtension']);
    expect(obj.getAction()).to.be.equal(exampleTransactionEvent.action);
    expect(obj.getDisposition()).to.be.equal(exampleTransactionEvent.disposition);
    expect(obj.getBizStep()).to.be.equal(exampleTransactionEvent.bizStep);
    expect(obj.getPersistentDisposition().getUnset().toString()).to
      .be.equal(exampleTransactionEvent.persistentDisposition.unset.toString());
    expect(obj.getPersistentDisposition().getSet().toString()).to
      .be.equal(exampleTransactionEvent.persistentDisposition.set.toString());
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
});
