/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

export const sampleObjectEvent = {
  type: 'ObjectEvent',
  eventTime: '2020-03-04T11:00:30.000+01:00',
  eventTimeZoneOffset: '+01:00',
  recordTime: '2020-03-04T11:00:30.999+01:00',
  epcList: [
    'urn:epc:id:sscc:4012345.0000000333',
    'urn:epc:id:sscc:4012345.0000000111',
    'urn:epc:id:sscc:4012345.0000000222',
  ],
  action: 'OBSERVE',
  bizStep: 'departing',
  readPoint: { id: 'urn:epc:id:sgln:4012345.00011.987' },
  'example:myField1': {
    '@xmlns:example': 'https://ns.example.com/epcis',
    'example:mySubField1': '2',
    'example:mySubField2': '5',
  },
  'example:myField2': {
    '@xmlns:example': 'https://ns.example.com/epcis',
    '#text': '0',
  },
  'example:myField3': {
    '@xmlns:example': 'https://ns.example.com/epcis',
    'example:mySubField3': ['3', '1'],
  },
};
export const sampleContext = {
  example: 'http://ns.example.com/epcis/',
};

export const epcisDocHavingEventWithCommentPreHash = [
  'eventType=ObjectEventeventTime=2005-04-04T02:33:31.116ZeventTimeZoneOffset=-06:00epcListepc=https://id.gs1.org/01/10614141073464/21/2017epc=https://id.gs1.org/01/10614141073464/21/2018action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-shippingdisposition=https://ref.gs1.org/cbv/Disp-in_transitreadPointid=https://id.gs1.org/414/0614141073467/254/1234bizTransactionListtype=https://ref.gs1.org/cbv/BTT-pobizTransaction=http://transaction.acme.com/po/12345678',
];

export const epcisDocWithCustomSchemaInContextPreHash = [
  'eventType=ObjectEventeventTime=2005-04-04T02:33:31.116ZeventTimeZoneOffset=-06:00epcListepc=https://id.gs1.org/01/10614141073464/21/2017epc=https://id.gs1.org/01/10614141073464/21/2018action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-shippingdisposition=https://ref.gs1.org/cbv/Disp-in_transitreadPointid=https://id.gs1.org/414/0614141073467/254/1234bizTransactionListtype=https://ref.gs1.org/cbv/BTT-pobizTransaction=http://transaction.acme.com/po/12345678{http://ns.example.com/epcis/}myField=myValue',
  'eventType=ObjectEventeventTime=2005-04-05T02:33:31.116ZeventTimeZoneOffset=-06:00epcListepc=https://id.gs1.org/01/10614141073464/21/2018action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-receivingdisposition=https://ref.gs1.org/cbv/Disp-in_progressreadPointid=https://id.gs1.org/414/0012345111112/254/400bizLocationid=https://id.gs1.org/414/0012345111112bizTransactionListtype=https://ref.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:0614141073467:1152type=https://ref.gs1.org/cbv/BTT-pobizTransaction=http://transaction.acme.com/po/12345678{http://ns.example.com/epcis/}myField2=myValue2',
];

export const epcisDocWithDefaultSchemaInContextPreHash = [
  'eventType=ObjectEventeventTime=2005-04-04T02:33:31.116ZeventTimeZoneOffset=-06:00epcListepc=https://id.gs1.org/01/10614141073464/21/2017epc=https://id.gs1.org/01/10614141073464/21/2018action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-shippingdisposition=https://ref.gs1.org/cbv/Disp-in_transitreadPointid=https://id.gs1.org/414/0614141073467/254/1234bizTransactionListtype=https://ref.gs1.org/cbv/BTT-pobizTransaction=http://transaction.acme.com/po/12345678',
  'eventType=ObjectEventeventTime=2005-04-05T02:33:31.116ZeventTimeZoneOffset=-06:00epcListepc=https://id.gs1.org/01/10614141073464/21/2018action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-receivingdisposition=https://ref.gs1.org/cbv/Disp-in_progressreadPointid=https://id.gs1.org/414/0012345111112/254/400bizLocationid=https://id.gs1.org/414/0012345111112bizTransactionListtype=https://ref.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:0614141073467:1152type=https://ref.gs1.org/cbv/BTT-pobizTransaction=http://transaction.acme.com/po/12345678',
];

