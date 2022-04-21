/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const {
    AssociationEvent,
    ObjectEvent,
    ExtendedEvent,
    EPCISDocument, 
    EPCISHeader,
    ErrorDeclaration,
    PersistentDisposition,
    ReadPoint,
    BizTransactionElement,
    QuantityElement,
    SourceElement,
    DestinationElement,
    SensorMetadata,
    SensorReportElement,
    SensorElement,
    BizLocation,
    Ilmd,
    setup, 
    capture,
    cbv 
  } = require('epcis2.js');

const objectEvent = new ObjectEvent();
const epcisDocument = new EPCISDocument();
const epcisHeader = new EPCISHeader();

const buildSensorReportElementExample = () => {
  //sensor report element
  const sensorReport = new SensorReportElement();
  return sensorReport.setType(cbv.sensorMeasurementTypes.temperature)
  .setDeviceID("urn:epc:id:giai:4000001." + Math.floor(Math.random() * 999))
  .setRawData("https://example.org/giai/401234599999")
  .setDataProcessingMethod("https://example.com/gdti/4012345000054987")
  .setTime("2019-07-19T13:00:00.000Z")
  .setMicroorganism("https://www.ncbi.nlm.nih.gov/taxonomy/1126011")
  .setChemicalSubstance("https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N")
  .setValue(26)
  .setComponent(cbv.components.x)
  .setStringValue('SomeString')
  .setBooleanValue(true)
  .setHexBinaryValue('f0f0f0')
  .setUriValue("https://id.gs1.org/giai/4000001111")
  .setMinValue(26)
  .setMaxValue(26.2)
  .setMeanValue(13.2)
  .setPercRank(50)
  .setPercValue(12.7)
  .setUom('CEL')
  .setSDev(0.1)
  .setDeviceMetadata("https://id.gs1.org/giai/4000001111")
  .addExtension('example:someFurtherMetadata', 'someText')
  .setBizRules("https://example.com/gdti/4012345000054987");
}

