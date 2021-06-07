/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import ObjectEvent from '../entity/events/ObjectEvent';
import TransactionEvent from '../entity/events/TransactionEvent';
import AggregationEvent from '../entity/events/AggregationEvent';
import AssociationEvent from '../entity/events/AssociationEvent';
import TransformationEvent from '../entity/events/TransformationEvent';

/**
 * Returns an instance of an Event object corresponding to the object passed in param
 * e.g if you provide {isA: 'ObjectEvent', ...}, it will return an ObjectEvent instance created
 * from the parameter
 *
 * @param {Object} obj
 * @return {Event} - an event corresponding to the parameter
 */
const objectToEvent = (obj) => {
  switch (obj.isA) {
    case 'ObjectEvent':
      return new ObjectEvent(obj);
    case 'AggregationEvent':
      return new AggregationEvent(obj);
    case 'AssociationEvent':
      return new AssociationEvent(obj);
    case 'TransactionEvent':
      return new TransactionEvent(obj);
    case 'TransformationEvent':
      return new TransformationEvent(obj);
    default:
      throw new Error("The object passed in parameter isn't valid. " +
        'The isA field should be set to a valid value');
  }
};

export default objectToEvent;
