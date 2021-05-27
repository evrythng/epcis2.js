/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */

import React, { useEffect } from 'react';
import {
  ObjectEvent,
  actionTypes,
  bizSteps,
  setup,
  EPCISDocument,
  capture,
  dispositions,
  BizTransactionElement,
} from 'epcis2.js';
import logo from './logo.svg';
import './App.css';

// you can override the global parameter with the setup function
setup({
  apiUrl: 'https://api.evrythng.io/v2/epcis/',
  EPCISDocumentContext: 'https://id.gs1.org/epcis-context.jsonld',
  EPCISDocumentSchemaVersion: 1.2,
  headers: {
    'content-type': 'application/json',
    authorization: 'MY_API_KEY',
  },
});

const sendACaptureRequestExample = async () => {
  const objectEvent = new ObjectEvent();
  const epcisDocument = new EPCISDocument();
  const bizTransaction = new BizTransactionElement({
    type: 'urn:epcglobal:cbv:btt:po',
    bizTransaction: 'http://transaction.acme.com/po/12345678',
  });

  objectEvent
    .setEventTime('2005-04-03T20:33:31.116-06:00')
    .addEPC('urn:epc:id:sgtin:0614141.107346.2020')
    .addEPC('urn:epc:id:sgtin:0614141.107346.2021')
    .setAction(actionTypes.observe)
    .setEventID('ni:///sha-256;87b5f18a69993f0052046d4687dfacdf48f?ver=CBV2.0')
    .setBizStep(bizSteps.shipping)
    .setDisposition(dispositions.in_transit)
    .setReadPoint('urn:epc:id:sgln:0614141.07346.1234')
    .addBizTransaction(bizTransaction);

  epcisDocument
    .setCreationDate('2005-07-11T11:30:47+00:00')
    .setFormat('application/ld+json')
    .addEvent(objectEvent);

  await capture(epcisDocument);
};

function App() {
  useEffect(() => {
    sendACaptureRequestExample();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit
        {' '}
        <code>src/App.js</code>
        {' '}
        and save to reload.
      </p>
    </div>
  );
}

export default App;
