/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../../Entity';

export default class SensorReportElement extends Entity {
  /**
   * Set the type property
   * @param {string} type
   * @return {SensorReportElement} - the sensorReport instance
   */
  setType(type) {
    return this.generateSetterFunction('type', type, ['string']);
  }

  /**
   * Getter for the type property
   * @return {string} - the type
   */
  getType() {
    return this.type;
  }

  /**
   * Set the exception property
   * @param {string} exception
   * @return {SensorReportElement} - the sensorReport instance
   */
  setException(exception) {
    return this.generateSetterFunction('exception', exception, ['string']);
  }

  /**
   * Getter for the exception property
   * @return {string} - the exception
   */
  getException() {
    return this.exception;
  }

  /**
   * Set the deviceID property
   * @param {string} deviceID
   * @return {SensorReportElement} - the sensorReport instance
   */
  setDeviceID(deviceID) {
    return this.generateSetterFunction('deviceID', deviceID, ['string']);
  }

  /**
   * Getter for the deviceID property
   * @return {string} - the deviceID
   */
  getDeviceID() {
    return this.deviceID;
  }

  /**
   * Set the deviceMetadata property
   * @param {string} deviceMetadata
   * @return {SensorReportElement} - the sensorReport instance
   */
  setDeviceMetadata(deviceMetadata) {
    return this.generateSetterFunction('deviceMetadata', deviceMetadata, ['string']);
  }

  /**
   * Getter for the deviceMetadata property
   * @return {string} - the deviceMetadata
   */
  getDeviceMetadata() {
    return this.deviceMetadata;
  }

  /**
   * Set the rawData property
   * @param {string} rawData
   * @return {SensorReportElement} - the sensorReport instance
   */
  setRawData(rawData) {
    return this.generateSetterFunction('rawData', rawData, ['string']);
  }

  /**
   * Getter for the rawData property
   * @return {string} - the rawData
   */
  getRawData() {
    return this.rawData;
  }

  /**
   * Set the dataProcessingMethod property
   * @param {string} dataProcessingMethod
   * @return {SensorReportElement} - the sensorReport instance
   */
  setDataProcessingMethod(dataProcessingMethod) {
    return this.generateSetterFunction('dataProcessingMethod', dataProcessingMethod, ['string']);
  }

  /**
   * Getter for the dataProcessingMethod property
   * @return {string} - the dataProcessingMethod
   */
  getDataProcessingMethod() {
    return this.dataProcessingMethod;
  }

  /**
   * Set the time property
   * @param {string} time
   * @return {SensorReportElement} - the sensorReport instance
   */
  setTime(time) {
    return this.generateSetterFunction('time', time, ['string']);
  }

  /**
   * Getter for the time property
   * @return {string} - the time
   */
  getTime() {
    return this.time;
  }

  /**
   * Set the microorganism property
   * @param {string} microorganism
   * @return {SensorReportElement} - the sensorReport instance
   */
  setMicroorganism(microorganism) {
    return this.generateSetterFunction('microorganism', microorganism, ['string']);
  }

  /**
   * Getter for the microorganism property
   * @return {string} - the microorganism
   */
  getMicroorganism() {
    return this.microorganism;
  }

  /**
   * Set the chemicalSubstance property
   * @param {string} chemicalSubstance
   * @return {SensorReportElement} - the sensorReport instance
   */
  setChemicalSubstance(chemicalSubstance) {
    return this.generateSetterFunction('chemicalSubstance', chemicalSubstance, ['string']);
  }

  /**
   * Getter for the chemicalSubstance property
   * @return {string} - the chemicalSubstance
   */
  getChemicalSubstance() {
    return this.chemicalSubstance;
  }

  /**
   * Set the value property
   * @param {number} value
   * @return {SensorReportElement} - the sensorReport instance
   */
  setValue(value) {
    return this.generateSetterFunction('value', value, ['number']);
  }

  /**
   * Getter for the value property
   * @return {number} - the value
   */
  getValue() {
    return this.value;
  }

  /**
   * Set the component property
   * @param {string} component
   * @return {SensorReportElement} - the sensorReport instance
   */
  setComponent(component) {
    return this.generateSetterFunction('component', component, ['string']);
  }

  /**
   * Getter for the component property
   * @return {string} - the component
   */
  getComponent() {
    return this.component;
  }

