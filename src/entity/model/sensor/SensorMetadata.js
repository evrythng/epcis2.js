import Entity from '../../Entity'

export default class SensorMetadata extends Entity {
  /**
   * Set the time property
   * @param {string} time
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setTime (time) {
    this.time = time
    return this
  }

  /**
   * Set the deviceID property
   * @param {string} deviceID
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setDeviceID (deviceID) {
    this.deviceID = deviceID
    return this
  }

  /**
   * Set the deviceMetadata property
   * @param {string} deviceMetadata
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setDeviceMetadata (deviceMetadata) {
    this.deviceMetadata = deviceMetadata
    return this
  }

  /**
   * Set the rawData property
   * @param {string} rawData
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setRawData (rawData) {
    this.rawData = rawData
    return this
  }

  /**
   * Set the startTime property
   * @param {string} startTime
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setStartTime (startTime) {
    this.startTime = startTime
    return this
  }

  /**
   * Set the endTime property
   * @param {string} endTime
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setEndTime (endTime) {
    this.endTime = endTime
    return this
  }

  /**
   * Set the dataProcessingMethod property
   * @param {string} dataProcessingMethod
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setDataProcessingMethod (dataProcessingMethod) {
    this.dataProcessingMethod = dataProcessingMethod
    return this
  }

  /**
   * Set the bizRules property
   * @param {string} bizRules
   * @return {SensorMetadata} - the sensorMetadata instance
   */
  setBizRules (bizRules) {
    this.bizRules = bizRules
    return this
  }
}
