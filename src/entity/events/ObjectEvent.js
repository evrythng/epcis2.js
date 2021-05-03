import ErrorDeclaration from '../model/ErrorDeclaration'
import Event from './Event'
import PersistentDisposition from '../model/PersistentDisposition'
import QuantityElement from '../model/QuantityElement'
import ReadPoint from '../model/ReadPoint'
import BizLocation from '../model/BizLocation'
import BizTransactionElement from '../model/BizTransactionElement'
import SourceElement from '../model/SourceElement';

export default class ObjectEvent extends Event {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via Map
   * @param {{}} [objectEvent] - The Map that will be used to create the ObjectEvent entity
   */
  constructor (objectEvent) {
    super(objectEvent)
    this.isA = 'ObjectEvent'

    if (!arguments.length) {
      return
    }

    for (const prop in objectEvent) {
      if (objectEvent.hasOwnProperty(prop)) {
        switch (prop) {
          case 'persistentDisposition':
            this.setPersistentDisposition(new PersistentDisposition(objectEvent[prop]))
            break
          case 'quantityElement':
            objectEvent[prop].forEach(quantityElement => this.addQuantity(new QuantityElement(quantityElement)))
            break
          case 'bizTransactionList':
            objectEvent[prop].forEach(bizTransaction => this.addBizTransaction(new BizTransactionElement(bizTransaction)))
            break
          case 'sourceList':
            objectEvent[prop].forEach(source => this.addSource(new SourceElement(source)))
            break
          case 'readPoint':
            this.setReadPoint(new ReadPoint(objectEvent[prop]))
            break
          case 'bizLocation':
            this.setBizLocation(new BizLocation(objectEvent[prop]))
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
    if (!this.epcList) {
      this.epcList = []
    }
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
    if (!this.epcList) {
      this.epcList = []
    }
    epcList.forEach(epc => this.addEPC(epc))
    return this
  }

  /**
   * Clear the epc list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearEPCList () {
    delete this.epcList
    return this
  }

  /**
   * Remove an epc from the "epcList" field
   * @param {string} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeEPC (epc) {
    if (!this.epcList) {
      this.epcList = []
    }
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
    if (!this.epcList) {
      this.epcList = []
    }
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
    if (!this.quantityList) {
      this.quantityList = []
    }
    this.quantityList.push(quantity)
    return this
  }

  /**
   * Add each quantity to the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addQuantityList (quantityList) {
    if (!this.quantityList) {
      this.quantityList = []
    }
    quantityList.forEach(quantity => this.addQuantity(quantity))
    return this
  }

  /**
   * Clear the quantity list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearQuantityList () {
    delete this.quantityList
    return this
  }

  /**
   * Remove a quantity from the "quantityList" field
   * @param {QuantityElement} quantity - the quantity to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeQuantity (quantity) {
    if (!this.quantityList) {
      this.quantityList = []
    }
    this.quantityList = this.quantityList.filter(elem => elem !== quantity)
    return this
  }

  /**
   * Remove each quantity from the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeQuantityList (quantityList) {
    if (!this.quantityList) {
      this.quantityList = []
    }
    quantityList.forEach(quantity => this.removeQuantity(quantity))
    return this
  }

  /**
   * Set the action property
   * @param {string} action - string from {"OBSERVE", "ADD", "DELETE"}
   * @return {ObjectEvent} - the objectEvent instance
   */
  setAction (action) {
    this.action = action
    return this
  }

  /**
   * Set the bizStep property
   * @param {string} bizStep - e.g bizsteps.accepting
   * @return {ObjectEvent} - the objectEvent instance
   */
  setBizStep (bizStep) {
    this.bizStep = bizStep
    return this
  }

  /**
   * Set the disposition property
   * @param {string} disposition - e.g dispositions.in_transit
   * @return {ObjectEvent} - the objectEvent instance
   */
  setDisposition (disposition) {
    this.disposition = disposition
    return this
  }

  /**
   * Set the persistentDisposition property
   * @param {PersistentDisposition} persistentDisposition
   * @return {ObjectEvent} - the objectEvent instance
   */
  setPersistentDisposition (persistentDisposition) {
    this.persistentDisposition = persistentDisposition
    return this
  }

  /**
   * Set the readPoint property
   * @param {string|ReadPoint} readPoint id or readPoint instance
   * @return {ObjectEvent} - the objectEvent instance
   */
  setReadPoint (readPoint) {
    if ((typeof readPoint) === 'string') { // the param is the id of the readPoint
      this.readPoint = new ReadPoint().setId(readPoint)
      return this
    }
    // the param is the ReadPoint instance
    this.readPoint = readPoint
    return this
  }

  /**
   * Set the bizLocation property
   * @param {string|BizLocation} bizLocation instance or bizLocation id
   * @return {ObjectEvent} - the objectEvent instance
   */
  setBizLocation (bizLocation) {
    if ((typeof bizLocation) === 'string') { // the param is the id of the bizLocation
      this.bizLocation = new BizLocation().setId(bizLocation)
      return this
    }
    // the param is the BizLocation instance
    this.bizLocation = bizLocation
    return this
  }

  /**
   * Add the bizTransaction to the "bizTransactionList" field
   * @param {BizTransactionElement} bizTransaction - the bizTransaction to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addBizTransaction (bizTransaction) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = []
    }
    this.bizTransactionList.push(bizTransaction)
    return this
  }

  /**
   * Add each bizTransaction to the "bizTransactionList" field
   * @param {Array<BizTransactionElement>} bizTransactionList - the bizTransactions to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addBizTransactionList (bizTransactionList) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = []
    }
    bizTransactionList.forEach(bizTransaction => this.addBizTransaction(bizTransaction))
    return this
  }

  /**
   * Clear the bizTransaction list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearBizTransactionList () {
    delete this.bizTransactionList
    return this
  }

  /**
   * Remove a bizTransaction from the "bizTransactionList" field
   * @param {BizTransactionElement} bizTransaction - the bizTransaction to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeBizTransaction (bizTransaction) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = []
    }
    this.bizTransactionList = this.bizTransactionList.filter(elem => elem !== bizTransaction)
    return this
  }

  /**
   * Remove each bizTransaction from the "bizTransactionList" field
   * @param {Array<BizTransactionElement>} bizTransactionList - the bizTransactions to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeBizTransactionList (bizTransactionList) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = []
    }
    bizTransactionList.forEach(bizTransaction => this.removeBizTransaction(bizTransaction))
    return this
  }

  /**
   * Add the source to the "sourceList" field
   * @param {SourceElement} source - the source to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addSource (source) {
    if (!this.sourceList) {
      this.sourceList = []
    }
    this.sourceList.push(source)
    return this
  }

  /**
   * Add each sourceElement to the "sourceList" field
   * @param {Array<SourceElement>} sourceList - the sourceElements to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addSourceList (sourceList) {
    if (!this.sourceList) {
      this.sourceList = []
    }
    sourceList.forEach(sourceElement => this.addSource(sourceElement))
    return this
  }

  /**
   * Clear the source list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearSourceList () {
    delete this.sourceList
    return this
  }

  /**
   * Remove a source from the "sourceList" field
   * @param {SourceElement} source - the source to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeSource (source) {
    if (!this.sourceList) {
      this.sourceList = []
    }
    this.sourceList = this.sourceList.filter(elem => elem !== source)
    return this
  }

  /**
   * Remove each source from the "sourceList" field
   * @param {Array<SourceElement>} sourceList - the sources to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeSourceList (sourceList) {
    if (!this.sourceList) {
      this.sourceList = []
    }
    sourceList.forEach(sourceElement => this.removeSource(sourceElement))
    return this
  }

  /**
   * Return a JSON object corresponding to the ObjectEvent object
   */
  toJSON () {
    const json = {}

    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        if ((this[prop] instanceof ErrorDeclaration)
          || (this[prop] instanceof PersistentDisposition)
          || (this[prop] instanceof ReadPoint)
          || (this[prop] instanceof BizLocation)) {
          json[prop] = this[prop].toJSON()
        } else if (prop === 'quantityList' || prop === 'bizTransactionList' || prop === 'sourceList') {
          json[prop] = []
          this[prop].forEach(e => json[prop].push(e))
        } else {
          json[prop] = this[prop]
        }
      }
    }

    return json
  }
}
