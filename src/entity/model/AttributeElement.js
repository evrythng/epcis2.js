import Entity from '../Entity';

export default class AttributeElement extends Entity {
  /**
   * Set the id property
   * @param {string} id
   * @return {AttributeElement} - the attributeElement instance
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
   * Set the attribute property
   * @param {string} attribute
   * @return {AttributeElement} - the attributeElement instance
   */
  setAttribute(attribute) {
    this.attribute = attribute;
    return this;
  }

  /**
   * Getter for the attribute property
   * @return {string} - the attribute
   */
  getAttribute() {
    return this.attribute;
  }
}
