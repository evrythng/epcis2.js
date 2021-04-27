import ObjectEvent from '../src/entity/ObjectEvent'
import { expect } from 'chai'

describe('unit tests for the ObjectEvent class', () => {
  it('should use default settings', async () => {
    const o = new ObjectEvent()
    expect(o.isA).to.be.equal('ObjectEvent')
  })
})
