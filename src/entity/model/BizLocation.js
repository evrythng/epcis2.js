export default class BizLocation {
  /**
   * You can either create an empty BizLocation or provide an already existing BizLocation
   * via Map
   * @param {{}} [bizLocation] - The Map that will be used to create the BizLocation entity
   */
  constructor (bizLocation) {
    if (!arguments.length) {
      // create an empty BizLocation object
      return
    }

    for (const prop in bizLocation) {
      if (bizLocation.hasOwnProperty(prop)) {
        this[prop] = bizLocation[prop]
      }
    }
  }

  /**
   * Set the id property
   * @param {string} id
   * @return {BizLocation} - the bizLocation instance
   */
  setId (id) {
    this.id = id
    return this
  }

  /**
   * Return a JSON object corresponding to the BizLocation object
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
