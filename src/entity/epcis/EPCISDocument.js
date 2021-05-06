import Entity from '../Entity';

export default class EPCISDocument extends Entity {
  /**
   * You can either create an empty EPCISDocument or provide an already existing EPCIS document via
   * Map
   * @param {Object} [epcisDocument] - The Map that will be used to create the EPCISDocument entity
   */
  constructor(epcisDocument) {
    super(epcisDocument);
    this.isA = 'EPCISDocument';

    if (!epcisDocument) {
      return;
    }

    // Create classes for sub-objects that are provided
    Object.entries(epcisDocument).forEach(([key, value]) => {

    });
  }

  /**
   * Set the context property
   * @param {string|Object|Array<string>|Array<Object>} context
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setContext(context) {
    this['@context'] = context;
    return this;
  }

  /**
   * Getter for the context property
   * @return {string|Object|Array<string>|Array<Object>} - the context
   */
  getContext() {
    return this['@context'];
  }

  /**
   * Set the schemaVersion property
   * @param {number} schemaVersion
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setSchemaVersion(schemaVersion) {
    this.schemaVersion = schemaVersion;
    return this;
  }

  /**
   * Getter for the schemaVersion property
   * @return {number} - the schemaVersion
   */
  getSchemaVersion() {
    return this.schemaVersion;
  }

  /**
   * Set the creationDate property
   * @param {string} creationDate
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setCreationDate(creationDate) {
    this.creationDate = creationDate;
    return this;
  }

  /**
   * Getter for the creationDate property
   * @return {string} - the creationDate
   */
  getCreationDate() {
    return this.creationDate;
  }

  /**
   * Set the format property
   * @param {string} format
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setFormat(format) {
    this.format = format;
    return this;
  }

  /**
   * Getter for the format property
   * @return {string} - the format
   */
  getFormat() {
    return this.format;
  }
}
