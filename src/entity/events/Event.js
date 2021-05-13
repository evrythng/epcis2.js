/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

import { getTheTimeZoneOffsetFromDateString, getTimeZoneOffsetFromStringOrNumber } from '../../utils/utils';
import settings from '../../settings';
import ErrorDeclaration from '../model/ErrorDeclaration';
import Entity from '../Entity';
import ReadPoint from '../model/ReadPoint';
import BizLocation from '../model/BizLocation';
import PersistentDisposition from '../model/PersistentDisposition';
import QuantityElement from '../model/QuantityElement';
import BizTransactionElement from '../model/BizTransactionElement';
import SourceElement from '../model/SourceElement';
import DestinationElement from '../model/DestinationElement';
import SensorElement from '../model/sensor/SensorElement';
import Ilmd from '../model/Ilmd';

export const fieldToFunctions = {
  epcList: ['addEPC', 'addEPCList', 'clearEPCList', 'removeEPC', 'removeEPCList', 'getEPCList'],
  quantityList: [
    'addQuantity',
    'addQuantityList',
    'clearQuantityList',
    'removeQuantity',
    'removeQuantityList',
    'getQuantityList',
  ],
  action: ['setAction', 'getAction'],
  bizStep: ['setBizStep', 'getBizStep'],
  disposition: ['setDisposition', 'getDisposition'],
  persistentDisposition: ['setPersistentDisposition', 'getPersistentDisposition'],
  readPoint: ['setReadPoint', 'getReadPoint'],
  bizLocation: ['setBizLocation', 'getBizLocation'],
  ilmd: ['setIlmd', 'getIlmd'],
  parentID: ['setParentId', 'getParentId'],
  bizTransactionList: [
    'addBizTransaction',
    'addBizTransactionList',
    'clearBizTransactionList',
    'removeBizTransaction',
    'removeBizTransactionList',
    'getBizTransactionList',
  ],
  sourceList: [
    'addSource',
    'addSourceList',
    'clearSourceList',
    'removeSource',
    'removeSourceList',
    'getSourceList',
  ],
  destinationList: [
    'addDestinationList',
    'addDestinationListList',
    'clearDestinationListList',
    'removeDestinationList',
    'removeDestinationListList',
    'getDestinationListList',
  ],
  sensorElementList: [
    'addSensorElementList',
    'addSensorElementListList',
    'clearSensorElementListList',
    'removeSensorElementList',
    'removeSensorElementListList',
    'getSensorElementListList',
  ],
  childEPCs: [
    'addChildEPC',
    'addChildEPCList',
    'clearChildEPCList',
    'removeChildEPC',
    'removeChildEPCList',
    'getChildEPCList',
  ],
  childQuantityList: [
    'addChildQuantity',
    'addChildQuantityList',
    'clearChildQuantityList',
    'removeChildQuantity',
    'removeChildQuantityList',
    'getChildQuantityList',
  ],
};

/**
 * Abstract class Event
 *
 * @class Event
 */
export default class Event extends Entity {
  /**
   * You can either create an empty Event or provide an already existing event via Object
   * @param {Object} [event] - The object that will be used to create the Event entity
   * Only the errorDeclaration will be set here from the JSON passed in param, the other fields are
   * set in the extended classes
   */
  constructor(event) {
    super(event);
    if (new.target === Event) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }

    if (settings.eventTimeZoneOffset !== undefined) {
      this.setEventTimeZoneOffset(settings.eventTimeZoneOffset);
    }

    if (!event) {
      // create an empty Event object
      return;
    }

