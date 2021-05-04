import { assert } from 'chai'
import { validateSchema } from '../src'

/** Test documents with different event types inside */
const testData = {
  invalid: { foo: 'bar' },
  ObjectEvent: require('./data/EPCISDocument-ObjectEvent.json'),
  AggregationEvent: require('./data/EPCISDocument-AggregationEvent.json'),
  TransformationEvent: require('./data/EPCISDocument-TransformationEvent.json'),
  AssociationEvent: require('./data/EPCISDocument-AssociationEvent.json'),
  QueryDocument: require('./data/EPCISQueryDocument.json'),
  MasterDataDocument: require('./data/EPCISMasterDataDocument.json')
}

describe('validation of an EPCIS document', () => {
  describe('schema validation: valid', () => {
    it('should accept a valid EPCISDocument containing ObjectEvent', () => {
      assert.doesNotThrow(() => validateSchema(testData.ObjectEvent))
    })

    it('should accept a valid EPCISDocument containing AggregationEvent', () => {
      assert.doesNotThrow(() => validateSchema(testData.AggregationEvent))
    })

    it('should accept a valid EPCISDocument containing TransactionEvent')

    it('should accept a valid EPCISDocument containing TransformationEvent', () => {
      assert.doesNotThrow(() => validateSchema(testData.TransformationEvent))
    })

    it('should accept a valid EPCISDocument containing AssociationEvent', () => {
      assert.doesNotThrow(() => validateSchema(testData.AssociationEvent))
    })

    it('should accept a valid EPCISQueryDocument', () => {
      assert.doesNotThrow(() => validateSchema(testData.QueryDocument))
    })

    it('should accept a valid EPCISMasterDataDocument', () => {
      assert.doesNotThrow(() => validateSchema(testData.MasterDataDocument))
    })

    // Not currently fully defined at the vocabulary level
    // See: https://github.com/gs1/EPCIS/blob/master/REST%20Bindings/openapi.yaml#L3842
    it('should accept a valid EPCISMasterDataDocument and validate the vocabulary')
  })

  describe('schema validation: invalid', () => {
    it('should reject an invalid object', () => {
      assert.throws(() => validateSchema(testData.invalid))
    })

    it('should reject an invalid EPCISDocument', () => {
      const copy = { ...testData.ObjectEvent }

      // Omit the events
      const { epcisBody, ...instance } = copy

      assert.throws(() => validateSchema(instance))
    })

    it('should reject a valid EPCISDocument containing an invalid ObjectEvent', () => {
      const instance = { ...testData.ObjectEvent }

      // Introduce some error
      instance.epcisBody.eventList[0].action = 'OBSERVED'

      assert.throws(() => validateSchema(instance))
    })

    it('should reject a valid EPCISDocument containing an invalid AggregationEvent', () => {
      const instance = { ...testData.AggregationEvent }

      // Introduce some error
      instance.epcisBody.eventList[0].parentID = 'somebadid'

      assert.throws(() => validateSchema(instance))
    })

    it('should reject a valid EPCISDocument containing an invalid TransactionEvent')

    it('should reject a valid EPCISDocument containing an invalid TransformationEvent', () => {
      const instance = { ...testData.TransformationEvent }

      // Introduce some error
      instance.epcisBody.eventList[0].eventTimeZoneOffset = '19:00'

      assert.throws(() => validateSchema(instance))
    })

    it('should reject a valid EPCISDocument containing an invalid AssociationEvent', () => {
      const instance = { ...testData.AssociationEvent }

      // Introduce some error
      instance.epcisBody.eventList[0].action = 'ADDED'

      assert.throws(() => validateSchema(instance))
    })

    it('should reject an invalid EPCISQueryDocument', () => {
      const copy = { ...testData.QueryDocument }

      // Omit the query results
      const instance = {
        ...copy,
        epcisBody: {}
      }

      assert.throws(() => validateSchema(instance))
    })

    it('should reject an invalid EPCISMasterDataDocument', () => {
      const copy = { ...testData.MasterDataDocument }

      // Omit the header
      const { epcisHeader, ...instance } = copy

      assert.throws(() => validateSchema(instance))
    })

    // See 'should accept a valid EPCISMasterDataDocument and validate the vocabulary'
    // equivalent test for details
    it('should reject a valid EPCISMasterDataDocument containing invalid vocabulary')
  })
})