export const epcisDocWithSensorDataObjectEventPreHash = [
  'eventType=ObjectEventeventTime=2019-04-02T14:00:00.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/01/04012345111118/21/9876action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-inspectingreadPointid=https://id.gs1.org/414/4012345000054sensorElementListsensorElementsensorMetadatatime=2019-04-02T13:05:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=https://gs1.org/voc/AbsoluteHumidityexception=https://gs1.org/voc/SensorAlertType-ALARM_CONDITIONvalue=12.1component=https://ref.gs1.org/cbv/Comp-xuom=A93sensorReporttype=https://gs1.org/voc/Illuminancevalue=800uom=LUXsensorReporttype=https://gs1.org/voc/Speedvalue=160uom=KMHsensorReporttype=https://gs1.org/voc/Temperatureexception=https://gs1.org/voc/SensorAlertType-ERROR_CONDITIONvalue=26uom=CELsensorElementsensorMetadatatime=2019-04-02T13:35:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=https://gs1.org/voc/AbsoluteHumidityvalue=12.2uom=A93sensorReporttype=https://gs1.org/voc/Illuminancevalue=801uom=LUXsensorReporttype=https://gs1.org/voc/Speedvalue=161uom=KMHsensorReporttype=https://gs1.org/voc/Temperaturevalue=26.1uom=CELsensorElementsensorMetadatatime=2019-04-02T13:55:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=https://gs1.org/voc/AbsoluteHumidityvalue=12.2uom=A93sensorReporttype=https://gs1.org/voc/Illuminancevalue=802uom=LUXsensorReporttype=https://gs1.org/voc/Speedvalue=162uom=KMHsensorReporttype=https://gs1.org/voc/Temperaturevalue=26.2uom=CEL',
  'eventType=ObjectEventeventTime=2022-04-07T10:00:00.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/8003/040123450007718765action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-sensor_reportingreadPointid=https://id.gs1.org/414/4012345000054sensorElementListsensorElementsensorMetadatadeviceID=https://id.gs1.org/8004/4012345Sensor1sensorReporttype=https://gs1.org/voc/Altitudevalue=12uom=MTRsensorReporttype=https://gs1.org/voc/Temperaturevalue=12.1uom=CELsensorElementsensorMetadatadeviceID=https://id.gs1.org/8004/4012345Sensor1sensorReporttype=https://gs1.org/voc/Altitudevalue=12uom=MTRsensorReporttype=https://gs1.org/voc/Temperaturevalue=12.1uom=CELsensorElementListsensorElementsensorMetadata{https://cont/}test2=2{https://cont/}test=1sensorReport{https://cont/}test=1{https://cont/}tets=1sensorElementsensorMetadata{https://ns.example.com/epcis/}someFurtherMetadata=someMetaDataTextsensorReport{https://ns.example.com/epcis/}someFurtherMetadata=someText{https://ns.example2.com/epcis/}someFurtherMetadata=someText2',
];

export const epcisDocWithShippingAndTransportingEventPreHash = [
  'eventType=ObjectEventeventTime=2020-02-20T11:50:00.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/00/1401234511122233348action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-departingreadPointid=https://id.gs1.org/414/4012345000221bizTransactionListtype=https://ref.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:4012345000009:ASN1099sourceListtype=https://ref.gs1.org/cbv/SDT-possessing_partysource=https://id.gs1.org/414/4012345000009destinationListtype=https://ref.gs1.org/cbv/SDT-possessing_partydestination=https://id.gs1.org/414/4023333000000',
  'eventType=ObjectEventeventTime=2020-02-20T15:50:00.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/00/1401234511122233348action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-transportingreadPointid=geo:47.506694,11.104301',
];

export const epcisDocWithSingleEventPreHash = [
  'eventType=ObjectEventeventTime=2005-04-04T02:33:31.116ZeventTimeZoneOffset=-06:00epcListepc=https://id.gs1.org/01/10614141073464/21/2017epc=https://id.gs1.org/01/10614141073464/21/2018action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-shippingdisposition=https://ref.gs1.org/cbv/Disp-in_transitreadPointid=https://id.gs1.org/414/0614141073467/254/1234bizTransactionListtype=https://ref.gs1.org/cbv/BTT-pobizTransaction=http://transaction.acme.com/po/12345678',
];

