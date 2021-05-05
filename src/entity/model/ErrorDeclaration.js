/**
 * This class contains these fields :
 * - {Array<string>} correctiveEventIDList - the list of correctiveEventIDs
 *   default: null
 * - {Date} declarationTime - the declaration Time
 *    default: null
 *    When you set it, if no time zone offset is given, the time zone of the device will be taken
 *    for the timeZoneOffset field
 * - {string} reason - the reason
 *   default: null
 * - {TimeZoneOffset} timeZoneOffset - the offset of the declaration Time
 *   default: null (will be set once the declarationTime is set)
 */
import Entity from '../Entity'

export default class ErrorDeclaration extends Entity {
  /**
   * Set the declarationTime property
   * @param {string} time - a string corresponding to the time
   * @return {ErrorDeclaration} - the errorDeclaration instance
   */
  setDeclarationTime (time) {
    this.declarationTime = time
    return this
  }

  /**
   * Getter for the declarationTime property
   * @return {string} - the declarationTime
   */
  getDeclarationTime () {
    return this.declarationTime
  }

  /**
   * Set the reason property
   * @param {string} reason - the reason (e.g 'urn:epcglobal:cbv:er:incorrect_data')
   * @return {ErrorDeclaration} - the errorDeclaration instance
   */
  setReason (reason) {
    this.reason = reason
    return this
  }

  /**
   * Getter for the reason property
   * @return {string} - the reason
   */
  getReason () {
    return this.reason
  }

  /**
   * Add the correctiveEventID to the "correctiveEventIDs" field
   * @param {string} correctiveEventID - the correctiveEventID to add (e.g urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8)
   * @return {ErrorDeclaration} - the errorDeclaration instance
   */
  addCorrectiveEventID (correctiveEventID) {
    if (!this.correctiveEventIDs) { this.correctiveEventIDs = [] }
    this.correctiveEventIDs.push(correctiveEventID)
    return this
  }

  /**
   * Add each correctiveEventID to the "correctiveEventIDs" field
   * @param {Array<string>} correctiveEventIDList - the correctiveEventIDs to add
   * (e.g [urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8, urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7])
   * @return {ErrorDeclaration} - the errorDeclaration instance
   */
  addCorrectiveEventIDList (correctiveEventIDList) {
    if (!this.correctiveEventIDs) { this.correctiveEventIDs = [] }
    correctiveEventIDList.forEach(correctiveEventID => this.addCorrectiveEventID(correctiveEventID))
    return this
  }

  /**
   * Clear the correctiveEventID list
   * @return {ErrorDeclaration} - the errorDeclaration instance
   */
  clearCorrectiveEventIDList () {
    delete this.correctiveEventIDs
    return this
  }

  /**
   * Remove a correctiveEventID from the "correctiveEventIDs" field
   * @param {string} correctiveEventID - the correctiveEventID to remove (e.g urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8)
   * @return {ErrorDeclaration} - the errorDeclaration instance
   */
  removeCorrectiveEventID (correctiveEventID) {
    if (!this.correctiveEventIDs) { this.correctiveEventIDs = [] }
    this.correctiveEventIDs = this.correctiveEventIDs.filter(elem => elem !== correctiveEventID)
    return this
  }

  /**
   * Remove each correctiveEventID from the "correctiveEventIDs" field
   * @param {Array<string>} correctiveEventIDList - the correctiveEventIDs to remove
   * (e.g [urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8, urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a7])
   * @return {ErrorDeclaration} - the errorDeclaration instance
   */
  removeCorrectiveEventIDList (correctiveEventIDList) {
    if (!this.correctiveEventIDs) { this.correctiveEventIDs = [] }
    correctiveEventIDList.forEach(correctiveEventID => this.removeCorrectiveEventID(correctiveEventID))
    return this
  }

  /**
   * Getter for the correctiveEventIDs property
   * @return {Array<string>} - the correctiveEventIDs
   */
  getCorrectiveEventIDs () {
    return this.correctiveEventIDs
  }
}
