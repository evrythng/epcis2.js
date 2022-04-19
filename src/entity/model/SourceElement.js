/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import { throwIfThereIsAnUnexpectedExtension } from '../../utils/utils';

export default class SourceElement extends Entity {
  /**
   * You can either create an empty SourceElement or provide an already existing one via Object
   * @param {Object} [sourceElement] - The object that will be used to create the source element
   */
  constructor(sourceElement) {
    super(sourceElement);
    this.addExtension = () => {
      throw new Error('Extensions are not supported in a source element');
    };
    this.removeExtension = () => {
      throw new Error('Extensions are not supported in a source element');
    };

    if (!sourceElement) {
      // create an empty source element
      return;
    }

    throwIfThereIsAnUnexpectedExtension(sourceElement);
  }

  /**
   * Set the source property
   * @param {string} source
   * @return {SourceElement} - the source instance
   */
  setSource(source) {
    return this.generateSetterFunction('source', source, ['string']);
  }

  /**
   * Getter for the source property
   * @return {string} - the source
   */
  getSource() {
    return this.source;
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {SourceElement} - the source instance
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
}
