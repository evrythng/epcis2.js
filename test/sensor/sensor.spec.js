import { expect } from 'chai';
import SensorMetadata from '../../src/entity/model/sensor/SensorMetadata';
import SensorReportElement from '../../src/entity/model/sensor/SensorReportElement';
import SensorElement from '../../src/entity/model/sensor/SensorElement';

const JSONSensorMetadata = {
  time: '2019-04-02T14:05:00.000+01:00',
  startTime: '2019-04-02T14:05:00.000+02:00',
  endTime: '2019-04-02T14:05:00.000+03:00',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  bizRules: 'https://example.com/gdti/4012345000054987',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
};
const JSONSensorReportElement = {
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
const JSONSensorElement = {
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
        .setTime(JSONSensorMetadata.time)
        .setDeviceID(JSONSensorMetadata.deviceID)
        .setDeviceMetadata(JSONSensorMetadata.deviceMetadata)
        .setRawData(JSONSensorMetadata.rawData)
        .setStartTime(JSONSensorMetadata.startTime)
        .setEndTime(JSONSensorMetadata.endTime)
        .setDataProcessingMethod(JSONSensorMetadata.dataProcessingMethod)
        .setBizRules(JSONSensorMetadata.bizRules);

      expect(sensorMetadata.getTime()).to.be.equal(JSONSensorMetadata.time);
      expect(sensorMetadata.getDeviceID()).to.be.equal(JSONSensorMetadata.deviceID);
      expect(sensorMetadata.getDeviceMetadata()).to.be.equal(JSONSensorMetadata.deviceMetadata);
      expect(sensorMetadata.getRawData()).to.be.equal(JSONSensorMetadata.rawData);
      expect(sensorMetadata.getStartTime()).to.be.equal(JSONSensorMetadata.startTime);
      expect(sensorMetadata.getEndTime()).to.be.equal(JSONSensorMetadata.endTime);
      expect(sensorMetadata.getDataProcessingMethod()).to
        .be.equal(JSONSensorMetadata.dataProcessingMethod);
      expect(sensorMetadata.getBizRules()).to.be.equal(JSONSensorMetadata.bizRules);
    });
    it('should create a valid SensorMetadata object from JSON', async () => {
      const sensorMetadata = new SensorMetadata(JSONSensorMetadata);
      const json = sensorMetadata.toObject();
      expect(json.time).to.be.equal(JSONSensorMetadata.time);
      expect(json.deviceID).to.be.equal(JSONSensorMetadata.deviceID);
      expect(json.deviceMetadata).to.be.equal(JSONSensorMetadata.deviceMetadata);
      expect(json.rawData).to.be.equal(JSONSensorMetadata.rawData);
      expect(json.startTime).to.be.equal(JSONSensorMetadata.startTime);
      expect(json.endTime).to.be.equal(JSONSensorMetadata.endTime);
      expect(json.dataProcessingMethod).to.be.equal(JSONSensorMetadata.dataProcessingMethod);
      expect(json.bizRules).to.be.equal(JSONSensorMetadata.bizRules);
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
        .setType(JSONSensorReportElement.type)
        .setDeviceID(JSONSensorReportElement.deviceID)
        .setDeviceMetadata(JSONSensorReportElement.deviceMetadata)
        .setRawData(JSONSensorReportElement.rawData)
        .setDataProcessingMethod(JSONSensorReportElement.dataProcessingMethod)
        .setTime(JSONSensorReportElement.time)
        .setMicroorganism(JSONSensorReportElement.microorganism)
        .setChemicalSubstance(JSONSensorReportElement.chemicalSubstance)
        .setValue(JSONSensorReportElement.value)
        .setComponent(JSONSensorReportElement.component)
        .setStringValue(JSONSensorReportElement.stringValue)
        .setBooleanValue(JSONSensorReportElement.booleanValue)
        .setHexBinaryValue(JSONSensorReportElement.hexBinaryValue)
        .setUriValue(JSONSensorReportElement.uriValue)
        .setMinValue(JSONSensorReportElement.minValue)
        .setMaxValue(JSONSensorReportElement.maxValue)
        .setMeanValue(JSONSensorReportElement.meanValue)
        .setSDev(JSONSensorReportElement.sDev)
        .setPercRank(JSONSensorReportElement.percRank)
        .setPercValue(JSONSensorReportElement.percValue)
        .setUom(JSONSensorReportElement.uom);

      expect(sensorReport.getType()).to.be.equal(JSONSensorReportElement.type);
      expect(sensorReport.getDeviceID()).to.be.equal(JSONSensorReportElement.deviceID);
      expect(sensorReport.getDeviceMetadata()).to.be.equal(JSONSensorReportElement.deviceMetadata);
      expect(sensorReport.getRawData()).to.be.equal(JSONSensorReportElement.rawData);
      expect(sensorReport.getDataProcessingMethod()).to
        .be.equal(JSONSensorReportElement.dataProcessingMethod);
      expect(sensorReport.getTime()).to.be.equal(JSONSensorReportElement.time);
      expect(sensorReport.getMicroorganism()).to.be.equal(JSONSensorReportElement.microorganism);
      expect(sensorReport.getChemicalSubstance()).to
        .be.equal(JSONSensorReportElement.chemicalSubstance);
      expect(sensorReport.getValue()).to.be.equal(JSONSensorReportElement.value);
      expect(sensorReport.getComponent()).to.be.equal(JSONSensorReportElement.component);
      expect(sensorReport.getStringValue()).to.be.equal(JSONSensorReportElement.stringValue);
      expect(sensorReport.getBooleanValue()).to.be.equal(JSONSensorReportElement.booleanValue);
      expect(sensorReport.getHexBinaryValue()).to.be.equal(JSONSensorReportElement.hexBinaryValue);
      expect(sensorReport.getUriValue()).to.be.equal(JSONSensorReportElement.uriValue);
      expect(sensorReport.getMinValue()).to.be.equal(JSONSensorReportElement.minValue);
      expect(sensorReport.getMaxValue()).to.be.equal(JSONSensorReportElement.maxValue);
      expect(sensorReport.getMeanValue()).to.be.equal(JSONSensorReportElement.meanValue);
      expect(sensorReport.getSDev()).to.be.equal(JSONSensorReportElement.sDev);
      expect(sensorReport.getPercRank()).to.be.equal(JSONSensorReportElement.percRank);
      expect(sensorReport.getPercValue()).to.be.equal(JSONSensorReportElement.percValue);
      expect(sensorReport.getUom()).to.be.equal(JSONSensorReportElement.uom);
    });
    it('should create a valid SensorReportElement object from JSON', async () => {
      const sensorReport = new SensorReportElement(JSONSensorReportElement);

      const json = sensorReport.toObject();
      expect(json.type).to.be.equal(JSONSensorReportElement.type);
      expect(json.deviceID).to.be.equal(JSONSensorReportElement.deviceID);
      expect(json.deviceMetadata).to.be.equal(JSONSensorReportElement.deviceMetadata);
      expect(json.rawData).to.be.equal(JSONSensorReportElement.rawData);
      expect(json.dataProcessingMethod).to.be.equal(JSONSensorReportElement.dataProcessingMethod);
      expect(json.time).to.be.equal(JSONSensorReportElement.time);
      expect(json.microorganism).to.be.equal(JSONSensorReportElement.microorganism);
      expect(json.chemicalSubstance).to.be.equal(JSONSensorReportElement.chemicalSubstance);
      expect(json.value).to.be.equal(JSONSensorReportElement.value);
      expect(json.component).to.be.equal(JSONSensorReportElement.component);
      expect(json.stringValue).to.be.equal(JSONSensorReportElement.stringValue);
      expect(json.booleanValue).to.be.equal(JSONSensorReportElement.booleanValue);
      expect(json.hexBinaryValue).to.be.equal(JSONSensorReportElement.hexBinaryValue);
      expect(json.uriValue).to.be.equal(JSONSensorReportElement.uriValue);
      expect(json.minValue).to.be.equal(JSONSensorReportElement.minValue);
      expect(json.maxValue).to.be.equal(JSONSensorReportElement.maxValue);
      expect(json.meanValue).to.be.equal(JSONSensorReportElement.meanValue);
      expect(json.sDev).to.be.equal(JSONSensorReportElement.sDev);
      expect(json.percRank).to.be.equal(JSONSensorReportElement.percRank);
      expect(json.percValue).to.be.equal(JSONSensorReportElement.percValue);
      expect(json.uom).to.be.equal(JSONSensorReportElement.uom);
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
        .setSensorMetadata(new SensorMetadata(JSONSensorElement.sensorMetadata));

      const json = sensorElement.toObject();
      expect(json.sensorMetadata.time).to.be.equal(JSONSensorElement.sensorMetadata.time);
      expect(json.sensorMetadata.deviceID).to.be.equal(JSONSensorElement.sensorMetadata.deviceID);
      expect(json.sensorMetadata.rawData).to.be.equal(JSONSensorElement.sensorMetadata.rawData);
      expect(json.sensorMetadata.dataProcessingMethod)
        .to.be.equal(JSONSensorElement.sensorMetadata.dataProcessingMethod);
      expect(json.sensorMetadata.bizRules).to.be.equal(JSONSensorElement.sensorMetadata.bizRules);
    });
    it('should create a valid SensorElement object from JSON', async () => {
      const sensorElement = new SensorElement(JSONSensorElement);
      expect(sensorElement.getSensorMetadata().time)
        .to.be.equal(JSONSensorElement.sensorMetadata.time);
      expect(sensorElement.getSensorMetadata().deviceID)
        .to.be.equal(JSONSensorElement.sensorMetadata.deviceID);
      expect(sensorElement.getSensorMetadata().rawData)
        .to.be.equal(JSONSensorElement.sensorMetadata.rawData);
      expect(sensorElement.getSensorReport()[0].type)
        .to.be.equal(JSONSensorElement.sensorReport[0].type);
      expect(sensorElement.getSensorReport()[1].type)
        .to.be.equal(JSONSensorElement.sensorReport[1].type);
      expect(sensorElement.getSensorReport()[2].type)
        .to.be.equal(JSONSensorElement.sensorReport[2].type);
      expect(sensorElement.getSensorReport()[0].value)
        .to.be.equal(JSONSensorElement.sensorReport[0].value);
      expect(sensorElement.getSensorReport()[0].uom)
        .to.be.equal(JSONSensorElement.sensorReport[0].uom);
      expect(sensorElement.getSensorReport()[1].chemicalSubstance)
        .to.be.equal(JSONSensorElement.sensorReport[1].chemicalSubstance);
      expect(sensorElement.getSensorReport()[1].value)
        .to.be.equal(JSONSensorElement.sensorReport[1].value);
      expect(sensorElement.getSensorReport()[1].uom)
        .to.be.equal(JSONSensorElement.sensorReport[1].uom);
      expect(sensorElement.getSensorReport()[2].microorganism)
        .to.be.equal(JSONSensorElement.sensorReport[2].microorganism);
      expect(sensorElement.getSensorReport()[2].value)
        .to.be.equal(JSONSensorElement.sensorReport[2].value);
      expect(sensorElement.getSensorReport()[2].uom)
        .to.be.equal(JSONSensorElement.sensorReport[2].uom);
    });
    it('should add and remove custom fields', async () => {
      const obj = new SensorElement();
      obj.addExtension('key', 'value');
      expect(obj.toObject().key).to.be.equal('value');
      obj.removeExtension('key');
      expect(obj.toObject().key).to.be.equal(undefined);
    });
    describe('sensorReport field', () => {
      const s1 = new SensorReportElement(JSONSensorReportElement);
      const s2 = new SensorReportElement(JSONSensorReportElement);

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
