import { expect } from 'chai';
import SensorMetadata from '../../src/entity/model/sensor/SensorMetadata';
import SensorReportElement from '../../src/entity/model/sensor/SensorReportElement';
import SensorElement from '../../src/entity/model/sensor/SensorElement';

const exampleSensorMetadata = {
  time: '2019-04-02T14:05:00.000+01:00',
  startTime: '2019-04-02T14:05:00.000+02:00',
  endTime: '2019-04-02T14:05:00.000+03:00',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  bizRules: 'https://example.com/gdti/4012345000054987',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
};
const exampleSensorReportElement = {
  type: 'gs1:MT-Temperature',
  value: 26.0,
  uom: 'CEL',
  'ex:feature': 'ex:ambiance',
  minValue: 12.4,
  maxValue: 13.8,
  microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
  chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
  component: 'componentValue',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  time: '2019-04-02T14:05:00.000+01:00',
  meanValue: 13.2,
  sDev: 0.41,
  percRank: 50,
  percValue: 12.7,
  'example:cv': '123',
  hexBinaryValue: 'F0F0F0',
  stringValue: 'SomeString',
  booleanValue: true,
  uriValue: 'https://example.org/example/someSectorSpecificValue',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
  bizRules: 'https://example.org/gdti/4012345000054987',
};
const exampleSensorReportElement2 = {
  type: 'gs1:MT-Humidity',
  value: 26.0,
  uom: 'CEL',
  'ex:feature': 'ex:ambiance',
  minValue: 12.4,
  maxValue: 13.8,
  microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
  chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
  component: 'componentValue',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  time: '2019-04-02T14:05:00.000+01:00',
  meanValue: 13.2,
  sDev: 0.41,
  percRank: 50,
  percValue: 12.7,
  'example:cv': '123',
  hexBinaryValue: 'F0F0F0',
  stringValue: 'SomeString',
  booleanValue: true,
  uriValue: 'https://example.org/example/someSectorSpecificValue',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
  bizRules: 'https://example.org/gdti/4012345000054987',
};
const exampleSensorElement = {
  sensorMetadata: {
    time: '2019-07-19T14:00:00.000+01:00', deviceID: 'urn:epc:id:giai:4000001.111', deviceMetadata: 'https://id.gs1.org/giai/4000001111', rawData: 'https://example.org/giai/401234599999', dataProcessingMethod: 'https://example.com/gdti/4012345000054987', bizRules: 'https://example.org/gdti/4012345000054987',
  },
  sensorReport: [
    { type: 'gs1:MT-Humidity', value: 12.1, uom: 'A93' },
    {
      type: 'gs1:MT-Molar_concentration', chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N', value: 0.18, uom: 'C35',
    },
    {
      type: 'gs1:MT-Molar_concentration', microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011', value: 0.05, uom: 'C35',
    },
  ],
};

