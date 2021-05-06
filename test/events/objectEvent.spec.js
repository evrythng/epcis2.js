import { expect } from 'chai';
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

const sensorElementList = [
  {
    sensorMetadata: {
      time: '2019-07-19T14:00:00.000+01:00',
      deviceID: 'urn:epc:id:giai:4000001.111',
      deviceMetadata: 'https://id.gs1.org/giai/4000001111',
      rawData: 'https://example.org/giai/401234599999',
      dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
      bizRules: 'https://example.org/gdti/4012345000054987',
    },
    sensorReport: [
      { type: 'gs1:MT-Humidity', value: 12.1, uom: 'A93' },
      {
        type: 'gs1:MT-Molar_concentration',
        chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
        value: 0.18,
        uom: 'C35',
      },
      {
        type: 'gs1:MT-Molar_concentration',
        microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
        value: 0.05,
        uom: 'C35',
      },
    ],
  },
  {
    sensorMetadata: {
      startTime: '2019-04-01T15:00:00.000+01:00',
      endTime: '2019-04-02T14:59:59.999+01:00',
      'example:someFurtherMetaData': 'someText',
    },
    sensorReport: [
      {
        type: 'gs1:MT-Temperature',
        minValue: 12.4,
        maxValue: 13.8,
        meanValue: 13.2,
        sDev: 0.41,
        uom: 'CEL',
        percRank: 50,
        percValue: 12.7,
        'example:cv': '123',
      },
      { type: 'example:someSensorProperty', stringValue: 'someSensorOutput' },
    ],
    'example:furtherSensorData': [
      { 'example:measure1': '123.5' },
      { 'example:measure2': '0.987' },
    ],
  },
  {
    sensorReport: [
      {
        type: 'gs1:MT-Temperature',
        uom: 'CEL',
        time: '2019-07-19T14:00:00.000+01:00',
        deviceID: 'urn:epc:id:giai:4000001.111',
        deviceMetadata: 'https://id.gs1.org/giai/4000001111',
        rawData: 'https://example.org/giai/401234599999',
        dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
        bizRules: 'https://example.org/gdti/4012345000054987',
      },
      { type: 'example:someSensorProperty', stringValue: 'someSensorOutput' },
    ],
  },
];
const exampleObjectEvent = {
  eventID: 'ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0',
  isA: 'ObjectEvent',
  action: 'OBSERVE',
  bizStep: 'urn:epcglobal:cbv:bizstep:shipping',
  disposition: 'urn:epcglobal:cbv:disp:in_transit',
  bizLocation: { id: 'urn:epc:id:sgln:9529999.99999.0' },
  epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
  eventTime: '2005-04-03T20:33:31.116-06:00',
  recordTime: '2020-04-04T20:33:31.116-06:00',
  eventTimeZoneOffset: '-06:00',
  readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
  bizTransactionList: [{
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345678',
  },
  {
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345679',
  }],
  destinationList: [
    { type: 'urn:epcglobal:cbv:sdt:owning_party', destination: 'urn:epc:id:pgln:9520999.99999' },
  ],
  'example:myField': 'Example of a vendor/user extension',
  quantityList: [
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998877', quantity: 200, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998878', quantity: 201, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998879', quantity: 202, uom: 'KGM' },
  ],
  sensorElementList,
  errorDeclaration: {
    declarationTime: '2020-01-15T00:00:00.000+01:00',
    reason: 'urn:epcglobal:cbv:er:incorrect_data',
    'example:vendorExtension': 'Test1',
    correctiveEventIDs: [
      'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8',
    ],
  },
  sourceList: [
    { type: 'urn:epcglobal:cbv:sdt:owning_party', source: 'urn:epc:id:pgln:9520001.11111' },
    { type: 'urn:epcglobal:cbv:sdt:owning_party', source: 'urn:epc:id:pgln:9520001.11112' },
  ],
  persistentDisposition: {
    set: ['urn:epcglobal:cbv:disp:completeness_inferred'],
    unset: ['urn:epcglobal:cbv:disp:completeness_verified'],
  },
  ilmd: { 'example:bestBeforeDate': '2014-12-10', 'example:batch': 'XYZ' },
};
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
      expect(o.isA).to.be.equal('ObjectEvent');
    });
    it('should not use eventTimeZoneOffset from settings if it is not overridden', async () => {
      setup({});
      const o = new ObjectEvent();
      expect(o.eventTimeZoneOffset).to.be.equal(undefined);
    });
    it('should use eventTimeZoneOffset from settings if it is overridden', async () => {
      setup({ eventTimeZoneOffset: '+02:00' });
      const o = new ObjectEvent();
      expect(o.eventTimeZoneOffset).to.be.equal('+02:00');
    });
  });

  it('setters should set the variables correctly', async () => {
    const obj = new ObjectEvent();
    obj.setEventID(exampleObjectEvent.eventID)
      .addEPCList(exampleObjectEvent.epcList)
      .setEventTime(exampleObjectEvent.eventTime)
      .setRecordTime(exampleObjectEvent.recordTime)
      .setErrorDeclaration(new ErrorDeclaration(exampleObjectEvent.errorDeclaration))
      .addExtension('example:myField', exampleObjectEvent['example:myField'])
      .setAction(exampleObjectEvent.action)
      .setDisposition(exampleObjectEvent.disposition)
      .setBizStep(exampleObjectEvent.bizStep)
      .setPersistentDisposition(new PersistentDisposition(exampleObjectEvent.persistentDisposition))
      .setReadPoint(exampleObjectEvent.readPoint.id)
      .setBizLocation(exampleObjectEvent.bizLocation.id)
      .setIlmd(new Ilmd(exampleObjectEvent.ilmd));

    expect(obj.getEPCList().toString()).to.be.equal(exampleObjectEvent.epcList.toString());
    expect(obj.getEventID()).to.be.equal(exampleObjectEvent.eventID);
    expect(obj.getEventTime()).to.be.equal(exampleObjectEvent.eventTime);
    expect(obj.getEventTimeZoneOffset()).to.be.equal(exampleObjectEvent.eventTimeZoneOffset);
    expect(obj.getRecordTime()).to.be.equal(exampleObjectEvent.recordTime);
    expect(obj['example:myField']).to.be.equal(exampleObjectEvent['example:myField']);
    expect(obj.getErrorDeclaration().getDeclarationTime()).to
      .be.equal(exampleObjectEvent.errorDeclaration.declarationTime);
    expect(obj.getErrorDeclaration().getReason()).to
      .be.equal(exampleObjectEvent.errorDeclaration.reason);
    expect(obj.getErrorDeclaration().getCorrectiveEventIDs().toString())
      .to.be.equal(exampleObjectEvent.errorDeclaration.correctiveEventIDs.toString());
    expect(obj.getErrorDeclaration()['example:vendorExtension']).to
      .be.equal(exampleObjectEvent.errorDeclaration['example:vendorExtension']);
    expect(obj.getAction()).to.be.equal(exampleObjectEvent.action);
    expect(obj.getDisposition()).to.be.equal(exampleObjectEvent.disposition);
    expect(obj.getBizStep()).to.be.equal(exampleObjectEvent.bizStep);
    expect(obj.getPersistentDisposition().getUnset().toString()).to
      .be.equal(exampleObjectEvent.persistentDisposition.unset.toString());
    expect(obj.getPersistentDisposition().getSet().toString()).to
      .be.equal(exampleObjectEvent.persistentDisposition.set.toString());
    expect(obj.getReadPoint().getId()).to.be.equal(exampleObjectEvent.readPoint.id);
    expect(obj.getIlmd()['example:bestBeforeDate']).to
      .be.equal(exampleObjectEvent.ilmd['example:bestBeforeDate']);
  });
  it('should create an ObjectEvent from json', async () => {
    const obj = new ObjectEvent(exampleObjectEvent);
    expect(obj.toObject()).to.deep.equal(exampleObjectEvent);
  });
  it('should be able to set the time zone offset from number or string', async () => {
    const o1 = new ObjectEvent();
    const o2 = new ObjectEvent();
    o1.setEventTimeZoneOffset('-06:00');
    o2.setEventTimeZoneOffset(-6);
    expect(o1.toObject().eventTimeZoneOffset).to.be.equal(o2.toObject().eventTimeZoneOffset);
  });
  it('should add a custom field', async () => {
    const objectEvent = new ObjectEvent();
    objectEvent.addExtension('key', 'value');
    expect(objectEvent.toObject().key).to.be.equal(('value'));
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
      expect(o.bizTransactionList.toString()).to.be
        .equal([bizTransaction1, bizTransaction2].toString());
      o.removeBizTransaction(bizTransaction1);
      expect(o.bizTransactionList.toString()).to.be.equal([bizTransaction2].toString());
      o.removeBizTransaction(bizTransaction2);
      expect(o.bizTransactionList.toString()).to.be.equal([].toString());
    });
    it('should add a bizTransaction list', async () => {
      const o = new ObjectEvent();
      o.addBizTransactionList([bizTransaction1, bizTransaction2]);
      expect(o.bizTransactionList.toString()).to.be
        .equal([bizTransaction1, bizTransaction2].toString());
    });
    it('should remove a bizTransaction list', async () => {
      const o = new ObjectEvent();
      o.addBizTransactionList([bizTransaction1, bizTransaction2]);
      expect(o.bizTransactionList.toString()).to.be
        .equal([bizTransaction1, bizTransaction2].toString());
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
      expect(o.sensorElementList.toString()).to.be
        .equal([sensorElement1, sensorElement2].toString());
      o.removeSensorElement(sensorElement1);
      expect(o.sensorElementList.toString()).to.be.equal([sensorElement2].toString());
      o.removeSensorElement(sensorElement2);
      expect(o.sensorElementList.toString()).to.be.equal([].toString());
    });
    it('should add a sensorElement list', async () => {
      const o = new ObjectEvent();
      o.addSensorElementList([sensorElement1, sensorElement2]);
      expect(o.sensorElementList.toString()).to.be
        .equal([sensorElement1, sensorElement2].toString());
    });
    it('should remove a sensorElement list', async () => {
      const o = new ObjectEvent();
      o.addSensorElementList([sensorElement1, sensorElement2]);
      expect(o.sensorElementList.toString()).to.be
        .equal([sensorElement1, sensorElement2].toString());
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
});
