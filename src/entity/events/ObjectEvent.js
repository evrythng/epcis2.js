/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event, { fieldToFunctions } from './Event';

const invalidFields = ['parentID', 'childEPCs', 'childQuantityList'];

export default class ObjectEvent extends Event {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via
   * Object
   * @param {Object} [objectEvent] - The object that will be used to create the ObjectEvent entity
   */
  constructor(objectEvent) {
    super(objectEvent);
    this.isA = 'ObjectEvent';

    invalidFields.forEach((name) => {
      const functions = fieldToFunctions[name];
      functions.forEach((func) => {
        this[func] = () => throw new Error(`${name} is not a field of the ObjectEvent class`);
      });
    });
  }
}
