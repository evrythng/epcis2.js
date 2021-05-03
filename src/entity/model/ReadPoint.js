export default class ReadPoint {
  /**
   * You can either create an empty ReadPoint or provide an already existing Read point
   * via Map
   * @param {{}} [readPoint] - The Map that will be used to create the ReadPoint entity
   */
  constructor (readPoint) {
    if (!arguments.length) {
      // create an empty ReadPoint object
      return
    }

    for (const prop in readPoint) {
      if (readPoint.hasOwnProperty(prop)) {
        this[prop] = readPoint[prop]
      }
    }
  }

  /**
   * Set the id property
   * @param {string} id
   * @return {ReadPoint} - the readPoint instance
   */
  setId (id) {
    this.id = id
    return this
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {ReadPoint} - the readPoint instance
   */
  addCustomField (key, value) {
    this[key] = value
    return this
  }

  /**
   * @param {string} key
   * @return {ReadPoint} - the readPoint instance
   */
  removeCustomField (key) {
    delete this[key]
    return this
  }

  /**
   * Return a JSON object corresponding to the ReadPoint object
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
