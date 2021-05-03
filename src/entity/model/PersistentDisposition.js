export default class PersistentDisposition {
  /**
   * You can either create an empty PersistentDisposition or provide an already existing
   * PersistentDisposition via Map
   * @param {{}} [persistentDisposition] - The Map that will be used to create the
   * PersistentDisposition entity
   */
  constructor (persistentDisposition) {
    if (!arguments.length) {
      // create an empty ErrorDeclaration object

      return
    }

    for (const prop in persistentDisposition) {
      if (persistentDisposition.hasOwnProperty(prop)) {
        this[prop] = persistentDisposition[prop]
      }
    }
  }

  /**
   * Add the set to the "set" field
   * @param {string} set - the set to add
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  addSet (set) {
    if (!this.set) { this.set = [] }
    this.set.push(set)
    return this
  }

  /**
   * Add each set to the "set" field
   * @param {Array<string>} setList - the sets to add
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  addSetList (setList) {
    if (!this.set) { this.set = [] }
    setList.forEach(set => this.addSet(set))
    return this
  }

  /**
   * Clear the set list
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  clearSetList () {
    delete this.set
    return this
  }

  /**
   * Remove a set from the "set" field
   * @param {string} set - the set to remove
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  removeSet (set) {
    if (!this.set) { this.set = [] }
    this.set = this.set.filter(elem => elem !== set)
    return this
  }

  /**
   * Remove each set from the "set" field
   * @param {Array<string>} setList - the sets to remove
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  removeSetList (setList) {
    if (!this.set) { this.set = [] }
    setList.forEach(set => this.removeSet(set))
    return this
  }

  /**
   * Add the unset to the "unset" field
   * @param {string} unset - the unset to add
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  addUnset (unset) {
    if (!this.unset) { this.unset = [] }
    this.unset.push(unset)
    return this
  }

  /**
   * Add each unset to the "unset" field
   * @param {Array<string>} unsetList - the unsets to add
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  addUnsetList (unsetList) {
    if (!this.unset) { this.unset = [] }
    unsetList.forEach(unset => this.addUnset(unset))
    return this
  }

  /**
   * Clear the unset list
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  clearUnsetList () {
    delete this.unset
    return this
  }

  /**
   * Remove an unset from the "unset" field
   * @param {string} unset - the unset to remove
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  removeUnset (unset) {
    if (!this.unset) { this.unset = [] }
    this.unset = this.unset.filter(elem => elem !== unset)
    return this
  }

  /**
   * Remove each unset from the "unset" field
   * @param {Array<string>} unsetList - the unsets to remove
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  removeUnsetList (unsetList) {
    if (!this.unset) { this.unset = [] }
    unsetList.forEach(unset => this.removeUnset(unset))
    return this
  }

  /**
   * @return {{}} - a JSON object corresponding to the PersistentDisposition object
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
