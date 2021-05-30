/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';

export default class SourceElement extends Entity {
  /**
   * Set the source property
   * @param {string} source
   * @return {SourceElement} - the source instance
   */
  setSource(source) {
    this.source = source;
    return this;
  }

  /**
   * Getter for the source property
   * @return {string} - the source
   */
  getSource() {
    return this.source;
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {SourceElement} - the source instance
   */
  setType(type) {
    this.type = type;
    return this;
  }

  /**
   * Getter for the type property
   * @return {string} - the type
   */
  getType() {
    return this.type;
  }
}
