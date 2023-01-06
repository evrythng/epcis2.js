/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import { throwIfThereIsAnUnexpectedExtension } from '../../utils/utils';

export default class PersistentDisposition extends Entity {
  /**
   * You can either create an empty PersistentDisposition or provide an already
   * existing one via Object.
   * @param {Object} [persistentDisposition] - The object that will be used to
   * create the persistent element
   */
  constructor(persistentDisposition) {
    super(persistentDisposition);
    this.addExtension = () => {
      throw new Error('Extensions are not supported in a destination element');
    };
    this.removeExtension = () => {
      throw new Error('Extensions are not supported in a destination element');
    };

    if (!persistentDisposition) {
      // create an empty persistent disposition object
      return;
    }

    throwIfThereIsAnUnexpectedExtension(persistentDisposition);
  }

  /**
    * Add the set to the "set" field
    * It throws an error if the set to add is already in the set list
    * @param {string} set - the set to add
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  addSet(set) {
    if (this.set?.includes(set)) {
      throw new Error('This set is already in the set list');
    }
    return this.generateAddItemToListFunction('set', set, ['string']);
  }

  /**
    * Add each set to the "set" field
    * It throws an error if at least one item is already in the set list
    * @param {Array<string>} setList - the sets to add
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  addSetList(setList) {
    setList.forEach((set) => {
      if (this.set?.includes(set)) {
        throw new Error('This set is already in the set list');
      }
    });
    return this.generateAddItemsToListFunction('set', setList, ['string']);
  }

  /**
    * Clear the set list
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  clearSetList() {
    delete this.set;
    return this;
  }

  /**
    * Remove a set from the "set" field
    * @param {string} set - the set to remove
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  removeSet(set) {
    this.set = this.set.filter((elem) => elem !== set);
    if (!this.set?.length) {
      this.clearSetList();
    }
    return this;
  }

  /**
    * Remove each set from the "set" field
    * @param {Array<string>} setList - the sets to remove
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  removeSetList(setList) {
    setList.forEach((set) => this.removeSet(set));

    return this;
  }

  /**
    * Getter for the set property
    * @return {Array<string>} - the set
    */
  getSet() {
    return this.set;
  }

  /**
    * Add the unset to the "unset" field
    * It throws an error if the unset to add is already in the unset list
    * @param {string} unset - the unset to add
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  addUnset(unset) {
    if (this.unset?.includes(unset)) {
      throw new Error('This unset is already in the unset list');
    }
    return this.generateAddItemToListFunction('unset', unset, ['string']);
  }

  /**
    * Add each unset to the "unset" field
    * It throws an error if at least one item is already in the unset list
    * @param {Array<string>} unsetList - the unsets to add
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  addUnsetList(unsetList) {
    unsetList.forEach((unset) => {
      if (this.unset?.includes(unset)) {
        throw new Error('This unset is already in the unset list');
      }
    });
    return this.generateAddItemsToListFunction('unset', unsetList, ['string']);
  }

  /**
    * Clear the unset list
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  clearUnsetList() {
    delete this.unset;
    return this;
  }

  /**
    * Remove an unset from the "unset" field
    * @param {string} unset - the unset to remove
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  removeUnset(unset) {
    this.unset = this.unset.filter((elem) => elem !== unset);
    if (!this.unset?.length) {
      this.clearUnsetList();
    }
    return this;
  }

  /**
    * Remove each unset from the "unset" field
    * @param {Array<string>} unsetList - the unsets to remove
    * @return {PersistentDisposition} - the persistentDisposition instance
    */
  removeUnsetList(unsetList) {
    unsetList.forEach((unset) => this.removeUnset(unset));
    if (!this.unset?.length) {
      this.clearUnsetList();
    }
    return this;
  }

  /**
    * Getter for the unset property
    * @return {Array<string>} - the unset
    */
  getUnset() {
    return this.unset;
  }
}
