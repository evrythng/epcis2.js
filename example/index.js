/* eslint-disable no-console */

const {
  ObjectEvent, actionTypes, bizSteps, setup, EPCISDocument,
} = require('epcis2');

setup({
  apiUrl: 'https://epcis.evrythng.io/v2_0/',
});

const objectEvent = new ObjectEvent();
const epcisDocument = new EPCISDocument();

objectEvent
  .setEventID('...ID')
  .setAction(actionTypes.observe)
  .setBizStep(bizSteps.inspecting)
  .addEPC('urn:epc:id:sgtin:4012345.011111.9876')
  .addEPC('urn:epc:id:sgtin:4012345.011111.9877') // You can add multiple EPCs to an event
  .setReadPoint('urn:epc:id:sgln:4012345.00005.0');

console.log(objectEvent.getBizStep()); // urn:epcglobal:cbv:bizstep:inspecting
console.log(objectEvent.getAction()); // OBSERVE

console.log(objectEvent.toObject());
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

epcisDocument.addEvent(objectEvent);
console.log(epcisDocument.toString());
/* output:
{"isA":"EPCISDocument","epcisBody":{"eventList":[{"isA":"ObjectEvent","eventID":"...ID",
"action":"OBSERVE","bizStep":"urn:epcglobal:cbv:bizstep:inspecting","epcList":
["urn:epc:id:sgtin:4012345.011111.9876","urn:epc:id:sgtin:4012345.011111.9877"],
"readPoint":{"id":"urn:epc:id:sgln:4012345.00005.0"}}]}}
 */
