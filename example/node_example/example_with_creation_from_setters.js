/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const {
  ObjectEvent,
  cbv,
  setup,
  EPCISDocument,
  capture,
  BizTransactionElement,
} = require('epcis2.js');

// you can override the global parameter with the setup function
setup({
  apiUrl: 'https://api.evrythng.io/v2/epcis/',
  EPCISDocumentContext: 'https://ref.gs1.org/standards/epcis/2.0/epcis-context.jsonld',
  EPCISDocumentSchemaVersion: '2.0',
  headers: {
    'content-type': 'application/json',
    authorization: 'MY_API_KEY',
  },
});

const sendACaptureRequestExample = async () => {
  const objectEvent = new ObjectEvent();
  const epcisDocument = new EPCISDocument();
  const bizTransaction = new BizTransactionElement({
    type: 'po',
    bizTransaction: 'http://transaction.acme.com/po/12345678',
  });

  objectEvent
    .setEventTime('2005-04-03T20:33:31.116-06:00')
    .addEPC('urn:epc:id:sgtin:0614141.107346.2020')
    .addEPC('urn:epc:id:sgtin:0614141.107346.2021')
    .setAction(cbv.actionTypes.observe)
    .setEventID('ni:///sha-256;87b5f18a69993f0052046d4687dfacdf48f?ver=CBV2.0')
    .setBizStep(cbv.bizSteps.shipping)
    .setDisposition(cbv.dispositions.in_transit)
    .setReadPoint('urn:epc:id:sgln:0614141.07346.1234')
    .addBizTransaction(bizTransaction);

  epcisDocument.setCreationDate('2005-07-11T11:30:47+00:00').addEvent(objectEvent);

  console.log(`BizStep of the object event: ${objectEvent.getBizStep()}`);
  console.log(`Action of the object event: ${objectEvent.getAction()}`);
  console.log('objectEvent: ');
  console.log(objectEvent.toObject());
  console.log(`epcisDocument (toString): ${epcisDocument.toString()}`);

  const res = await capture(epcisDocument);
  const text = await res.text();
  console.log(`Request status: ${res.status}`);
  console.log(`Request response: ${text}`);

  console.log(`EPCISDocument is valid ? ${epcisDocument.isValid()}`);
  console.log(`ObjectEvent is valid ? ${epcisDocument.eventList[0].isValid()}`);
};

sendACaptureRequestExample();
