export default class BizTransaction {
  /**
   * You can either create an empty BizTransaction or provide an already existing BizTransaction via
   * Map
   * @param {{}} [bizTransaction] - The Map that will be used to create the BizTransaction entity
   */
  constructor (bizTransaction) {
    if (!arguments.length) {
      // create an empty BizTransaction object
      return
    }

    for (const prop in bizTransaction) {
      if (bizTransaction.hasOwnProperty(prop)) {
        this[prop] = bizTransaction[prop]
      }
    }
  }

  /**
   * Set the bizTransaction property
   * @param {string} bizTransaction
   * @return {BizTransaction} - the bizTransaction instance
   */
  setBizTransaction (bizTransaction) {
    this.bizTransaction = bizTransaction
    return this
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {BizTransaction} - the bizTransaction instance
   */
  setType (type) {
    this.type = type
    return this
  }

  /**
   * Return a JSON object corresponding to the BizTransaction object
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
