import { objectToJSON } from '../utils/utils'

export default class Entity {
  /**
   * You can either create an empty Entity or provide an already existing Entity via Map
   * @param {{}} [entity] - The Map that will be used to create the entity
   */
  constructor (entity) {
    if (new.target === Entity) {
      throw new Error("Abstract classes can't be instantiated.")
    }

    if (!arguments.length) {
      // create an empty Entity object
      return
    }

    for (const prop in entity) {
      if (entity.hasOwnProperty(prop)) {
        this[prop] = entity[prop]
      }
    }
  }

  /**
   * @param {string} key
   * @param {string} value
   * @return {Entity} - the entity instance
   */
  addExtension (key, value) {
    this[key] = value
    return this
  }

  /**
   * @param {string} key
   * @return {Entity} - the entity instance
   */
  removeExtension (key) {
    delete this[key]
    return this
  }

  /**
   * Return a JSON object corresponding to the SourceElement object
   */
  toJSON () {
    const json = {}

    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (typeof this[prop].push === 'function') {
          if (!this[prop].length) {
            json[prop] = []
          } else {
            json[prop] = []
            this[prop].forEach((e) => json[prop].push(objectToJSON(e)))
          }
        } else {
          json[prop] = objectToJSON(this[prop])
        }
      }
    }

    return json
  }

  /**
   * @returns {string} - a string corresponding to the Entity object
   */
  toString () {
    return JSON.stringify(this.toJSON())
  }
}
