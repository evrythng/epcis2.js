import Entity from '../Entity'

export default class SourceElement extends Entity {
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
}
