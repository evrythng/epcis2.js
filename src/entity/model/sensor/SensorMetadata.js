import Entity from '../../Entity';

export default class SensorMetadata extends Entity {
  /**
   * Set the time property
   * @param {string} time
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setTime(time) {
    this.time = time;
    return this;
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
    this.deviceID = deviceID;
    return this;
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
    this.deviceMetadata = deviceMetadata;
    return this;
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
    this.rawData = rawData;
    return this;
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
    this.startTime = startTime;
    return this;
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
    this.endTime = endTime;
    return this;
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
    this.dataProcessingMethod = dataProcessingMethod;
    return this;
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
    this.bizRules = bizRules;
    return this;
  }

  /**
   * Getter for the bizRules property
   * @return {string} - the bizRules
   */
  getBizRules() {
    return this.bizRules;
  }
}