    // Create classes for sub-objects that are provided
    Object.entries(event).forEach(([key, value]) => {
      switch (key) {
        case 'persistentDisposition':
          this.setPersistentDisposition(new PersistentDisposition(value));
          break;
        case 'epcList':
          try {
            this.clearEPCList();
          } catch (e) {
          }
          value.forEach((epc) => this.addEPC(epc));
          break;
        case 'childEPCs':
          try {
            this.clearChildEPCList();
          } catch (e) {
          }
          value.forEach((epc) => this.addChildEPC(epc));
          break;
        case 'quantityList':
          try {
            this.clearQuantityList();
          } catch (e) {
          }
          value.forEach((quantityElement) => this
            .addQuantity(new QuantityElement(quantityElement)));
          break;
        case 'childQuantityList':
          try {
            this.clearChildQuantityList();
          } catch (e) {
          }
          value.forEach((quantityElement) => this
            .addChildQuantity(new QuantityElement(quantityElement)));
          break;
        case 'bizTransactionList':
          try {
            this.clearBizTransactionList();
          } catch (e) {
          }
          value.forEach((bizTransaction) => this
            .addBizTransaction(new BizTransactionElement(bizTransaction)));
          break;
        case 'sourceList':
          try {
            this.clearSourceList();
          } catch (e) {
          }
          value.forEach((source) => this.addSource(new SourceElement(source)));
          break;
        case 'destinationList':
          try {
            this.clearDestinationList();
          } catch (e) {
          }
          value.forEach((destination) => this.addDestination(new DestinationElement(destination)));
          break;
        case 'sensorElementList':
          try {
            this.clearSensorElementList();
          } catch (e) {
          }
          value.forEach((sensorElement) => this.addSensorElement(new SensorElement(sensorElement)));
          break;
        case 'readPoint':
          this.setReadPoint(new ReadPoint(value));
          break;
        case 'bizLocation':
          this.setBizLocation(new BizLocation(value));
          break;
        case 'errorDeclaration':
          this.setErrorDeclaration(new ErrorDeclaration(value));
          break;
        case 'ilmd':
          this.setIlmd(new Ilmd(value));
          break;
        // no default
      }
    });
  }

  /** ************     COMMON TO ALL EVENTS    ********************** */

  /**
   * Set the eventTime property
   * @param {string} id
   * @return {Event} - the event instance
   */
  setEventID(id) {
    this.eventID = id;
    return this;
  }

  /**
   * Getter for the eventID property
   * @return {string} - the eventID
   */
  getEventID() {
    return this.eventID;
  }

  /**
   * Set the eventTime property
   * @param {string} time - a string corresponding to the time
   *      If a timezone offset is provided in the string (e.g '2005-04-03T20:33:31.116-06:00')
   *      and the timeZoneOffset field isn't defined, the timeZoneOffset field will be set with
   *      the extracted offset (here: '-06:00')
   * @return {Event} - the event instance
   */
  setEventTime(time) {
    this.eventTime = time;
    if (!this.eventTimeZoneOffset) {
      const offset = getTheTimeZoneOffsetFromDateString(time);
      if (offset) {
        this.setEventTimeZoneOffset(offset);
      }
    }
    return this;
  }

  /**
   * Getter for the eventTime property
   * @return {string} - the eventTime
   */
  getEventTime() {
    return this.eventTime;
  }

  /**
   * @param {number|string} offset - the time zone offset
   * (e.g "+02:30" or "-06:00" if it is a string)
   * (e.g -6 or 2.5 if it is a number)
   * @return {Event} - the event instance
   */
  setEventTimeZoneOffset(offset) {
    this.eventTimeZoneOffset = getTimeZoneOffsetFromStringOrNumber(offset);
    return this;
  }

  /**
   * Getter for the eventTimeZoneOffset property
   * @return {string} - the eventTimeZoneOffset
   */
  getEventTimeZoneOffset() {
    return this.eventTimeZoneOffset;
  }

  /**
   * Set the recordTime property
   * @param {string} time - a string corresponding to the time
   * @return {Event} - the event instance
   */
  setRecordTime(time) {
    this.recordTime = time;
    return this;
  }

  /**
   * Getter for the recordTime property
   * @return {string} - the recordTime
   */
  getRecordTime() {
    return this.recordTime;
  }

  /**
   * Set the errorDeclaration property
   * @param {ErrorDeclaration} errorDeclaration
   * @return {Event} - the event instance
   */
  setErrorDeclaration(errorDeclaration) {
    this.errorDeclaration = errorDeclaration;
    return this;
  }

  /**
   * Getter for the errorDeclaration property
   * @return {ErrorDeclaration} - the errorDeclaration
   */
  getErrorDeclaration() {
    return this.errorDeclaration;
  }

  /** ************     NOT COMMON TO ALL EVENTS    ********************** */

  /**
   * Add the epc to the "epcList" field
   * @param {string} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {Event} - the event instance
   */
  addEPC(epc) {
    if (!this.epcList) {
      this.epcList = [];
    }
    this.epcList.push(epc);
    return this;
  }

  /**
   * Add each epc to the "epcList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {Event} - the event instance
   */
  addEPCList(epcList) {
    if (!this.epcList) {
      this.epcList = [];
    }
    this.epcList = [...this.epcList, ...epcList];
    return this;
  }

  /**
   * Clear the epc list
   * @return {Event} - the event instance
   */
  clearEPCList() {
    delete this.epcList;
    return this;
  }

  /**
   * Remove an epc from the "epcList" field
   * @param {string} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {Event} - the event instance
   */
  removeEPC(epc) {
    this.epcList = this.epcList.filter((elem) => elem !== epc);
    return this;
  }

  /**
   * Remove each epc from the "epcList" field
   * @param {Array<string>} epcList - the epcs to remove
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {Event} - the event instance
   */
  removeEPCList(epcList) {
    epcList.forEach((epc) => this.removeEPC(epc));
    return this;
  }

  /**
   * Getter for the epcList property
   * @return {Array<string>} - the epcList
   */
  getEPCList() {
    return this.epcList;
  }

  /**
   * Add the quantity to the "quantityList" field
   * @param {QuantityElement} quantity - the quantity to add
   * @return {Event} - the event instance
   */
  addQuantity(quantity) {
    if (!this.quantityList) {
      this.quantityList = [];
    }
    this.quantityList.push(quantity);
    return this;
  }

  /**
   * Add each quantity to the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {Event} - the event instance
   */
  addQuantityList(quantityList) {
    if (!this.quantityList) {
      this.quantityList = [];
    }
    this.quantityList = [...this.quantityList, ...quantityList];
    return this;
  }

  /**
   * Clear the quantity list
   * @return {Event} - the event instance
   */
  clearQuantityList() {
    delete this.quantityList;
    return this;
  }

  /**
   * Remove a quantity from the "quantityList" field
   * @param {QuantityElement} quantity - the quantity to remove
   * @return {Event} - the event instance
   */
  removeQuantity(quantity) {
    this.quantityList = this.quantityList.filter((elem) => elem !== quantity);
    return this;
  }

  /**
   * Remove each quantity from the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {Event} - the event instance
   */
  removeQuantityList(quantityList) {
    quantityList.forEach((quantity) => this.removeQuantity(quantity));
    return this;
  }

  /**
   * Getter for the quantityList property
   * @return {Array<QuantityElement>} - the quantityList
   */
  getQuantityList() {
    return this.quantityList;
  }

  /**
   * Set the action property
   * @param {string} action - string from {"OBSERVE", "ADD", "DELETE"}
   * @return {Event} - the event instance
   */
  setAction(action) {
    this.action = action;
    return this;
  }

  /**
   * Getter for the action property
   * @return {string} - the action
   */
  getAction() {
    return this.action;
  }

  /**
   * Set the bizStep property
   * @param {string} bizStep - e.g bizsteps.accepting
   * @return {Event} - the event instance
   */
  setBizStep(bizStep) {
    this.bizStep = bizStep;
    return this;
  }

  /**
   * Getter for the bizStep property
   * @return {string} - the bizStep
   */
  getBizStep() {
    return this.bizStep;
  }

  /**
   * Set the disposition property
   * @param {string} disposition - e.g dispositions.in_transit
   * @return {Event} - the event instance
   */
  setDisposition(disposition) {
    this.disposition = disposition;
    return this;
  }

  /**
   * Getter for the disposition property
   * @return {string} - the disposition
   */
  getDisposition() {
    return this.disposition;
  }

  /**
   * Set the persistentDisposition property
   * @param {PersistentDisposition} persistentDisposition
   * @return {Event} - the event instance
   */
  setPersistentDisposition(persistentDisposition) {
    this.persistentDisposition = persistentDisposition;
    return this;
  }

  /**
   * Getter for the persistentDisposition property
   * @return {PersistentDisposition} - the persistentDisposition
   */
  getPersistentDisposition() {
    return this.persistentDisposition;
  }

  /**
   * Set the readPoint property
   * @param {string|ReadPoint} readPoint id or readPoint instance
   * @return {Event} - the event instance
   */
  setReadPoint(readPoint) {
    if ((typeof readPoint) === 'string') { // the param is the id of the readPoint
      this.readPoint = new ReadPoint().setId(readPoint);
      return this;
    }
    // the param is the ReadPoint instance
    this.readPoint = readPoint;
    return this;
  }

  /**
   * Getter for the readPoint property
   * @return {ReadPoint} - the readPoint
   */
  getReadPoint() {
    return this.readPoint;
  }

  /**
   * Set the bizLocation property
   * @param {string|BizLocation} bizLocation instance or bizLocation id
   * @return {Event} - the event instance
   */
  setBizLocation(bizLocation) {
    if ((typeof bizLocation) === 'string') { // the param is the id of the bizLocation
      this.bizLocation = new BizLocation().setId(bizLocation);
      return this;
    }
    // the param is the BizLocation instance
    this.bizLocation = bizLocation;
    return this;
  }

  /**
   * Getter for the bizLocation property
   * @return {BizLocation} - the bizLocation
   */
  getBizLocation() {
    return this.bizLocation;
  }

  /**
   * Add the bizTransaction to the "bizTransactionList" field
   * @param {BizTransactionElement} bizTransaction - the bizTransaction to add
   * @return {Event} - the event instance
   */
  addBizTransaction(bizTransaction) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = [];
    }
    this.bizTransactionList.push(bizTransaction);
    return this;
  }

  /**
   * Add each bizTransaction to the "bizTransactionList" field
   * @param {Array<BizTransactionElement>} bizTransactionList - the bizTransactions to add
   * @return {Event} - the event instance
   */
  addBizTransactionList(bizTransactionList) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = [];
    }
    this.bizTransactionList = [...this.bizTransactionList, ...bizTransactionList];
    return this;
  }

  /**
   * Clear the bizTransaction list
   * @return {Event} - the event instance
   */
  clearBizTransactionList() {
    delete this.bizTransactionList;
    return this;
  }

  /**
   * Remove a bizTransaction from the "bizTransactionList" field
   * @param {BizTransactionElement} bizTransaction - the bizTransaction to remove
   * @return {Event} - the event instance
   */
  removeBizTransaction(bizTransaction) {
    this.bizTransactionList = this.bizTransactionList.filter((elem) => elem !== bizTransaction);
    return this;
  }

  /**
   * Remove each bizTransaction from the "bizTransactionList" field
   * @param {Array<BizTransactionElement>} bizTransactionList - the bizTransactions to remove
   * @return {Event} - the event instance
   */
  removeBizTransactionList(bizTransactionList) {
    bizTransactionList
      .forEach((bizTransaction) => this.removeBizTransaction(bizTransaction));
    return this;
  }

  /**
   * Getter for the bizTransactionList property
   * @return {Array<BizTransactionElement>} - the bizTransactionList
   */
  getBizTransactionList() {
    return this.bizTransactionList;
  }

  /**
   * Add the source to the "sourceList" field
   * @param {SourceElement} source - the source to add
   * @return {Event} - the event instance
   */
  addSource(source) {
    if (!this.sourceList) {
      this.sourceList = [];
    }
    this.sourceList.push(source);
    return this;
  }

  /**
   * Add each sourceElement to the "sourceList" field
   * @param {Array<SourceElement>} sourceList - the sourceElements to add
   * @return {Event} - the event instance
   */
  addSourceList(sourceList) {
    if (!this.sourceList) {
      this.sourceList = [];
    }
    this.sourceList = [...this.sourceList, ...sourceList];
    return this;
  }

  /**
   * Clear the source list
   * @return {Event} - the event instance
   */
  clearSourceList() {
    delete this.sourceList;
    return this;
  }

  /**
   * Remove a source from the "sourceList" field
   * @param {SourceElement} source - the source to remove
   * @return {Event} - the event instance
   */
  removeSource(source) {
    this.sourceList = this.sourceList.filter((elem) => elem !== source);
    return this;
  }

  /**
   * Remove each source from the "sourceList" field
   * @param {Array<SourceElement>} sourceList - the sources to remove
   * @return {Event} - the event instance
   */
  removeSourceList(sourceList) {
    sourceList.forEach((sourceElement) => this.removeSource(sourceElement));
    return this;
  }

  /**
   * Getter for the sourceList property
   * @return {Array<SourceElement>} - the sourceList
   */
  getSourceList() {
    return this.sourceList;
  }

  /**
   * Add the destination to the "destinationList" field
   * @param {DestinationElement} destination - the destination to add
   * @return {Event} - the event instance
   */
  addDestination(destination) {
    if (!this.destinationList) {
      this.destinationList = [];
    }
    this.destinationList.push(destination);
    return this;
  }

  /**
   * Add each destinationElement to the "destinationList" field
   * @param {Array<DestinationElement>} destinationList - the destinationElements to add
   * @return {Event} - the event instance
   */
  addDestinationList(destinationList) {
    if (!this.destinationList) {
      this.destinationList = [];
    }
    this.destinationList = [...this.destinationList, ...destinationList];
    return this;
  }

  /**
   * Clear the destination list
   * @return {Event} - the event instance
   */
  clearDestinationList() {
    delete this.destinationList;
    return this;
  }

  /**
   * Remove a destination from the "destinationList" field
   * @param {DestinationElement} destination - the destination to remove
   * @return {Event} - the event instance
   */
  removeDestination(destination) {
    this.destinationList = this.destinationList.filter((elem) => elem !== destination);
    return this;
  }

  /**
   * Remove each destination from the "destinationList" field
   * @param {Array<DestinationElement>} destinationList - the destinations to remove
   * @return {Event} - the event instance
   */
  removeDestinationList(destinationList) {
    destinationList
      .forEach((destinationElement) => this.removeDestination(destinationElement));
    return this;
  }

  /**
   * Getter for the destinationList property
   * @return {Array<DestinationElement>} - the destinationList
   */
  getDestinationList() {
    return this.destinationList;
  }

  /**
   * Add the sensorElement to the "sensorElementList" field
   * @param {SensorElement} sensorElement - the sensorElement to add
   * @return {Event} - the event instance
   */
  addSensorElement(sensorElement) {
    if (!this.sensorElementList) {
      this.sensorElementList = [];
    }
    this.sensorElementList.push(sensorElement);
    return this;
  }

  /**
   * Add each sensorElementElement to the "sensorElementList" field
   * @param {Array<SensorElement>} sensorElementList - the sensorElementElements to add
   * @return {Event} - the event instance
   */
  addSensorElementList(sensorElementList) {
    if (!this.sensorElementList) {
      this.sensorElementList = [];
    }
    this.sensorElementList = [...this.sensorElementList, ...sensorElementList];
    return this;
  }

  /**
   * Clear the sensorElement list
   * @return {Event} - the event instance
   */
  clearSensorElementList() {
    delete this.sensorElementList;
    return this;
  }

  /**
   * Remove a sensorElement from the "sensorElementList" field
   * @param {SensorElement} sensorElement - the sensorElement to remove
   * @return {Event} - the event instance
   */
  removeSensorElement(sensorElement) {
    this.sensorElementList = this.sensorElementList.filter((elem) => elem !== sensorElement);
    return this;
  }

  /**
   * Remove each sensorElement from the "sensorElementList" field
   * @param {Array<SensorElement>} sensorElementList - the sensorElements to remove
   * @return {Event} - the event instance
   */
  removeSensorElementList(sensorElementList) {
    sensorElementList
      .forEach((sensorElementElement) => this.removeSensorElement(sensorElementElement));
    return this;
  }

  /**
   * Getter for the sensorElementList property
   * @return {Array<SensorElement>} - the sensorElementList
   */
  getSensorElementList() {
    return this.sensorElementList;
  }

  /**
   * Set the ilmd property
   * @param {Ilmd} ilmd object
   * @return {Event} - the event instance
   */
  setIlmd(ilmd) {
    this.ilmd = ilmd;
    return this;
  }

  /**
   * Getter for the ilmd property
   * @return {Ilmd} - the ilmd
   */
  getIlmd() {
    return this.ilmd;
  }

  /**
   * Set the parentID property
   * @param {string} parentID
   * @return {Event} - the event instance
   */
  setParentId(parentID) {
    this.parentID = parentID;
    return this;
  }

  /**
   * Getter for the parentID property
   * @return {string} - the parentID
   */
  getParentId() {
    return this.parentID;
  }

  /**
   * Add the epc to the "childEPCs" field
   * @param {string} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {Event} - the event instance
   */
  addChildEPC(epc) {
    if (!this.childEPCs) {
      this.childEPCs = [];
    }
    this.childEPCs.push(epc);
    return this;
  }

  /**
   * Add each epc to the "childEPCs" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {Event} - the event instance
   */
  addChildEPCList(epcList) {
    if (!this.childEPCs) {
      this.childEPCs = [];
    }
    this.childEPCs = [...this.childEPCs, ...epcList];
    return this;
  }

  /**
   * Clear the childEPCs
   * @return {Event} - the event instance
   */
  clearChildEPCList() {
    delete this.childEPCs;
    return this;
  }

  /**
   * Remove an epc from the "childEPCs" field
   * @param {string} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {Event} - the event instance
   */
  removeChildEPC(epc) {
    this.childEPCs = this.childEPCs.filter((elem) => elem !== epc);
    return this;
  }

  /**
   * Remove each epc from the "childEPCs" field
   * @param {Array<string>} epcList - the epcs to remove
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {Event} - the event instance
   */
  removeChildEPCList(epcList) {
    epcList.forEach((epc) => this.removeChildEPC(epc));
    return this;
  }

  /**
   * Getter for the childEPCs property
   * @return {Array<string>} - the childEpcList
   */
  getChildEPCList() {
    return this.childEPCs;
  }

  /**
   * Add the quantity to the "childQuantityList" field
   * @param {QuantityElement} quantity - the quantity to add
   * @return {Event} - the event instance
   */
  addChildQuantity(quantity) {
    if (!this.childQuantityList) {
      this.childQuantityList = [];
    }
    this.childQuantityList.push(quantity);
    return this;
  }

  /**
   * Add each quantity to the "childQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {Event} - the event instance
   */
  addChildQuantityList(quantityList) {
    if (!this.childQuantityList) {
      this.childQuantityList = [];
    }
    this.childQuantityList = [...this.childQuantityList, ...quantityList];
    return this;
  }

  /**
   * Clear the childQuantityList
   * @return {Event} - the event instance
   */
  clearChildQuantityList() {
    delete this.childQuantityList;
    return this;
  }

  /**
   * Remove a quantity from the "childQuantityList" field
   * @param {QuantityElement} quantity - the quantity to remove
   * @return {Event} - the event instance
   */
  removeChildQuantity(quantity) {
    this.childQuantityList = this.childQuantityList.filter((elem) => elem !== quantity);
    return this;
  }

  /**
   * Remove each quantity from the "childQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {Event} - the event instance
   */
  removeChildQuantityList(quantityList) {
    quantityList.forEach((quantity) => this.removeChildQuantity(quantity));
    return this;
  }

  /**
   * Getter for the childQuantityList property
   * @return {Array<QuantityElement>} - the quantityList
   */
  getChildQuantityList() {
    return this.childQuantityList;
  }
}
