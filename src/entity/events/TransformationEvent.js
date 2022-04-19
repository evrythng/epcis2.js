/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event, { fieldToFunctions } from './Event';
import QuantityElement from '../model/QuantityElement';

const invalidFields = [
  'childQuantityList',
  'childEPCs',
  'childQuantityList',
  'action',
  'parentID',
  'quantityList',
  'epcList',
];

export default class TransformationEvent extends Event {
  /**
   * You can either create an empty Transformation Event or provide an already existing
   * Transformation event via Object
   * @param {Object} [transformationEvent] - The object that will be used to create the
   * TransformationEvent entity
   */
  constructor(transformationEvent) {
    super(transformationEvent);
    this.type = 'TransformationEvent';

    invalidFields.forEach((name) => {
      const functions = fieldToFunctions[name];
      functions.forEach((func) => {
        this[func] = () => {
          throw new Error(`${name} is not a field of the TransformationEvent class`);
        };
      });
    });

    if (!transformationEvent) {
      // create an empty TransformationEvent object
      return;
    }

    // Create classes for sub-objects that are provided
    Object.entries(transformationEvent).forEach(([key, value]) => {
      switch (key) {
        case 'outputEPCList':
          this.clearOutputEPCList();
          value.forEach((epc) => this.addOutputEPC(epc));
          break;
        case 'inputEPCList':
          this.clearInputEPCList();
          value.forEach((epc) => this.addInputEPC(epc));
          break;
        case 'outputQuantityList':
          this.clearOutputQuantityList();
          value.forEach(
            (quantityElement) => this.addOutputQuantity(new QuantityElement(quantityElement)),
          );
          break;
        case 'inputQuantityList':
          this.clearInputQuantityList();
          value.forEach(
            (quantityElement) => this.addInputQuantity(new QuantityElement(quantityElement)),
          );
          break;
        // no default
      }
    });
  }

  /**
   * Set the transformationID property
   * @param {string} id
   * @return {Event} - the event instance
   */
  setTransformationID(id) {
    return this.generateSetterFunction('transformationID', id, ['string']);
  }

  /**
   * Getter for the transformationID property
   * @return {string} - the transformationID
   */
  getTransformationID() {
    return this.transformationID;
  }

  /**
   * Add the epc to the "inputEPCList" field
   * @param {string} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {TransformationEvent} - the transformation event instance
   */
  addInputEPC(epc) {
    return this.generateAddItemToListFunction('inputEPCList', epc, ['string']);
  }

  /**
   * Add each epc to the "inputEPCList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {TransformationEvent} - the transformation event instance
   */
  addInputEPCList(epcList) {
    return this.generateAddItemsToListFunction('inputEPCList', epcList, ['string']);
  }

  /**
   * Clear the inputEPCList list
   * @return {TransformationEvent} - the transformation event instance
   */
  clearInputEPCList() {
    delete this.inputEPCList;
    return this;
  }

  /**
   * Remove an epc from the "inputEPCList" field
   * @param {string} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {TransformationEvent} - the transformation event instance
   */
  removeInputEPC(epc) {
    this.inputEPCList = this.inputEPCList.filter((elem) => elem !== epc);
    if (!this.inputEPCList?.length) {
      this.clearInputEPCList();
    }
    return this;
  }

  /**
   * Remove each epc from the "inputEPCList" field
   * @param {Array<string>} epcList - the epcs to remove
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {TransformationEvent} - the transformation event instance
   */
  removeInputEPCList(epcList) {
    epcList.forEach((epc) => this.removeInputEPC(epc));
    return this;
  }

  /**
   * Getter for the inputEPCList property
   * @return {Array<string>} - the epcList
   */
  getInputEPCList() {
    return this.inputEPCList;
  }

  /**
   * Add the epc to the "inputEPCList" field
   * @param {string} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {TransformationEvent} - the transformation event instance
   */
  addOutputEPC(epc) {
    return this.generateAddItemToListFunction('outputEPCList', epc, ['string']);
  }

  /**
   * Add each epc to the "outputEPCList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {TransformationEvent} - the transformation event instance
   */
  addOutputEPCList(epcList) {
    return this.generateAddItemsToListFunction('outputEPCList', epcList, ['string']);
  }

