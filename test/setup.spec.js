import { expect } from 'chai'
import setup from '../src/setup'

describe('unit tests for setup.js', () => {
  it('should use default settings', async () => {
    const settings = setup({})
    expect(settings.eventTimeZoneOffset).to.be.equal('')
    expect(settings.endpoint).to.be.equal('https://epcis.evrythng.io/v2_0/')
    expect(settings.headers.toString()).to.be.equal({
      'content-type': 'application/json'
    }.toString())
  })
  it('should use custom settings', async () => {
    const settings = setup({
      endpoint: 'google.com',
      eventTimeZoneOffset: '-02:00',
      headers: {
        'content-type': 'application/json',
        authorization: 'abc'
      }
    })
    expect(settings.eventTimeZoneOffset).to.be.equal('-02:00')
    expect(settings.endpoint).to.be.equal('google.com')
    expect(settings.headers.toString()).to.be.equal({
      'content-type': 'application/json',
      authorization: 'abc'
    }.toString())
  })
})
