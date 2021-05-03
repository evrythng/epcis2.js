import ObjectEvent from '../src/entity/events/ObjectEvent'
import { expect } from 'chai'
import ErrorDeclaration from '../src/entity/model/ErrorDeclaration'
import QuantityElement from '../src/entity/model/QuantityElement'
import setup from '../src/setup'
import { defaultSettings } from '../src/settings'
import PersistentDisposition from '../src/entity/model/PersistentDisposition'
import ReadPoint from '../src/entity/model/ReadPoint'
import BizLocation from '../src/entity/model/BizLocation'

const JSONObjectEvent = {
  eventID: 'ni:///sha-256;df7bb3c352fef055578554f09f5e2aa41782150ced7bd0b8af24dd3ccb30ba69?ver=CBV2.0',
  isA: 'ObjectEvent',
  action: 'OBSERVE',
  bizStep: 'urn:epcglobal:cbv:bizstep:shipping',
  disposition: 'urn:epcglobal:cbv:disp:in_transit',
  bizLocation: { id: 'urn:epc:id:sgln:9529999.99999.0' },
  epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
  eventTime: '2005-04-03T20:33:31.116-06:00',
  recordTime: '2020-04-04T20:33:31.116-06:00',
  eventTimeZoneOffset: '-06:00',
  readPoint: { id: 'urn:epc:id:sgln:0614141.07346.1234' },
  bizTransactionList: [{
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345678'
  }],
  'example:myField': 'Example of a vendor/user extension',
  quantityList: [
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998877', quantity: 200, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998878', quantity: 201, uom: 'KGM' },
    { epcClass: 'urn:epc:class:lgtin:4012345.012345.998879', quantity: 202, uom: 'KGM' }
  ],
  errorDeclaration: {
    declarationTime: '2020-01-15T00:00:00.000+01:00',
    reason: 'urn:epcglobal:cbv:er:incorrect_data',
    'example:vendorExtension': 'Test1',
    correctiveEventIDs: [
      'urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'
    ]
  },
  persistentDisposition: {
    set: ['urn:epcglobal:cbv:disp:completeness_inferred'],
    unset: ['urn:epcglobal:cbv:disp:completeness_verified']
  }
}
const epc1 = JSONObjectEvent.epcList[0]
const epc2 = JSONObjectEvent.epcList[1]
const epc3 = 'urn:epc:id:sgtin:0614141.107346.2019'

