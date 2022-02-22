/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import Vocabulary from '../model/Vocabulary';

export default class EPCISMasterData extends Entity {
  /**
   * You can either create an empty EPCISMasterData or provide an already existing EPCISMasterData
   * via Object
   * @param {Object} [epcisMasterData] - The object that will be used to create the epcisMasterData
   * entity
   */
  constructor(epcisMasterData) {
    super(epcisMasterData);

    if (!epcisMasterData) {
      return;
    }

    this.clearVocabularyList();

    // Create classes for sub-objects that are provided
    Object.entries(epcisMasterData).forEach(([key, value]) => {
      if (key === 'vocabularyList') {
        value.forEach((vocabulary) => this.addVocabulary(new Vocabulary(vocabulary)));
      }
    });
  }

  /**
   * Add the vocabulary to the "vocabularyList" field
   * @param {Vocabulary} vocabulary - the vocabulary to add
   * @return {EPCISMasterData} - the epcis master data instance
   */
  addVocabulary(vocabulary) {
    if (!this.vocabularyList) {
      this.vocabularyList = [];
    }
    this.vocabularyList.push(vocabulary);
    return this;
  }

  /**
   * Add each vocabulary to the "vocabularyList" field
   * @param {Array<Vocabulary>} vocabularyList - the vocabularies to add
   * @return {EPCISMasterData} - the epcis master data instance
   */
  addVocabularyList(vocabularyList) {
    if (!this.vocabularyList) {
      this.vocabularyList = [];
    }
    this.vocabularyList = [...this.vocabularyList, ...vocabularyList];
    return this;
  }

  /**
   * Clear the vocabularyList list
   * @return {EPCISMasterData} - the epcis master data instance
   */
  clearVocabularyList() {
    delete this.vocabularyList;
    return this;
  }

  /**
   * Remove a vocabulary from the "vocabularyList" field
   * @param {Vocabulary} vocabulary - the vocabularyList to remove
   * @return {EPCISMasterData} - the epcis master data instance
   */
  removeVocabulary(vocabulary) {
    this.vocabularyList = this.vocabularyList.filter((elem) => elem !== vocabulary);
    return this;
  }

  /**
   * Remove each vocabulary from the "vocabularyList" field
   * @param {Array<Vocabulary>} vocabularyList - the vocabularies to remove
   * @return {EPCISMasterData} - the epcis master data instance
   */
  removeVocabularyList(vocabularyList) {
    vocabularyList.forEach((vocabulary) => this.removeVocabulary(vocabulary));
    return this;
  }

  /**
   * Getter for the vocabularyList property
   * @return {Array<Vocabulary>} - the vocabularyList
   */
  getVocabularyList() {
    return this.vocabularyList;
  }
}
