import { dateToString, getDateFromStringOrDate } from '../../utils/utils'
import TimeZoneOffset from '../model/TimeZoneOffset'

export default class ObjectEvent {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via
   * JSON
   * @param {JSON} [JSONObjectEvent] - The JSON that will be used to create the
   * ObjectEvent entity
   */
  constructor (JSONObjectEvent) {
    // object event
    this.epcList = []
    this.quantityList = []

    if (!arguments.length) {
      // create an empty ObjectEvent

      // general object fields
      // this.eventTime = ''
      // this.recordTime = ''
      // this.eventTimeZoneOffset = ''
      // this.eventID = ''
      // this.errorDeclaration = ''

    } else {
      // create an ObjectEvent from the JSON passed in parameters
      // todo: create from JSON
    }

    this.isA = 'ObjectEvent'
  }

  /**
   * Set the eventTime property
   * @param {String} id
   */
  setEventID (id) {
    this.eventID = id
    return this
  }

  /**
   * Set the eventTime property
   * Set the eventTimeZoneOffset property if it isn't defined yet
   * @param {String|Date} time
   */
  setEventTime (time) {
    this.eventTime = getDateFromStringOrDate(time)
    if (!this.eventTimeZoneOffset) {
      this.setEventTimeZoneOffset(this.eventTime.getTimezoneOffset() / 60)
    }
    return this
  }

  /**
   * Set the recordTime property
   * @param {String|Date} time
   */
  setRecordTime (time) {
    this.recordTime = getDateFromStringOrDate(time)
    return this
  }

  /**
   * Set the eventTimeZoneOffset property
   * @param {number|String} value - the time zone offset value
   *    e.g 6 or -2.5 if it is a number
   *    e.g "+06:00" or "-02:30" if it is a String
   */
  setEventTimeZoneOffset (value) {
    this.eventTimeZoneOffset = new TimeZoneOffset(value)
    return this
  }

  /**
   * Set the errorDeclaration property
   * @param {ErrorDeclaration} errorDeclaration
   */
  setErrorDeclaration (errorDeclaration) {
    this.errorDeclaration = errorDeclaration
    return this
  }

  /**
   * Add the epc to the "epcList" field
   * @param {String} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   */
  addEPC (epc) {
    this.epcList.push(epc)
    return this
  }

  /**
   * Add each epc to the "epcList" field
   * @param {Array<String>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   */
  addEPCList (epcList) {
    epcList.forEach(epc => this.addEPC(epc))
    return this
  }

  /**
   * Clear the epc list
   */
  clearEPCList () {
    this.epcList = []
    return this
  }

  /**
   * Remove an epc to the "epcList" field
   * @param {String} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   */
  removeEPC (epc) {
    this.epcList = this.epcList.filter(elem => elem !== epc)
    return this
  }

  /**
   * Remove each epc to the "epcList" field
   * @param {Array<String>} epcList - the epcs to remove
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   */
  removeEPCList (epcList) {
    epcList.forEach(epc => this.removeEPC(epc))
    return this
  }

  /**
   * Return a JSON object corresponding to the ObjectEvent object
   */
  toJSON () {
    const json = { isA: this.isA, epcList: this.epcList }

    if (this.eventID) { json.eventID = this.eventID }

    if (this.eventTime) { json.eventTime = dateToString(this.eventTime, this.eventTimeZoneOffset) }

    if (this.eventTimeZoneOffset) { json.eventTimeZoneOffset = this.eventTimeZoneOffset.toString() }

    if (this.recordTime) { json.recordTime = dateToString(this.recordTime, this.eventTimeZoneOffset) }

    if (this.errorDeclaration) { json.errorDeclaration = this.errorDeclaration.toJSON() }

    return json
  }
}
