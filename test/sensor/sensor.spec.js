import { expect } from 'chai'
import SensorMetadata from '../../src/entity/model/sensor/SensorMetadata'
import SensorReportElement from '../../src/entity/model/sensor/SensorReportElement'
import SensorElement from '../../src/entity/model/sensor/SensorElement';

const JSONSensorMetadata = {
  time: '2019-04-02T14:05:00.000+01:00',
  startTime: '2019-04-02T14:05:00.000+02:00',
  endTime: '2019-04-02T14:05:00.000+03:00',
  deviceID: 'urn:epc:id:giai:4000001.111',
  deviceMetadata: 'https://id.gs1.org/giai/4000001111',
  rawData: 'https://example.org/giai/401234599999',
  bizRules: 'https://example.com/gdti/4012345000054987',
  dataProcessingMethod: 'https://example.com/gdti/4012345000054987'
}
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
  bizRules: 'https://example.org/gdti/4012345000054987'
}
const JSONSensorElement = {
  "sensorMetadata" : {"time":"2019-07-19T14:00:00.000+01:00", "deviceID":"urn:epc:id:giai:4000001.111", "deviceMetadata":"https://id.gs1.org/giai/4000001111", "rawData":"https://example.org/giai/401234599999", "dataProcessingMethod":"https://example.com/gdti/4012345000054987", "bizRules":"https://example.org/gdti/4012345000054987"},
  "sensorReport" : [
    { "type": "gs1:MT-Humidity", "value":12.1, "uom":"A93"},
    { "type": "gs1:MT-Molar_concentration" , "chemicalSubstance":"https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N", "value":0.18, "uom":"C35"},
    { "type": "gs1:MT-Molar_concentration" , "microorganism":"https://www.ncbi.nlm.nih.gov/taxonomy/1126011", "value":0.05, "uom":"C35"}
  ]
};

