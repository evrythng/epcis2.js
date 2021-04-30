import { getTheTimeZoneOffsetFromDateString, getTimeZoneOffsetFromStringOrNumber } from '../../utils/utils';

/**
 * Abstract class Event
 *
 * @class Event
 */
export default class Event {
  constructor() {
    if (new.target === Event){
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * Set the eventTime property
   * @param {string} id
   * @return {Event} - the event instance
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
   * @return {Event} - the event instance
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
   * @return {Event} - the event instance
   */
  setEventTimeZoneOffset(offset) {
    this.eventTimeZoneOffset = getTimeZoneOffsetFromStringOrNumber(offset);
    return this;
  }

  /**
   * Set the recordTime property
   * @param {string} time - a string corresponding to the time
   * @return {Event} - the event instance
   */
  setRecordTime (time) {
    this.recordTime = time
    return this
  }

  /**
   * Set the errorDeclaration property
   * @param {ErrorDeclaration} errorDeclaration
   * @return {Event} - the event instance
   */
  setErrorDeclaration (errorDeclaration) {
    this.errorDeclaration = errorDeclaration
    return this
  }
}
