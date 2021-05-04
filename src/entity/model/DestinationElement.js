import Entity from '../Entity'

export default class DestinationElement extends Entity {
  /**
   * Set the destination property
   * @param {string} destination
   * @return {DestinationElement} - the destination instance
   */
  setDestination (destination) {
    this.destination = destination
    return this
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {DestinationElement} - the destination instance
   */
  setType (type) {
    this.type = type
    return this
  }
}
