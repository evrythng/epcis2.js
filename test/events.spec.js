import ObjectEvent from '../src/entity/events/ObjectEvent'
import { expect } from 'chai'

const JSONObjectEvent = {
  eventID: 'ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0',
  isA: 'ObjectEvent',
  action: 'OBSERVE',
  bizStep: 'urn:epcglobal:cbv:bizstep:shipping',
  disposition: 'urn:epcglobal:cbv:disp:in_transit',
  epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
  eventTime: '2005-04-03T20:33:31.116-06:00',
  recordTime: '2020-04-04T20:33:31.116-06:00',
  eventTimeZoneOffset: '-06:00',
  readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
  bizTransactionList: [{
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345678'
  }],
  errorDeclaration: {
    declarationTime: '2020-01-15T00:00:00+01:00',
    reason: 'urn:epcglobal:cbv:er:incorrect_data',
    'example:vendorExtension': 'Test1',
    correctiveEventIDs: [
      'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'
    ]
  }
}
const epc1 = JSONObjectEvent.epcList[0]
const epc2 = JSONObjectEvent.epcList[1]
const epc3 = 'urn:epc:id:sgtin:0614141.107346.2019'

describe('unit tests for the ObjectEvent class', () => {
  it('should use default settings', async () => {
    const o = new ObjectEvent()
    expect(o.isA).to.be.equal('ObjectEvent')
  })
  it('setters should set the variables correctly', async () => {
    const o = new ObjectEvent()
    o.setEventID(JSONObjectEvent.eventID)
      .addEPCList(JSONObjectEvent.epcList)
      .setEventTime(JSONObjectEvent.eventTime)
      .setEventTimeZoneOffset(JSONObjectEvent.eventTimeZoneOffset)
      .setRecordTime(JSONObjectEvent.recordTime)

    const json = o.toJSON()
    expect(json.epcList.toString()).to.be.equal(JSONObjectEvent.epcList.toString())
    expect(json.eventID).to.be.equal(JSONObjectEvent.eventID)
    expect(json.eventTime).to.be.equal(JSONObjectEvent.eventTime)
    expect(json.eventTimeZoneOffset).to.be.equal(JSONObjectEvent.eventTimeZoneOffset)
    expect(json.recordTime).to.be.equal(JSONObjectEvent.recordTime)
  })
  it('should be able to set the time zone offset from number or string', async () => {
    const o1 = new ObjectEvent()
    const o2 = new ObjectEvent()
    o1.setEventTimeZoneOffset('-06:00')
    o2.setEventTimeZoneOffset(-6)
    expect(o1.eventTimeZoneOffset.toString()).to.be.equal(o2.eventTimeZoneOffset.toString())
  })
  it('should add and remove epc', async () => {
    const o = new ObjectEvent()
    o.addEPC(epc1)
    expect(o.epcList.toString()).to.be.equal([epc1].toString())
    o.addEPC(epc2)
    expect(o.epcList.toString()).to.be.equal([epc1, epc2].toString())
    o.removeEPC(epc1)
    expect(o.epcList.toString()).to.be.equal([epc2].toString())
    o.removeEPC(epc2)
    expect(o.epcList.toString()).to.be.equal([].toString())
  })
  it('should add an epc list', async () => {
    const o = new ObjectEvent()
    o.addEPCList(JSONObjectEvent.epcList)
    expect(o.epcList.toString()).to.be.equal(JSONObjectEvent.epcList.toString())
    o.removeEPC(epc1)
    o.removeEPC(epc2)

    // trying again but with a non-empty list
    o.addEPC(epc3)
    expect(o.epcList.toString()).to.be.equal([epc3].toString())
    o.addEPCList(JSONObjectEvent.epcList)
    expect(o.epcList.toString()).to.be.equal([epc3, epc1, epc2].toString())
  })
  it('should remove an epc list', async () => {
    const o = new ObjectEvent()
    o.addEPCList([...JSONObjectEvent.epcList, epc3])
    o.removeEPCList(JSONObjectEvent.epcList)
    expect(o.epcList.toString()).to.be.equal([epc3].toString())

    // trying again but removing the whole list
    o.addEPC(epc2)
    o.removeEPCList([epc2, epc3])
    expect(o.epcList.toString()).to.be.equal([].toString())
  })
  it('should clear the epc list', async () => {
    const o = new ObjectEvent()
    o.addEPCList([...JSONObjectEvent.epcList, epc3])
    o.clearEPCList()
    expect(o.epcList.toString()).to.be.equal([].toString())
  })
  it('should set automatically time zone offset', async () => {
    const o = new ObjectEvent()
    const date = new Date(Date.now())
    o.setEventTime(date)
    expect(o.eventTimeZoneOffset.toMinutes()).to.be.equal(date.getTimezoneOffset())
  })
  it('should not override time zone offset', async () => {
    const o = new ObjectEvent()
    const date = new Date(Date.now())
    o.setEventTimeZoneOffset((date.getTimezoneOffset() + 60) / 60) // add one hour to the actual offset
    o.setEventTime(date)
    expect(o.eventTimeZoneOffset.toMinutes()).to.be.equal((date.getTimezoneOffset() + 60))
  })
})
