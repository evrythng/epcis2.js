export default class SourceElement {
  /**
   * You can either create an empty SourceElement or provide an already existing SourceElement via
   * Map
   * @param {{}} [source] - The Map that will be used to create the SourceElement entity
   */
  constructor (source) {
    if (!arguments.length) {
      // create an empty SourceElement object
      return
    }

    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        this[prop] = source[prop]
      }
    }
  }

  /**
   * Set the source property
   * @param {string} source
   * @return {SourceElement} - the source instance
   */
  setSource (source) {
    this.source = source
    return this
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {SourceElement} - the source instance
   */
  setType (type) {
    this.type = type
    return this
  }

  /**
   * Return a JSON object corresponding to the SourceElement object
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
