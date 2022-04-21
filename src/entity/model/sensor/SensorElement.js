/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import SensorMetadata from './SensorMetadata';
import SensorReportElement from './SensorReportElement';
import Entity from '../../Entity';

export default class SensorElement extends Entity {
  /**
   * You can either create an empty SensorElement or provide an already existing SensorElement via
   * Map
   * @param {Object} [sensor] - The object that will be used to create the SensorElement entity
   */
  constructor(sensor) {
    super(sensor);

    if (!sensor) {
      // create an empty SensorElement object
      return;
    }

    this.clearSensorReportList();

    // Create classes for sub-objects that are provided
    Object.entries(sensor).forEach(([key, value]) => {
      switch (key) {
        case 'sensorMetadata':
          this.setSensorMetadata(new SensorMetadata(value));
          break;
        case 'sensorReport':
          value.forEach(
            (sensorReport) => this.addSensorReport(new SensorReportElement(sensorReport)),
          );
          break;
        // no default
      }
    });
  }

  /**
   * Set the sensorMetadata property
   * @param {SensorMetadata} sensorMetadata
   * @return {SensorElement} - the sensor instance
   */
  setSensorMetadata(sensorMetadata) {
    return this.generateSetterFunction('sensorMetadata', sensorMetadata, [SensorMetadata]);
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
    return this.generateAddItemToListFunction('sensorReport', sensorReport, [SensorReportElement]);
  }

  /**
   * Add each sensorReportElement to the "sensorReportList" field
   * @param {Array<SensorReportElement>} sensorReportList - the sensorReports to add
   * @return {SensorElement} - the objectEvent instance
   */
  addSensorReportList(sensorReportList) {
    return this.generateAddItemsToListFunction('sensorReport', sensorReportList, [SensorReportElement]);
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
    this.sensorReport = this.sensorReport.filter((elem) => elem !== sensorReport);
    if (!this.sensorReport?.length) {
      this.clearSensorReportList();
    }
    return this;
  }

  /**
   * Remove each sensorReport from the "sensorReportList" field
   * @param {Array<SensorReportElement>} sensorReportList - the sensorReports to remove
   * @return {SensorElement} - the objectEvent instance
   */
  removeSensorReportList(sensorReportList) {
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
