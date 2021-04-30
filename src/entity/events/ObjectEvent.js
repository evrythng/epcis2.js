import ErrorDeclaration from '../model/ErrorDeclaration';
import { getTheTimeZoneOffsetFromDateString, getTimeZoneOffsetFromStringOrNumber } from '../../utils/utils';

export default class ObjectEvent {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via Map
   * @param {{}} [objectEvent] - The Map that will be used to create the ObjectEvent entity
   */
  constructor (objectEvent) {
    // object event
    this.isA = 'ObjectEvent'
    this.epcList = []
    this.quantityList = [];

    //todo: if timezone offset in setup, save here

    if (!arguments.length) {
      return;
    }

    for (const prop in objectEvent) {
      if (objectEvent.hasOwnProperty(prop)) {
        switch (prop) {
          case 'errorDeclaration':
            this.setErrorDeclaration(objectEvent[prop]);
            break;
          case 'epcList':
            this.addEPCList(objectEvent[prop]);
            break;
          default:
            this[prop] = objectEvent[prop];
        }
      }
    }

  }

  /**
   * Set the eventTime property
   * @param {string} id
   * @return {ObjectEvent} - the objectEvent instance
   */
  setEventID (id) {
    this.eventID = id
    return this
  }

  /**
   * Set the eventTime property
   * @param {string} time - a string corresponding to the time
   *      If a timezone offset is provided in the string (e.g '2005-04-03T20:33:31.116-06:00')
   *      and the timeZoneOffset field isn't defined, the timeZoneOffset field will be set with
   *      the extracted offset (here: '-06:00')
   * @return {ObjectEvent} - the objectEvent instance
   */
  setEventTime (time) {
    this.eventTime = time;
    if (!this.eventTimeZoneOffset) {
      const offset = getTheTimeZoneOffsetFromDateString(time);
      if (offset)
        this.setEventTimeZoneOffset(offset);
    }
    return this
  }

  /**
   * @param {number|string} offset - the time zone offset
   * (e.g "+02:30" or "-06:00" if it is a string)
   * (e.g -6 or 2.5 if it is a number)
   * @return {ObjectEvent} - the objectEvent instance
   */
  setEventTimeZoneOffset(offset) {
    this.eventTimeZoneOffset = getTimeZoneOffsetFromStringOrNumber(offset);
    return this;
  }

  /**
   * Set the recordTime property
   * @param {string} time - a string corresponding to the time
   * @return {ObjectEvent} - the objectEvent instance
   */
  setRecordTime (time) {
    this.recordTime = time
    return this
  }

  /**
   * Set the errorDeclaration property
   * @param {ErrorDeclaration} errorDeclaration
   * @return {ObjectEvent} - the objectEvent instance
   */
  setErrorDeclaration (errorDeclaration) {
    this.errorDeclaration = errorDeclaration
    return this
  }

  /**
   * Add the epc to the "epcList" field
   * @param {string} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {ObjectEvent} - the objectEvent instance
   */
  addEPC (epc) {
    this.epcList.push(epc)
    return this
  }

  /**
   * Add each epc to the "epcList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {ObjectEvent} - the objectEvent instance
   */
  addEPCList (epcList) {
    epcList.forEach(epc => this.addEPC(epc))
    return this
  }

  /**
   * Clear the epc list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearEPCList () {
    this.epcList = []
    return this
  }

  /**
   * Remove an epc to the "epcList" field
   * @param {string} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeEPC (epc) {
    this.epcList = this.epcList.filter(elem => elem !== epc)
    return this
  }

  /**
   * Remove each epc to the "epcList" field
   * @param {Array<string>} epcList - the epcs to remove
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeEPCList (epcList) {
    epcList.forEach(epc => this.removeEPC(epc))
    return this
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {ObjectEvent} - the objectEvent instance
   */
  addCustomField(key, value) {
    this[key] = value;
    return this;
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeCustomField(key, value) {
    delete this[key];
    return this;
  }

  /**
   * Return a JSON object corresponding to the ObjectEvent object
   */
  toJSON () {
    let json = {};

    for (let prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (this[prop] instanceof ErrorDeclaration) {
          json[prop] = this[prop].toJSON();
        } else {
          json[prop] = this[prop];
        }
      }
    }

    return json;
  }
}
