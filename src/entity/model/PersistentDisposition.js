/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';

export default class PersistentDisposition extends Entity {
  /**
   * Add the set to the "set" field
   * @param {string} set - the set to add
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  addSet(set) {
    return this.generateAddItemToListFunction('set', set, ['string']);
  }

  /**
   * Add each set to the "set" field
   * @param {Array<string>} setList - the sets to add
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  addSetList(setList) {
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
   * @param {string} unset - the unset to add
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  addUnset(unset) {
    return this.generateAddItemToListFunction('unset', unset, ['string']);
  }

  /**
   * Add each unset to the "unset" field
   * @param {Array<string>} unsetList - the unsets to add
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  addUnsetList(unsetList) {
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
    return this;
  }

  /**
   * Remove each unset from the "unset" field
   * @param {Array<string>} unsetList - the unsets to remove
   * @return {PersistentDisposition} - the persistentDisposition instance
   */
  removeUnsetList(unsetList) {
    unsetList.forEach((unset) => this.removeUnset(unset));
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
