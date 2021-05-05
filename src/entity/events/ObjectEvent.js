import Event from './Event';
import PersistentDisposition from '../model/PersistentDisposition';
import QuantityElement from '../model/QuantityElement';
import ReadPoint from '../model/ReadPoint';
import BizLocation from '../model/BizLocation';
import BizTransactionElement from '../model/BizTransactionElement';
import SourceElement from '../model/SourceElement';
import DestinationElement from '../model/DestinationElement';
import SensorElement from '../model/sensor/SensorElement';

export default class ObjectEvent extends Event {
  /**
   * You can either create an empty Object Event or provide an already existing Object event via Map
   * @param {Object} [objectEvent] - The Map that will be used to create the ObjectEvent entity
   */
  constructor(objectEvent) {
    super(objectEvent);
    this.isA = 'ObjectEvent';

    if (!objectEvent) {
      return;
    }

    this.clearSourceList();
    this.clearBizTransactionList();
    this.clearDestinationList();
    this.clearQuantityList();
    this.clearSensorElementList();
    this.clearEPCList();

    // Create classes for sub-objects that are provided
    Object.entries(objectEvent).forEach(([key, value]) => {
      switch (key) {
        case 'persistentDisposition':
          this.setPersistentDisposition(new PersistentDisposition(value));
          break;
        case 'epcList':
          value.forEach((epc) => this.addEPC(epc));
          break;
        case 'quantityList':
          value.forEach((quantityElement) => this
            .addQuantity(new QuantityElement(quantityElement)));
          break;
        case 'bizTransactionList':
          value.forEach((bizTransaction) => this
            .addBizTransaction(new BizTransactionElement(bizTransaction)));
          break;
        case 'sourceList':
          value.forEach((source) => this.addSource(new SourceElement(source)));
          break;
        case 'destinationList':
          value.forEach((destination) => this.addDestination(new DestinationElement(destination)));
          break;
        case 'sensorElementList':
          value.forEach((sensorElement) => this.addSensorElement(new SensorElement(sensorElement)));
          break;
        case 'readPoint':
          this.setReadPoint(new ReadPoint(value));
          break;
        case 'bizLocation':
          this.setBizLocation(new BizLocation(value));
          break;
        default:
          break;
      }
    });
  }

  /**
   * Add the epc to the "epcList" field
   * @param {string} epc - the epc to add (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {ObjectEvent} - the objectEvent instance
   */
  addEPC(epc) {
    if (!this.epcList) {
      this.epcList = [];
    }
    this.epcList.push(epc);
    return this;
  }

  /**
   * Add each epc to the "epcList" field
   * @param {Array<string>} epcList - the epcs to add
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {ObjectEvent} - the objectEvent instance
   */
  addEPCList(epcList) {
    if (!this.epcList) {
      this.epcList = [];
    }
    this.epcList = [...this.epcList, ...epcList];
    return this;
  }

  /**
   * Clear the epc list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearEPCList() {
    delete this.epcList;
    return this;
  }

  /**
   * Remove an epc from the "epcList" field
   * @param {string} epc - the epc to remove (e.g urn:epc:id:sgtin:xxxxxx.xxxxx.xxx)
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeEPC(epc) {
    if (!this.epcList) {
      this.epcList = [];
    }
    this.epcList = this.epcList.filter((elem) => elem !== epc);
    return this;
  }

  /**
   * Remove each epc from the "epcList" field
   * @param {Array<string>} epcList - the epcs to remove
   * (e.g [urn:epc:id:sgtin:xxxxxx.xxxxx.xxx, urn:epc:id:sgtin:xxxxxx.xxxxx.xxy])
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeEPCList(epcList) {
    if (!this.epcList) {
      this.epcList = [];
    }
    epcList.forEach((epc) => this.removeEPC(epc));
    return this;
  }

  /**
   * Getter for the epcList property
   * @return {Array<string>} - the epcList
   */
  getEPCList() {
    return this.epcList;
  }

  /**
   * Add the quantity to the "quantityList" field
   * @param {QuantityElement} quantity - the quantity to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addQuantity(quantity) {
    if (!this.quantityList) {
      this.quantityList = [];
    }
    this.quantityList.push(quantity);
    return this;
  }

  /**
   * Add each quantity to the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addQuantityList(quantityList) {
    if (!this.quantityList) {
      this.quantityList = [];
    }
    this.quantityList = [...this.quantityList, ...quantityList];
    return this;
  }

  /**
   * Clear the quantity list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearQuantityList() {
    delete this.quantityList;
    return this;
  }

  /**
   * Remove a quantity from the "quantityList" field
   * @param {QuantityElement} quantity - the quantity to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeQuantity(quantity) {
    if (!this.quantityList) {
      this.quantityList = [];
    }
    this.quantityList = this.quantityList.filter((elem) => elem !== quantity);
    return this;
  }

  /**
   * Remove each quantity from the "quantityList" field
   * @param {Array<QuantityElement>} quantityList - the quantities to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeQuantityList(quantityList) {
    if (!this.quantityList) {
      this.quantityList = [];
    }
    quantityList.forEach((quantity) => this.removeQuantity(quantity));
    return this;
  }

  /**
   * Getter for the quantityList property
   * @return {Array<QuantityElement>} - the quantityList
   */
  getQuantityList() {
    return this.quantityList;
  }