const buildSensorMetadataExample = () => {
   //sensor metadata
   const sensorMetadata = new SensorMetadata();
   return sensorMetadata.setTime(new Date().toISOString())
   .setDeviceID("urn:epc:id:giai:4000001.111")
   .setDeviceMetadata("https://id.gs1.org/giai/4000001111")
   .setRawData("https://example.org/giai/401234599999")
   .setStartTime("2019-04-02T12:55:01.000Z")
   .setEndTime("2019-04-02T13:55:00.000Z")
   .setDataProcessingMethod("https://example.com/gdti/4012345000054987")
   .setBizRules("https://example.com/gdti/4012345000054987")
   .addExtension('example:someFurtherMetadata', 'someText');
}
// you can override the global parameters with the setup function
setup({
  apiUrl: 'https://api.evrythng.io/v2/epcis/',
  headers: {
    'content-type': 'application/json',
    authorization: 'MY_API_KEY',
  },
  eventTimeZoneOffset: '-02:00',
  timeout: '1000',
  EPCISDocumentContext: 'https://id.gs1.org/epcis-context.jsonld',
  EPCISDocumentSchemaVersion: '2.0',
  documentValidation: true,
  validationMode: 'fast' //'full' otherwise
});
const sendACaptureRequestExample = async () => {
  try {
    const associationEvent = new AssociationEvent(
        {
        "type": "AssociationEvent",
        "eventTime": "2019-11-01T13:00:00.000Z",
        "recordTime": "2005-04-05T02:33:31.116Z",
        "eventID":"ni:///sha-256;36abb3a2c0a726de32ac4beafd6b8bc4ba0b1d2de244490312e5cbec7b5ddece?ver=CBV2.0",
        "eventTimeZoneOffset": "+01:00",
        "parentID": "urn:epc:id:grai:4012345.55555.987",
        "childEPCs": ["urn:epc:id:giai:4000001.12345", "urn:epc:id:giai:4000001.12346"],
        "childQuantityList": [
          {
            "epcClass": "urn:epc:idpat:sgtin:4012345.098765.*",
            "quantity": 10
          },
          {
            "epcClass": "urn:epc:class:lgtin:4012345.012345.998877",
            "quantity": 200.5,
            "uom": "KGM"
          }
        ],
        "action": "ADD",
        "bizStep": "assembling",
        "disposition": "in_progress",
        "readPoint": {
          "id": "urn:epc:id:sgln:4012345.00001.0"
        },
        "bizLocation": {
          "id": "urn:epc:id:sgln:0614141.00888.0"
        },
        "bizTransactionList": [
          {
            "type": "po",
            "bizTransaction": "urn:epc:id:gdti:0614141.00001.1618034"
          },
          {
            "type": "pedigree",
            "bizTransaction": "urn:epc:id:gsrn:0614141.0000010253"
          }
        ],
        "sourceList": [
          {
            "type": "location",
            "source": "urn:epc:id:sgln:4012345.00225.0"
          },
          {
            "type": "possessing_party",
            "source": "urn:epc:id:pgln:4012345.00225"
          },
          {
            "type": "owning_party",
            "source": "urn:epc:id:pgln:4012345.00225"
          }
        ],
        "destinationList": [
          {
            "type": "location",
            "destination": "urn:epc:id:sgln:0614141.00777.0"
          },
          {
            "type": "possessing_party",
            "destination": "urn:epc:id:pgln:0614141.00777"
          },
          {
            "type": "owning_party",
            "destination": "urn:epc:id:pgln:0614141.00777"
          }
        ],
        "sensorElementList": [
          {
            "sensorMetadata": {
              "time": "2019-04-02T13:05:00.000Z",
              "deviceID": "urn:epc:id:giai:4000001.111",
              "deviceMetadata": "https://id.gs1.org/giai/4000001111",
              "rawData": "https://example.org/giai/401234599999",
              "startTime": "2019-04-02T12:55:01.000Z",
              "endTime": "2019-04-02T13:55:00.000Z",
              "dataProcessingMethod": "https://example.com/gdti/4012345000054987",
              "bizRules": "https://example.com/gdti/4012345000054987",
              "ext1:someFurtherMetadata": "someText"
            },
            "sensorReport": [
              {
                "type": "Temperature",
                "deviceID": "urn:epc:id:giai:4000001.111",
                "rawData": "https://example.org/giai/401234599999",
                "dataProcessingMethod": "https://example.com/gdti/4012345000054987",
                "time": "2019-07-19T13:00:00.000Z",
                "microorganism": "https://www.ncbi.nlm.nih.gov/taxonomy/1126011",
                "chemicalSubstance": "https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N",
                "value": 26,
                "component": "example:x",
                "stringValue": "SomeString",
                "booleanValue": true,
                "hexBinaryValue": "f0f0f0",
                "uriValue": "https://id.gs1.org/giai/4000001111",
                "minValue": 26,
                "maxValue": 26.2,
                "meanValue": 13.2,
                "percRank": 50,
                "percValue": 12.7,
                "uom": "CEL",
                "sDev": 0.1,
                "ext1:someFurtherReportData": "someText",
                "deviceMetadata": "https://id.gs1.org/giai/4000001111"
              }
            ],
            "ext1:float": "20",
            "ext1:time": "2013-06-08T14:58:56.591Z",
            "ext1:array": [
              "12",
              "22",
              "2013-06-08T14:58:56.591Z",
              "true",
              "stringInArray",
              {
                "ext1:object": {
                  "ext1:object": {
                    "ext2:array": [
                      "14",
                      "23.0",
                      "stringInArrayInObjectInArray"
                    ],
                    "ext2:object": {
                      "ext2:object": {
                        "ext3:string": "stringInObjectInObjectInArray"
                      }
                    },
                    "ext2:int": "13",
                    "ext2:string": "stringInObjectInArray"
                  }
                }
              }
            ],
            "ext1:boolean": "true",
            "ext1:object": {
              "ext2:array": [
                "11",
                "21",
                "stringInArrayInObject"
              ],
              "ext2:object": {
                "ext2:object": {
                  "ext3:string": "stringInObjectInObject"
                }
              },
              "ext2:string": "stringInObject"
            },
            "ext1:default": "stringAsDefaultValue",
            "ext1:int": "10",
            "ext1:string": "string"
          }
        ],
        "persistentDisposition": {
          "set": ["completeness_verified"],
          "unset": ["completeness_inferred"]
        },
        "ext1:float": "20",
        "ext1:time": "2013-06-08T14:58:56.591Z",
        "ext1:array": [
          "12",
          "22",
          "2013-06-08T14:58:56.591Z",
          "true",
          "stringInArray",
          {
            "ext1:object": {
              "ext1:object": {
                "ext2:array": ["14", "23.0", "stringInArrayInObjectInArray"],
                "ext2:object": {
                  "ext2:object": {
                    "ext3:string": "stringInObjectInObjectInArray"
                  }
                },
                "ext2:int": "13",
                "ext2:string": "stringInObjectInArray"
              }
            }
          }
        ],
        "ext1:boolean": "true",
        "ext1:object": {
          "ext2:array": ["11", "21", "stringInArrayInObject"],
          "ext2:object": {
            "ext2:object": {
              "ext3:string": "stringInObjectInObject"
            }
          },
          "ext2:string": "stringInObject"
        },
        "ext1:default": "stringAsDefaultValue",
        "ext1:int": "10",
        "ext1:string": "string"
      }
    );
    
    // errorDeclaration
    const errorDeclaration = new ErrorDeclaration({
        "declarationTime": "2020-01-15T00:00:00+01:00",
        "reason": cbv.errorReasonIdentifiers.incorrect_data,
        "example:vendorExtension": "Test1",
        "correctiveEventIDs": ["urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8"]
    });

    // readPoint
    const readPoint = new ReadPoint({
        "id": "urn:epc:id:sgln:0012345.11111.400"
      });

    // bizLocation
    const bizLocation = new BizLocation();
    bizLocation.setId("urn:epc:id:sgln:0012345.11111.0");

    // bizTransactions
    const bizTransaction = new BizTransactionElement();
    bizTransaction.setType(cbv.businessTransactionTypes.po)
    .setBizTransaction('urn:epc:id:gdti:0614141.00001.1618034');
    const bizTransaction2 = new BizTransactionElement();
    bizTransaction2.setType(cbv.businessTransactionTypes.pedigree)
    .setBizTransaction('urn:epc:id:gsrn:0614141.00001.0000010253');
    const bizTransaction3 = new BizTransactionElement();
    bizTransaction3.setType(cbv.businessTransactionTypes.poc)
    .setBizTransaction('urn:epc:id:gsrn:0614141.00001.0000023553');

    const bizTransactionList = [ bizTransaction, bizTransaction2 ]

    // quantity
    const quantity = new QuantityElement();
    quantity.setEpcClass("urn:epc:class:lgtin:4012345.012345.9911111")
    .setQuantity(100)
    .setUom('KGM');
    const quantity2 = new QuantityElement();
    quantity2.setEpcClass("urn:epc:class:lgtin:4012345.012345.992222")
    .setQuantity(200)
    .setUom('KGM');
    const quantity3 = new QuantityElement();
    quantity3.setEpcClass("urn:epc:class:lgtin:4012345.012345.993333")
    .setQuantity(300)
    .setUom('KGM');

    const quantityList = [ quantity, quantity2 ]

    // source
    const source = new SourceElement();
    source.setType(cbv.sourceDestinationTypes.location)
    .setSource('urn:epc:id:sgln:4012345.00225.0');
    const source2 = new SourceElement();
    source2.setType(cbv.sourceDestinationTypes.possessing_party)
    .setSource('urn:epc:id:sgln:4012345.00225.1');
    const source3 = new SourceElement();
    source3.setType(cbv.sourceDestinationTypes.owning_party)
    .setSource('urn:epc:id:sgln:4012345.00225.2');

    const sourceList = [ source, source2 ];

    // destination
    const destination = new DestinationElement();
    destination.setType(cbv.sourceDestinationTypes.location)
    .setDestination('urn:epc:id:sgln:0614141.00777.0');
    const destination2 = new DestinationElement();
    destination2.setType(cbv.sourceDestinationTypes.possessing_party)
    .setDestination('urn:epc:id:sgln:0614141.00777.2');
    const destination3 = new DestinationElement();
    destination3.setType(cbv.sourceDestinationTypes.owning_party)
    .setDestination('urn:epc:id:sgln:0614141.00777.3');

    const destinationList = [ destination, destination2 ];

    // sensor element
    const sensorElement = new SensorElement()
    sensorElement.setSensorMetadata(buildSensorMetadataExample())
    .addSensorReportList([buildSensorReportElementExample(),buildSensorReportElementExample()])
    .addSensorReport(buildSensorReportElementExample())
    .addExtension('example:myField', 'my_custom_value')

    const sensorElement2 = new SensorElement()
    sensorElement2.setSensorMetadata(buildSensorMetadataExample())
    .addSensorReportList([buildSensorReportElementExample(),buildSensorReportElementExample()])
    .addSensorReport(buildSensorReportElementExample())
    .addExtension('example:myField', 'my_custom_value');

    const sensorElement3 = new SensorElement()
    sensorElement3.setSensorMetadata(buildSensorMetadataExample())
    .addSensorReportList([buildSensorReportElementExample(),buildSensorReportElementExample()])
    .addSensorReport(buildSensorReportElementExample())
    .addExtension('example:myField', 'my_custom_value');

    const sensorElementList = [ sensorElement, sensorElement2 ];

    // persistentDisposition
    const persistentDisposition = new PersistentDisposition();
    persistentDisposition.addSet(cbv.dispositions.completeness_verified)
    .addUnset(cbv.dispositions.completeness_inferred);

    // ilmd
    const ilmd = new Ilmd();
    ilmd.addExtension("ext1:boolean","true",);


    // object event

    objectEvent.setEventTime("2005-04-05T02:33:31.116Z")
    .setRecordTime("2005-04-05T02:33:31.116Z")
    .setEventTimeZoneOffset("-06:00")
    .addEPC("urn:epc:id:sgtin:0614141.107346.2019")
    .addEPCList([
        "urn:epc:id:sgtin:0614141.107346.2018",
        "urn:epc:id:sgtin:0614141.107346.2017"
      ])
    .setAction(cbv.actionTypes.add)
    .setBizStep(cbv.bizSteps.receiving)
    .setDisposition(cbv.dispositions.in_progress)
    .setErrorDeclaration(errorDeclaration)
    .setReadPoint(readPoint)
    .setBizLocation(bizLocation)
    .addBizTransactionList(bizTransactionList)
    .addBizTransaction(bizTransaction3)
    .addQuantityList(quantityList)
    .addQuantity(quantity3)
    .addSourceList(sourceList)
    .addSource(source3)
    .addDestinationList(destinationList)
    .addDestination(destination3)
    .addSensorElementList(sensorElementList)
    .addSensorElement(sensorElement3)
    .setPersistentDisposition(persistentDisposition)
    .setIlmd(ilmd)
    .addExtension('example:myField', 'my_custom_value');

    objectEvent.generateHashID({
      example: 'http://ns.example.com/epcis/',
      ext1: 'http://example.com/ext1/'
    });

    // extended event
    const extendedEvent = new ExtendedEvent();
    extendedEvent.setType('My:custom:event:type')
    .setEventID('ni:///sha-256;36abb3a2c0a726de32ac4beafd6b8bc4ba0b1d2de244490312e5cbec7b5ddece?ver=CBV2.0')
    .setEventTime("2005-04-05T02:33:31.116Z")
    .setRecordTime("2005-04-05T02:33:31.116Z");


    // epcisDocument
    epcisDocument.setContext('https://gs1.github.io/EPCIS/epcis-context.jsonld')
    .setCreationDate('2013-06-04T14:59:02.099+02:00')
    .setSchemaVersion('2.0')
    .setEPCISHeader(epcisHeader)
    .setSender('urn:epc:id:sgln:0353579.00001.0')
    .setReceiver('urn:epc:id:sgln:5012345.00001.0')
    .setInstanceIdentifier('1234567890')
    .addEvent(associationEvent)
    .addEvent(objectEvent)
    .addEvent(extendedEvent);

    console.log(epcisDocument.toString())

    console.log('\nAssociationEvent is valid ? ' + associationEvent.isValid());
    console.log('ObjectEvent is valid ? ' + objectEvent.isValid());
    console.log('ExtendedEvent is valid ? ' + extendedEvent.isValid());

    console.log('\nEPCISDocument is valid ? ' + epcisDocument.isValid())


    // capture
    console.log('Capture:')
    let res = await capture(epcisDocument);
    let text = await res.text();
    console.log(`Request status: ${res.status}`);
    console.log(`Request response: ${text}`);

    // we can override the settings in the capture
    console.log('Capture with overridden settings:');
    res = await capture(epcisDocument,{timeout: '200'});
    text = await res.text();
    console.log(`Request status: ${res.status}`);
    console.log(`Request response: ${text}`);
  }
  catch (err) {
    console.log(err);
  }
}

sendACaptureRequestExample();