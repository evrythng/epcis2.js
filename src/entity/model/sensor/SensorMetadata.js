/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../../Entity';

export default class SensorMetadata extends Entity {
  /**
   * Set the time property
   * @param {string} time
   * @return {SensorMetadata} - the sensorMetadata instance
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
   * Set the deviceID property
   * @param {string} deviceID
   * @return {SensorMetadata} - the sensorMetadata instance
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
   * @return {SensorMetadata} - the sensorMetadata instance
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
   * @return {SensorMetadata} - the sensorMetadata instance
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
   * Set the startTime property
   * @param {string} startTime
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setStartTime(startTime) {
    return this.generateSetterFunction('startTime', startTime, ['string']);
  }

  /**
   * Getter for the startTime property
   * @return {string} - the startTime
   */
  getStartTime() {
    return this.startTime;
  }

  /**
   * Set the endTime property
   * @param {string} endTime
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setEndTime(endTime) {
    return this.generateSetterFunction('endTime', endTime, ['string']);
  }

  /**
   * Getter for the endTime property
   * @return {string} - the endTime
   */
  getEndTime() {
    return this.endTime;
  }

  /**
   * Set the dataProcessingMethod property
   * @param {string} dataProcessingMethod
   * @return {SensorMetadata} - the sensorMetadata instance
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
   * Set the bizRules property
   * @param {string} bizRules
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setBizRules(bizRules) {
    return this.generateSetterFunction('bizRules', bizRules, ['string']);
  }

  /**
   * Getter for the bizRules property
   * @return {string} - the bizRules
   */
  getBizRules() {
    return this.bizRules;
  }
}
