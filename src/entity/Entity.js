import { objectToJSON } from '../utils/utils';

export default class Entity {
  /**
   * You can either create an empty Entity or provide an already existing Entity via Map
   * @param {Object} [entity] - The Map that will be used to create the entity
   */
  constructor(entity) {
    if (new.target === Entity) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }

    if (!arguments.length || entity === undefined) {
      // create an empty Entity object
      return;
    }

    Object.entries(entity).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {Entity} - the entity instance
   */
  addExtension(key, value) {
    this[key] = value;
    return this;
  }

  /**
   * @param {string} key
   * @return {Entity} - the entity instance
   */
  removeExtension(key) {
    delete this[key];
    return this;
  }

  // todo: getExtensions?

  /**
   * Return a JSON object corresponding to the SourceElement object
   */
  toObject() {
    const json = {};

    Object.keys(this).forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        if (typeof this[prop].push === 'function') {
          if (!this[prop].length) {
            json[prop] = [];
          } else {
            json[prop] = [];
            this[prop].forEach((e) => json[prop].push(objectToJSON(e)));
          }
        } else {
          json[prop] = objectToJSON(this[prop]);
        }
      }
    });

    return json;
  }

  /**
   * @returns {string} - a string corresponding to the Entity object
   */
  toString() {
    return JSON.stringify(this.toObject());
  }
}
