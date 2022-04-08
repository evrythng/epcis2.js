/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */

import { getTheTimeZoneOffsetFromDateString, getTimeZoneOffset } from '../../utils/utils';
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
import { eventToHashedId } from '../../hash_generator/EPCISEventToHashedString';
import { validateAgainstSchema } from '../../schema/validator';

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
    'addDestination',
    'addDestinationList',
    'clearDestinationList',
    'removeDestination',
    'removeDestinationList',
    'getDestinationList',
  ],
  sensorElementList: [
    'addSensorElement',
    'addSensorElementList',
    'clearSensorElementList',
    'removeSensorElement',
    'removeSensorElementList',
    'getSensorElementList',
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
      throw new Error("Abstract classes can't be instantiated.");
    }

    // If the event timeZoneOffset isn't defined, set default values
    if (settings.eventTimeZoneOffset !== undefined) {
      this.setEventTimeZoneOffset(settings.eventTimeZoneOffset);
    } else if (!this.eventTimeZoneOffset) {
      const date = new Date();
      const timeZoneOffset = getTimeZoneOffset(date.getTimezoneOffset() / 60);
      this.setEventTimeZoneOffset(timeZoneOffset);
    }

    // If the event time isn't defined, set default values
    if (!this.getEventTime()) {
      const date = new Date();

      const timeZoneOffset = this.getEventTimeZoneOffset();

      this.setEventTime(date.toISOString().replace('Z', '').concat(timeZoneOffset));
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
          } catch (e) {}
          value.forEach((epc) => this.addEPC(epc));
          break;
        case 'childEPCs':
          try {
            this.clearChildEPCList();
          } catch (e) {}
          value.forEach((epc) => this.addChildEPC(epc));
          break;
        case 'quantityList':
          try {
            this.clearQuantityList();
          } catch (e) {}
          value.forEach(
            (quantityElement) => this.addQuantity(new QuantityElement(quantityElement)),
          );
          break;
        case 'childQuantityList':
          try {
            this.clearChildQuantityList();
          } catch (e) {}
          value.forEach(
            (quantityElement) => this.addChildQuantity(new QuantityElement(quantityElement)),
          );
          break;
        case 'bizTransactionList':
          try {
            this.clearBizTransactionList();
          } catch (e) {}
          value.forEach(
            (bizTransaction) => this.addBizTransaction(new BizTransactionElement(bizTransaction)),
          );
          break;
        case 'sourceList':
          try {
            this.clearSourceList();
          } catch (e) {}
          value.forEach((source) => this.addSource(new SourceElement(source)));
          break;
        case 'destinationList':
          try {
            this.clearDestinationList();
          } catch (e) {}
          value.forEach((destination) => this.addDestination(new DestinationElement(destination)));
          break;
        case 'sensorElementList':
          try {
            this.clearSensorElementList();
          } catch (e) {}
          value.forEach((sensorElement) => this.addSensorElement(new SensorElement(sensorElement)));
          break;
        case 'readPoint':
          this.setReadPoint(value);
          break;
        case 'bizLocation':
          this.setBizLocation(value);
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
   * Set the context property
   * @param {string|Object|Array<string>|Array<Object>} context
   * @return {Event} - the event instance
   */
  setContext(context) {
    this['@context'] = context;
    return this;
  }

  /**
   * Getter for the context property
   * @return {string|Object|Array<string>|Array<Object>} - the context
   */
  getContext() {
    return this['@context'];
  }

  /**
   * Getter for the type property
   * @return {string} - the event type
   */
  getType() {
    return this.type;
  }

  /**
   * Set the eventID property
   * @param {string} id
   * @return {Event} - the event instance
   */
  setEventID(id) {
    this.eventID = id;
    return this.generateSetterFunction('eventID', id, ['string']);
  }

  /**
   * Getter for the eventID property
   * @return {string} - the eventID
   */
  getEventID() {
    return this.eventID;
  }

  /**
   * Generate an event ID and set the eventID property
   * This method needs to be called once all your field are set since the hash id is generated
   * according to all your fields
   *
   * @param {{}} context - the list of context (e.g {
   *    "example": "http://ns.example.com/epcis/",
   *    "example2": "http://ns.example2.com/epcis/",
   * })
   * This param needs to contain all the contexts that are used in the event otherwise this function
   * will throw an error (if throwError is set to true)
   * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
   * fields for example. Otherwise, it won't throw an error and it will still return the
   * generated id
   * @return {Event} - the event instance
   */
  generateHashID(context, throwError = true) {
    this.setEventID(eventToHashedId(this.toObject(), context, throwError));
    return this;
  }

  /**
   * Set the eventTime property
   * @param {string} time - a string corresponding to the time
   *      If a timezone offset is provided in the string (e.g '2005-04-03T20:33:31.116-06:00')
   *      and overrideTimeZoneOffset is set to true, the timeZoneOffset field will be set with
   *      the extracted offset (here: '-06:00')
   * @param {boolean} [overrideTimeZoneOffset = true] - if set to true, the eventTimeZoneOffset
   * field will be overridden with the offset of the given time. Otherwise, it doesn't update it.
   * @return {Event} - the event instance
   */
  setEventTime(time, overrideTimeZoneOffset = true) {
    this.eventTime = time;
    if (overrideTimeZoneOffset) {
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
    this.eventTimeZoneOffset = getTimeZoneOffset(offset);
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
    return this.generateSetterFunction('recordTime', time, ['string']);
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
    return this.generateSetterFunction('errorDeclaration', errorDeclaration, [ErrorDeclaration]);
  }

  /**
   * Getter for the errorDeclaration property
   * @return {ErrorDeclaration} - the errorDeclaration
   */
  getErrorDeclaration() {
    return this.errorDeclaration;
  }

  /**
   * set the certificationInfo property
   * @param {string|Array<string>} certificationInfo
   * @return {Event} - the event instance
   */
  setCertificationInfo(certificationInfo) {
    return this.generateSetterFunction('certificationInfo', certificationInfo, ['string', Array]);
  }

  /**
   * Getter for the certificationInfo property
   * @return {string|Array<string>} - the certificationInfo
   */
  getCertificationInfo() {
    return this.certificationInfoList;
  }

  /** ************     NOT COMMON TO ALL EVENTS    ********************** */

  /**
   * Add the epc to the "epcList" field
   * @throws an error if the epc to add is already in the epc list
   * @param {string} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {Event} - the event instance
   */
  addEPC(epc) {
    if (this.epcList?.includes(epc)) {
      throw new Error('This epc is already in the epc list');
    }
    return this.generateAddItemToListFunction('epcList', epc, ['string']);
  }

  /**
   * Add each epc to the "epcList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @throws  an error if at least one item is already in the epc list
   * @return {Event} - the event instance
   */
  addEPCList(epcList) {
    epcList.forEach((epc) => {
      if (this.epcList?.includes(epc)) {
        throw new Error('This epc is already in the epc list');
      }
    });
    return this.generateAddItemsToListFunction('epcList', epcList, ['string']);
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
    return this.generateAddItemToListFunction('quantityList', quantity, [QuantityElement]);
  }

  /**
   * Add each quantity to the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {Event} - the event instance
   */
  addQuantityList(quantityList) {
    return this.generateAddItemsToListFunction('quantityList', quantityList, [QuantityElement]);
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
    if (!this.quantityList?.length) {
      this.clearQuantityList();
    }
    return this;
  }

  /**
   * Remove each quantity from the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {Event} - the event instance
   */
  removeQuantityList(quantityList) {
    quantityList.forEach((quantity) => this.removeQuantity(quantity));
    if (!this.quantityList?.length) {
      this.clearQuantityList();
    }
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
    return this.generateSetterFunction('action', action, ['string']);
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
    return this.generateSetterFunction('bizStep', bizStep, ['string']);
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
    return this.generateSetterFunction('disposition', disposition, ['string']);
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
    return this.generateSetterFunction('persistentDisposition', persistentDisposition, [PersistentDisposition]);
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
    if (typeof readPoint === 'string') {
      // the param is the id of the readPoint
      this.readPoint = new ReadPoint().setId(readPoint);
      return this;
    }
    if (!(readPoint instanceof ReadPoint)) {
      this.readPoint = new ReadPoint(readPoint);
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
    if (typeof bizLocation === 'string') {
      // the param is the id of the bizLocation
      this.bizLocation = new BizLocation().setId(bizLocation);
      return this;
    }
    if (!(bizLocation instanceof BizLocation)) {
      this.bizLocation = new BizLocation(bizLocation);
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
    return this.generateAddItemToListFunction('bizTransactionList', bizTransaction, [BizTransactionElement]);
  }

  /**
   * Add each bizTransaction to the "bizTransactionList" field
   * @param {Array<BizTransactionElement>} bizTransactionList - the bizTransactions to add
   * @return {Event} - the event instance
   */
  addBizTransactionList(bizTransactionList) {
    return this.generateAddItemsToListFunction('bizTransactionList', bizTransactionList, [BizTransactionElement]);
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
    if (!this.bizTransactionList?.length) {
      this.clearBizTransactionList();
    }
    return this;
  }

  /**
   * Remove each bizTransaction from the "bizTransactionList" field
   * @param {Array<BizTransactionElement>} bizTransactionList - the bizTransactions to remove
   * @return {Event} - the event instance
   */
  removeBizTransactionList(bizTransactionList) {
    bizTransactionList.forEach((bizTransaction) => this.removeBizTransaction(bizTransaction));
    if (!this.bizTransactionList?.length) {
      this.clearBizTransactionList();
    }
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
    return this.generateAddItemToListFunction('sourceList', source, [SourceElement]);
  }

  /**
   * Add each sourceElement to the "sourceList" field
   * @param {Array<SourceElement>} sourceList - the sourceElements to add
   * @return {Event} - the event instance
   */
  addSourceList(sourceList) {
    return this.generateAddItemsToListFunction('sourceList', sourceList, [SourceElement]);
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
    return this.generateAddItemToListFunction('destinationList', destination, [DestinationElement]);
  }

  /**
   * Add each destinationElement to the "destinationList" field
   * @param {Array<DestinationElement>} destinationList - the destinationElements to add
   * @return {Event} - the event instance
   */
  addDestinationList(destinationList) {
    return this.generateAddItemsToListFunction('destinationList', destinationList, [DestinationElement]);
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
    destinationList.forEach((destinationElement) => this.removeDestination(destinationElement));
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
    return this.generateAddItemToListFunction('sensorElementList', sensorElement, [SensorElement]);
  }

  /**
   * Add each sensorElementElement to the "sensorElementList" field
   * @param {Array<SensorElement>} sensorElementList - the sensorElementElements to add
   * @return {Event} - the event instance
   */
  addSensorElementList(sensorElementList) {
    return this.generateAddItemsToListFunction('sensorElementList', sensorElementList, [SensorElement]);
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
    if (!this.sensorElementList?.length) {
      this.clearSensorElementList();
    }
    return this;
  }

  /**
   * Remove each sensorElement from the "sensorElementList" field
   * @param {Array<SensorElement>} sensorElementList - the sensorElements to remove
   * @return {Event} - the event instance
   */
  removeSensorElementList(sensorElementList) {
    sensorElementList.forEach(
      (sensorElementElement) => this.removeSensorElement(sensorElementElement),
    );
    if (!this.sensorElementList?.length) {
      this.clearSensorElementList();
    }
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
    return this.generateSetterFunction('ilmd', ilmd, [Ilmd]);
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
    return this.generateSetterFunction('parentID', parentID, ['string']);
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
    return this.generateAddItemToListFunction('childEPCs', epc, ['string']);
  }

  /**
   * Add each epc to the "childEPCs" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {Event} - the event instance
   */
  addChildEPCList(epcList) {
    return this.generateAddItemsToListFunction('childEPCs', epcList, ['string']);
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
    if (!this.childEPCs?.length) {
      this.clearChildEPCList();
    }
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
    if (!this.childEPCs?.length) {
      this.clearChildEPCList();
    }
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
    return this.generateAddItemToListFunction('childQuantityList', quantity, [QuantityElement]);
  }

  /**
   * Add each quantity to the "childQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {Event} - the event instance
   */
  addChildQuantityList(quantityList) {
    return this.generateAddItemsToListFunction('childQuantityList', quantityList, [QuantityElement]);
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
    if (!this.childQuantityList?.length) {
      this.clearChildQuantityList();
    }
    return this;
  }

  /**
   * Remove each quantity from the "childQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {Event} - the event instance
   */
  removeChildQuantityList(quantityList) {
    quantityList.forEach((quantity) => this.removeChildQuantity(quantity));
    if (!this.childQuantityList?.length) {
      this.clearChildQuantityList();
    }
    return this;
  }

  /**
   * Getter for the childQuantityList property
   * @return {Array<QuantityElement>} - the quantityList
   */
  getChildQuantityList() {
    return this.childQuantityList;
  }

  /**
   * Check if the EPCIS Event respects the rules of the standard defined in
   * src/schema/${EventType}.schema.json
   * @return {boolean} - true if the Event is valid
   * @throws {Error} - if the schema isn't valid
   */
  isValid() {
    const result = validateAgainstSchema(this.toObject(), this.getType().toString());
    if (!result.success) {
      throw new Error(result.errors);
    }
    return result.success;
  }
}
