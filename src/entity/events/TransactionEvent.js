/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event, { fieldToFunctions } from './Event';

const invalidFields = ['ilmd', 'childEPCs', 'childQuantityList'];

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
    invalidFields.forEach((name) => {
      const functions = fieldToFunctions[name];
      functions.forEach((func) => {
        this[func] = () => throw new Error(`${name} is not a field of the TransactionEvent class`);
      });
    });
  }
}
