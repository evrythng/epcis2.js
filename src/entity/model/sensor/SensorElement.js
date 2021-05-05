import SensorMetadata from './SensorMetadata';
import SensorReportElement from './SensorReportElement';
import Entity from '../../Entity';

export default class SensorElement extends Entity {
  /**
   * You can either create an empty SensorElement or provide an already existing SensorElement via
   * Map
   * @param {{}} [sensor] - The Map that will be used to create the SensorElement entity
   */
  constructor(sensor) {
    super(sensor);

    if (!arguments.length || sensor === undefined) {
      // create an empty SensorElement object
      return;
    }

    this.clearSensorReportList();

    Object.entries(sensor).forEach(([key, value]) => {
      switch (key) {
        case 'sensorMetadata':
          this.setSensorMetadata(new SensorMetadata(value));
          break;
        case 'sensorReport':
          value.forEach((sensorReport) => this
            .addSensorReport(new SensorReportElement(sensorReport)));
          break;
        default:
          break;
      }
    });
  }

  /**
   * Set the sensorMetadata property
   * @param {SensorMetadata} sensorMetadata
   * @return {SensorElement} - the sensor instance
   */
  setSensorMetadata(sensorMetadata) {
    this.sensorMetadata = sensorMetadata;
    return this;
  }

  /**
   * Getter for the sensorMetadata property
   * @return {SensorMetadata} - the sensorMetadata
   */
  getSensorMetadata() {
    return this.sensorMetadata;
  }

  /**
   * Add the sensorReport to the "sensorReportList" field
   * @param {SensorReportElement} sensorReport - the sensorReport to add
   * @return {SensorElement} - the objectEvent instance
   */
  addSensorReport(sensorReport) {
    if (!this.sensorReport) {
      this.sensorReport = [];
    }
    this.sensorReport.push(sensorReport);
    return this;
  }

  /**
   * Add each sensorReportElement to the "sensorReportList" field
   * @param {Array<SensorReportElement>} sensorReportList - the sensorReports to add
   * @return {SensorElement} - the objectEvent instance
   */
  addSensorReportList(sensorReportList) {
    if (!this.sensorReport) {
      this.sensorReport = [];
    }
    sensorReportList.forEach((sensorReportElement) => this.addSensorReport(sensorReportElement));
    return this;
  }

  /**
   * Clear the sensorReport list
   * @return {SensorElement} - the objectEvent instance
   */
  clearSensorReportList() {
    delete this.sensorReport;
    return this;
  }

  /**
   * Remove a sensorReport from the "sensorReportList" field
   * @param {SensorReportElement} sensorReport - the sensorReport to remove
   * @return {SensorElement} - the objectEvent instance
   */
  removeSensorReport(sensorReport) {
    if (!this.sensorReport) {
      this.sensorReport = [];
    }
    this.sensorReport = this.sensorReport.filter((elem) => elem !== sensorReport);
    return this;
  }

  /**
   * Remove each sensorReport from the "sensorReportList" field
   * @param {Array<SensorReportElement>} sensorReportList - the sensorReports to remove
   * @return {SensorElement} - the objectEvent instance
   */
  removeSensorReportList(sensorReportList) {
    if (!this.sensorReport) {
      this.sensorReport = [];
    }
    sensorReportList.forEach((sensorReportElement) => this.removeSensorReport(sensorReportElement));
    return this;
  }

  /**
   * Getter for the sensorReport property
   * @return {SensorReportElement} - the sensorReport
   */
  getSensorReport() {
    return this.sensorReport;
  }
}
