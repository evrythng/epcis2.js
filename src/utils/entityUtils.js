import ObjectEvent from '../entity/events/ObjectEvent';

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
    case 'AggregationEvent': // todo:
      return new ObjectEvent(obj);
    case 'AssociationEvent': // todo:
      return new ObjectEvent(obj);
    case 'TransactionEvent': // todo:
      return new ObjectEvent(obj);
    case 'TransformationEvent': // todo:
      return new ObjectEvent(obj);
    default:
      throw new Error("The object passed in parameter isn't valid. " +
        'The isA field should be set to a valid value');
  }
};

export default objectToEvent;
