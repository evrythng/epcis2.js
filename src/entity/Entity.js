/**
 * Returns an object corresponding to the parameter
 * @param {any} obj - The variable that will be converted to an object.
 * @return {Object} - a json if the object passed in param has a toObject function defined - the
 * object passed in param otherwise
 */
const variableToObject = (obj) => {
  if (obj && obj.toObject instanceof Function) {
    return obj.toObject();
  }
  return obj;
};

export default class Entity {
  /**
   * You can either create an empty Entity or provide an already existing Entity via Object
   * @param {Object} [entity] - The object that will be used to create the entity
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
   * @param {string} key - the key of the extension (e.g 'vendor:example')
   * @param {string} value - the value of the extension
   * @return {Entity} - the entity instance
   */
  addExtension(key, value) {
    this[key] = value;
    return this;
  }

  /**
   * @param {string} key - the key of the extension (e.g 'vendor:example')
   * @return {Entity} - the entity instance
   */
  removeExtension(key) {
    delete this[key];
    return this;
  }

  /**
   * Getter for extensions
   * @param {string} key - the key of the extension (e.g 'vendor:example')
   * @return {any} - the extension
   */
  getExtension(key) {
    return this[key];
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
            this[prop].forEach((e) => json[prop].push(variableToObject(e)));
          }
        } else if (!(this[prop] instanceof Function)) {
          json[prop] = variableToObject(this[prop]);
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
