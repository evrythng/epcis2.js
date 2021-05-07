/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event from './Event';

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
  }

  getIlmd() {
    throw new Error('ilmd is not a field of the AggregationEvent class');
  }

  setIlmd(ilmd) {
    throw new Error('ilmd is not a field of the AggregationEvent class');
  }

  clearEPCList() {
    throw new Error('epcList is not a field of the AggregationEvent class');
  }

  addEPC(epc) {
    throw new Error('epcList is not a field of the AggregationEvent class');
  }

  addEPCList(epcList) {
    throw new Error('epcList is not a field of the AggregationEvent class');
  }

  getEPCList() {
    throw new Error('epcList is not a field of the AggregationEvent class');
  }

  removeEPC(epc) {
    throw new Error('epcList is not a field of the AggregationEvent class');
  }

  removeEPCList(epcList) {
    throw new Error('epcList is not a field of the AggregationEvent class');
  }

  clearQuantityList() {
    throw new Error('quantityList is not a field of the AggregationEvent class');
  }

  addQuantityList(quantityList) {
    throw new Error('quantityList is not a field of the AggregationEvent class');
  }

  addQuantity(quantity) {
    throw new Error('quantityList is not a field of the AggregationEvent class');
  }

  getQuantityList() {
    throw new Error('quantityList is not a field of the AggregationEvent class');
  }

  removeQuantity(quantity) {
    throw new Error('quantityList is not a field of the AggregationEvent class');
  }

  removeQuantityList(quantityList) {
    throw new Error('quantityList is not a field of the AggregationEvent class');
  }
}