  /**
   * Set the stringValue property
   * @param {string} stringValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setStringValue(stringValue) {
    return this.generateSetterFunction('stringValue', stringValue, ['string']);
  }

  /**
   * Getter for the stringValue property
   * @return {string} - the stringValue
   */
  getStringValue() {
    return this.stringValue;
  }

  /**
   * Set the booleanValue property
   * @param {boolean} booleanValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setBooleanValue(booleanValue) {
    return this.generateSetterFunction('booleanValue', booleanValue, ['boolean']);
  }

  /**
   * Getter for the booleanValue property
   * @return {boolean} - the booleanValue
   */
  getBooleanValue() {
    return this.booleanValue;
  }

  /**
   * Set the hexBinaryValue property
   * @param {string} hexBinaryValue - "^[A-Fa-f0-9]+$"
   * @return {SensorReportElement} - the sensorReport instance
   */
  setHexBinaryValue(hexBinaryValue) {
    return this.generateSetterFunction('hexBinaryValue', hexBinaryValue, ['string']);
  }

  /**
   * Getter for the hexBinaryValue property
   * @return {string} - the hexBinaryValue
   */
  getHexBinaryValue() {
    return this.hexBinaryValue;
  }

  /**
   * Set the uriValue property
   * @param {string} uriValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setUriValue(uriValue) {
    return this.generateSetterFunction('uriValue', uriValue, ['string']);
  }

  /**
   * Getter for the uriValue property
   * @return {string} - the uriValue
   */
  getUriValue() {
    return this.uriValue;
  }

  /**
   * Set the minValue property
   * @param {number} minValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setMinValue(minValue) {
    return this.generateSetterFunction('minValue', minValue, ['number']);
  }

  /**
   * Getter for the minValue property
   * @return {number} - the minValue
   */
  getMinValue() {
    return this.minValue;
  }

  /**
   * Set the maxValue property
   * @param {number} maxValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setMaxValue(maxValue) {
    return this.generateSetterFunction('maxValue', maxValue, ['number']);
  }

  /**
   * Getter for the maxValue property
   * @return {number} - the maxValue
   */
  getMaxValue() {
    return this.maxValue;
  }

  /**
   * Set the meanValue property
   * @param {number} meanValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setMeanValue(meanValue) {
    return this.generateSetterFunction('meanValue', meanValue, ['number']);
  }

  /**
   * Getter for the meanValue property
   * @return {number} - the meanValue
   */
  getMeanValue() {
    return this.meanValue;
  }

  /**
   * Set the sDev property
   * @param {number} sDev
   * @return {SensorReportElement} - the sensorReport instance
   */
  setSDev(sDev) {
    return this.generateSetterFunction('sDev', sDev, ['number']);
  }

  /**
   * Getter for the sDev property
   * @return {number} - the sDev
   */
  getSDev() {
    return this.sDev;
  }

  /**
   * Set the percRank property
   * @param {number} percRank
   * @return {SensorReportElement} - the sensorReport instance
   */
  setPercRank(percRank) {
    return this.generateSetterFunction('percRank', percRank, ['number']);
  }

  /**
   * Getter for the percRank property
   * @return {number} - the percRank
   */
  getPercRank() {
    return this.percRank;
  }

  /**
   * Set the percValue property
   * @param {number} percValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setPercValue(percValue) {
    return this.generateSetterFunction('percValue', percValue, ['number']);
  }

  /**
   * Getter for the percValue property
   * @return {number} - the percValue
   */
  getPercValue() {
    return this.percValue;
  }

  /**
   * Set the uom property
   * @param {string} uom
   * @return {SensorReportElement} - the sensorReport instance
   */
  setUom(uom) {
    return this.generateSetterFunction('uom', uom, ['string']);
  }

  /**
   * Getter for the uom property
   * @return {string} - the uom
   */
  getUom() {
    return this.uom;
  }

  /**
   * Set the coordinate Reference System property
   * @param {string} coordinateReferenceSystem
   * @return {SensorReportElement} - the sensorReport instance
   */
  setCoordinateReferenceSystem(coordinateReferenceSystem) {
    return this.generateSetterFunction('coordinateReferenceSystem', coordinateReferenceSystem, ['string']);
  }

  /**
     * Getter for the coordinate Reference System property
     * @return {string} - the uom
     */
  getCoordinateReferenceSystem() {
    return this.coordinateReferenceSystem;
  }
}