export const epcisDocWithVariousEventTypesPreHash = [
  'eventType=ObjectEventeventTime=2019-10-21T10:00:30.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/00/0520000101111111463action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-departingreadPointid=https://id.gs1.org/414/5200001999012bizTransactionListtype=https://ref.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:5200001000008:4711type=https://ref.gs1.org/cbv/BTT-invbizTransaction=urn:epcglobal:cbv:bt:5200001000008:RE1099sourceListtype=https://ref.gs1.org/cbv/SDT-possessing_partysource=https://id.gs1.org/417/5200001000008destinationListtype=https://ref.gs1.org/cbv/SDT-locationdestination=https://id.gs1.org/414/4012345000122type=https://ref.gs1.org/cbv/SDT-possessing_partydestination=https://id.gs1.org/417/4000001987658',
  'eventType=ObjectEventeventTime=2019-10-21T11:00:30.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/00/0520000101111111463action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-receivingreadPointid=https://id.gs1.org/414/4012345000122bizTransactionListtype=https://ref.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:5200001000008:4711type=https://ref.gs1.org/cbv/BTT-invbizTransaction=urn:epcglobal:cbv:bt:5200001000008:RE1099sourceListtype=https://ref.gs1.org/cbv/SDT-owning_partysource=https://id.gs1.org/417/4000001000128type=https://ref.gs1.org/cbv/SDT-possessing_partysource=https://id.gs1.org/417/4000001000128destinationListtype=https://ref.gs1.org/cbv/SDT-locationdestination=https://id.gs1.org/414/4012345000122type=https://ref.gs1.org/cbv/SDT-owning_partydestination=https://id.gs1.org/417/4012345000009type=https://ref.gs1.org/cbv/SDT-possessing_partydestination=https://id.gs1.org/417/4012345000009',
  'eventType=ObjectEventeventTime=2019-10-21T14:45:00.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/00/0401234501111111116action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-inspectingdisposition=https://ref.gs1.org/cbv/Disp-in_progressreadPointid=https://id.gs1.org/414/4012345000245',
  'eventType=ObjectEventeventTime=2019-10-21T12:58:56.000ZeventTimeZoneOffset=+02:00quantityListquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGMaction=ADDbizStep=https://ref.gs1.org/cbv/BizStep-commissioningreadPointid=https://id.gs1.org/414/4054739000011ilmd{urn:epcglobal:cbv:mda}bestBeforeDate=2019-10-21',
  'eventType=AggregationEventeventTime=2019-10-21T09:58:56.591ZeventTimeZoneOffset=+02:00parentID=https://id.gs1.org/00/0404702301111111225childEPCsepc=https://id.gs1.org/01/04047023775511/21/107epc=https://id.gs1.org/01/04047023775511/21/109epc=https://id.gs1.org/01/04047023775511/21/97epc=https://id.gs1.org/01/04047023775511/21/98action=ADDbizStep=https://ref.gs1.org/cbv/BizStep-packingreadPointid=https://id.gs1.org/414/4047023000125',
  'eventType=AggregationEventeventTime=2019-10-21T15:30:56.591ZeventTimeZoneOffset=+02:00parentID=https://id.gs1.org/00/0401234401111111331childQuantityListquantityElementepcClass=https://id.gs1.org/01/04054739123451/10/lot2quantity=17quantityElementepcClass=https://id.gs1.org/01/04054739999025/10/P2quantity=12uom=KGMaction=ADDbizStep=https://ref.gs1.org/cbv/BizStep-packingreadPointid=https://id.gs1.org/414/4012345000252',
  'eventType=AggregationEventeventTime=2019-10-21T09:58:56.591ZeventTimeZoneOffset=+02:00parentID=https://id.gs1.org/00/0401234401111111447action=DELETEbizStep=https://ref.gs1.org/cbv/BizStep-unpackingreadPointid=https://id.gs1.org/414/4012345000252bizTransactionListtype=https://ref.gs1.org/cbv/BTT-invbizTransaction=urn:epcglobal:cbv:bt:4012345123456:RE1099',
  'eventType=AggregationEventeventTime=2019-10-21T12:02:56.000ZeventTimeZoneOffset=+02:00parentID=https://id.gs1.org/00/0401234409988111225childEPCsepc=https://id.gs1.org/00/0401234409988111232epc=https://id.gs1.org/00/0401234409988111249epc=https://id.gs1.org/00/0401234409988111256action=DELETEbizStep=https://ref.gs1.org/cbv/BizStep-unpackingreadPointid=https://id.gs1.org/414/4012345000771bizTransactionListtype=https://ref.gs1.org/cbv/BTT-invbizTransaction=urn:epcglobal:cbv:bt:4012345123456:4711',
  'eventType=TransactionEventeventTime=2019-10-21T06:05:00.000ZeventTimeZoneOffset=-06:00epcListepc=https://id.gs1.org/01/10614141073402/21/1epc=https://id.gs1.org/01/10614141073402/21/2action=ADDbizStep=https://ref.gs1.org/cbv/BizStep-shippingreadPointid=https://id.gs1.org/414/4012345000009/254/5bizLocationid=https://id.gs1.org/414/4012345000009bizTransactionListtype=https://ref.gs1.org/cbv/BTT-pobizTransaction=urn:epcglobal:cbv:bt:4012345123456:RE100099',
  'eventType=TransactionEventeventTime=2019-10-21T12:58:56.591ZeventTimeZoneOffset=+02:00quantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMaction=ADDbizStep=https://ref.gs1.org/cbv/BizStep-holdingreadPointid=https://id.gs1.org/414/4012345000252bizLocationid=https://id.gs1.org/414/4012345000023bizTransactionListtype=https://ref.gs1.org/cbv/BTT-invbizTransaction=urn:epcglobal:cbv:bt:4012345123456:RE1099',
  'eventType=TransformationEventeventTime=2019-10-21T12:58:56.591ZeventTimeZoneOffset=+02:00inputEPCListepc=https://id.gs1.org/01/04000001654321/21/99886655epc=https://id.gs1.org/01/04012345111224/21/25outputEPCListepc=https://id.gs1.org/01/04012345778892/21/25epc=https://id.gs1.org/01/04012345778892/21/26epc=https://id.gs1.org/01/04012345778892/21/27epc=https://id.gs1.org/01/04012345778892/21/28transformationID=https://id.gs1.org/253/40123455555541234bizStep=https://ref.gs1.org/cbv/BizStep-commissioningreadPointid=https://id.gs1.org/414/4012345000016ilmd{http://ns.example.com/epcis}batch=4711{http://ns.example.com/epcis}bestBeforeDate=2020-11-10',
  'eventType=TransformationEventeventTime=2019-10-21T12:58:56.591ZeventTimeZoneOffset=+02:00inputEPCListepc=https://id.gs1.org/01/04000001654321/21/99886655epc=https://id.gs1.org/01/04012345111224/21/25inputQuantityListquantityElementepcClass=https://id.gs1.org/01/00614141777778/10/987quantity=30quantityElementepcClass=https://id.gs1.org/01/04012345111118/10/4444quantity=10uom=KGMquantityElementepcClass=https://id.gs1.org/01/04012345666663quantity=220outputEPCListepc=https://id.gs1.org/01/04012345778892/21/25epc=https://id.gs1.org/01/04012345778892/21/26epc=https://id.gs1.org/01/04012345778892/21/27epc=https://id.gs1.org/01/04012345778892/21/28bizStep=https://ref.gs1.org/cbv/BizStep-commissioningreadPointid=https://id.gs1.org/414/4012345000016ilmd{http://ns.example.com/epcis}batch=XYZ{http://ns.example.com/epcis}bestBeforeDate=2015-11-10',
  'eventType=TransformationEventeventTime=2019-10-21T12:58:56.591ZeventTimeZoneOffset=+02:00inputEPCListepc=https://id.gs1.org/01/04000001654321/21/99886655epc=https://id.gs1.org/01/04012345111224/21/25outputQuantityListquantityElementepcClass=https://id.gs1.org/01/04054739999025/10/P20131121quantity=9520transformationID=https://id.gs1.org/253/40123455555541234bizStep=http://epcis.example.com/user/vocab/bizstep/commissioningreadPointid=https://id.gs1.org/414/4012345000016',
];

