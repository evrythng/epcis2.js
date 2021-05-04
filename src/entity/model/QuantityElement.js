import Entity from '../Entity'

export default class QuantityElement extends Entity {
  /**
   * Set the epcClass property
   * @param {string} epcClass
   * @return {QuantityElement} - the quantityElement instance
   */
  setEpcClass (epcClass) {
    this.epcClass = epcClass
    return this
  }

  /**
   * Set the uom property
   * @param {string} uom (pattern: "^[A-Z0-9]{2,3}$")
   * @return {QuantityElement} - the quantityElement instance
   */
  setUom (uom) {
    this.uom = uom
    return this
  }

  /**
   * Set the quantity property
   * @param {number} quantity (pattern: "^[A-Z0-9]{2,3}$")
   * @return {QuantityElement} - the quantityElement instance
   */
  setQuantity (quantity) {
    this.quantity = quantity
    return this
  }
}
