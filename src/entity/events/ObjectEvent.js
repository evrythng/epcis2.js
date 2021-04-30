import ErrorDeclaration from '../model/ErrorDeclaration'
import Event from './Event'

export default class ObjectEvent extends Event {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via Map
   * @param {{}} [objectEvent] - The Map that will be used to create the ObjectEvent entity
   */
  constructor (objectEvent) {
    super()
    // object event
    this.isA = 'ObjectEvent'
    this.epcList = []
    this.quantityList = []

    // todo: if timezone offset in setup, save here

    if (!arguments.length) {
      return
    }

    for (const prop in objectEvent) {
      if (objectEvent.hasOwnProperty(prop)) {
        switch (prop) {
          case 'errorDeclaration':
            this.setErrorDeclaration(objectEvent[prop])
            break
          case 'epcList':
            this.addEPCList(objectEvent[prop])
            break
          case 'quantityList':
            this.addQuantityList(objectEvent[prop])
            break
          default:
            this[prop] = objectEvent[prop]
        }
      }
    }
  }

  /**
   * Add the epc to the "epcList" field
   * @param {string} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {ObjectEvent} - the objectEvent instance
   */
  addEPC (epc) {
    this.epcList.push(epc)
    return this
  }

  /**
   * Add each epc to the "epcList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {ObjectEvent} - the objectEvent instance
   */
  addEPCList (epcList) {
    epcList.forEach(epc => this.addEPC(epc))
    return this
  }

  /**
   * Clear the epc list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearEPCList () {
    this.epcList = []
    return this
  }

  /**
   * Remove an epc from the "epcList" field
   * @param {string} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeEPC (epc) {
    this.epcList = this.epcList.filter(elem => elem !== epc)
    return this
  }

  /**
   * Remove each epc from the "epcList" field
   * @param {Array<string>} epcList - the epcs to remove
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeEPCList (epcList) {
    epcList.forEach(epc => this.removeEPC(epc))
    return this
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {ObjectEvent} - the objectEvent instance
   */
  addCustomField (key, value) {
    this[key] = value
    return this
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeCustomField (key, value) {
    delete this[key]
    return this
  }

  /**
   * Add the quantity to the "quantityList" field
   * @param {QuantityElement} quantity - the quantity to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addQuantity (quantity) {
    this.quantityList.push(quantity)
    return this
  }

  /**
   * Add each quantity to the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addQuantityList (quantityList) {
    quantityList.forEach(quantity => this.addQuantity(quantity))
    return this
  }

  /**
   * Clear the quantity list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearQuantityList () {
    this.quantityList = []
    return this
  }

  /**
   * Remove a quantity from the "quantityList" field
   * @param {QuantityElement} quantity - the quantity to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeQuantity (quantity) {
    this.quantityList = this.quantityList.filter(elem => elem !== quantity)
    return this
  }

  /**
   * Remove each quantity from the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeQuantityList (quantityList) {
    quantityList.forEach(quantity => this.removeQuantity(quantity))
    return this
  }

  /**
   * Return a JSON object corresponding to the ObjectEvent object
   */
  toJSON () {
    const json = {}

    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (this[prop] instanceof ErrorDeclaration) {
          json[prop] = this[prop].toJSON()
        } else {
          json[prop] = this[prop]
        }
      }
    }

    return json
  }
}
