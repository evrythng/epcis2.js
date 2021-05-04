const { ObjectEvent, actionTypes, bizSteps, setup } = require('epcis2')

setup({
  endpoint: 'https://epcis.evrythng.io/v2_0/'
})

const objectEvent = new ObjectEvent()

objectEvent
  .setEventID('...ID')
  .setAction(actionTypes.observe)
  .setBizStep(bizSteps.inspecting)
  .addEPC('urn:epc:id:sgtin:4012345.011111.9876')
  .addEPC('urn:epc:id:sgtin:4012345.011111.9877') // You can add multiple EPCs to an event
  .setReadPoint('urn:epc:id:sgln:4012345.00005.0')

console.log(objectEvent.bizStep) // urn:epcglobal:cbv:bizstep:inspecting
console.log(objectEvent.action) // OBSERVE

console.log(objectEvent.toJSON())
/* output:
{
  isA: 'ObjectEvent',
  eventID: '...ID',
  action: 'OBSERVE',
  bizStep: 'urn:epcglobal:cbv:bizstep:inspecting',
  epcList: ['urn:epc:id:sgtin:4012345.011111.9876', 'urn:epc:id:sgtin:4012345.011111.9877'],
  readPoint: { id: 'urn:epc:id:sgln:4012345.00005.0' },
}
*/
