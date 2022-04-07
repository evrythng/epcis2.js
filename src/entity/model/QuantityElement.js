/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';

export default class QuantityElement extends Entity {
  /**
   * You can either create an empty QuantityElement or provide an already existing one via Object
   * @param {Object} [quantityElement] - The object that will be used to create the quantity element
   */
  constructor(quantityElement) {
    super(quantityElement);
    this.addExtension = () => {
      throw new Error('Extensions are not supported in a quantity element');
    };
    this.removeExtension = () => {
      throw new Error('Extensions are not supported in a quantity element');
    };
  }

  /**
   * Set the epcClass property
   * @param {string} epcClass
   * @return {QuantityElement} - the quantityElement instance
   */
  setEpcClass(epcClass) {
    return this.generateSetterFunction('epcClass', epcClass, ['string']);
  }

  /**
   * Getter for the epcClass property
   * @return {string} - the epcClass
   */
  getEpcClass() {
    return this.epcClass;
  }

  /**
   * Set the uom property
   * @param {string} uom (pattern: "^[A-Z0-9]{2,3}$")
   * @return {QuantityElement} - the quantityElement instance
   */
  setUom(uom) {
    return this.generateSetterFunction('uom', uom, ['string']);
  }

  /**
   * Getter for the uom property
   * @return {string} - the uom
   */
  getUom() {
    return this.uom;
  }

  /**
   * Set the quantity property
   * @param {number} quantity (pattern: "^[A-Z0-9]{2,3}$")
   * @return {QuantityElement} - the quantityElement instance
   */
  setQuantity(quantity) {
    return this.generateSetterFunction('quantity', quantity, ['number']);
  }

  /**
   * Getter for the quantity property
   * @return {number} - the quantity
   */
  getQuantity() {
    return this.quantity;
  }
}