  /**
   * Set the action property
   * @param {string} action - string from {"OBSERVE", "ADD", "DELETE"}
   * @return {ObjectEvent} - the objectEvent instance
   */
  setAction(action) {
    this.action = action;
    return this;
  }

  /**
   * Getter for the action property
   * @return {string} - the action
   */
  getAction() {
    return this.action;
  }

  /**
   * Set the bizStep property
   * @param {string} bizStep - e.g bizsteps.accepting
   * @return {ObjectEvent} - the objectEvent instance
   */
  setBizStep(bizStep) {
    this.bizStep = bizStep;
    return this;
  }

  /**
   * Getter for the bizStep property
   * @return {string} - the bizStep
   */
  getBizStep() {
    return this.bizStep;
  }

  /**
   * Set the disposition property
   * @param {string} disposition - e.g dispositions.in_transit
   * @return {ObjectEvent} - the objectEvent instance
   */
  setDisposition(disposition) {
    this.disposition = disposition;
    return this;
  }

  /**
   * Getter for the disposition property
   * @return {string} - the disposition
   */
  getDisposition() {
    return this.disposition;
  }

  /**
   * Set the persistentDisposition property
   * @param {PersistentDisposition} persistentDisposition
   * @return {ObjectEvent} - the objectEvent instance
   */
  setPersistentDisposition(persistentDisposition) {
    this.persistentDisposition = persistentDisposition;
    return this;
  }

  /**
   * Getter for the persistentDisposition property
   * @return {PersistentDisposition} - the persistentDisposition
   */
  getPersistentDisposition() {
    return this.persistentDisposition;
  }

  /**
   * Set the readPoint property
   * @param {string|ReadPoint} readPoint id or readPoint instance
   * @return {ObjectEvent} - the objectEvent instance
   */
  setReadPoint(readPoint) {
    if ((typeof readPoint) === 'string') { // the param is the id of the readPoint
      this.readPoint = new ReadPoint().setId(readPoint);
      return this;
    }
    // the param is the ReadPoint instance
    this.readPoint = readPoint;
    return this;
  }

  /**
   * Getter for the readPoint property
   * @return {ReadPoint} - the readPoint
   */
  getReadPoint() {
    return this.readPoint;
  }

  /**
   * Set the bizLocation property
   * @param {string|BizLocation} bizLocation instance or bizLocation id
   * @return {ObjectEvent} - the objectEvent instance
   */
  setBizLocation(bizLocation) {
    if ((typeof bizLocation) === 'string') { // the param is the id of the bizLocation
      this.bizLocation = new BizLocation().setId(bizLocation);
      return this;
    }
    // the param is the BizLocation instance
    this.bizLocation = bizLocation;
    return this;
  }

  /**
   * Getter for the bizLocation property
   * @return {BizLocation} - the bizLocation
   */
  getBizLocation() {
    return this.bizLocation;
  }

  /**
   * Add the bizTransaction to the "bizTransactionList" field
   * @param {BizTransactionElement} bizTransaction - the bizTransaction to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addBizTransaction(bizTransaction) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = [];
    }
    this.bizTransactionList.push(bizTransaction);
    return this;
  }

  /**
   * Add each bizTransaction to the "bizTransactionList" field
   * @param {Array<BizTransactionElement>} bizTransactionList - the bizTransactions to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addBizTransactionList(bizTransactionList) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = [];
    }
    this.bizTransactionList = [...this.bizTransactionList, ...bizTransactionList];
    return this;
  }

  /**
   * Clear the bizTransaction list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearBizTransactionList() {
    delete this.bizTransactionList;
    return this;
  }

  /**
   * Remove a bizTransaction from the "bizTransactionList" field
   * @param {BizTransactionElement} bizTransaction - the bizTransaction to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeBizTransaction(bizTransaction) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = [];
    }
    this.bizTransactionList = this.bizTransactionList.filter((elem) => elem !== bizTransaction);
    return this;
  }

  /**
   * Remove each bizTransaction from the "bizTransactionList" field
   * @param {Array<BizTransactionElement>} bizTransactionList - the bizTransactions to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeBizTransactionList(bizTransactionList) {
    if (!this.bizTransactionList) {
      this.bizTransactionList = [];
    }
    bizTransactionList
      .forEach((bizTransaction) => this.removeBizTransaction(bizTransaction));
    return this;
  }

  /**
   * Getter for the bizTransactionList property
   * @return {Array<BizTransactionElement>} - the bizTransactionList
   */
  getBizTransactionList() {
    return this.bizTransactionList;
  }

