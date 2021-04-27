import { getDateFromStringOrDate } from '../utils/utils';

export default class ObjectEvent {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via
   * JSON
   * @param {JSON} [JSONObjectEvent] - The JSON object event that will be used to create the
   * ObjectEvent entity
   */
  constructor (JSONObjectEvent) {

    if (!arguments.length) {
      // create an empty ObjectEvent

      // general object fields
      this.eventTime = "";
      this.recordTime = "";
      this.eventTimeZoneOffset = "";
      this.eventID = "";
      this.errorDeclaration = "";

      // object event
      this.epcList = [];



    } else {
      // create an ObjectEvent from the JSON passed in parameters
      // todo: create from JSON
    }

    this.isA = 'ObjectEvent';

  }

  /**
   *
   * @param {String|Date} time
   */
  setEventTime(time) {
    this.eventTime = getDateFromStringOrDate(time);
  }

  /**
   * Add the epc to the "epcList" field
   * @param {String} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   */
  addEPC(epc) {
    this.epcList.push(epc);
  }

  /**
   * Remove an epc to the "epcList" field
   * @param {String} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   */
  removeEPC(epc) {
    //todo:
  }



}
