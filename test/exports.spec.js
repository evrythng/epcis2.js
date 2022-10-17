/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import * as sdk from '../src';

import EPCISDocumentObjectEvent from './data/EPCISDocument-ObjectEvent.json';
import EPCISObjectEventSchema from '../src/schema/ObjectEvent.schema.json';

describe('All the functions should be well exported', () => {
  it('EPCISDocument', async () => {
    const EpcisDocument = new sdk.EPCISDocument();
    EpcisDocument.setType('test');
    expect(EpcisDocument.getType()).to.be.equal('test');
  });
  it('EPCISMasterData', async () => {
    const EpcisMasterData = new sdk.EPCISMasterData();
    const vocabularyList = [new sdk.Vocabulary(), new sdk.Vocabulary()];
    EpcisMasterData.addVocabularyList(vocabularyList);
    expect(EpcisMasterData.getVocabularyList().toString()).to.be.equal(vocabularyList.toString());
  });
  it('EPCISHeader', async () => {
    const EpcisHeader = new sdk.EPCISHeader();
    const EpcisMasterData = new sdk.EPCISMasterData();
    EpcisHeader.setEPCISMasterData(EpcisMasterData);
    expect(EpcisHeader.getEPCISMasterData()).to.be.equal(EpcisMasterData);
  });
  it('ObjectEvent', async () => {
    const ov = new sdk.ObjectEvent();
    ov.setRecordTime('test');
    expect(ov.getRecordTime()).to.be.equal('test');
  });
  it('ExtendedEvent', async () => {
    const ov = new sdk.ExtendedEvent();
    ov.setRecordTime('test');
    expect(ov.getRecordTime()).to.be.equal('test');
  });
  it('TransformationEvent', async () => {
    const ov = new sdk.TransformationEvent();
    ov.setRecordTime('test');
    expect(ov.getRecordTime()).to.be.equal('test');
  });
  it('AggregationEvent', async () => {
    const ov = new sdk.AggregationEvent();
    ov.setRecordTime('test');
    expect(ov.getRecordTime()).to.be.equal('test');
  });
  it('AssociationEvent', async () => {
    const ov = new sdk.AssociationEvent();
    ov.setRecordTime('test');
    expect(ov.getRecordTime()).to.be.equal('test');
  });
  it('TransactionEvent', async () => {
    const ov = new sdk.TransactionEvent();
    ov.setRecordTime('test');
    expect(ov.getRecordTime()).to.be.equal('test');
  });
  it('SensorElement', async () => {
    const sensorElement = new sdk.SensorElement();
    const sensorReportElement = new sdk.SensorReportElement();
    sensorElement.addSensorReport(sensorReportElement);
    expect(
      sensorElement.getSensorReport().toString(),
    ).to.be
      .equal(
        [sensorReportElement].toString(),
      );
  });
  it('SensorMetadata', async () => {
    const sensorMetadata = new sdk.SensorMetadata();
    sensorMetadata.setTime('2019-04-02T13:05:00.000Z');
    expect(sensorMetadata.getTime()).to.be.equal('2019-04-02T13:05:00.000Z');
  });
  it('SensorReportElement', async () => {
    const sensorReportElement = new sdk.SensorReportElement();
    sensorReportElement.setType('test');
    expect(sensorReportElement.getType()).to.be.equal('test');
  });

  it('AttributeElement', async () => {
    const attributeElement = new sdk.AttributeElement();
    attributeElement.setId('urn:epc:id:sgln:0012345.11111.400');
    expect(attributeElement.getId()).to.be.equal('urn:epc:id:sgln:0012345.11111.400');
  });
  it('BizLocation', async () => {
    const bizLocation = new sdk.BizLocation();
    bizLocation.setId('urn:epc:id:sgln:0012345.11111.400');
    expect(bizLocation.getId()).to.be.equal('urn:epc:id:sgln:0012345.11111.400');
  });
  it('BizTransactionElement', async () => {
    const bizLocationElement = new sdk.BizTransactionElement();
    bizLocationElement.setType('test');
    expect(bizLocationElement.getType()).to.be.equal('test');
  });
  it('DestinationElement', async () => {
    const destinationElement = new sdk.DestinationElement();
    destinationElement.setType('test');
    expect(destinationElement.getType()).to.be.equal('test');
  });
  it('ErrorDeclaration', async () => {
    const errorDeclaration = new sdk.ErrorDeclaration();
    errorDeclaration.setDeclarationTime('test');
    expect(errorDeclaration.getDeclarationTime()).to.be.equal('test');
  });
  it('PersistentDisposition', async () => {
    const persistentDisposition = new sdk.PersistentDisposition();
    persistentDisposition.addSet('a_set');
    expect(persistentDisposition.getSet().toString()).to.be.equal(['a_set'].toString());
  });
  it('QuantityElement', async () => {
    const quantityElement = new sdk.QuantityElement();
    quantityElement.setEpcClass('an_epcClass');
    expect(quantityElement.getEpcClass()).to.be.equal('an_epcClass');
  });
  it('ReadPoint', async () => {
    const readPoint = new sdk.ReadPoint();
    readPoint.setId('urn:epc:id:sgln:0012345.11111.400');
    expect(readPoint.getId()).to.be.equal('urn:epc:id:sgln:0012345.11111.400');
  });
  it('SourceElement', async () => {
    const sourceElement = new sdk.SourceElement();
    sourceElement.setSource('urn:epc:id:sgln:4012345.00225.0');
    expect(sourceElement.getSource()).to.be.equal('urn:epc:id:sgln:4012345.00225.0');
  });
  it('Vocabulary', async () => {
    const vocabulary = new sdk.Vocabulary();
    vocabulary.setType('test');
    expect(vocabulary.getType()).to.be.equal('test');
  });
  it('VocabularyElement', async () => {
    const vocabularyElement = new sdk.VocabularyElement();
    vocabularyElement.setId('urn:epc:id:sgln:0012345.11111.400');
    expect(vocabularyElement.getId()).to.be.equal('urn:epc:id:sgln:0012345.11111.400');
  });
  it('setup', async () => {
    const settings = sdk.setup({});
    expect(settings.eventTimeZoneOffset).to.be.equal(undefined);
    expect(settings.apiUrl).to.be.equal(sdk.defaultSettings.apiUrl);
    expect(settings.headers.toString()).to.be.equal(
      {
        'content-type': 'application/json',
      }.toString(),
    );
  });
  it('capture', async () => {
    const doc = new sdk.EPCISDocument();
    doc.setContext(undefined);
    assert.throws(() => {
      sdk.capture(doc);
    });
  });
  it('eventToHashedId', async () => {
    const str = sdk.eventToHashedId(
      {
        type: 'ObjectEvent',
      },
      sdk.sampleContext,
      true,
    );
    expect(str).to.be.equal(
      'ni:///sha-256;7aa6d15415d4b429d7c4f7b3f1aaebcdbd9a12ad5c6ff4951247b61e621b9659?ver=CBV2.0',
    );
  });
  it('objectToEvent', async () => {
    const o = sdk.objectToEvent({ type: 'ObjectEvent' });
    expect(o).to.be.instanceof(sdk.ObjectEvent);
  });
  it('validateEpcisDocument', async () => {
    assert.doesNotThrow(() => { sdk.validateEpcisDocument(EPCISDocumentObjectEvent); });
  });
  it('loadSchema', async () => {
    assert.doesNotThrow(() => { sdk.loadSchema(EPCISObjectEventSchema); });
  });
  it('validateAgainstSchema', async () => {
    assert.doesNotThrow(() => { sdk.validateAgainstSchema(EPCISDocumentObjectEvent.epcisBody.eventList[0], 'ObjectEvent'); });
  });
  it('field-names.js', async () => {
    expect(sdk.fieldNames.epcisDocument).to.deep.equal(
      {
        type: 'type',
        '@context': '@context',
        schemaVersion: 'schemaVersion',
        creationDate: 'creationDate',
        epcisHeader: 'epcisHeader',
        epcisBody: 'epcisBody',
        sender: 'sender',
        receiver: 'receiver',
        instanceIdentifier: 'instanceIdentifier',
      },
    );
  });
  it('cbv.js', async () => {
    expect(sdk.cbv.actionTypes).to.deep.equal(
      {
        observe: 'OBSERVE',
        add: 'ADD',
        delete: 'DELETE',
      },
    );
  });
  it('constants.js', async () => {
    expect(sdk.eventEpcRelType).to.deep.equal(
      {
        epcList: 'epcList',
        childEPCs: 'childEPCs',
        inputEPCList: 'inputEPCList',
        outputEPCList: 'outputEPCList',
        quantityList: 'quantityList',
        inputQuantityList: 'inputQuantityList',
        outputQuantityList: 'outputQuantityList',
        childQuantityList: 'childQuantityList',
        parentID: 'parentID',
      },
    );
  });
  it('vtype.js', async () => {
    expect(sdk.vtype.PartyID).to.be.equal('urn:epcglobal:epcis:vtype:Party');
  });
  it('epc.js', async () => {
    expect(sdk.buildDigitalLinkFromEpc('30740086604E20400000007B'))
      .to.be.equal('https://dlnkd.tn.gg/01/00008600800013/21/123');
  });
});
