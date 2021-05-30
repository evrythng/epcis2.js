/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';

export default class BizTransactionElement extends Entity {
  /**
   * Set the bizTransaction property
   * @param {string} bizTransaction
   * @return {BizTransactionElement} - the bizTransaction instance
   */
  setBizTransaction(bizTransaction) {
    this.bizTransaction = bizTransaction;
    return this;
  }

  /**
   * Getter for the type property
   * @return {string} - the bizTransaction
   */
  getBizTransaction() {
    return this.bizTransaction;
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {BizTransactionElement} - the bizTransaction instance
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
