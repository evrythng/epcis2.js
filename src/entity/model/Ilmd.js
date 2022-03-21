/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';

export default class Ilmd extends Entity {
  /**
   * Set the type property
   * @param {string} type
   * @return {Ilmd} - the ilmd instance
   */
  setType(type) {
    return this.generateSetterFunction('type', type, ['string']);
  }

  /**
   * Getter for the type property
   * @return {string} - the type
   */
  getType() {
    return this.type;
  }

  /**
   * Set the format property
   * @param {string} format
   * @return {Ilmd} - the ilmd instance
   */
  setFormat(format) {
    return this.generateSetterFunction('format', format, ['string']);
  }

  /**
   * Getter for the format property
   * @return {string} - the format
   */
  getFormat() {
    return this.format;
  }
}
