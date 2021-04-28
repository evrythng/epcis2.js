import { dateToString, getDateFromStringOrDate } from '../../utils/utils'
import TimeZoneOffset from './TimeZoneOffset'

/**
 * This class contains these fields :
 * - {Array<String>} correctiveEventIDList - the list of correctiveEventIDs
 *   default: null
 * - {Date} declarationTime - the declaration Time
 *    default: null
 *    When you set it, if no time zone offset is given, the time zone of the device will be taken
 *    for the timeZoneOffset field
 * - {String} reason - the reason
 *   default: null
 * - {TimeZoneOffset} timeZoneOffset - the offset of the declaration Time
 *   default: null (will be set once the declarationTime is set)
 */
export default class ErrorDeclaration {
  // todo: add the possibility to add custom attributes
  // e.g "example:vendorExtension": "Test1",

  /**
   * You can either create an empty ErrorDeclaration or provide an already existing Error
   * Declaration via JSON
   * @param {JSON} [JSONErrorDeclaration] - The JSON that will be used to create the
   * ErrorDeclaration entity
   */
  constructor (JSONErrorDeclaration) {
    this.correctiveEventIDList = []

    if (!arguments.length) {
      // create an empty ErrorDeclaration object

    }

    // todo: if json is provided
  }

  /**
   * Set the declarationTime property
   * if no time zone offset is given, the time zone of the device will be taken
   * @param {String|Date} time
   * @param {TimeZoneOffset} [timeZoneOffset] - the time zone offset of the given date
   *     If this parameter isn't provided, it will be set to the time zone of the device
   */
  setDeclarationTime (time, timeZoneOffset) {
    this.declarationTime = getDateFromStringOrDate(time)
    if (!timeZoneOffset) {
      this.timeZoneOffset = new TimeZoneOffset(this.declarationTime.getTimezoneOffset() / 60)
    } else {
      this.timeZoneOffset = timeZoneOffset
    }
    return this
  }

  /**
   * Set the reason property
   * @param {String} reason - the reason (e.g 'urn:epcglobal:cbv:er:incorrect_data')
   */
  setReason (reason) {
    this.reason = reason
    return this
  }

  /**
   * Add the correctiveEventID to the "correctiveEventIDList" field
   * @param {String} correctiveEventID - the correctiveEventID to add (e.g urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8)
   */
  addCorrectiveEventID (correctiveEventID) {
    this.correctiveEventIDList.push(correctiveEventID)
    return this
  }

  /**
   * Add each correctiveEventID to the "correctiveEventIDList" field
   * @param {Array<String>} correctiveEventIDList - the correctiveEventIDs to add
   * (e.g [urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8, urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7])
   */
  addCorrectiveEventIDList (correctiveEventIDList) {
    correctiveEventIDList.forEach(correctiveEventID => this.addCorrectiveEventID(correctiveEventID))
    return this
  }

  /**
   * Clear the correctiveEventID list
   */
  clearCorrectiveEventIDList () {
    this.correctiveEventIDList = []
    return this
  }

  /**
   * Remove a correctiveEventID to the "correctiveEventIDList" field
   * @param {String} correctiveEventID - the correctiveEventID to remove (e.g urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8)
   */
  removeCorrectiveEventID (correctiveEventID) {
    this.correctiveEventIDList = this.correctiveEventIDList.filter(elem => elem !== correctiveEventID)
    return this
  }

  /**
   * Remove each correctiveEventID to the "correctiveEventIDList" field
   * @param {Array<String>} correctiveEventIDList - the correctiveEventIDs to remove
   * (e.g [urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8, urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7])
   */
  removeCorrectiveEventIDList (correctiveEventIDList) {
    correctiveEventIDList.forEach(correctiveEventID => this.removeCorrectiveEventID(correctiveEventID))
    return this
  }

  /**
   * Set the timeZoneOffset property
   * @param {number|String} value - the time zone offset value
   *    e.g 6 or -2.5 if it is a number
   *    e.g "+06:00" or "-02:30" if it is a String
   */
  setTimeZoneOffset (value) {
    this.timeZoneOffset = new TimeZoneOffset(value)
    return this
  }

  /**
   * Return a JSON object corresponding to the ErrorDeclaration object
   */
  toJSON () {
    const json = {}

    if (this.declarationTime) { json.declarationTime = dateToString(this.declarationTime, this.timeZoneOffset) }

    if (this.reason) { json.reason = this.reason }

    if (this.correctiveEventIDList.length > 0) { json.correctiveEventIDs = this.correctiveEventIDList }

    // todo: support custom fields: "example:vendorExtension": "Test1"

    return json
  }
}
