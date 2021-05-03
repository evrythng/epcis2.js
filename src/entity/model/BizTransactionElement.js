export default class BizTransactionElement {
  /**
   * You can either create an empty BizTransactionElement or provide an already existing BizTransactionElement via
   * Map
   * @param {{}} [bizTransaction] - The Map that will be used to create the BizTransactionElement entity
   */
  constructor (bizTransaction) {
    if (!arguments.length) {
      // create an empty BizTransactionElement object
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
   * @return {BizTransactionElement} - the bizTransaction instance
   */
  setBizTransaction (bizTransaction) {
    this.bizTransaction = bizTransaction
    return this
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {BizTransactionElement} - the bizTransaction instance
   */
  setType (type) {
    this.type = type
    return this
  }

  /**
   * Return a JSON object corresponding to the BizTransactionElement object
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
