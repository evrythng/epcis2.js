/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

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
    this.type = 'TransactionEvent';
    invalidFields.forEach((name) => {
      const functions = fieldToFunctions[name];
      functions.forEach((func) => {
        this[func] = () => throw new Error(`${name} is not a field of the TransactionEvent class`);
      });
    });
  }
}
