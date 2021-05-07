/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event from './Event';
import QuantityElement from '../model/QuantityElement';

export default class TransformationEvent extends Event {
  /**
   * You can either create an empty Transformation Event or provide an already existing
   * Transformation event via Object
   * @param {Object} [transformationEvent] - The object that will be used to create the
   * TransformationEvent entity
   */
  constructor(transformationEvent) {
    super(transformationEvent);
    this.isA = 'TransformationEvent';

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
          value.forEach((quantityElement) => this
            .addOutputQuantity(new QuantityElement(quantityElement)));
          break;
        case 'inputQuantityList':
          this.clearInputQuantityList();
          value.forEach((quantityElement) => this
            .addInputQuantity(new QuantityElement(quantityElement)));
          break;
        default:
          break;
      }
    });
  }

  /**
   * Set the transformationID property
   * @param {string} id
   * @return {Event} - the event instance
   */
  setTransformationID(id) {
    this.transformationID = id;
    return this;
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
    if (!this.inputEPCList) {
      this.inputEPCList = [];
    }
    this.inputEPCList.push(epc);
    return this;
  }

  /**
   * Add each epc to the "inputEPCList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {TransformationEvent} - the transformation event instance
   */
  addInputEPCList(epcList) {
    if (!this.inputEPCList) {
      this.inputEPCList = [];
    }
    this.inputEPCList = [...this.inputEPCList, ...epcList];
    return this;
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
    if (!this.outputEPCList) {
      this.outputEPCList = [];
    }
    this.outputEPCList.push(epc);
    return this;
  }

  /**
   * Add each epc to the "outputEPCList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {TransformationEvent} - the transformation event instance
   */
  addOutputEPCList(epcList) {
    if (!this.outputEPCList) {
      this.outputEPCList = [];
    }
    this.outputEPCList = [...this.outputEPCList, ...epcList];
    return this;
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
    if (!this.inputQuantityList) {
      this.inputQuantityList = [];
    }
    this.inputQuantityList.push(quantity);
    return this;
  }

  /**
   * Add each quantity to the "inputQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {TransformationEvent} - the transformation event instance
   */
  addInputQuantityList(quantityList) {
    if (!this.inputQuantityList) {
      this.inputQuantityList = [];
    }
    this.inputQuantityList = [...this.inputQuantityList, ...quantityList];
    return this;
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
    if (!this.outputQuantityList) {
      this.outputQuantityList = [];
    }
    this.outputQuantityList.push(quantity);
    return this;
  }

  /**
   * Add each quantity to the "outputQuantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {TransformationEvent} - the transformation event instance
   */
  addOutputQuantityList(quantityList) {
    if (!this.outputQuantityList) {
      this.outputQuantityList = [];
    }
    this.outputQuantityList = [...this.outputQuantityList, ...quantityList];
    return this;
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

  clearEPCList() {
    throw new Error('epcList is not a field of the TransformationEvent class');
  }

  addEPC(epc) {
    throw new Error('epcList is not a field of the TransformationEvent class');
  }

  addEPCList(epcList) {
    throw new Error('epcList is not a field of the TransformationEvent class');
  }

  getEPCList() {
    throw new Error('epcList is not a field of the TransformationEvent class');
  }

  removeEPC(epc) {
    throw new Error('epcList is not a field of the TransformationEvent class');
  }

  removeEPCList(epcList) {
    throw new Error('epcList is not a field of the TransformationEvent class');
  }

  clearQuantityList() {
    throw new Error('quantityList is not a field of the TransformationEvent class');
  }

  addQuantityList(quantityList) {
    throw new Error('quantityList is not a field of the TransformationEvent class');
  }

  addQuantity(quantity) {
    throw new Error('quantityList is not a field of the TransformationEvent class');
  }

  getQuantityList() {
    throw new Error('quantityList is not a field of the TransformationEvent class');
  }

  removeQuantity(quantity) {
    throw new Error('quantityList is not a field of the TransformationEvent class');
  }

  removeQuantityList(quantityList) {
    throw new Error('quantityList is not a field of the TransformationEvent class');
  }

  getParentId() {
    throw new Error('parentID is not a field of the TransformationEvent class');
  }

  setParentId(parentID) {
    throw new Error('parentID is not a field of the TransformationEvent class');
  }

  getAction() {
    throw new Error('action is not a field of the TransformationEvent class');
  }

  setAction(action) {
    throw new Error('action is not a field of the TransformationEvent class');
  }

  clearChildEPCList() {
    throw new Error('childEPCs is not a field of the TransformationEvent class');
  }

  addChildEPC(epc) {
    throw new Error('childEPCs is not a field of the TransformationEvent class');
  }

  addChildEPCList(epcList) {
    throw new Error('childEPCs is not a field of the TransformationEvent class');
  }

  getChildEPCList() {
    throw new Error('childEPCs is not a field of the TransformationEvent class');
  }

  removeChildEPC(epc) {
    throw new Error('childEPCs is not a field of the TransformationEvent class');
  }

  removeChildEPCList(epcList) {
    throw new Error('childEPCs is not a field of the TransformationEvent class');
  }

  clearChildQuantityList() {
    throw new Error('childQuantityList is not a field of the TransformationEvent class');
  }

  addChildQuantityList(quantityList) {
    throw new Error('childQuantityList is not a field of the TransformationEvent class');
  }

  addChildQuantity(quantity) {
    throw new Error('childQuantityList is not a field of the TransformationEvent class');
  }

  getChildQuantityList() {
    throw new Error('childQuantityList is not a field of the TransformationEvent class');
  }

  removeChildQuantity(quantity) {
    throw new Error('childQuantityList is not a field of the TransformationEvent class');
  }

  removeChildQuantityList(quantityList) {
    throw new Error('childQuantityList is not a field of the TransformationEvent class');
  }
}
