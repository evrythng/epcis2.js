/**
 * Returns a JSON corresponding to the parameter
 * @param {any} obj
 * @return {Object} - a json if the object passed in param has a toObject function defined - the
 * object passed in param otherwise
 */
const objectToJSON = (obj) => {
  if (typeof obj.toObject === 'function') {
    return obj.toObject();
  }
  return obj;
};

export default class Entity {
  /**
   * You can either create an empty Entity or provide an already existing Entity via Map
   * @param {Object} [entity] - The Map that will be used to create the entity
   */
  constructor(entity) {
    if (new.target === Entity) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }

    if (!entity) {
      // create an empty Entity object
      return;
    }

    Object.entries(entity).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  /**
   * @param {string} key - the key of the extension
   * @param {string} value - the value of the extension
   * @return {Entity} - the entity instance
   */
  addExtension(key, value) {
    this[key] = value;
    return this;
  }

  /**
   * @param {string} key - the key of the extension
   * @return {Entity} - the entity instance
   */
  removeExtension(key) {
    delete this[key];
    return this;
  }

  // todo: getExtensions?

  /**
   * @return {Object} an object corresponding to the Entity object
   */
  toObject() {
    const json = {};

    Object.keys(this).forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        if (Array.isArray(this[prop])) {
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
   * @return {string} - a string corresponding to the Entity object
   */
  toString() {
    return JSON.stringify(this.toObject());
  }
}
