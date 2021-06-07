/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import AttributeElement from './AttributeElement';

export default class VocabularyElement extends Entity {
  constructor(vocabularyElement) {
    super(vocabularyElement);

    if (!vocabularyElement) {
      return;
    }

    this.clearAttributeList();
    this.clearChildren();

    // Create classes for sub-objects that are provided
    Object.entries(vocabularyElement).forEach(([key, value]) => {
      switch (key) {
        case 'attributes':
          value.forEach((attribute) => this
            .addAttribute(new AttributeElement(attribute)));
          break;
        case 'children':
          value.forEach((child) => this
            .addChild(child));
          break;
        // no default
      }
    });
  }

  /**
   * Set the id property
   * @param {string} id
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Getter for the id property
   * @return {string} - the id
   */
  getId() {
    return this.id;
  }

  /**
   * Add the attribute to the "attributeList" field
   * @param {AttributeElement} attribute
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  addAttribute(attribute) {
    if (!this.attributes) {
      this.attributes = [];
    }
    this.attributes.push(attribute);
    return this;
  }

  /**
   * Add each attribute to the "attributes" field
   * @param {Array<AttributeElement>} attributeList - the attributes to add
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  addAttributeList(attributeList) {
    if (!this.attributes) {
      this.attributes = [];
    }
    this.attributes = [...this.attributes, ...attributeList];
    return this;
  }

  /**
   * Clear the attribute list
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  clearAttributeList() {
    delete this.attributes;
    return this;
  }

  /**
   * Remove an attribute from the "attributes" field
   * @param {AttributeElement} attribute - the attribute to remove
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  removeAttribute(attribute) {
    this.attributes = this.attributes.filter((elem) => elem !== attribute);
    return this;
  }

  /**
   * Remove each attribute from the "attributes" field
   * @param {Array<AttributeElement>} attributeList - the attributes to remove
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  removeAttributeList(attributeList) {
    attributeList.forEach((attribute) => this.removeAttribute(attribute));
    return this;
  }

  /**
   * Getter for the attributes property
   * @return {Array<AttributeElement>} - the attributes
   */
  getAttributes() {
    return this.attributes;
  }

  /**
   * Add the child to the "children" field
   * @param {string} child
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  addChild(child) {
    if (!this.children) {
      this.children = [];
    }
    this.children.push(child);
    return this;
  }

  /**
   * Add each attribute to the "children" field
   * @param {Array<string>} childList - the children to add
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  addChildList(childList) {
    if (!this.children) {
      this.children = [];
    }
    this.children = [...this.children, ...childList];
    return this;
  }

  /**
   * Clear the child list
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  clearChildren() {
    delete this.children;
    return this;
  }

  /**
   * Remove a child from the "children" field
   * @param {string} child - the child to remove
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  removeChild(child) {
    this.children = this.children.filter((elem) => elem !== child);
    return this;
  }

  /**
   * Remove each child from the "children" field
   * @param {Array<string>} childList - the children to remove
   * @return {VocabularyElement} - the vocabularyElement instance
   */
  removeChildList(childList) {
    childList.forEach((child) => this.removeChild(child));
    return this;
  }

  /**
   * Getter for the children property
   * @return {Array<string>} - the children
   */
  getChildren() {
    return this.children;
  }
}
