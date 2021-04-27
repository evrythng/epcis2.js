import ObjectEvent from '../src/entity/ObjectEvent'
import { expect } from 'chai'
import validateSchema from '../src/schema/validator';

describe('unit tests for the ObjectEvent class', () => {
  it('should use default settings', async () => {
    const o = new ObjectEvent()
    expect(o.isA).to.be.equal('ObjectEvent')
  })
  it('should not be a valid schema', async () => {
    const o = new ObjectEvent()
    console.log(validateSchema(o));
  })
})
