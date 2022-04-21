/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import { throwIfThereIsAnUnexpectedExtension } from '../../utils/utils';

export default class BizTransactionElement extends Entity {
  /**
   * You can either create an empty BizTransactionElement or provide an already
   * existing one via Object
   * @param {Object} [bizTransactionElement] - The object that will be used to create
   the bizTransaction element
   */
  constructor(bizTransactionElement) {
    super(bizTransactionElement);
    this.addExtension = () => {
      throw new Error('Extensions are not supported in a bizTransaction element');
    };
    this.removeExtension = () => {
      throw new Error('Extensions are not supported in a bizTransaction element');
    };

    if (!bizTransactionElement) {
      // create an empty biz transaction element
      return;
    }

    throwIfThereIsAnUnexpectedExtension(bizTransactionElement);
  }

  /**
   * Set the bizTransaction property
   * @param {string} bizTransaction
   * @return {BizTransactionElement} - the bizTransaction instance
   */
  setBizTransaction(bizTransaction) {
    return this.generateSetterFunction('bizTransaction', bizTransaction, ['string']);
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
    return this.generateSetterFunction('type', type, ['string']);
  }

  /**
   * Getter for the type property
   * @return {string} - the type
   */
  getType() {
    return this.type;
  }
}
