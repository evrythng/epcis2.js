/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

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
      throw new Error("Abstract classes can't be instantiated.");
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
            json[prop] = this[prop].map(variableToObject);
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

  /**
   * Generate a setter function that throws if the parameter type is
   * different from the expected one(s).
   * @param {string} field - the field that you want to set
   * @param {any} param - the variable that you to be setted
   * @param {Array<string|types>} expectedTypes - the list of the authorized types for the param
   * @return {function} - the setter function corresponding to the arguments
   */
  generateSetterFunction(field, param, expectedTypes = []) {
    // at the end if paramHasAnExpectedType === false we should throw an error because
    // the param has not the expected type
    let paramHasAnExpectedType = false;
    if (expectedTypes.length === 0) { // we check if the array is not empty
      throw new Error('there must be at least one expected type');
    }
    expectedTypes.forEach(
      (type) => {
        // we check if the type is a primitive type : ['string','number','boolean',...]
        if (typeof (type) === 'string') {
          if (expectedTypes.includes(typeof (param))) {
            // we check if the param has a right expected primitive Type
            paramHasAnExpectedType = true;
          }
        } else if ((param instanceof type)) { // we check if the param has a right expected Type
          // the type is not a primitive type
          paramHasAnExpectedType = true;
        }
      },
    );
    if (!paramHasAnExpectedType) {
      throw new Error(`The parameter has an unexpected type. It should be one among this types : ${expectedTypes}`);
    }
    this[field] = param;
    return this;
  }

  /**
   * Generate an add item to a list function function that throws if the parameter type
   * is different from the expected one(s).
   * @param {string} field - the original list
   * @param {any} item - the item that you want to be added to the list
   * @param {Array<string|types>} expectedTypes - the list of the authorized types for item
   * @return {function} - the setter function corresponding to the arguments
   */
  generateAddItemToListFunction(field, item, expectedTypes = []) {
    // at the end if itemHasAnExpectedType === false we should throw an error because
    // the item has not the expected type
    let itemHasAnExpectedType = false;
    if (expectedTypes.length === 0) {
      throw new Error('there must be at least one expected type');
    }
    expectedTypes.forEach(
      (type) => {
        // we check if the type is a primitive type : ['string','number','boolean',...]
        if (typeof (type) === 'string') {
          if (expectedTypes.includes(typeof (item))) {
            // we check if the item has a right expected primitive Type
            itemHasAnExpectedType = true;
          }
          // the type is not a primitive type
        } else if ((item instanceof type)) { // we check if the item has a right expected Type
          itemHasAnExpectedType = true;
        }
      },
    );
    if (!itemHasAnExpectedType) {
      throw new Error(`The parameter has an unexpected type. It should be one among these types : ${expectedTypes}`);
    }

    if (!this[field]) {
      this[field] = [];
    }
    this[field].push(item);
    return this;
  }

  /**
   * Generate an add items to a list function function that throws if the parameter type
   * is different from the expected one(s).
   * @param {string} field - the original list
   * @param {Array<any>} items - the items that you want to be added to the list
   * @param {Array<string|types>} expectedTypes - the list of the authorized types for items
   * @return {function} - the setter function corresponding to the arguments
   */
  generateAddItemsToListFunction(field, items, expectedTypes = []) {
    // here checked is usefull in order to not iterate a loop if
    // all the items have one of the right expected types
    let checked = false;
    if (expectedTypes.length === 0) {
      throw new Error('there must be at least one expected type');
    }
    if (Array.isArray(items)) {
      expectedTypes.forEach(
        (type) => {
          // we check if the type is a primitive type : ['string','number','boolean',...]
          // and if all the items are not already checked
          if (!checked && typeof (type) === 'string') {
            for (let j = 0; j < items.length; j += 1) {
              if (!expectedTypes.includes(typeof (items[j]))) {
                // we check if the item has not a right expected primitive Type
                // in order to throw an Error
                throw new Error(`At least one of the items in the list is not a ${type}`);
              }
            }
            checked = true; // all the items has been checked
          } else if (!checked) { // if all the items are not already checked
            for (let j = 0; j < items.length; j += 1) {
              if (!(items[j] instanceof type)) {
                // we check if the item has not a right expected Type in order to throw an Error
                throw new Error('At least one of the items in the list has an unexpected type');
              }
            }
            checked = true; // all the items has been checked
          }
        },
      );

      if (!this[field]) {
        this[field] = [];
      }
      this[field] = [...this[field], ...items];
      return this;
    }
    throw new Error('The provided parameter has to be a list');
  }
}
