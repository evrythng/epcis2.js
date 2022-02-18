/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */


/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event, { fieldToFunctions } from './Event';

const invalidFields = [
  'epcList',
  'quantityList',
  'action',
  'bizStep',
  'disposition',
  'persistentDisposition',
  'readPoint',
  'bizLocation',
  'ilmd',
  'parentID',
  'bizTransactionList',
  'sourceList',
  'destinationList',
  'sensorElementList',
  'childEPCs',
  'childQuantityList'
];

export default class ExtendedEvent extends Event {
  /**
   * You can either create an empty Aggregation Event or provide an already existing Aggregation
   * event via Object
   * @param {Object} [extendedEvent] - The object that will be used to create the
   * ExtendedEvent entity
   */
  constructor(extendedEvent) {
    super(extendedEvent);
    invalidFields.forEach((name) => {
      const functions = fieldToFunctions[name];
      functions.forEach((func) => {
        this[func] = () => throw new Error(`${name} is not a field of the ExtendedEvent class`);
      });
    });
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {ExtendedEvent} - the extendedEvent instance
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
