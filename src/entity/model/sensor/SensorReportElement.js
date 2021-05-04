import Entity from '../../Entity'

export default class SensorReportElement extends Entity {
  /**
   * Set the type property
   * @param {string} type
   * @return {SensorReportElement} - the sensorReport instance
   */
  setType (type) {
    this.type = type
    return this
  }

  /**
   * Set the deviceID property
   * @param {string} deviceID
   * @return {SensorReportElement} - the sensorReport instance
   */
  setDeviceID (deviceID) {
    this.deviceID = deviceID
    return this
  }

  /**
   * Set the deviceMetadata property
   * @param {string} deviceMetadata
   * @return {SensorReportElement} - the sensorReport instance
   */
  setDeviceMetadata (deviceMetadata) {
    this.deviceMetadata = deviceMetadata
    return this
  }

  /**
   * Set the rawData property
   * @param {string} rawData
   * @return {SensorReportElement} - the sensorReport instance
   */
  setRawData (rawData) {
    this.rawData = rawData
    return this
  }

  /**
   * Set the dataProcessingMethod property
   * @param {string} dataProcessingMethod
   * @return {SensorReportElement} - the sensorReport instance
   */
  setDataProcessingMethod (dataProcessingMethod) {
    this.dataProcessingMethod = dataProcessingMethod
    return this
  }

  /**
   * Set the time property
   * @param {string} time
   * @return {SensorReportElement} - the sensorReport instance
   */
  setTime (time) {
    this.time = time
    return this
  }

  /**
   * Set the microorganism property
   * @param {string} microorganism
   * @return {SensorReportElement} - the sensorReport instance
   */
  setMicroorganism (microorganism) {
    this.microorganism = microorganism
    return this
  }

  /**
   * Set the chemicalSubstance property
   * @param {string} chemicalSubstance
   * @return {SensorReportElement} - the sensorReport instance
   */
  setChemicalSubstance (chemicalSubstance) {
    this.chemicalSubstance = chemicalSubstance
    return this
  }

  /**
   * Set the value property
   * @param {number} value
   * @return {SensorReportElement} - the sensorReport instance
   */
  setValue (value) {
    this.value = value
    return this
  }

  /**
   * Set the component property
   * @param {string} component
   * @return {SensorReportElement} - the sensorReport instance
   */
  setComponent (component) {
    this.component = component
    return this
  }

  /**
   * Set the stringValue property
   * @param {string} stringValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setStringValue (stringValue) {
    this.stringValue = stringValue
    return this
  }

  /**
   * Set the booleanValue property
   * @param {boolean} booleanValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setBooleanValue (booleanValue) {
    this.booleanValue = booleanValue
    return this
  }

  /**
   * Set the hexBinaryValue property
   * @param {string} hexBinaryValue - "^[A-Fa-f0-9]+$"
   * @return {SensorReportElement} - the sensorReport instance
   */
  setHexBinaryValue (hexBinaryValue) {
    this.hexBinaryValue = hexBinaryValue
    return this
  }

  /**
   * Set the uriValue property
   * @param {string} uriValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setUriValue (uriValue) {
    this.uriValue = uriValue
    return this
  }

  /**
   * Set the minValue property
   * @param {number} minValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setMinValue (minValue) {
    this.minValue = minValue
    return this
  }

  /**
   * Set the maxValue property
   * @param {number} maxValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setMaxValue (maxValue) {
    this.maxValue = maxValue
    return this
  }

  /**
   * Set the meanValue property
   * @param {number} meanValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setMeanValue (meanValue) {
    this.meanValue = meanValue
    return this
  }

  /**
   * Set the sDev property
   * @param {number} sDev
   * @return {SensorReportElement} - the sensorReport instance
   */
  setSDev (sDev) {
    this.sDev = sDev
    return this
  }

  /**
   * Set the percRank property
   * @param {number} percRank
   * @return {SensorReportElement} - the sensorReport instance
   */
  setPercRank (percRank) {
    this.percRank = percRank
    return this
  }

  /**
   * Set the percValue property
   * @param {number} percValue
   * @return {SensorReportElement} - the sensorReport instance
   */
  setPercValue (percValue) {
    this.percValue = percValue
    return this
  }

  /**
   * Set the uom property
   * @param {string} uom
   * @return {SensorReportElement} - the sensorReport instance
   */
  setUom (uom) {
    this.uom = uom
    return this
  }
}
