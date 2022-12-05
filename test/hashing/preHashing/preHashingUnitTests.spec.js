/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { assert, expect } from 'chai';
import { eventToPreHashedString } from '../../../src/hash_generator/EPCISEventToPreHashedString';
import { sampleContext, sampleObjectEvent } from '../../data/hashing/samplePrehashesAndHashes';
import EPCISDocumentObjectEvent from '../../data/EPCISDocument-ObjectEvent.json';
import cbv from '../../../src/cbv/cbv';

const exampleObjectEvent = JSON.parse(
  JSON.stringify(EPCISDocumentObjectEvent.epcisBody.eventList[0]),
);

describe('unit tests for pre-hashing', () => {
  it('Should return a valid pre-hash', () => {
    const str = eventToPreHashedString(sampleObjectEvent, sampleContext);
    assert.doesNotThrow(() => str);
  });

  it('Should return the same pre-hash (leading and trailing spaces in string test)', () => {
    const str = eventToPreHashedString(sampleObjectEvent, sampleContext);
    const obj2 = sampleObjectEvent;
    obj2.action = ` ${sampleObjectEvent.action} `;
    const str2 = eventToPreHashedString(obj2, sampleContext);
    expect(str2).to.be.equal(str);
  });

  describe('date pre-has tests', () => {
    it('Should return the same pre-hash (add a Z test)', () => {
      const str = eventToPreHashedString(
        {
          eventTime: '2020-03-04T10:00:30.000',
        },
        sampleContext,
      );
      const str2 = eventToPreHashedString(
        {
          eventTime: '2020-03-04T10:00:30.000Z',
        },
        sampleContext,
      );
      const str3 = eventToPreHashedString(
        {
          eventTime: sampleObjectEvent.eventTime,
        },
        sampleContext,
      );
      expect(str2).to.be.equal(str);
      expect(str3).to.be.equal(str);
    });

    it('Should return the same pre-hash (3 digits milliseconds test)', () => {
      const str = eventToPreHashedString(sampleObjectEvent, sampleContext);
      const obj2 = sampleObjectEvent;
      const obj3 = sampleObjectEvent;
      obj2.eventTime = '2020-03-04T11:00:30+01:00';
      obj3.eventTime = '2020-03-04T11:00:30.0+01:00';
      const str2 = eventToPreHashedString(obj2, sampleContext);
      const str3 = eventToPreHashedString(obj3, sampleContext);
      expect(str2).to.be.equal(str);
      expect(str3).to.be.equal(str);
    });

    it('Should return the same pre-hash (remove offset test)', () => {
      const str = eventToPreHashedString(sampleObjectEvent, sampleContext);
      const obj2 = sampleObjectEvent;
      const obj3 = sampleObjectEvent;
      obj2.eventTime = '2020-03-04T10:00:30Z';
      const str2 = eventToPreHashedString(obj2, sampleContext);
      const str3 = eventToPreHashedString(obj3, sampleContext);
      expect(str2).to.be.equal(str);
      expect(str3).to.be.equal(str);
    });
  });

  describe('lists pre-has tests', () => {
    it('should pre-hash an epc list that has an URI format', () => {
      const str = eventToPreHashedString(
        {
          epcList: [
            'urn:epc:id:sgtin:0614141.011111.987',
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          epcList: [
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
            'urn:epc:id:sgtin:0614141.011111.987',
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'epcListepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987',
      );
    });

    it('should pre-hash an epc list that has a DL format', () => {
      const str = eventToPreHashedString(
        {
          epcList: [
            'https://id.gs1.org/01/00614141111114/21/987',
            'https://id.gs1.org/01/00614141111114/21/986',
            'https://id.gs1.org/01/00614141111114/21/985',
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          epcList: [
            'https://id.gs1.org/01/00614141111114/21/986',
            'https://id.gs1.org/01/00614141111114/21/985',
            'https://id.gs1.org/01/00614141111114/21/987',
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'epcListepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987',
      );
    });

    it('should pre-hash a child epc list', () => {
      const str = eventToPreHashedString(
        {
          childEPCs: [
            'urn:epc:id:sgtin:0614141.011111.987',
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          childEPCs: [
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
            'urn:epc:id:sgtin:0614141.011111.987',
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'childEPCsepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987',
      );
    });

    it('should pre-hash an input epc list', () => {
      const str = eventToPreHashedString(
        {
          inputEPCList: [
            'urn:epc:id:sgtin:0614141.011111.987',
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          inputEPCList: [
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
            'urn:epc:id:sgtin:0614141.011111.987',
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'inputEPCListepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987',
      );
    });

    it('should pre-hash an output epc list', () => {
      const str = eventToPreHashedString(
        {
          outputEPCList: [
            'urn:epc:id:sgtin:0614141.011111.987',
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          outputEPCList: [
            'urn:epc:id:sgtin:0614141.011111.986',
            'urn:epc:id:sgtin:0614141.011111.985',
            'urn:epc:id:sgtin:0614141.011111.987',
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'outputEPCListepc=https://id.gs1.org/01/00614141111114/21/985epc=https://id.gs1.org/01/00614141111114/21/986epc=https://id.gs1.org/01/00614141111114/21/987',
      );
    });

    it('should pre-hash a biz transaction list', () => {
      const str = eventToPreHashedString(
        {
          bizTransactionList: [
            {
              type: cbv.businessTransactionTypes.desadv,
              bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:4711',
            },
            {
              type: cbv.businessTransactionTypes.inv,
              bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:RE1099',
            },
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          bizTransactionList: [
            {
              type: cbv.businessTransactionTypes.inv,
              bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:RE1099',
            },
            {
              bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:4711',
              type: cbv.businessTransactionTypes.desadv,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'bizTransactionListtype=https://ref.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:5200001000008:4711type=https://ref.gs1.org/cbv/BTT-invbizTransaction=urn:epcglobal:cbv:bt:5200001000008:RE1099',
      );
    });

    it('should pre-hash a source list', () => {
      const str = eventToPreHashedString(
        {
          sourceList: [
            {
              type: cbv.sourceDestinationTypes.possessing_party,
              source: 'urn:epc:id:pgln:4000001.00012',
            },
            {
              type: cbv.sourceDestinationTypes.owning_party,
              source: 'urn:epc:id:pgln:4000001.00012',
            },
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          sourceList: [
            {
              source: 'urn:epc:id:pgln:4000001.00012',
              type: cbv.sourceDestinationTypes.owning_party,
            },
            {
              type: cbv.sourceDestinationTypes.possessing_party,
              source: 'urn:epc:id:pgln:4000001.00012',
            },
          ],
        },
        {},
      );

      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'sourceListtype=https://ref.gs1.org/cbv/SDT-owning_partysource=https://id.gs1.org/417/4000001000128type=https://ref.gs1.org/cbv/SDT-possessing_partysource=https://id.gs1.org/417/4000001000128',
      );
    });

    it('should pre-hash a destination list', () => {
      const str = eventToPreHashedString(
        {
          destinationList: [
            {
              type: cbv.sourceDestinationTypes.possessing_party,
              destination: 'urn:epc:id:pgln:4012345.00000',
            },
            {
              type: cbv.sourceDestinationTypes.owning_party,
              destination: 'urn:epc:id:pgln:4012345.00000',
            },
            {
              type: cbv.sourceDestinationTypes.location,
              destination: 'urn:epc:id:sgln:4012345.00012.0',
            },
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          destinationList: [
            {
              destination: 'urn:epc:id:sgln:4012345.00012.0',
              type: cbv.sourceDestinationTypes.location,
            },
            {
              destination: 'urn:epc:id:pgln:4012345.00000',
              type: cbv.sourceDestinationTypes.owning_party,
            },
            {
              type: cbv.sourceDestinationTypes.possessing_party,
              destination: 'urn:epc:id:pgln:4012345.00000',
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'destinationListtype=https://ref.gs1.org/cbv/SDT-locationdestination=https://id.gs1.org/414/4012345000122type=https://ref.gs1.org/cbv/SDT-owning_partydestination=https://id.gs1.org/417/4012345000009type=https://ref.gs1.org/cbv/SDT-possessing_partydestination=https://id.gs1.org/417/4012345000009',
      );
    });

    it('should pre-hash a quantity list', () => {
      const str = eventToPreHashedString(
        {
          quantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
              quantity: 2030,
              uom: 'KGM',
            },
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          quantityList: [
            {
              uom: 'KGM',
              quantity: 2030,
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
            },
            {
              uom: 'KGM',
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'quantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGM',
      );
    });

    it('should pre-hash an input quantity list', () => {
      const str = eventToPreHashedString(
        {
          inputQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
              quantity: 2030,
              uom: 'KGM',
            },
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          inputQuantityList: [
            {
              uom: 'KGM',
              quantity: 2030,
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
            },
            {
              uom: 'KGM',
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'inputQuantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGM',
      );
    });

    it('should pre-hash an output quantity list', () => {
      const str = eventToPreHashedString(
        {
          outputQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
              quantity: 2030,
              uom: 'KGM',
            },
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          outputQuantityList: [
            {
              uom: 'KGM',
              quantity: 2030,
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
            },
            {
              uom: 'KGM',
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'outputQuantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGM',
      );
    });

    it('should pre-hash a child quantity list', () => {
      const str = eventToPreHashedString(
        {
          childQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
              quantity: 2030,
              uom: 'KGM',
            },
          ],
        },
        {},
      );
      const str2 = eventToPreHashedString(
        {
          childQuantityList: [
            {
              uom: 'KGM',
              quantity: 2030,
              epcClass: 'urn:epc:class:lgtin:4012345.099988.2014-02-10',
            },
            {
              uom: 'KGM',
              epcClass: 'urn:epc:class:lgtin:4054739.099914.20160711',
              quantity: 600,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'childQuantityListquantityElementepcClass=https://id.gs1.org/01/04012345999884/10/2014-02-10quantity=2030uom=KGMquantityElementepcClass=https://id.gs1.org/01/04054739999148/10/20160711quantity=600uom=KGM',
      );
    });

    it('should pre-hash a sensor element list', () => {
      const list = [
        {
          sensorMetadata: {
            time: '2019-04-02T14:05:00.000+01:00',
            deviceID: 'urn:epc:id:giai:4000001.111',
            deviceMetadata: 'https://id.gs1.org/giai/4000001111',
            rawData: 'https://example.org/giai/401234599999',
          },
          sensorReport: [
            {
              type: cbv.sensorMeasurementTypes.temperature,
              value: 26,
              exception: 'ERROR_CONDITION',
              uom: 'CEL',
              component: cbv.components.easting,
              'ext1:key': 'value',
              coordinateReferenceSystem: 'value:abc',
            },
            {
              type: cbv.sensorMeasurementTypes.absolute_humidity,
              value: 12.1,
              uom: 'A93',
            },
            {
              type: cbv.sensorMeasurementTypes.speed,
              value: 160,
              uom: 'KMH',
            },
            {
              type: cbv.sensorMeasurementTypes.illuminance,
              value: 800,
              uom: 'LUX',
            },
          ],
        },
        {
          sensorMetadata: {
            time: '2019-04-02T14:35:00.000+01:00',
            deviceID: 'urn:epc:id:giai:4000001.111',
            deviceMetadata: 'https://id.gs1.org/giai/4000001111',
            rawData: 'https://example.org/giai/401234599999',
          },
          sensorReport: [
            {
              type: cbv.sensorMeasurementTypes.temperature,
              value: 26.1,
              uom: 'CEL',
            },
            {
              type: cbv.sensorMeasurementTypes.absolute_humidity,
              value: 12.2,
              uom: 'A93',
            },
            {
              type: cbv.sensorMeasurementTypes.speed,
              value: 161,
              uom: 'KMH',
            },
            {
              type: cbv.sensorMeasurementTypes.illuminance,
              value: 801,
              uom: 'LUX',
            },
          ],
        },
        {
          sensorMetadata: {
            time: '2019-04-02T14:55:00.000+01:00',
            deviceID: 'urn:epc:id:giai:4000001.111',
            deviceMetadata: 'https://id.gs1.org/giai/4000001111',
            rawData: 'https://example.org/giai/401234599999',
          },
          sensorReport: [
            {
              type: cbv.sensorMeasurementTypes.temperature,
              value: 26.2,
              uom: 'CEL',
            },
            {
              type: cbv.sensorMeasurementTypes.absolute_humidity,
              value: 12.2,
              uom: 'A93',
            },
            {
              type: cbv.sensorMeasurementTypes.speed,
              value: 162,
              uom: 'KMH',
            },
            {
              type: cbv.sensorMeasurementTypes.illuminance,
              value: 802,
              uom: 'LUX',
            },
          ],
        },
      ];

      const str = eventToPreHashedString(
        {
          sensorElementList: list,
        },
        { ext1: 'https://example.com/ext1' },
      );
      const str2 = eventToPreHashedString(
        {
          sensorElementList: [list[2], list[1], list[0]],
        },
        { ext1: 'https://example.com/ext1' },
      );
      expect(str).to.be.equal(str2);
      expect(str).to.be.equal(
        'sensorElementListsensorElementsensorMetadatatime=2019-04-02T13:05:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=https://gs1.org/voc/AbsoluteHumidityvalue=12.1uom=A93sensorReporttype=https://gs1.org/voc/Illuminancevalue=800uom=LUXsensorReporttype=https://gs1.org/voc/Speedvalue=160uom=KMHsensorReporttype=https://gs1.org/voc/Temperatureexception=https://gs1.org/voc/SensorAlertType-ERROR_CONDITIONvalue=26component=https://ref.gs1.org/cbv/Comp-eastinguom=CELcoordinateReferenceSystem=value:abcsensorElementsensorMetadatatime=2019-04-02T13:35:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=https://gs1.org/voc/AbsoluteHumidityvalue=12.2uom=A93sensorReporttype=https://gs1.org/voc/Illuminancevalue=801uom=LUXsensorReporttype=https://gs1.org/voc/Speedvalue=161uom=KMHsensorReporttype=https://gs1.org/voc/Temperaturevalue=26.1uom=CELsensorElementsensorMetadatatime=2019-04-02T13:55:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999sensorReporttype=https://gs1.org/voc/AbsoluteHumidityvalue=12.2uom=A93sensorReporttype=https://gs1.org/voc/Illuminancevalue=802uom=LUXsensorReporttype=https://gs1.org/voc/Speedvalue=162uom=KMHsensorReporttype=https://gs1.org/voc/Temperaturevalue=26.2uom=CELsensorElementsensorReport{https://example.com/ext1}key=value',
      );
    });
  });

  it('Should return the same pre-hash (URN voc to URI equivalent)', () => {
    const context = {
      ...sampleContext,
      ext1: 'http://ns.example.com/epcis/',
      ext2: 'http://ns.example.com/epcis/',
      ext3: 'http://ns.example.com/epcis/',
      cbvmda: 'http://ns.example.com/epcis/',
    };
    const str = eventToPreHashedString(exampleObjectEvent, context);
    const obj2 = exampleObjectEvent;
    obj2.bizStep = 'https://ref.gs1.org/cbv/BizStep-receiving';
    obj2.disposition = 'https://ref.gs1.org/cbv/Disp-in_progress';
    obj2.bizTransactionList[0].type = 'https://ref.gs1.org/cbv/BTT-po';
    obj2.destinationList[0].type = 'https://ref.gs1.org/cbv/SDT-location';
    obj2.sourceList[0].type = 'https://ref.gs1.org/cbv/SDT-location';
    obj2.errorDeclaration.reason = 'https://ref.gs1.org/cbv/ER-incorrect_data';
    const str2 = eventToPreHashedString(obj2, context);
    expect(str2).to.be.equal(str);
  });

  it('should return a valid pre-hash of ilmd field', () => {
    const str = eventToPreHashedString(
      {
        ilmd: {
          'cbvmda:lotNumber': 'LOTABC',
          'example:grading': 'A',
          'example2:userMasterData': {
            'example2:sizeCode': 'B-2',
          },
        },
      },
      {
        example: 'https://ns.example.com/epcis',
        example2: 'https://ns.example2.com/epcis',
        cbvmda: 'urn:epcglobal:cbv:mda',
      },
    );
    expect(str).to.be.equal(
      'ilmd{https://ns.example.com/epcis}grading=A{https://ns.example2.com/epcis}userMasterData{https://ns.example2.com/epcis}sizeCode=B-2{urn:epcglobal:cbv:mda}lotNumber=LOTABC',
    );
  });

  it('should return a valid pre-hash of custom fields', () => {
    const str = eventToPreHashedString(
      {
        'example:userExt': {
          '#text': 'CD-34',
        },
        readPoint: {
          id: 'https://id.gs1.org/414/4012345000115',
          'example:myField1': 'AB-12',
        },
      },
      {
        example: 'https://ns.example.com/epcis',
      },
    );
    expect(str).to.be.equal(
      'readPointid=https://id.gs1.org/414/4012345000115readPoint{https://ns.example.com/epcis}myField1=AB-12{https://ns.example.com/epcis}userExt=CD-34',
    );

    const str2 = eventToPreHashedString(
      {
        'example:myField3': {
          '@xmlns:example': 'https://ns.example.com/epcis',
          'example:mySubField3': ['3', '1'],
        },
      },
      {},
    );
    expect(str2).to.be.equal(
      '{https://ns.example.com/epcis}myField3{https://ns.example.com/epcis}mySubField3=1{https://ns.example.com/epcis}mySubField3=3',
    );

    // don't throw error
    const str3 = eventToPreHashedString(
      {
        action: 'OBSERVE',
        'example:myField3': {
          'example:mySubField3': ['3', '1'],
        },
      },
      {},
      false,
    );
    expect(str3).to.be.equal('action=OBSERVE');

    const str4 = eventToPreHashedString(
      {
        'example:test': ['3', '1'],
        action: 'OBSERVE',
      },
      sampleContext,
      false,
    );
    expect(str4).to.be.equal(
      'action=OBSERVE{http://ns.example.com/epcis/}test=1{http://ns.example.com/epcis/}test=3',
    );

    // throw an error
    expect(() => eventToPreHashedString(
      {
        action: 'OBSERVE',
        'example:myField3': {
          'example:mySubField3': ['3', '1'],
        },
      },
      {},
    )).to.throw();
  });

  it('should return a valid pre-hash of custom fields', () => {
    const str = eventToPreHashedString(
      {
        'cbvmda:key': 'test',
      },
      sampleContext,
    );
    expect(str).to.be.equal(
      '{urn:epcglobal:cbv:mda:}key=test',
    );

    const str2 = eventToPreHashedString(
      {
        'dcterms:term': 'value',
        action: 'OBSERVE',
      },
      sampleContext,
    );
    expect(str2).to.be.equal(
      'action=OBSERVE{http://purl.org/dc/terms/}term=value',
    );
  });

  it('should automatically add the context from custom fields', () => {
    const str = eventToPreHashedString(
      {
        'example:userExt': {
          '@xmlns:example': 'https://ns.example.com/epcis',
          '#text': 'CD-34',
        },
        readPoint: {
          id: 'https://id.gs1.org/414/4012345000115', // urn:epc:id:sgln:4012345.00011.0
          'example:myField1': 'AB-12',
        },
      },
      {},
    );
    expect(str).to.be.equal(
      'readPointid=https://id.gs1.org/414/4012345000115readPoint{htt' +
        'ps://ns.example.com/epcis}myField1=AB-12{https://ns.example.com/epcis}userExt=CD-34',
    );
  });

  it('should not take into account context at the root of an event', () => {
    const str = eventToPreHashedString(
      {
        '@context': ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld', {
          example: 'https://ns.example.com/epcis/',
          ext1: 'https://example.com/ext1/',
          evt: 'https://evrythng.com/context',
        }],
        readPoint: {
          id: 'https://id.gs1.org/414/4012345000115', // urn:epc:id:sgln:4012345.00011.0
          'example:myField1': 'AB-12',
        },
      },
      ['https://ref.gs1.org/standards/epcis/2.0.0/epcis-context.jsonld', {
        example: 'https://ns.example.com/epcis/',
        ext1: 'https://example.com/ext1/',
        evt: 'https://evrythng.com/context',
      }],
    );
    expect(str).to.be.equal(
      'readPointid=https://id.gs1.org/414/4012345000115readPoint{htt' +
      'ps://ns.example.com/epcis/}myField1=AB-12',
    );
  });

  it('should pre-hash the event Type field', () => {
    const str = eventToPreHashedString(
      {
        type: 'TransformationEvent',
      },
      {},
    );
    expect(str).to.be.equal('eventType=TransformationEvent');
  });

  it('should pre-hash the action field', () => {
    const str = eventToPreHashedString(
      {
        action: 'OBSERVE',
      },
      {},
    );
    expect(str).to.be.equal('action=OBSERVE');
  });

  it('should pre-hash a bizStep', () => {
    const str = eventToPreHashedString(
      {
        bizStep: cbv.bizSteps.repairing,
      },
      {},
    );
    expect(str).to.be.equal('bizStep=https://ref.gs1.org/cbv/BizStep-repairing');
  });

  it('should pre-hash a disposition', () => {
    const str = eventToPreHashedString(
      {
        disposition: cbv.dispositions.damaged,
      },
      {},
    );
    expect(str).to.be.equal('disposition=https://ref.gs1.org/cbv/Disp-damaged');
  });

  it('should pre-hash a persistentDisposition', () => {
    const str = eventToPreHashedString(
      {
        persistentDisposition: {
          set: [
            cbv.dispositions.completeness_inferred,
            cbv.dispositions.completeness_verified,
          ],
          unset: [
            cbv.dispositions.completeness_verified,
            cbv.dispositions.completeness_inferred,
          ],
        },
      },
      {},
    );
    expect(str).to.be.equal(
      'persistentDispositionset=https://ref.gs1.org/cbv/Disp-completeness_inferredset=https://ref.gs1.org/cbv/Disp-completeness_verifiedunset=https://ref.gs1.org/cbv/Disp-completeness_inferredunset=https://ref.gs1.org/cbv/Disp-completeness_verified',
    );
  });

  it('should pre-hash a readPoint', () => {
    const str = eventToPreHashedString(
      {
        readPoint: { id: 'urn:epc:id:sgln:4012345.00011.0' },
      },
      {},
    );
    expect(str).to.be.equal('readPointid=https://id.gs1.org/414/4012345000115');
  });

  it('should pre-hash a bizLocation', () => {
    const str = eventToPreHashedString(
      {
        bizLocation: { id: 'urn:epc:id:sgln:0012345.11111.0' },
      },
      {},
    );
    expect(str).to.be.equal('bizLocationid=https://id.gs1.org/414/0012345111112');
  });

  it('should pre-hash a parentID', () => {
    const str = eventToPreHashedString(
      {
        parentID: 'urn:epc:id:sscc:4047023.0111111122',
      },
      {},
    );
    expect(str).to.be.equal('parentID=https://id.gs1.org/00/0404702301111111225');
  });

  it('should not pre-hash an eventID', () => {
    const str = eventToPreHashedString(
      {
        eventID: 'id',
      },
      {},
    );
    expect(str).to.be.equal('');
  });

  it('should not pre-hash a recordTime', () => {
    const str = eventToPreHashedString(
      {
        recordTime: exampleObjectEvent.recordTime,
      },
      {},
    );
    expect(str).to.be.equal('');
  });

  it('should pre-hash an eventTime', () => {
    const str = eventToPreHashedString(
      {
        eventTime: '2019-10-21T11:00:30.000+01:00',
      },
      {},
    );
    expect(str).to.be.equal('eventTime=2019-10-21T10:00:30.000Z');
  });

  it('should pre-hash an eventTimeZoneOffset', () => {
    const str = eventToPreHashedString(
      {
        eventTimeZoneOffset: '+01:00',
      },
      {},
    );
    expect(str).to.be.equal('eventTimeZoneOffset=+01:00');
  });

  it('should not pre-hash an error Declaration', () => {
    const str = eventToPreHashedString(
      {
        errorDeclaration: {
          declarationTime: '2020-01-15T00:00:00.000+01:00',
          reason: cbv.errorReasonIdentifiers.incorrect_data,
          'example:vendorExtension': {
            '@xmlns:example': 'http://ns.example.com/epcis',
            '#text': 'Test1',
          },
        },
      },
      {},
    );
    expect(str).to.be.equal(
      '',
    );
  });

  it('should pre-hash a transformation ID', () => {
    const str = eventToPreHashedString(
      {
        transformationID: 'urn:epc:id:gdti:4012345.55555.1234',
      },
      {},
    );
    expect(str).to.be.equal('transformationID=https://id.gs1.org/253/40123455555541234');
  });

  it('should pre-hash a sensor metadata', () => {
    const str = eventToPreHashedString(
      {
        sensorElementList: [
          {
            sensorMetadata: {
              time: '2019-04-02T14:05:00.000+01:00',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
            },
          },
        ],
      },
      {},
    );
    expect(str).to.be.equal(
      'sensorElementListsensorElementsensorMetadatatime=2019-04-02T13:05:00.000ZdeviceID=https://id.gs1.org/8004/4000001111deviceMetadata=https://id.gs1.org/8004/4000001111rawData=https://id.gs1.org/8004/401234599999',
    );
  });

  it('should replace cbv vocabulary', () => {
    const str = eventToPreHashedString(
      {
        bizStep: 'repairing',
      },
      {},
    );
    expect(str).to.be.equal('bizStep=https://ref.gs1.org/cbv/BizStep-repairing');
    const str2 = eventToPreHashedString(
      {
        disposition: 'damaged',
      },
      {},
    );
    expect(str2).to.be.equal('disposition=https://ref.gs1.org/cbv/Disp-damaged');
    const str3 = eventToPreHashedString(
      {
        bizTransactionList: [
          {
            type: 'desadv',
            bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:4711',
          },
          {
            type: 'inv',
            bizTransaction: 'urn:epcglobal:cbv:bt:5200001000008:RE1099',
          },
        ],
      },
      {},
    );
    expect(str3).to.be.equal(
      'bizTransactionListtype=https://ref.gs1.org/cbv/BTT-desadvbizTransaction=urn:epcglobal:cbv:bt:5200001000008:4711type=https://ref.gs1.org/cbv/BTT-invbizTransaction=urn:epcglobal:cbv:bt:5200001000008:RE1099',
    );
    const str4 = eventToPreHashedString(
      {
        destinationList: [
          {
            destination: 'urn:epc:id:sgln:4012345.00012.0',
            type: 'location',
          },
          {
            destination: 'urn:epc:id:pgln:4012345.00000',
            type: 'owning_party',
          },
          {
            type: 'possessing_party',
            destination: 'urn:epc:id:pgln:4012345.00000',
          },
        ],
      },
      {},
    );
    expect(str4).to.be.equal(
      'destinationListtype=https://ref.gs1.org/cbv/SDT-locationdestination=https://id.gs1.org/414/4012345000122type=https://ref.gs1.org/cbv/SDT-owning_partydestination=https://id.gs1.org/417/4012345000009type=https://ref.gs1.org/cbv/SDT-possessing_partydestination=https://id.gs1.org/417/4012345000009',
    );
  });
});