describe('unit tests for sensor relative Objects', () => {
  describe('SensorMetadata.js', () => {
    it('should create a valid SensorMetadata object from setters', async () => {
      const sensorMetadata = new SensorMetadata()
      sensorMetadata
        .setTime(JSONSensorMetadata.time)
        .setDeviceID(JSONSensorMetadata.deviceID)
        .setDeviceMetadata(JSONSensorMetadata.deviceMetadata)
        .setRawData(JSONSensorMetadata.rawData)
        .setStartTime(JSONSensorMetadata.startTime)
        .setEndTime(JSONSensorMetadata.endTime)
        .setDataProcessingMethod(JSONSensorMetadata.dataProcessingMethod)
        .setBizRules(JSONSensorMetadata.bizRules)

      const json = sensorMetadata.toJSON()
      expect(json.time).to.be.equal(JSONSensorMetadata.time)
      expect(json.deviceID).to.be.equal(JSONSensorMetadata.deviceID)
      expect(json.deviceMetadata).to.be.equal(JSONSensorMetadata.deviceMetadata)
      expect(json.rawData).to.be.equal(JSONSensorMetadata.rawData)
      expect(json.startTime).to.be.equal(JSONSensorMetadata.startTime)
      expect(json.endTime).to.be.equal(JSONSensorMetadata.endTime)
      expect(json.dataProcessingMethod).to.be.equal(JSONSensorMetadata.dataProcessingMethod)
      expect(json.bizRules).to.be.equal(JSONSensorMetadata.bizRules)
    })
    it('should create a valid SensorMetadata object from JSON', async () => {
      const sensorMetadata = new SensorMetadata(JSONSensorMetadata)
      const json = sensorMetadata.toJSON()
      expect(json.time).to.be.equal(JSONSensorMetadata.time)
      expect(json.deviceID).to.be.equal(JSONSensorMetadata.deviceID)
      expect(json.deviceMetadata).to.be.equal(JSONSensorMetadata.deviceMetadata)
      expect(json.rawData).to.be.equal(JSONSensorMetadata.rawData)
      expect(json.startTime).to.be.equal(JSONSensorMetadata.startTime)
      expect(json.endTime).to.be.equal(JSONSensorMetadata.endTime)
      expect(json.dataProcessingMethod).to.be.equal(JSONSensorMetadata.dataProcessingMethod)
      expect(json.bizRules).to.be.equal(JSONSensorMetadata.bizRules)
    })
  })
  describe('SensorReportElement.js', () => {
    it('should create a valid SensorReportElement object from setters', async () => {
      const sensorReport = new SensorReportElement()
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
        .setUom(JSONSensorReportElement.uom)

      const json = sensorReport.toJSON()
      expect(json.type).to.be.equal(JSONSensorReportElement.type)
      expect(json.deviceID).to.be.equal(JSONSensorReportElement.deviceID)
      expect(json.deviceMetadata).to.be.equal(JSONSensorReportElement.deviceMetadata)
      expect(json.rawData).to.be.equal(JSONSensorReportElement.rawData)
      expect(json.dataProcessingMethod).to.be.equal(JSONSensorReportElement.dataProcessingMethod)
      expect(json.time).to.be.equal(JSONSensorReportElement.time)
      expect(json.microorganism).to.be.equal(JSONSensorReportElement.microorganism)
      expect(json.chemicalSubstance).to.be.equal(JSONSensorReportElement.chemicalSubstance)
      expect(json.value).to.be.equal(JSONSensorReportElement.value)
      expect(json.component).to.be.equal(JSONSensorReportElement.component)
      expect(json.stringValue).to.be.equal(JSONSensorReportElement.stringValue)
      expect(json.booleanValue).to.be.equal(JSONSensorReportElement.booleanValue)
      expect(json.hexBinaryValue).to.be.equal(JSONSensorReportElement.hexBinaryValue)
      expect(json.uriValue).to.be.equal(JSONSensorReportElement.uriValue)
      expect(json.minValue).to.be.equal(JSONSensorReportElement.minValue)
      expect(json.maxValue).to.be.equal(JSONSensorReportElement.maxValue)
      expect(json.meanValue).to.be.equal(JSONSensorReportElement.meanValue)
      expect(json.sDev).to.be.equal(JSONSensorReportElement.sDev)
      expect(json.percRank).to.be.equal(JSONSensorReportElement.percRank)
      expect(json.percValue).to.be.equal(JSONSensorReportElement.percValue)
      expect(json.uom).to.be.equal(JSONSensorReportElement.uom)
    })
    it('should create a valid SensorReportElement object from JSON', async () => {
      const sensorReport = new SensorReportElement(JSONSensorReportElement)

      const json = sensorReport.toJSON()
      expect(json.type).to.be.equal(JSONSensorReportElement.type)
      expect(json.deviceID).to.be.equal(JSONSensorReportElement.deviceID)
      expect(json.deviceMetadata).to.be.equal(JSONSensorReportElement.deviceMetadata)
      expect(json.rawData).to.be.equal(JSONSensorReportElement.rawData)
      expect(json.dataProcessingMethod).to.be.equal(JSONSensorReportElement.dataProcessingMethod)
      expect(json.time).to.be.equal(JSONSensorReportElement.time)
      expect(json.microorganism).to.be.equal(JSONSensorReportElement.microorganism)
      expect(json.chemicalSubstance).to.be.equal(JSONSensorReportElement.chemicalSubstance)
      expect(json.value).to.be.equal(JSONSensorReportElement.value)
      expect(json.component).to.be.equal(JSONSensorReportElement.component)
      expect(json.stringValue).to.be.equal(JSONSensorReportElement.stringValue)
      expect(json.booleanValue).to.be.equal(JSONSensorReportElement.booleanValue)
      expect(json.hexBinaryValue).to.be.equal(JSONSensorReportElement.hexBinaryValue)
      expect(json.uriValue).to.be.equal(JSONSensorReportElement.uriValue)
      expect(json.minValue).to.be.equal(JSONSensorReportElement.minValue)
      expect(json.maxValue).to.be.equal(JSONSensorReportElement.maxValue)
      expect(json.meanValue).to.be.equal(JSONSensorReportElement.meanValue)
      expect(json.sDev).to.be.equal(JSONSensorReportElement.sDev)
      expect(json.percRank).to.be.equal(JSONSensorReportElement.percRank)
      expect(json.percValue).to.be.equal(JSONSensorReportElement.percValue)
      expect(json.uom).to.be.equal(JSONSensorReportElement.uom)
    })
  })
  describe('SensorElement.js', () => {
    it('should create a valid SensorElement object from setters', async () => {
      const sensorElement = new SensorElement()
      sensorElement
        .setSensorMetadata(new SensorMetadata(JSONSensorElement.sensorMetadata))

      const json = sensorElement.toJSON()
      expect(json.sensorMetadata.time).to.be.equal(JSONSensorElement.sensorMetadata.time)
      expect(json.sensorMetadata.deviceID).to.be.equal(JSONSensorElement.sensorMetadata.deviceID)
      expect(json.sensorMetadata.rawData).to.be.equal(JSONSensorElement.sensorMetadata.rawData)
      expect(json.sensorMetadata.dataProcessingMethod).to.be.equal(JSONSensorElement.sensorMetadata.dataProcessingMethod)
      expect(json.sensorMetadata.bizRules).to.be.equal(JSONSensorElement.sensorMetadata.bizRules)
    })
    it('should create a valid SensorElement object from JSON', async () => {
      const sensorElement = new SensorElement(JSONSensorElement)
      const json = sensorElement.toJSON()
      expect(json.sensorMetadata.time).to.be.equal(JSONSensorElement.sensorMetadata.time)
      expect(json.sensorMetadata.deviceID).to.be.equal(JSONSensorElement.sensorMetadata.deviceID)
      expect(json.sensorMetadata.rawData).to.be.equal(JSONSensorElement.sensorMetadata.rawData)
      expect(json.sensorReport[0].type).to.be.equal(JSONSensorElement.sensorReport[0].type)
      expect(json.sensorReport[1].type).to.be.equal(JSONSensorElement.sensorReport[1].type)
      expect(json.sensorReport[2].type).to.be.equal(JSONSensorElement.sensorReport[2].type)
      expect(json.sensorReport[0].value).to.be.equal(JSONSensorElement.sensorReport[0].value)
      expect(json.sensorReport[0].uom).to.be.equal(JSONSensorElement.sensorReport[0].uom)
      expect(json.sensorReport[1].chemicalSubstance).to.be.equal(JSONSensorElement.sensorReport[1].chemicalSubstance)
      expect(json.sensorReport[1].value).to.be.equal(JSONSensorElement.sensorReport[1].value)
      expect(json.sensorReport[1].uom).to.be.equal(JSONSensorElement.sensorReport[1].uom)
      expect(json.sensorReport[2].microorganism).to.be.equal(JSONSensorElement.sensorReport[2].microorganism)
      expect(json.sensorReport[2].value).to.be.equal(JSONSensorElement.sensorReport[2].value)
      expect(json.sensorReport[2].uom).to.be.equal(JSONSensorElement.sensorReport[2].uom)
    })
  })
})