export const epcisDocWithXMLStartTagAndErrorDeclarationPreHash = [
  'eventType=TransformationEventeventTime=2020-01-13T23:00:00.000ZeventTimeZoneOffset=+01:00inputEPCListepc=https://id.gs1.org/01/04012345111118/21/987inputQuantityListquantityElementepcClass=https://id.gs1.org/01/04012345222227/10/87545GHGHoutputEPCListepc=https://id.gs1.org/01/04012345333336/21/AGHFGoutputQuantityListquantityElementepcClass=https://id.gs1.org/01/04012345444445quantity=452uom=KGMbizStep=https://ref.gs1.org/cbv/BizStep-commissioningreadPointid=https://id.gs1.org/414/4012345000009',
];

export const epcListNormalisationPreHash = [
  "eventType=ObjectEventeventTime=2019-04-02T14:00:00.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/00/3401234531111111110epc=https://id.gs1.org/01/01234567987651/235/51qIgY%29%3C%26Jp3%2Aj7'SDBepc=https://id.gs1.org/01/04012345111118/21/98%22epc=https://id.gs1.org/01/04012345111118/21/9876epc=https://id.gs1.org/01/04012345123456/10/Lot987epc=https://id.gs1.org/01/04150567890128/21/987654epc=https://id.gs1.org/01/09780345418913epc=https://id.gs1.org/01/09780345418913/21/765tzepc=https://id.gs1.org/01/80614141123458/21/6789%2F%26%25%22%21%3F%28%29epc=https://id.gs1.org/253/4012345000092PO-4711epc=https://id.gs1.org/253/98765999999929epc=https://id.gs1.org/401/0614141xyz47%2F11epc=https://id.gs1.org/402/40123452223334442epc=https://id.gs1.org/414/4012345000054epc=https://id.gs1.org/414/4012345000054/254/122epc=https://id.gs1.org/417/4000001000005epc=https://id.gs1.org/417/9999999999994epc=https://id.gs1.org/8003/04012345000221334455epc=https://id.gs1.org/8004/4012345ABC345epc=https://id.gs1.org/8006/040123451111180102/21/987epc=https://id.gs1.org/8010/061414111111111111111-A%23%2F/8011/1234epc=https://id.gs1.org/8017/401234500000000074epc=https://id.gs1.org/8018/401234500000067657action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-inspectingreadPointid=https://id.gs1.org/414/4012345000054",
];