  /**
   * Add the source to the "sourceList" field
   * @param {SourceElement} source - the source to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addSource(source) {
    if (!this.sourceList) {
      this.sourceList = [];
    }
    this.sourceList.push(source);
    return this;
  }

  /**
   * Add each sourceElement to the "sourceList" field
   * @param {Array<SourceElement>} sourceList - the sourceElements to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addSourceList(sourceList) {
    if (!this.sourceList) {
      this.sourceList = [];
    }
    this.sourceList = [...this.sourceList, ...sourceList];
    return this;
  }

  /**
   * Clear the source list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearSourceList() {
    delete this.sourceList;
    return this;
  }

  /**
   * Remove a source from the "sourceList" field
   * @param {SourceElement} source - the source to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeSource(source) {
    if (!this.sourceList) {
      this.sourceList = [];
    }
    this.sourceList = this.sourceList.filter((elem) => elem !== source);
    return this;
  }

  /**
   * Remove each source from the "sourceList" field
   * @param {Array<SourceElement>} sourceList - the sources to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeSourceList(sourceList) {
    if (!this.sourceList) {
      this.sourceList = [];
    }
    sourceList.forEach((sourceElement) => this.removeSource(sourceElement));
    return this;
  }

  /**
   * Getter for the sourceList property
   * @return {Array<SourceElement>} - the sourceList
   */
  getSourceList() {
    return this.sourceList;
  }

  /**
   * Add the destination to the "destinationList" field
   * @param {DestinationElement} destination - the destination to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addDestination(destination) {
    if (!this.destinationList) {
      this.destinationList = [];
    }
    this.destinationList.push(destination);
    return this;
  }

  /**
   * Add each destinationElement to the "destinationList" field
   * @param {Array<DestinationElement>} destinationList - the destinationElements to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addDestinationList(destinationList) {
    if (!this.destinationList) {
      this.destinationList = [];
    }
    this.destinationList = [...this.destinationList, ...destinationList];
    return this;
  }

  /**
   * Clear the destination list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearDestinationList() {
    delete this.destinationList;
    return this;
  }

  /**
   * Remove a destination from the "destinationList" field
   * @param {DestinationElement} destination - the destination to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeDestination(destination) {
    if (!this.destinationList) {
      this.destinationList = [];
    }
    this.destinationList = this.destinationList.filter((elem) => elem !== destination);
    return this;
  }

  /**
   * Remove each destination from the "destinationList" field
   * @param {Array<DestinationElement>} destinationList - the destinations to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeDestinationList(destinationList) {
    if (!this.destinationList) {
      this.destinationList = [];
    }
    destinationList
      .forEach((destinationElement) => this.removeDestination(destinationElement));
    return this;
  }

  /**
   * Getter for the destinationList property
   * @return {Array<DestinationElement>} - the destinationList
   */
  getDestinationList() {
    return this.destinationList;
  }

  /**
   * Add the sensorElement to the "sensorElementList" field
   * @param {SensorElement} sensorElement - the sensorElement to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addSensorElement(sensorElement) {
    if (!this.sensorElementList) {
      this.sensorElementList = [];
    }
    this.sensorElementList.push(sensorElement);
    return this;
  }

  /**
   * Add each sensorElementElement to the "sensorElementList" field
   * @param {Array<SensorElement>} sensorElementList - the sensorElementElements to add
   * @return {ObjectEvent} - the objectEvent instance
   */
  addSensorElementList(sensorElementList) {
    if (!this.sensorElementList) {
      this.sensorElementList = [];
    }
    this.sensorElementList = [...this.sensorElementList, ...sensorElementList];
    return this;
  }

  /**
   * Clear the sensorElement list
   * @return {ObjectEvent} - the objectEvent instance
   */
  clearSensorElementList() {
    delete this.sensorElementList;
    return this;
  }

  /**
   * Remove a sensorElement from the "sensorElementList" field
   * @param {SensorElement} sensorElement - the sensorElement to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeSensorElement(sensorElement) {
    if (!this.sensorElementList) {
      this.sensorElementList = [];
    }
    this.sensorElementList = this.sensorElementList.filter((elem) => elem !== sensorElement);
    return this;
  }

  /**
   * Remove each sensorElement from the "sensorElementList" field
   * @param {Array<SensorElement>} sensorElementList - the sensorElements to remove
   * @return {ObjectEvent} - the objectEvent instance
   */
  removeSensorElementList(sensorElementList) {
    if (!this.sensorElementList) {
      this.sensorElementList = [];
    }
    sensorElementList
      .forEach((sensorElementElement) => this.removeSensorElement(sensorElementElement));
    return this;
  }

  /**
   * Getter for the sensorElementList property
   * @return {Array<SensorElement>} - the sensorElementList
   */
  getSensorElementList() {
    return this.sensorElementList;
  }

  /**
   * Set the ilmd property
   * @param {Object} ilmd object
   * @return {ObjectEvent} - the objectEvent instance
   */
  setIlmd(ilmd) {
    this.ilmd = ilmd;
    return this;
  }

  /**
   * Getter for the ilmd property
   * @return {Object} - the ilmd
   */
  getIlmd() {
    return this.ilmd;
  }
}
