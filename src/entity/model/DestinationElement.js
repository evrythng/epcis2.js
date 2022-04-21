/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import { throwIfThereIsAnUnexpectedExtension } from '../../utils/utils';

export default class DestinationElement extends Entity {
  /**
   * You can either create an empty DestinationElement or provide an already existing one via Object
   * @param {Object} [destinationElement] - The object that will be used to create the destination
   * element
   */
  constructor(destinationElement) {
    super(destinationElement);
    this.addExtension = () => {
      throw new Error('Extensions are not supported in a destination element');
    };
    this.removeExtension = () => {
      throw new Error('Extensions are not supported in a destination element');
    };

    if (!destinationElement) {
      // create an empty destination element
      return;
    }

    throwIfThereIsAnUnexpectedExtension(destinationElement);
  }

  /**
   * Set the destination property
   * @param {string} destination
   * @return {DestinationElement} - the destination instance
   */
  setDestination(destination) {
    return this.generateSetterFunction('destination', destination, ['string']);
  }

  /**
   * Getter for the destination property
   * @return {string} - the destination
   */
  getDestination() {
    return this.destination;
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {DestinationElement} - the destination instance
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
