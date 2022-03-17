/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import VocabularyElement from './VocabularyElement';

export default class Vocabulary extends Entity {
  /**
   * You can either create an empty Vocabulary or provide an already existing vocabulary via Object
   * @param {Object} [vocabulary] - The object that will be used to create the Vocabulary entity
   */
  constructor(vocabulary) {
    super(vocabulary);

    if (!vocabulary) {
      return;
    }

    this.clearVocabularyElementList();

    // Create classes for sub-objects that are provided
    Object.entries(vocabulary).forEach(([key, value]) => {
      if (key === 'vocabularyElementList') {
        value.forEach((vocabularyElement) => this.addVocabularyElement(
          new VocabularyElement(vocabularyElement),
        ));
      }
    });
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {Vocabulary} - the vocabulary instance
   */
  setType(type) {
    return this.generateSetterFunction('type', type, ['string']);
  }

  /**
   * Getter for the type property
   * @return {string} - the type
   */
  getType() {
    return this.type;
  }

  /**
   * Add the vocabularyElement to the "vocabularyElementList" field
   * @param {VocabularyElement} vocabularyElement - the vocabularyElement to add
   * @return {Vocabulary} - the vocabulary instance
   */
  addVocabularyElement(vocabularyElement) {
    return this.generateAddItemToListFunction('vocabularyElementList', vocabularyElement, [VocabularyElement]);
  }

  /**
   * Add each vocabularyElement to the "vocabularyElementList" field
   * @param {Array<VocabularyElement>} vocabularyElementList - the vocabularyElements to add
   * @return {Vocabulary} - the vocabulary instance
   */
  addVocabularyElementList(vocabularyElementList) {
    return this.generateAddItemsToListFunction('vocabularyElementList', vocabularyElementList, [VocabularyElement]);
  }

  /**
   * Clear the vocabularyElementList list
   * @return {Vocabulary} - the vocabulary instance
   */
  clearVocabularyElementList() {
    delete this.vocabularyElementList;
    return this;
  }

  /**
   * Remove a vocabularyElement from the "vocabularyElementList" field
   * @param {VocabularyElement} vocabularyElement - the vocabularyElement to remove
   * @return {Vocabulary} - the vocabulary instance
   */
  removeVocabularyElement(vocabularyElement) {
    this.vocabularyElementList = this.vocabularyElementList.filter(
      (elem) => elem !== vocabularyElement,
    );
    return this;
  }

  /**
   * Remove each vocabularyElement from the "vocabularyElementList" field
   * @param {Array<VocabularyElement>} vocabularyElementList - the vocabularyElement to remove
   * @return {Vocabulary} - the vocabulary instance
   */
  removeVocabularyElementList(vocabularyElementList) {
    vocabularyElementList.forEach((epc) => this.removeVocabularyElement(epc));
    return this;
  }

  /**
   * Getter for the vocabularyElementList property
   * @return {Array<VocabularyElement>} - the vocabularyElementList
   */
  getVocabularyElementList() {
    return this.vocabularyElementList;
  }
}