export const referenceEventHashAlgorithmPreHash = [
  'eventType=ObjectEventeventTime=2020-03-04T10:00:30.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/00/0401234500000001118epc=https://id.gs1.org/00/0401234500000002221epc=https://id.gs1.org/00/0401234500000003334action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-departingreadPointid=https://id.gs1.org/414/4012345000115/254/987{https://ns.example.com/epcis}myField1{https://ns.example.com/epcis}mySubField1=2{https://ns.example.com/epcis}mySubField2=5{https://ns.example.com/epcis}myField2=0{https://ns.example.com/epcis}myField3{https://ns.example.com/epcis}mySubField3=1{https://ns.example.com/epcis}mySubField3=3',
];

export const referenceEventHashAlgorithm2PreHash = [
  'eventType=ObjectEventeventTime=2020-04-01T14:00:00.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/01/04012345111118/21/9876action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-inspectingreadPointid=https://id.gs1.org/414/4012345000054sensorElementListsensorElementsensorMetadatadeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111sensorReporttype=https://gs1.org/voc/AbsoluteHumidityvalue=12.1uom=A93sensorReporttype=https://gs1.org/voc/MolarVolumechemicalSubstance=urn:epcglobal:cbv:inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-Nvalue=0.18uom=C35sensorReporttype=https://gs1.org/voc/MolarVolumemicroorganism=https://www.ncbi.nlm.nih.gov/taxonomy/1126011value=0.05uom=C35sensorReporttype=https://gs1.org/voc/Temperaturevalue=26sDev=0.1uom=CEL',
];

export const referenceEventHashAlgorithm3PreHash = [
  'eventType=ObjectEventeventTime=2020-03-04T10:00:30.000ZeventTimeZoneOffset=+01:00epcListepc=https://id.gs1.org/01/00614141111114/21/987action=OBSERVEbizStep=https://ref.gs1.org/cbv/BizStep-departingdisposition=https://ref.gs1.org/cbv/Disp-in_transitreadPointid=https://id.gs1.org/414/4012345000115bizTransactionListtype=https://ref.gs1.org/cbv/BTT-pobizTransaction=https://id.gs1.org/253/4012345111118123sourceListtype=https://ref.gs1.org/cbv/SDT-owning_partysource=https://id.gs1.org/417/4012345000009destinationListtype=https://ref.gs1.org/cbv/SDT-owning_partydestination=https://id.gs1.org/417/0614141000005readPoint{https://ns.example.com/epcis}myField1=AB-12{https://ns.example.com/epcis}userExt=CD-34{urn:epcglobal:cbv:mda:}sst=201',
];
