/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event, { fieldToFunctions } from './Event';

const invalidFields = ['ilmd', 'epcList', 'quantityList'];

export default class AggregationEvent extends Event {
  /**
   * You can either create an empty Aggregation Event or provide an already existing Aggregation
   * event via Object
   * @param {Object} [aggregationEvent] - The object that will be used to create the
   * AggregationEvent entity
   */
  constructor(aggregationEvent) {
    super(aggregationEvent);
    this.isA = 'AggregationEvent';
    invalidFields.forEach((name) => {
      const functions = fieldToFunctions[name];
      functions.forEach((func) => {
        this[func] = () => throw new Error(`${name} is not a field of the AggregationEvent class`);
      });
    });
  }
}