describe('unit tests for sensor relative Objects', () => {
  describe('SensorMetadata.js', () => {
    it('should create a valid SensorMetadata object from setters', async () => {
      const sensorMetadata = new SensorMetadata();
      sensorMetadata
        .setTime(exampleSensorMetadata.time)
        .setDeviceID(exampleSensorMetadata.deviceID)
        .setDeviceMetadata(exampleSensorMetadata.deviceMetadata)
        .setRawData(exampleSensorMetadata.rawData)
        .setStartTime(exampleSensorMetadata.startTime)
        .setEndTime(exampleSensorMetadata.endTime)
        .setDataProcessingMethod(exampleSensorMetadata.dataProcessingMethod)
        .setBizRules(exampleSensorMetadata.bizRules);

      expect(sensorMetadata.getTime()).to.be.equal(exampleSensorMetadata.time);
      expect(sensorMetadata.getDeviceID()).to.be.equal(exampleSensorMetadata.deviceID);
      expect(sensorMetadata.getDeviceMetadata()).to.be.equal(exampleSensorMetadata.deviceMetadata);
      expect(sensorMetadata.getRawData()).to.be.equal(exampleSensorMetadata.rawData);
      expect(sensorMetadata.getStartTime()).to.be.equal(exampleSensorMetadata.startTime);
      expect(sensorMetadata.getEndTime()).to.be.equal(exampleSensorMetadata.endTime);
      expect(sensorMetadata.getDataProcessingMethod()).to
        .be.equal(exampleSensorMetadata.dataProcessingMethod);
      expect(sensorMetadata.getBizRules()).to.be.equal(exampleSensorMetadata.bizRules);
    });
    it('should create a valid SensorMetadata object from JSON', async () => {
      const sensorMetadata = new SensorMetadata(exampleSensorMetadata);
      expect(sensorMetadata.toObject()).to.deep.equal(exampleSensorMetadata);
    });
    it('should add and remove custom fields', async () => {
      const obj = new SensorMetadata();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });
  describe('SensorReportElement.js', () => {
    it('should create a valid SensorReportElement object from setters', async () => {
      const sensorReport = new SensorReportElement();
      sensorReport
        .setType(exampleSensorReportElement.type)
        .setDeviceID(exampleSensorReportElement.deviceID)
        .setDeviceMetadata(exampleSensorReportElement.deviceMetadata)
        .setRawData(exampleSensorReportElement.rawData)
        .setDataProcessingMethod(exampleSensorReportElement.dataProcessingMethod)
        .setTime(exampleSensorReportElement.time)
        .setMicroorganism(exampleSensorReportElement.microorganism)
        .setChemicalSubstance(exampleSensorReportElement.chemicalSubstance)
        .setValue(exampleSensorReportElement.value)
        .setComponent(exampleSensorReportElement.component)
        .setStringValue(exampleSensorReportElement.stringValue)
        .setBooleanValue(exampleSensorReportElement.booleanValue)
        .setHexBinaryValue(exampleSensorReportElement.hexBinaryValue)
        .setUriValue(exampleSensorReportElement.uriValue)
        .setMinValue(exampleSensorReportElement.minValue)
        .setMaxValue(exampleSensorReportElement.maxValue)
        .setMeanValue(exampleSensorReportElement.meanValue)
        .setSDev(exampleSensorReportElement.sDev)
        .setPercRank(exampleSensorReportElement.percRank)
        .setPercValue(exampleSensorReportElement.percValue)
        .setUom(exampleSensorReportElement.uom);

      expect(sensorReport.getType()).to.be.equal(exampleSensorReportElement.type);
      expect(sensorReport.getDeviceID()).to.be.equal(exampleSensorReportElement.deviceID);
      expect(sensorReport.getDeviceMetadata()).to.be
        .equal(exampleSensorReportElement.deviceMetadata);
      expect(sensorReport.getRawData()).to.be.equal(exampleSensorReportElement.rawData);
      expect(sensorReport.getDataProcessingMethod()).to
        .be.equal(exampleSensorReportElement.dataProcessingMethod);
      expect(sensorReport.getTime()).to.be.equal(exampleSensorReportElement.time);
      expect(sensorReport.getMicroorganism()).to.be.equal(exampleSensorReportElement.microorganism);
      expect(sensorReport.getChemicalSubstance()).to
        .be.equal(exampleSensorReportElement.chemicalSubstance);
      expect(sensorReport.getValue()).to.be.equal(exampleSensorReportElement.value);
      expect(sensorReport.getComponent()).to.be.equal(exampleSensorReportElement.component);
      expect(sensorReport.getStringValue()).to.be.equal(exampleSensorReportElement.stringValue);
      expect(sensorReport.getBooleanValue()).to.be.equal(exampleSensorReportElement.booleanValue);
      expect(sensorReport.getHexBinaryValue()).to.be
        .equal(exampleSensorReportElement.hexBinaryValue);
      expect(sensorReport.getUriValue()).to.be.equal(exampleSensorReportElement.uriValue);
      expect(sensorReport.getMinValue()).to.be.equal(exampleSensorReportElement.minValue);
      expect(sensorReport.getMaxValue()).to.be.equal(exampleSensorReportElement.maxValue);
      expect(sensorReport.getMeanValue()).to.be.equal(exampleSensorReportElement.meanValue);
      expect(sensorReport.getSDev()).to.be.equal(exampleSensorReportElement.sDev);
      expect(sensorReport.getPercRank()).to.be.equal(exampleSensorReportElement.percRank);
      expect(sensorReport.getPercValue()).to.be.equal(exampleSensorReportElement.percValue);
      expect(sensorReport.getUom()).to.be.equal(exampleSensorReportElement.uom);
    });
    it('should create a valid SensorReportElement object from JSON', async () => {
      const sensorReport = new SensorReportElement(exampleSensorReportElement);
      expect(sensorReport.toObject()).to.deep.equal(exampleSensorReportElement);
    });
    it('should add and remove custom fields', async () => {
      const obj = new SensorReportElement();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
  });
  describe('SensorElement.js', () => {
    it('should create a valid SensorElement object from setters', async () => {
      const sensorElement = new SensorElement();
      sensorElement
        .setSensorMetadata(new SensorMetadata(exampleSensorElement.sensorMetadata));

      const json = sensorElement.toObject();
      expect(json.sensorMetadata.time).to.be.equal(exampleSensorElement.sensorMetadata.time);
      expect(json.sensorMetadata.deviceID).to.be
        .equal(exampleSensorElement.sensorMetadata.deviceID);
      expect(json.sensorMetadata.rawData).to.be.equal(exampleSensorElement.sensorMetadata.rawData);
      expect(json.sensorMetadata.dataProcessingMethod)
        .to.be.equal(exampleSensorElement.sensorMetadata.dataProcessingMethod);
      expect(json.sensorMetadata.bizRules).to.be
        .equal(exampleSensorElement.sensorMetadata.bizRules);
    });
    it('should create a valid SensorElement object from JSON', async () => {
      const sensorElement = new SensorElement(exampleSensorElement);
      expect(sensorElement.toObject()).to.deep.equal(exampleSensorElement);
    });
    it('should add and remove custom fields', async () => {
      const obj = new SensorElement();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
    describe('sensorReport field', () => {
      const s1 = new SensorReportElement(exampleSensorReportElement);
      const s2 = new SensorReportElement(exampleSensorReportElement2);

      it('should add and remove sensorReport', async () => {
        const obj = new SensorElement();
        obj.addSensorReport(s1);
        expect(obj.getSensorReport()[0].toString()).to.be.equal(s1.toString());
        obj.addSensorReport(s2);
        expect(obj.getSensorReport()[0].toString()).to.be.equal(s1.toString());
        expect(obj.getSensorReport()[1].toString()).to.be.equal(s2.toString());
        obj.removeSensorReport(s2);
        expect(obj.getSensorReport()[0].toString()).to.be.equal(s1.toString());
        obj.removeSensorReport(s1);
        expect(obj.getSensorReport().toString()).to.be.equal([].toString());
      });
      it('should add a sensorReport list', async () => {
        const obj = new SensorElement();
        obj.addSensorReportList([s1, s2]);
        expect(obj.getSensorReport()[1].toString()).to.be.equal(s2.toString());
      });
      it('should remove a sensorReport list', async () => {
        const obj = new SensorElement();
        obj.addSensorReportList([s1, s2]);
        obj.removeSensorReportList([s1]);
        expect(obj.getSensorReport()[0].toString()).to.be.equal(s2.toString());
      });
      it('should clear the sensorReport list', async () => {
        const obj = new SensorElement();
        obj.addSensorReport(s1);
        obj.clearSensorReportList();
        expect(obj.epcList).to.be.equal(undefined);
      });
      it('should not add the sensorReport list to JSON if it is not defined', async () => {
        const obj = new SensorElement();
        expect(obj.getSensorReport()).to.be.equal(undefined);
      });
    });
  });
});
