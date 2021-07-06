/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const {
  setup,
  EPCISDocument,
  capture,
} = require('epcis2.js');

// you can override the global parameter with the setup function
setup({
  apiUrl: 'https://api.evrythng.io/v2/epcis/',
  EPCISDocumentContext: 'https://id.gs1.org/epcis-context.jsonld',
  EPCISDocumentSchemaVersion: '1.2',
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
    isA: 'EPCISDocument',
    schemaVersion: '1.2',
    creationDate: '2005-07-11T11:30:47.0Z',
    format: 'application/ld+json',
    epcisBody: {
      eventList: [
        {
          isA: 'ObjectEvent',
          eventID: 'test-sdk-demo:2',
          action: 'OBSERVE',
          bizStep: 'urn:epcglobal:cbv:bizstep:shipping',
          disposition: 'urn:epcglobal:cbv:disp:in_transit',
          epcList: [
            'urn:epc:id:sgtin:0614141.107346.2017',
            'urn:epc:id:sgtin:0614141.107346.2018',
          ],
          eventTime: '2005-04-03T20:33:31.116-06:00',
          eventTimeZoneOffset: '-06:00',
          readPoint: {
            id: 'urn:epc:id:sgln:0614141.07346.1234',
          },
          bizTransactionList: [
            {
              type: 'urn:epcglobal:cbv:btt:po',
              bizTransaction: 'http://transaction.acme.com/po/12345678',
            },
          ],
          'example:field': 'customFieldValue',
        },
      ],
    },
  });

  epcisDocument.eventList[0].generateHashID({
    example: 'http://ns.example.com/epcis/',
  });
  console.log('The generated id is:');
  console.log(epcisDocument.eventList[0].getEventID());

  console.log('epcisDocument (toString): ');
  console.log(epcisDocument.toString());

  const res = (await capture(epcisDocument));
  const text = (await res.text());
  console.log('\nRequest status: ');
  console.log(res.status);
  console.log('\nRequest response: ');
  console.log(text);
};

sendACaptureRequestExample();
