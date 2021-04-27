export default class ObjectEvent {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via
   * JSON
   * @param {JSON} [JSONObjectEvent] - The JSON object event that will be used to create the
   * ObjectEvent entity
   */
  constructor (JSONObjectEvent) {
    this.isA = 'ObjectEvent'

    if (!arguments.length) {
      // create an empty ObjectEvent
    } else {
      // create an ObjectEvent from the JSON passed in parameters
      // todo:
    }
  }
}
