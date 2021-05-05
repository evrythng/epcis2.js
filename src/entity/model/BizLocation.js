import Entity from '../Entity'

export default class BizLocation extends Entity {
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
   * Getter for the id property
   * @return {string} - the id
   */
  getId () {
    return this.id
  }
}
