import { getTheTimeZoneOffsetFromDateString, getTimeZoneOffsetFromStringOrNumber } from '../../utils/utils';
import settings from '../../settings';
import ErrorDeclaration from '../model/ErrorDeclaration';
import Entity from '../Entity';

/**
 * Abstract class Event
 *
 * @class Event
 */
export default class Event extends Entity {
  /**
   * You can either create an empty Event or provide an already existing event via Map
   * @param {Object} [event] - The Map that will be used to create the Event entity
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
      if (key === 'errorDeclaration') this.setErrorDeclaration(new ErrorDeclaration(value));
    });
  }

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
}
