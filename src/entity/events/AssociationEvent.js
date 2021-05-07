/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event from './Event';

export default class AssociationEvent extends Event {
  /**
   * You can either create an empty Association Event or provide an already existing Association
   * event via Object
   * @param {Object} [associationEvent] - The object that will be used to create the
   * AssociationEvent entity
   */
  constructor(associationEvent) {
    super(associationEvent);
    this.isA = 'AssociationEvent';
  }

  getIlmd() {
    throw new Error('ilmd is not a field of the AssociationEvent class');
  }

  setIlmd(ilmd) {
    throw new Error('ilmd is not a field of the AssociationEvent class');
  }

  clearEPCList() {
    throw new Error('epcList is not a field of the AssociationEvent class');
  }

  addEPC(epc) {
    throw new Error('epcList is not a field of the AssociationEvent class');
  }

  addEPCList(epcList) {
    throw new Error('epcList is not a field of the AssociationEvent class');
  }

  getEPCList() {
    throw new Error('epcList is not a field of the AssociationEvent class');
  }

  removeEPC(epc) {
    throw new Error('epcList is not a field of the AssociationEvent class');
  }

  removeEPCList(epcList) {
    throw new Error('epcList is not a field of the AssociationEvent class');
  }

  clearQuantityList() {
    throw new Error('quantityList is not a field of the AssociationEvent class');
  }

  addQuantityList(quantityList) {
    throw new Error('quantityList is not a field of the AssociationEvent class');
  }

  addQuantity(quantity) {
    throw new Error('quantityList is not a field of the AssociationEvent class');
  }

  getQuantityList() {
    throw new Error('quantityList is not a field of the AssociationEvent class');
  }

  removeQuantity(quantity) {
    throw new Error('quantityList is not a field of the AssociationEvent class');
  }

  removeQuantityList(quantityList) {
    throw new Error('quantityList is not a field of the AssociationEvent class');
  }
}