describe('unit tests for the ObjectEvent class', () => {
  beforeEach((done) => {
    setup(defaultSettings)
    done()
  })
  it('should use default values', async () => {
    const o = new ObjectEvent()
    expect(o.isA).to.be.equal('ObjectEvent')
  })
  it('should not use eventTimeZoneOffset from settings if it is not overridden', async () => {
    setup({})
    const o = new ObjectEvent()
    expect(o.eventTimeZoneOffset).to.be.equal(undefined)
  })
  it('should use eventTimeZoneOffset from settings if it is overridden', async () => {
    setup({ eventTimeZoneOffset: '+02:00' })
    const o = new ObjectEvent()
    expect(o.eventTimeZoneOffset).to.be.equal('+02:00')
  })
  it('setters should set the variables correctly', async () => {
    const o = new ObjectEvent()
    o.setEventID(JSONObjectEvent.eventID)
      .addEPCList(JSONObjectEvent.epcList)
      .setEventTime(JSONObjectEvent.eventTime)
      .setRecordTime(JSONObjectEvent.recordTime)
      .setErrorDeclaration(new ErrorDeclaration(JSONObjectEvent.errorDeclaration))
      .addCustomField('example:myField', JSONObjectEvent['example:myField'])
      .setAction(JSONObjectEvent.action)
      .setDisposition(JSONObjectEvent.disposition)
      .setBizStep(JSONObjectEvent.bizStep)
      .setPersistentDisposition(new PersistentDisposition(JSONObjectEvent.persistentDisposition))
      .setReadPoint(JSONObjectEvent.readPoint.id)
      .setBizLocation(JSONObjectEvent.bizLocation.id)

    const json = o.toJSON()
    expect(json.epcList.toString()).to.be.equal(JSONObjectEvent.epcList.toString())
    expect(json.eventID).to.be.equal(JSONObjectEvent.eventID)
    expect(json.eventTime).to.be.equal(JSONObjectEvent.eventTime)
    expect(json.eventTimeZoneOffset).to.be.equal(JSONObjectEvent.eventTimeZoneOffset)
    expect(json.recordTime).to.be.equal(JSONObjectEvent.recordTime)
    expect(json['example:myField']).to.be.equal(JSONObjectEvent['example:myField'])
    expect(json.errorDeclaration.declarationTime).to.be.equal(JSONObjectEvent.errorDeclaration.declarationTime)
    expect(json.errorDeclaration.reason).to.be.equal(JSONObjectEvent.errorDeclaration.reason)
    expect(json.errorDeclaration.correctiveEventIDs.toString()).to.be.equal(JSONObjectEvent.errorDeclaration.correctiveEventIDs.toString())
    expect(json.errorDeclaration['example:vendorExtension']).to.be.equal(JSONObjectEvent.errorDeclaration['example:vendorExtension'])
    expect(json.action).to.be.equal(JSONObjectEvent.action)
    expect(json.disposition).to.be.equal(JSONObjectEvent.disposition)
    expect(json.bizStep).to.be.equal(JSONObjectEvent.bizStep)
    expect(json.persistentDisposition.unset.toString()).to.be.equal(JSONObjectEvent.persistentDisposition.unset.toString())
    expect(json.persistentDisposition.set.toString()).to.be.equal(JSONObjectEvent.persistentDisposition.set.toString())
    expect(json.readPoint.id).to.be.equal(JSONObjectEvent.readPoint.id)
  })
  it('should create an ObjectEvent from json', async () => {
    const o = new ObjectEvent(JSONObjectEvent)

    const json = o.toJSON()
    expect(json.epcList.toString()).to.be.equal(JSONObjectEvent.epcList.toString())
    expect(json.eventID).to.be.equal(JSONObjectEvent.eventID)
    expect(json.eventTime).to.be.equal(JSONObjectEvent.eventTime)
    expect(json.eventTimeZoneOffset).to.be.equal(JSONObjectEvent.eventTimeZoneOffset)
    expect(json.recordTime).to.be.equal(JSONObjectEvent.recordTime)
    expect(json['example:myField']).to.be.equal(JSONObjectEvent['example:myField'])
    expect(json.errorDeclaration.declarationTime).to.be.equal(JSONObjectEvent.errorDeclaration.declarationTime)
    expect(json.errorDeclaration.reason).to.be.equal(JSONObjectEvent.errorDeclaration.reason)
    expect(json.errorDeclaration.correctiveEventIDs.toString()).to.be.equal(JSONObjectEvent.errorDeclaration.correctiveEventIDs.toString())
    expect(json.errorDeclaration['example:vendorExtension']).to.be.equal(JSONObjectEvent.errorDeclaration['example:vendorExtension'])
    expect(json.action).to.be.equal(JSONObjectEvent.action)
    expect(json.bizStep).to.be.equal(JSONObjectEvent.bizStep)
    expect(json.disposition).to.be.equal(JSONObjectEvent.disposition)
    expect(json.persistentDisposition.unset.toString()).to.be.equal(JSONObjectEvent.persistentDisposition.unset.toString())
    expect(json.persistentDisposition.set.toString()).to.be.equal(JSONObjectEvent.persistentDisposition.set.toString())
    expect(json.epcList.toString()).to.be.equal(JSONObjectEvent.epcList.toString())
    expect(json.quantityList.toString()).to.be.equal(JSONObjectEvent.quantityList.toString())
    expect(json.bizLocation.id).to.be.equal(JSONObjectEvent.bizLocation.id)
  })
  it('should be able to set the time zone offset from number or string', async () => {
    const o1 = new ObjectEvent()
    const o2 = new ObjectEvent()
    o1.setEventTimeZoneOffset('-06:00')
    o2.setEventTimeZoneOffset(-6)
    expect(o1.toJSON().eventTimeZoneOffset).to.be.equal(o2.toJSON().eventTimeZoneOffset)
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
    expect(o.epcList).to.be.equal(undefined)
  })
  it('should not add the epc list to JSON if it is not defined', async () => {
    const o = new ObjectEvent()
    const json = o.toJSON()
    expect(json.epcList).to.be.equal(undefined)
  })
  it('should add a custom field', async () => {
    const objectEvent = new ObjectEvent()
    objectEvent.addCustomField('key', 'value')
    expect(objectEvent.toJSON().key).to.be.equal(('value'))
  })
  it('should remove a custom field', async () => {
    const objectEvent = new ObjectEvent()
    objectEvent.addCustomField('key', 'value')
    objectEvent.addEPC(epc1)
    objectEvent.removeCustomField('key', 'value')
    expect(objectEvent.toJSON().toString()).to.be.equal({ epcList: [epc1] }.toString())
  })

  const quantity1 = new QuantityElement(JSONObjectEvent.quantityList[0])
  const quantity2 = new QuantityElement(JSONObjectEvent.quantityList[1])
  const quantity3 = new QuantityElement(JSONObjectEvent.quantityList[2])

  it('should add and remove quantity', async () => {
    const o = new ObjectEvent()
    o.addQuantity(quantity1)
    expect(o.quantityList.toString()).to.be.equal([quantity1].toString())
    o.addQuantity(quantity2)
    expect(o.quantityList.toString()).to.be.equal([quantity1, quantity2].toString())
    o.removeQuantity(quantity1)
    expect(o.quantityList.toString()).to.be.equal([quantity2].toString())
    o.removeQuantity(quantity2)
    expect(o.quantityList.toString()).to.be.equal([].toString())
  })
  it('should add a quantity list', async () => {
    const o = new ObjectEvent()
    o.addQuantityList([quantity1, quantity2])
    expect(o.quantityList.toString()).to.be.equal([quantity1, quantity2].toString())
    o.removeQuantity(quantity1)
    o.removeQuantity(quantity2)

    // trying again but with a non-empty list
    o.addQuantity(quantity3)
    expect(o.quantityList.toString()).to.be.equal([quantity3].toString())
    o.addQuantityList([quantity1, quantity2])
    expect(o.quantityList.toString()).to.be.equal([quantity3, quantity1, quantity2].toString())
  })
  it('should remove a quantity list', async () => {
    const o = new ObjectEvent()
    o.addQuantityList([quantity1, quantity2, quantity3])
    o.removeQuantityList([quantity1, quantity2])
    expect(o.quantityList.toString()).to.be.equal([quantity3].toString())

    // trying again but removing the whole list
    o.addQuantity(quantity2)
    o.removeQuantityList([quantity2, quantity3])
    expect(o.quantityList.toString()).to.be.equal([].toString())
  })
  it('should clear the quantity list', async () => {
    const o = new ObjectEvent()
    o.addQuantityList([quantity1, quantity2])
    o.clearQuantityList()
    expect(o.quantityList).to.be.equal(undefined)
  })
  it('should not add the quantity list to JSON if it is not defined', async () => {
    const o = new ObjectEvent()
    const json = o.toJSON()
    expect(json.quantityList).to.be.equal(undefined)
  })
  it('should set the readPoint with ID or ReadPoint instance', async () => {
    const o = new ObjectEvent()
    const o2 = new ObjectEvent()
    o.setReadPoint('readPointID')
    o2.setReadPoint(new ReadPoint({ id: 'readPointID' }))
    expect(o.readPoint.id).to.be.equal('readPointID')
    expect(o2.readPoint.id).to.be.equal('readPointID')
  })
  it('should set the bizLocation with ID or BizLocation instance', async () => {
    const o = new ObjectEvent()
    const o2 = new ObjectEvent()
    o.setBizLocation('id')
    o2.setBizLocation(new BizLocation({ id: 'id' }))
    expect(o.bizLocation.id).to.be.equal('id')
    expect(o2.bizLocation.id).to.be.equal('id')
  })
})
