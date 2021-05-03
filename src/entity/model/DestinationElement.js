export default class DestinationElement {
  /**
   * You can either create an empty DestinationElement or provide an already existing
   * DestinationElement via Map
   * @param {{}} [destination] - The Map that will be used to create the DestinationElement entity
   */
  constructor (destination) {
    if (!arguments.length) {
      // create an empty DestinationElement object
      return
    }

    for (const prop in destination) {
      if (destination.hasOwnProperty(prop)) {
        this[prop] = destination[prop]
      }
    }
  }

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

  /**
   * @param {string} key
   * @param {string} value
   * @return {DestinationElement} - the destination instance
   */
  addCustomField (key, value) {
    this[key] = value
    return this
  }

  /**
   * @param {string} key
   * @return {DestinationElement} - the destination instance
   */
  removeCustomField (key) {
    delete this[key]
    return this
  }

  /**
   * Return a JSON object corresponding to the DestinationElement object
   */
  toJSON () {
    const json = {}

    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        json[prop] = this[prop]
      }
    }

    return json
  }
}
