/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';

export default class DestinationElement extends Entity {
  /**
   * Set the destination property
   * @param {string} destination
   * @return {DestinationElement} - the destination instance
   */
  setDestination(destination) {
    this.destination = destination;
    return this;
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
    this.type = type;
    return this;
  }

  /**
   * Getter for the type property
   * @return {string} - the type
   */
  getType() {
    return this.type;
  }
}
