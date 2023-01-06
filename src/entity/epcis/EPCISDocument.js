/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import EPCISHeader from './EPCISHeader';
import settings from '../../settings';
import objectToEvent from '../../utils/entityUtils';
import { validateEpcisDocument } from '../../schema/validator';

import Event from '../events/Event';
import { isJsonObject } from '../../utils/utils';

export default class EPCISDocument extends Entity {
  /**
   * You can either create an empty EPCISDocument or provide an already existing EPCIS document via
   * Map
   * @param {Object} [epcisDocument] - The object that will be used to create the EPCISDocument
   * entity
   */
  constructor(epcisDocument) {
    super(epcisDocument);
    this.type = 'EPCISDocument';

    if (!this.getContext()) {
      this.setContext(settings.EPCISDocumentContext);
    }

    if (!this.getSchemaVersion()) {
      this.setSchemaVersion(settings.EPCISDocumentSchemaVersion);
    }

    if (!this.getCreationDate()) {
      this.setCreationDate(new Date().toISOString());
    }

    if (!epcisDocument) {
      return;
    }

    this.setContext(this['@context']);

    // Create classes for sub-objects that are provided
    Object.entries(epcisDocument).forEach(([key, value]) => {
      switch (key) {
        case 'type':
          this.type = value;
          break;
        case 'epcisHeader':
          this.setEPCISHeader(new EPCISHeader(value));
          break;
        case 'epcisBody':
          if (value.eventList) {
            value.eventList.forEach((event) => this.addEvent(objectToEvent(event)));
          }
          break;
        // no default
      }
    });
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setType(type) {
    return this.generateSetterFunction('type', type, ['string']);
  }

  /**
   * Getter for the type property
   * @return {string} - the type property
   */
  getType() {
    return this.type;
  }

  /**
   * Set the context property, and add the default context if it is not provided
   * @param {string|Object|Array<string>|Array<Object>} context
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setContext(context) {
    let newContext = context;

    if (typeof context === 'string' && context !== settings.EPCISDocumentContext) {
      newContext = [context, settings.EPCISDocumentContext];
    }

    if (typeof context === 'object') {
      if (Array.isArray(context)) {
        if (!context.includes(settings.EPCISDocumentContext)) {
          newContext.push(settings.EPCISDocumentContext);
        }
      } else if (isJsonObject(context)) {
        newContext = [context, settings.EPCISDocumentContext];
      }
    }

    this['@context'] = newContext;
    return this;
  }

  /**
   * Getter for the context property
   * @return {string|Object|Array<string>|Array<Object>} - the context
   */
  getContext() {
    return this['@context'];
  }

  /**
   * Set the schemaVersion property
   * @param {string} schemaVersion
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setSchemaVersion(schemaVersion) {
    return this.generateSetterFunction('schemaVersion', schemaVersion, ['string']);
  }

  /**
   * Getter for the schemaVersion property
   * @return {string} - the schemaVersion
   */
  getSchemaVersion() {
    return this.schemaVersion;
  }

  /**
   * Set the creationDate property
   * @param {string} creationDate
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setCreationDate(creationDate) {
    return this.generateSetterFunction('creationDate', creationDate, ['string']);
  }

  /**
   * Getter for the creationDate property
   * @return {string} - the creationDate
   */
  getCreationDate() {
    return this.creationDate;
  }

  /**
   * Set the epcisHeader property
   * @param {EPCISHeader} epcisHeader
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setEPCISHeader(epcisHeader) {
    return this.generateSetterFunction('epcisHeader', epcisHeader, [EPCISHeader]);
  }

  /**
   * Getter for the epcisHeader property
   * @return {EPCISHeader} - the epcisHeader
   */
  getEPCISHeader() {
    return this.epcisHeader;
  }

  /**
   * Add the event to the "eventList" field
   * @param {Event} event - the event to add
   * @return {EPCISDocument} - the epcisDocument instance
   */
  addEvent(event) {
    return this.generateAddItemToListFunction('eventList', event, [Event]);
  }

  /**
   * Add each event to the "eventList" field
   * @param {Array<Event>} eventList - the events to add
   * @return {EPCISDocument} - the epcisDocument instance
   */
  addEventList(eventList) {
    return this.generateAddItemsToListFunction('eventList', eventList, [Event]);
  }

  /**
   * Clear the vocabularyList list
   * @return {EPCISDocument} - the epcisDocument instance
   */
  clearEventList() {
    delete this.eventList;
    return this;
  }

  /**
   * Remove the event from the "eventList" field
   * @param {Event} event - the events to remove
   * @return {EPCISDocument} - the epcisDocument instance
   */
  removeEvent(event) {
    this.eventList = this.eventList.filter((elem) => elem !== event);
    return this;
  }

  /**
   * Remove each event from the "eventList" field
   * @param {Array<Event>} eventList - the events to remove
   * @return {EPCISDocument} - the epcisDocument instance
   */
  removeEventList(eventList) {
    eventList.forEach((event) => this.removeEvent(event));
    return this;
  }

  /**
   * Getter for the eventList property
   * @return {Array<Event>} - the eventList
   */
  getEventList() {
    return this.eventList;
  }

  /**
   * Set the instanceIdentifier property
   * @param {string} instanceIdentifier
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setInstanceIdentifier(instanceIdentifier) {
    return this.generateSetterFunction('instanceIdentifier', instanceIdentifier, ['string']);
  }

  /**
   * Getter for the instanceIdentifier property
   * @return {string} - the instanceIdentifier
   */
  getInstanceIdentifier() {
    return this.instanceIdentifier;
  }

  /**
   * Set the sender property
   * @param {string} sender
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setSender(sender) {
    return this.generateSetterFunction('sender', sender, ['string']);
  }

  /**
   * Getter for the sender property
   * @return {string} - the sender
   */
  getSender() {
    return this.sender;
  }

  /**
   * Set the receiver property
   * @param {string} receiver
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setReceiver(receiver) {
    return this.generateSetterFunction('receiver', receiver, ['string']);
  }

  /**
   * Getter for the receiver property
   * @return {string} - the receiver
   */
  getReceiver() {
    return this.receiver;
  }

  /**
   * Set the id property
   * @param {string} id
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setId(id) {
    return this.generateSetterFunction('id', id, ['string']);
  }

  /**
   * Getter for the id property
   * @return {string} - the id
   */
  getId() {
    return this.id;
  }

  /**
   * Check if the EPCISDocument respects the rules of the standard defined in
   * src/schema/EPCISDocument.schema.json
   * It throws if the schema isn't valid
   *
   * @return {boolean} - true if the EPCIS document is valid
   */
  isValid() {
    const result = validateEpcisDocument(this.toObject());
    return result.success;
  }

  /**
   * @return {Object} an object corresponding to the Entity object
   */
  toObject() {
    const output = super.toObject();

    // the event or event list has to be in the epcisBody field
    if (output.eventList) {
      const body = {};
      body.eventList = output.eventList;
      delete output.eventList;
      output.epcisBody = body;
    }

    return output;
  }
}
