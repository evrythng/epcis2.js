const Ajv = require('ajv');
const EPCISDocument = require('./EPCISDocument.schema.json');

const ajv = new Ajv({ useDefaults: true });

/** Available schemas */
const validators = {
  EPCISDocument: ajv.compile(EPCISDocument),
};

/**
 * Validate an EPCIS document.
 *
 * @param {object} instance - The data to validate against the schema.
 * @returns {Array<string>} Any errors.
 */
const validateSchema = (instance) => {
  const test = validators.EPCISDocument;
  if (!test(instance)) {
    const [{ dataPath, message }] = test.errors;
    throw new Error(`${dataPath}: ${message}`);
  }
};

export default validateSchema;
