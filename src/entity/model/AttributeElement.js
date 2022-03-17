/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';

export default class AttributeElement extends Entity {
  /**
   * Set the id property
   * @param {string} id
   * @return {AttributeElement} - the attributeElement instance
   */
  setId(id) {
    return this.generateSetterFunction('id', id, ['string']);
  }

  /**
   * Getter for the id property
   * @return {string} - the id
   */
  getId() {
    return this.id;
  }

  /**
   * Set the attribute property
   * @param {string} attribute
   * @return {AttributeElement} - the attributeElement instance
   */
  setAttribute(attribute) {
    return this.generateSetterFunction('attribute', attribute, ['string']);
  }

  /**
   * Getter for the attribute property
   * @return {string} - the attribute
   */
  getAttribute() {
    return this.attribute;
  }
}
