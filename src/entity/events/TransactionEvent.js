/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event from './Event';

export default class TransactionEvent extends Event {
  /**
   * You can either create an empty Transaction Event or provide an already existing Transaction
   * event via Object
   * @param {Object} [transactionEvent] - The object that will be used to create the
   * TransactionEvent entity
   */
  constructor(transactionEvent) {
    super(transactionEvent);
    this.isA = 'TransactionEvent';
  }

  getIlmd() {
    throw new Error('ilmd is not a field of the TransactionEvent class');
  }

  setIlmd(ilmd) {
    throw new Error('ilmd is not a field of the TransactionEvent class');
  }

  clearChildEPCList() {
    throw new Error('childEPCs is not a field of the TransactionEvent class');
  }

  addChildEPC(epc) {
    throw new Error('childEPCs is not a field of the TransactionEvent class');
  }

  addChildEPCList(epcList) {
    throw new Error('childEPCs is not a field of the TransactionEvent class');
  }

  getChildEPCList() {
    throw new Error('childEPCs is not a field of the TransactionEvent class');
  }

  removeChildEPC(epc) {
    throw new Error('childEPCs is not a field of the TransactionEvent class');
  }

  removeChildEPCList(epcList) {
    throw new Error('childEPCs is not a field of the TransactionEvent class');
  }

  clearChildQuantityList() {
    throw new Error('childQuantityList is not a field of the TransactionEvent class');
  }

  addChildQuantityList(quantityList) {
    throw new Error('childQuantityList is not a field of the TransactionEvent class');
  }

  addChildQuantity(quantity) {
    throw new Error('childQuantityList is not a field of the TransactionEvent class');
  }

  getChildQuantityList() {
    throw new Error('childQuantityList is not a field of the TransactionEvent class');
  }

  removeChildQuantity(quantity) {
    throw new Error('childQuantityList is not a field of the TransactionEvent class');
  }

  removeChildQuantityList(quantityList) {
    throw new Error('childQuantityList is not a field of the TransactionEvent class');
  }
}
