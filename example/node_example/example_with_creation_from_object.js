/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const { ObjectEvent, setup, EPCISDocument, capture, fieldNames, eventEpcRelType } = require('epcis2.js');

// you can override the global parameter with the setup function
setup({
  apiUrl: 'https://api.evrythng.io/v2/epcis/',
  EPCISDocumentContext: 'https://id.gs1.org/epcis-context.jsonld',
  EPCISDocumentSchemaVersion: '2.0',
  headers: {
    'content-type': 'application/json',
    authorization: 'MY_API_KEY',
  },
});

const sendACaptureRequestExample = async () => {
  const epcisDocument = new EPCISDocument({
    '@context': [
      'https://gs1.github.io/EPCIS/epcis-context.jsonld',
      {
        example: 'http://ns.example.com/epcis/',
      },
    ],
    type: 'EPCISDocument',
    creationDate: '2005-07-11T11:30:47.0Z',
    epcisBody: {
      eventList: [
        {
          type: 'ObjectEvent',
          eventID: 'test-sdk-demo:2',
          action: 'OBSERVE',
          bizStep: 'shipping',
          disposition: 'in_transit',
          epcList: ['urn:epc:id:sgtin:0614141.107346.2017', 'urn:epc:id:sgtin:0614141.107346.2018'],
          eventTime: '2005-04-03T20:33:31.116-06:00',
          eventTimeZoneOffset: '-06:00',
          readPoint: {
            id: 'urn:epc:id:sgln:0614141.07346.1234',
          },
          bizTransactionList: [
            {
              type: 'po',
              bizTransaction: 'http://transaction.acme.com/po/12345678',
            },
          ],
        },
      ],
    },
  });

  epcisDocument.eventList[0].generateHashID({
    example: 'http://ns.example.com/epcis/',
  });
  console.log(`The generated id is: ${epcisDocument.eventList[0].getEventID()}`);

  console.log(`epcisDocument (toString): ${epcisDocument.toString()}`);

  const res = await capture(epcisDocument);
  const text = await res.text();
  console.log(`Request status: ${res.status}`);
  console.log(`Request response: ${text}`);

  console.log(`EPCISDocument is valid ? ${epcisDocument.isValid()}`);
  console.log(`ObjectEvent is valid ? ${epcisDocument.eventList[0].isValid()}`);

  
  console.log(`field names of an EPCIS Document:`);
  console.log(fieldNames.epcisDocument);
  
  console.log(`example of constant from constants.js:`);
  console.log(eventEpcRelType.epcList)
};

sendACaptureRequestExample();
