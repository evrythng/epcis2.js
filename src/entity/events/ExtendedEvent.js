/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event, { fieldToFunctions } from './Event';
import { validateAgainstSchema } from '../../schema/validator';

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
  'childQuantityList',
];

export default class ExtendedEvent extends Event {
  /**
   * You can either create an empty Extended Event or provide an already existing Extended
   * event via Object
   * @param {Object} [extendedEvent] - The object that will be used to create the
   * ExtendedEvent entity
   */
  constructor(extendedEvent) {
    super(extendedEvent);
    invalidFields.forEach((name) => {
      const functions = fieldToFunctions[name];
      functions.forEach((func) => {
        this[func] = () => {
          throw new Error(`${name} is not a field of the ExtendedEvent class`);
        };
      });
    });
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {ExtendedEvent} - the extendedEvent instance
   */
  setType(type) {
    return this.generateSetterFunction('type', type, ['string']);
  }

  /**
    * @override
   * Check if the ExtendedEvent respects the rules of the standard defined in
   * src/schema/ExtendedEvent.schema.json
   * @return {boolean} - true if the Event is valid
   * @throws {Error} - if the schema isn't valid
   */
  isValid() {
    const result = validateAgainstSchema(this.toObject(), 'ExtendedEvent');
    if (!result.success) {
      throw new Error(result.errors);
    }
    return result.success;
  }
}
