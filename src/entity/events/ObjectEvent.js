/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event from './Event';

export default class ObjectEvent extends Event {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via
   * Object
   * @param {Object} [objectEvent] - The object that will be used to create the ObjectEvent entity
   */
  constructor(objectEvent) {
    super(objectEvent);
    this.isA = 'ObjectEvent';
  }

  getParentId() {
    throw new Error('parentID is not a field of the ObjectEvent class');
  }

  setParentId(parentID) {
    throw new Error('parentID is not a field of the ObjectEvent class');
  }

  clearChildEPCList() {
    throw new Error('childEPCs is not a field of the ObjectEvent class');
  }

  addChildEPC(epc) {
    throw new Error('childEPCs is not a field of the ObjectEvent class');
  }

  addChildEPCList(epcList) {
    throw new Error('childEPCs is not a field of the ObjectEvent class');
  }

  getChildEPCList() {
    throw new Error('childEPCs is not a field of the ObjectEvent class');
  }

  removeChildEPC(epc) {
    throw new Error('childEPCs is not a field of the ObjectEvent class');
  }

  removeChildEPCList(epcList) {
    throw new Error('childEPCs is not a field of the ObjectEvent class');
  }

  clearChildQuantityList() {
    throw new Error('childQuantityList is not a field of the ObjectEvent class');
  }

  addChildQuantityList(quantityList) {
    throw new Error('childQuantityList is not a field of the ObjectEvent class');
  }

  addChildQuantity(quantity) {
    throw new Error('childQuantityList is not a field of the ObjectEvent class');
  }

  getChildQuantityList() {
    throw new Error('childQuantityList is not a field of the ObjectEvent class');
  }

  removeChildQuantity(quantity) {
    throw new Error('childQuantityList is not a field of the ObjectEvent class');
  }

  removeChildQuantityList(quantityList) {
    throw new Error('childQuantityList is not a field of the ObjectEvent class');
  }
}
