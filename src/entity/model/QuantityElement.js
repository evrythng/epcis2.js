export default class QuantityElement {
  /**
   * You can either create an empty QuantityElement or provide an already existing Quantity
   * Element via Map
   * @param {{}} [quantityElement] - The Map that will be used to create the QuantityElement entity
   */
  constructor(quantityElement) {
    if (!arguments.length) {
      // create an empty QuantityElement object
      return;
    }

    for (const prop in quantityElement) {
      if (quantityElement.hasOwnProperty(prop)) {
        this[prop] = quantityElement[prop];
      }
    }

  }

  /**
   * Set the epcClass property
   * @param {string} epcClass
   * @return {QuantityElement} - the quantityElement instance
   */
  setEpcClass(epcClass) {
    this.epcClass = epcClass;
    return this;
  }

  /**
   * Set the uom property
   * @param {string} uom (pattern: "^[A-Z0-9]{2,3}$")
   * @return {QuantityElement} - the quantityElement instance
   */
  setUom(uom) {
    this.uom = uom;
    return this;
  }

  /**
   * Set the quantity property
   * @param {number} quantity (pattern: "^[A-Z0-9]{2,3}$")
   * @return {QuantityElement} - the quantityElement instance
   */
  setQuantity(quantity) {
    this.quantity = quantity;
    return this;
  }

  /**
   * Return a JSON object corresponding to the QuantityElement object
   */
  toJSON() {
    let json = {};

    for (let prop in this) {
      if (this.hasOwnProperty(prop)) {
        json[prop] = this[prop];
      }
    }

    return json;
  }
}