  /**
   * Clear the outputEPCList list
   * @return {TransformationEvent} - the transformation event instance
   */
  clearOutputEPCList() {
    delete this.outputEPCList;
    return this;
  }

  /**
   * Remove an epc from the "outputEPCList" field
   * @param {string} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {TransformationEvent} - the transformation event instance
   */
  removeOutputEPC(epc) {
    this.outputEPCList = this.outputEPCList.filter((elem) => elem !== epc);
    if (!this.outputEPCList?.length) {
      this.clearOutputEPCList();
    }
    return this;
  }

  /**
   * Remove each epc from the "outputEPCList" field
   * @param {Array<string>} epcList - the epcs to remove
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {TransformationEvent} - the transformation event instance
   */
  removeOutputEPCList(epcList) {
    epcList.forEach((epc) => this.removeOutputEPC(epc));
    return this;
  }

  /**
   * Getter for the outputEPCList property
   * @return {Array<string>} - the epcList
   */
  getOutputEPCList() {
    return this.outputEPCList;
  }

  /**
   * Add the quantity to the "inputQuantityList" field
   * @param {QuantityElement} quantity - the quantity to add
   * @return {TransformationEvent} - the transformation event instance
   */
  addInputQuantity(quantity) {
    return this.generateAddItemToListFunction('inputQuantityList', quantity, [QuantityElement]);
  }

  /**
   * Add each quantity to the "inputQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {TransformationEvent} - the transformation event instance
   */
  addInputQuantityList(quantityList) {
    return this.generateAddItemsToListFunction('inputQuantityList', quantityList, [QuantityElement]);
  }

  /**
   * Clear the inputQuantityList
   * @return {TransformationEvent} - the transformation event instance
   */
  clearInputQuantityList() {
    delete this.inputQuantityList;
    return this;
  }

  /**
   * Remove a quantity from the "inputQuantityList" field
   * @param {QuantityElement} quantity - the quantity to remove
   * @return {TransformationEvent} - the transformation event instance
   */
  removeInputQuantity(quantity) {
    this.inputQuantityList = this.inputQuantityList.filter((elem) => elem !== quantity);
    if (!this.inputQuantityList?.length) {
      this.clearInputQuantityList();
    }
    return this;
  }

  /**
   * Remove each quantity from the "inputQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {TransformationEvent} - the transformation event instance
   */
  removeInputQuantityList(quantityList) {
    quantityList.forEach((quantity) => this.removeInputQuantity(quantity));
    return this;
  }

  /**
   * Getter for the inputQuantityList property
   * @return {TransformationEvent} - the transformation event instance
   */
  getInputQuantityList() {
    return this.inputQuantityList;
  }

  /**
   * Add the quantity to the "outputQuantityList" field
   * @param {QuantityElement} quantity - the quantity to add
   * @return {TransformationEvent} - the transformation event instance
   */
  addOutputQuantity(quantity) {
    return this.generateAddItemToListFunction('outputQuantityList', quantity, [QuantityElement]);
  }

  /**
   * Add each quantity to the "outputQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {TransformationEvent} - the transformation event instance
   */
  addOutputQuantityList(quantityList) {
    return this.generateAddItemsToListFunction('outputQuantityList', quantityList, [QuantityElement]);
  }

  /**
   * Clear the outputQuantityList
   * @return {TransformationEvent} - the transformation event instance
   */
  clearOutputQuantityList() {
    delete this.outputQuantityList;
    return this;
  }

  /**
   * Remove a quantity from the "outputQuantityList" field
   * @param {QuantityElement} quantity - the quantity to remove
   * @return {TransformationEvent} - the transformation event instance
   */
  removeOutputQuantity(quantity) {
    this.outputQuantityList = this.outputQuantityList.filter((elem) => elem !== quantity);
    if (!this.outputQuantityList?.length) {
      this.clearOutputQuantityList();
    }
    return this;
  }

  /**
   * Remove each quantity from the "outputQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {TransformationEvent} - the transformation event instance
   */
  removeOutputQuantityList(quantityList) {
    quantityList.forEach((quantity) => this.removeOutputQuantity(quantity));
    return this;
  }

  /**
   * Getter for the outputQuantityList property
   * @return {TransformationEvent} - the transformation event instance
   */
  getOutputQuantityList() {
    return this.outputQuantityList;
  }
}
