export default class SensorMetadata {
  /**
   * You can either create an empty SensorMetadata or provide an already existing SensorMetadata
   * via Map
   * @param {{}} [sensorMetadata] - The Map that will be used to create the SensorMetadata entity
   */
  constructor (sensorMetadata) {
    if (!arguments.length) {
      // create an empty SensorMetadata object
      return
    }

    for (const prop in sensorMetadata) {
      if (sensorMetadata.hasOwnProperty(prop)) {
        this[prop] = sensorMetadata[prop]
      }
    }
  }

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

  /**
   * Return a JSON object corresponding to the SensorMetadata object
   */
  toJSON () {
    const json = {}

    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        json[prop] = this[prop]
      }
    }

    return json
  }
}
