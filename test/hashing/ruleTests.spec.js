/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import {
  eventToPreHashedString,
  getOrderedPreHashString,
  getPreHashStringOfField,
} from '../../src/hash_generator/EPCISEventToPreHashedString';
import {
  bizTransactionCanonicalPropertyOrder,
  canonicalPropertyOrder,
  destinationCanonicalPropertyOrder,
  persistentDispositionCanonicalPropertyOrder,
  quantityElementCanonicalPropertyOrder,
  sensorElementCanonicalPropertyOrder,
  sensorMetadataCanonicalPropertyOrder,
  sensorReportCanonicalPropertyOrder,
  sourceCanonicalPropertyOrder,
} from '../../src/hash_generator/canonicalPropertyOrder';

describe('rule tests', () => {
  // The rules are defined here : https://ref.gs1.org/standards/cbv/ (section 8.9.2)

  describe('should follow rule n°1', () => {
    it('should order event fields', () => {
      const event = {
        type: 'ObjectEvent',
        eventID: 'ni:///sha-256;36abb3a2c0a726de32ac4beafd6b8bc4ba0b1d2de244490312e5cbec7b5ddece?ver=CBV2.0',
        eventTime: '2005-04-05T02:33:31.116Z',
        parentID: 'urn:epc:id:grai:4012345.55555.987',
        recordTime: '2005-04-05T02:33:31.116Z',
        eventTimeZoneOffset: '-06:00',
        epcList: ['urn:epc:id:sgtin:0614141.107346.2018'],
        inputEPCList: ['urn:epc:id:sgtin:0614141.107346.2018'],
        outputEPCList: ['urn:epc:id:sgtin:0614141.107346.2018'],
        childEPCs: ['urn:epc:id:sgtin:0614141.107346.2018'],
        action: 'ADD',
        bizStep: 'receiving',
        disposition: 'in_progress',
        transformationID: 'urn:epc:id:gdti:0614141.12345.400',
        readPoint: {
          id: 'urn:epc:id:sgln:0012345.11111.400',
        },
        bizLocation: {
          id: 'urn:epc:id:sgln:0012345.11111.0',
        },
        bizTransactionList: [
          {
            type: 'po',
            bizTransaction: 'urn:epc:id:gdti:0614141.00001.1618034',
          },
        ],
        quantityList: [
          {
            epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
            quantity: 200,
            uom: 'KGM',
          },
        ],
        inputQuantityList: [
          {
            epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
            quantity: 200,
            uom: 'KGM',
          },
        ],
        childQuantityList: [
          {
            epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
            quantity: 200,
            uom: 'KGM',
          },
        ],
        outputQuantityList: [
          {
            epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
            quantity: 200,
            uom: 'KGM',
          },
        ],
        'ext1:rootExtension': 'thisIsAUserExtension',
        sourceList: [
          {
            type: 'location',
            source: 'urn:epc:id:sgln:4012345.00225.0',
          },
        ],
        destinationList: [
          {
            type: 'location',
            destination: 'urn:epc:id:sgln:0614141.00777.0',
          },
        ],
        sensorElementList: [
          {
            sensorMetadata: {
              time: '2019-04-02T13:05:00.000Z',
              deviceID: 'urn:epc:id:giai:4000001.111',
              deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              rawData: 'https://example.org/giai/401234599999',
              startTime: '2019-04-02T12:55:01.000Z',
              endTime: '2019-04-02T13:55:00.000Z',
              dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
              bizRules: 'https://example.com/gdti/4012345000054987',
            },
            sensorReport: [
              {
                type: 'Temperature',
                deviceID: 'urn:epc:id:giai:4000001.111',
                rawData: 'https://example.org/giai/401234599999',
                dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
                time: '2019-07-19T13:00:00.000Z',
                microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
                chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
                value: 26,
                component: 'example:x',
                stringValue: 'SomeString',
                booleanValue: true,
                hexBinaryValue: 'f0f0f0',
                uriValue: 'https://id.gs1.org/giai/4000001111',
                minValue: 26,
                maxValue: 26.2,
                meanValue: 13.2,
                percRank: 50,
                percValue: 12.7,
                uom: 'CEL',
                sDev: 0.1,
                deviceMetadata: 'https://id.gs1.org/giai/4000001111',
              },
            ],
          },
        ],
        persistentDisposition: {
          set: ['completeness_verified'],
          unset: ['completeness_inferred'],
        },
        ilmd: {
          'ext1:float': '20',
        },
        errorDeclaration: {
          declarationTime: '2020-01-15T00:00:00+01:00',
          reason: 'incorrect_data',
          'example:vendorExtension': 'Test1',
          correctiveEventIDs: ['urn:uuid:404d95fc-9457-4a51-bd6a-0bba133845a8'],
        },
      };
      const str = eventToPreHashedString(
        event,
        {
          ext1: 'https://example.com/ext1',
        },
        true,
      );

      let item = 'eventType'; // harcoding this one because it is 'eventType' and not 'type' when pre hashing
      let nextItem;

      for (let i = 1; i < canonicalPropertyOrder.length; i += 1) {
        nextItem = canonicalPropertyOrder[i];

        expect(str.indexOf(item)).to.be.lessThan(str.indexOf(nextItem));

        item = nextItem;
      }

      // we should not include the fields that are not in the canonical order list
      expect(str.includes('errorDeclaration')).to.be.false;
      expect(str.includes('recordTime')).to.be.false;
      expect(str.includes('certificationInfo')).to.be.false;

      // finally, we append the user extensions
      expect(str.endsWith('rootExtension=thisIsAUserExtension')).to.be.true;
    });

    it('should order quantityElement fields', () => {
      const quantityElement = {
        epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
        quantity: 200.5,
        uom: 'KGM',
      };
      const order = quantityElementCanonicalPropertyOrder;
      const str = getOrderedPreHashString(
        quantityElement,
        {},
        order,
        true,
      );

      let item = order[0];
      let nextItem;

      for (let i = 1; i < order.length; i += 1) {
        nextItem = order[i];
        expect(str.preHashed.indexOf(item)).to.be.lessThan(str.preHashed.indexOf(nextItem));
        item = nextItem;
      }
    });

    it('should order bizTransaction fields', () => {
      const object = {
        bizTransaction: 'urn:epc:id:gdti:0614141.00001.1618034',
        type: 'po',
      };
      const order = bizTransactionCanonicalPropertyOrder;
      const str = getOrderedPreHashString(
        object,
        {},
        order,
        true,
      );

      let item = order[0];
      let nextItem;

      for (let i = 1; i < order.length; i += 1) {
        nextItem = order[i];
        expect(str.preHashed.indexOf(item)).to.be.lessThan(str.preHashed.indexOf(nextItem));
        item = nextItem;
      }
    });

    it('should order source fields', () => {
      const object = {
        source: 'urn:epc:id:sgln:4012345.00225.0',
        type: 'location',
      };
      const order = sourceCanonicalPropertyOrder;
      const str = getOrderedPreHashString(
        object,
        {},
        order,
        true,
      );

      let item = order[0];
      let nextItem;

      for (let i = 1; i < order.length; i += 1) {
        nextItem = order[i];
        expect(str.preHashed.indexOf(item)).to.be.lessThan(str.preHashed.indexOf(nextItem));
        item = nextItem;
      }
    });

    it('should order destination fields', () => {
      const object = {
        type: 'location',
        destination: 'urn:epc:id:sgln:0614141.00777.0',
      };
      const order = destinationCanonicalPropertyOrder;
      const str = getOrderedPreHashString(
        object,
        {},
        order,
        true,
      );

      let item = order[0];
      let nextItem;

      for (let i = 1; i < order.length; i += 1) {
        nextItem = order[i];
        expect(str.preHashed.indexOf(item)).to.be.lessThan(str.preHashed.indexOf(nextItem));
        item = nextItem;
      }
    });

    it('should order sensor fields', () => {
      const object = {
        sensorMetadata: {
          time: '2019-04-02T13:05:00.000Z',
          deviceID: 'urn:epc:id:giai:4000001.111',
          deviceMetadata: 'https://id.gs1.org/giai/4000001111',
          rawData: 'https://example.org/giai/401234599999',
          startTime: '2019-04-02T12:55:01.000Z',
          endTime: '2019-04-02T13:55:00.000Z',
          dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
          bizRules: 'https://example.com/gdti/4012345000054987',
        },
        sensorReport: [
          {
            type: 'Temperature',
            deviceID: 'urn:epc:id:giai:4000001.111',
            rawData: 'https://example.org/giai/401234599999',
            dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
            time: '2019-07-19T13:00:00.000Z',
            microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
            chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
            value: 26,
            component: 'example:x',
            stringValue: 'SomeString',
            booleanValue: true,
            hexBinaryValue: 'f0f0f0',
            uriValue: 'https://id.gs1.org/giai/4000001111',
            minValue: 26,
            maxValue: 26.2,
            meanValue: 13.2,
            percRank: 50,
            percValue: 12.7,
            uom: 'CEL',
            sDev: 0.1,
            deviceMetadata: 'https://id.gs1.org/giai/4000001111',
          },
        ],
      };
      const order = sensorElementCanonicalPropertyOrder;
      const str = getOrderedPreHashString(
        object,
        { ext1: 'test' },
        order,
        true,
      );

      let item = order[0];
      let nextItem;

      for (let i = 1; i < order.length; i += 1) {
        nextItem = order[i];
        expect(str.preHashed.indexOf(item)).to.be.lessThan(str.preHashed.indexOf(nextItem));
        item = nextItem;
      }
    });

    it('should order sensorMetadata fields', () => {
      const object = {
        time: '2019-04-02T13:05:00.000Z',
        deviceID: 'urn:epc:id:giai:4000001.111',
        deviceMetadata: 'https://id.gs1.org/giai/4000001111',
        rawData: 'https://example.org/giai/401234599999',
        startTime: '2019-04-02T12:55:01.000Z',
        endTime: '2019-04-02T13:55:00.000Z',
        dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
        bizRules: 'https://example.com/gdti/4012345000054987',
      };
      const order = sensorMetadataCanonicalPropertyOrder;
      const str = getOrderedPreHashString(
        object,
        {},
        order,
        true,
      );

      let item = order[0];
      let nextItem;

      for (let i = 1; i < order.length; i += 1) {
        nextItem = order[i];
        expect(str.preHashed.indexOf(item)).to.be.lessThan(str.preHashed.indexOf(nextItem));
        item = nextItem;
      }
    });

    it('should order sensorReport fields', () => {
      const object = {
        type: 'Temperature',
        deviceID: 'urn:epc:id:giai:4000001.111',
        rawData: 'https://example.org/giai/401234599999',
        dataProcessingMethod: 'https://example.com/gdti/4012345000054987',
        time: '2019-07-19T13:00:00.000Z',
        microorganism: 'https://www.ncbi.nlm.nih.gov/taxonomy/1126011',
        chemicalSubstance: 'https://identifiers.org/inchikey:CZMRCDWAGMRECN-UGDNZRGBSA-N',
        value: 26,
        component: 'example:x',
        stringValue: 'SomeString',
        booleanValue: true,
        hexBinaryValue: 'f0f0f0',
        uriValue: 'https://id.gs1.org/giai/4000001111',
        minValue: 26,
        maxValue: 26.2,
        meanValue: 13.2,
        percRank: 50,
        percValue: 12.7,
        uom: 'CEL',
        sDev: 0.1,
        deviceMetadata: 'https://id.gs1.org/giai/4000001111',
      };
      const order = sensorReportCanonicalPropertyOrder;
      const str = getOrderedPreHashString(
        object,
        {},
        order,
        true,
      );

      let item = order[0];
      let nextItem;

      for (let i = 1; i < order.length; i += 1) {
        nextItem = order[i];
        expect(str.preHashed.indexOf(item)).to.be.lessThan(str.preHashed.indexOf(nextItem));
        item = nextItem;
      }
    });

    it('should order persistentDispositon fields', () => {
      const object = {
        unset: ['completeness_inferred'],
        set: ['completeness_verified'],
      };
      const order = persistentDispositionCanonicalPropertyOrder;
      const str = getOrderedPreHashString(
        object,
        {},
        order,
        true,
      );

      let item = order[0];
      let nextItem;

      for (let i = 1; i < order.length; i += 1) {
        nextItem = order[i];
        expect(str.preHashed.indexOf(item)).to.be.lessThan(str.preHashed.indexOf(nextItem));
        item = nextItem;
      }
    });
  });

  it('should follow rule n°3', () => {
    const str = getPreHashStringOfField('field', 'value', true);
    expect(str).to.be.equal('field=value');
  });

  it('should follow rule n°4', () => {
    const quantityElement = {
      epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
      quantity: 200.5,
    };
    const str = getOrderedPreHashString(
      quantityElement,
      {},
      quantityElementCanonicalPropertyOrder,
      true,
    );
    expect(str.preHashed.includes('uom')).to.be.false;
  });

  it('should follow rule n°5', () => {
    const str = getPreHashStringOfField('field', '  value  ', true);
    expect(str).to.be.equal('field=value');
    const str2 = getPreHashStringOfField('field', '  val ue  ', true);
    expect(str2).to.be.equal('field=val ue');
  });

  it('should follow rule n°6', () => {
    let str = getPreHashStringOfField('field', 10.0, true);
    expect(str).to.be.equal('field=10');
    str = getPreHashStringOfField('field', 10.1, true);
    expect(str).to.be.equal('field=10.1');
    str = getPreHashStringOfField('field', 10.3434, true);
    expect(str).to.be.equal('field=10.3434');
    str = getPreHashStringOfField('field', 10.34340, true);
    expect(str).to.be.equal('field=10.3434');
  });

  it('should follow rule n°8', () => {
    const str = getPreHashStringOfField('field', '2020-01-15T00:00:00.000+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
  });

  it('should follow rule n°9', () => {
    let str = getPreHashStringOfField('field', '2020-01-15T00:00:00+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-15T00:00:00.0+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-15T00:00:00.00+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-15T00:00:00.000+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-15T00:00:00.0000+01:00', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
    str = getPreHashStringOfField('field', '2020-01-14T23:00:00.0000000Z', true);
    expect(str).to.be.equal('field=2020-01-14T23:00:00.000Z');
  });

  describe('should follow rule n°11', () => {
    it('should order epcList', () => {
      const str = eventToPreHashedString(
        {
          epcList: ['abc', 'def', 'aaa', 'ccc', 'bbb'],
        },
        {},
      );
      expect(str).to.be.equal('epcListepc=aaaepc=abcepc=bbbepc=cccepc=def');
    });

    it('should order childEpcList', () => {
      const str = eventToPreHashedString(
        {
          childEPCs: ['abc', 'def', 'aaa', 'ccc', 'bbb'],
        },
        {},
      );
      expect(str).to.be.equal('childEPCsepc=aaaepc=abcepc=bbbepc=cccepc=def');
    });

    it('should order inputEpcList', () => {
      const str = eventToPreHashedString(
        {
          inputEPCList: ['abc', 'def', 'aaa', 'ccc', 'bbb'],
        },
        {},
      );
      expect(str).to.be.equal('inputEPCListepc=aaaepc=abcepc=bbbepc=cccepc=def');
    });

    it('should order outputEpcList', () => {
      const str = eventToPreHashedString(
        {
          outputEPCList: ['abc', 'def', 'aaa', 'ccc', 'bbb'],
        },
        {},
      );
      expect(str).to.be.equal('outputEPCListepc=aaaepc=abcepc=bbbepc=cccepc=def');
    });

    it('should order quantityList', () => {
      const str = eventToPreHashedString(
        {
          quantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998878',
              quantity: 10,
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
              uom: 'KGN',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 201.5,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('quantityList'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5uom=KGM'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5uom=KGN'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=201.5'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998878quantity=10');
    });

    it('should order childQuantityList', () => {
      const str = eventToPreHashedString(
        {
          childQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998878',
              quantity: 10,
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
              uom: 'KGN',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 201.5,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('childQuantityList'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5uom=KGM'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5uom=KGN'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=201.5'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998878quantity=10');
    });

    it('should order inputQuantityList', () => {
      const str = eventToPreHashedString(
        {
          inputQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998878',
              quantity: 10,
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
              uom: 'KGN',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 201.5,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('inputQuantityList'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5uom=KGM'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5uom=KGN'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=201.5'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998878quantity=10');
    });

    it('should order outputQuantityList', () => {
      const str = eventToPreHashedString(
        {
          outputQuantityList: [
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998878',
              quantity: 10,
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
              uom: 'KGM',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
              uom: 'KGN',
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 200.5,
            },
            {
              epcClass: 'urn:epc:class:lgtin:4012345.012345.998877',
              quantity: 201.5,
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('outputQuantityList'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5uom=KGM'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=200.5uom=KGN'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998877quantity=201.5'
        + 'quantityElementepcClass=https://id.gs1.org/01/04012345123456/10/998878quantity=10');
    });

    it('should order set and unset', () => {
      const str = eventToPreHashedString(
        {
          persistentDisposition: {
            set: [
              'completeness_verified',
              'available',
              'container_closed',
            ],
            unset: [
              'completeness_inferred',
              'completeness_verified',
              'available',
              'container_closed',
            ],
          },
        },
        {},
      );
      expect(str).to.be.equal('persistentDisposition'
        + 'set=https://ref.gs1.org/cbv/Disp-available'
        + 'set=https://ref.gs1.org/cbv/Disp-completeness_verified'
        + 'set=https://ref.gs1.org/cbv/Disp-container_closed'
        + 'unset=https://ref.gs1.org/cbv/Disp-available'
        + 'unset=https://ref.gs1.org/cbv/Disp-completeness_inferred'
        + 'unset=https://ref.gs1.org/cbv/Disp-completeness_verified'
        + 'unset=https://ref.gs1.org/cbv/Disp-container_closed');
    });

    it('should order sensor reports', () => {
      const str = eventToPreHashedString(
        {
          sensorElementList: [
            {
              sensorReport: [
                {
                  type: 'Temperature',
                  value: 26,
                  uom: 'CEL',
                },
                {
                  type: 'AbsoluteHumidity',
                  exception: 'ALARM_CONDITION',
                  value: 12.1,
                  uom: 'A93',
                  component: 'x',
                },
                {
                  type: 'Speed',
                  value: 160,
                  uom: 'KMH',
                },
                {
                  type: 'Illuminance',
                  value: 800,
                  uom: 'LUX',
                },
              ],
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('sensorElementListsensorElement'
        + 'sensorReporttype=AbsoluteHumidity'
        + 'value=12.1'
        + 'component=https://ref.gs1.org/cbv/Comp-x'
        + 'uom=A93'
        + 'sensorReporttype=Illuminance'
        + 'value=800'
        + 'uom=LUX'
        + 'sensorReporttype=Speed'
        + 'value=160'
        + 'uom=KMH'
        + 'sensorReporttype=Temperature'
        + 'value=26'
        + 'uom=CEL');
    });
  });

  describe('should follow rule n°14', () => {
    it('should replace known bizstep only', () => {
      let str = eventToPreHashedString(
        {
          bizStep: 'repairing',
        },
        {},
      );
      expect(str).to.be.equal('bizStep=https://ref.gs1.org/cbv/BizStep-repairing');
      str = eventToPreHashedString(
        {
          bizStep: 'not_a_valid_cbv',
        },
        {},
      );
      expect(str).to.be.equal('bizStep=not_a_valid_cbv');
    });

    it('should replace known disposition only', () => {
      let str = eventToPreHashedString(
        {
          disposition: 'active',
        },
        {},
      );
      expect(str).to.be.equal('disposition=https://ref.gs1.org/cbv/Disp-active');
      str = eventToPreHashedString(
        {
          disposition: 'not_a_valid_cbv',
        },
        {},
      );
      expect(str).to.be.equal('disposition=not_a_valid_cbv');
    });

    it('should replace known bizTransactionType only', () => {
      let str = eventToPreHashedString(
        {
          bizTransactionList: [
            {
              type: 'po',
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('bizTransactionListtype=https://ref.gs1.org/cbv/BTT-po');
      str = eventToPreHashedString(
        {
          bizTransactionList: [
            {
              type: 'not_a_valid_cbv',
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('bizTransactionListtype=not_a_valid_cbv');
    });

    it('should replace known SDT only', () => {
      let str = eventToPreHashedString(
        {
          sourceList: [
            {
              type: 'location',
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('sourceListtype=https://ref.gs1.org/cbv/SDT-location');
      str = eventToPreHashedString(
        {
          sourceList: [
            {
              type: 'not_a_valid_cbv',
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('sourceListtype=not_a_valid_cbv');
      str = eventToPreHashedString(
        {
          destinationList: [
            {
              type: 'location',
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('destinationListtype=https://ref.gs1.org/cbv/SDT-location');
      str = eventToPreHashedString(
        {
          destinationList: [
            {
              type: 'not_a_valid_cbv',
            },
          ],
        },
        {},
      );
      expect(str).to.be.equal('destinationListtype=not_a_valid_cbv');
    });

    it('should replace known Components only', () => {
      let str = eventToPreHashedString(
        {
          sensorElementList: [{
            sensorReport: [
              {
                component: 'x',
              },
            ],
          }],
        },
        {},
      );
      expect(str).to.be.equal('sensorElementListsensorElementsensorReportcomponent=https://ref.gs1.org/cbv/Comp-x');
      str = eventToPreHashedString(
        {
          sensorElementList: [{
            sensorReport: [
              {
                component: 'testValue',
              },
            ],
          }],
        },
        {},
      );
      expect(str).to.be.equal('sensorElementListsensorElementsensorReportcomponent=testValue');
    });
  });

  it('should follow rule n°16', () => {
    const str = getPreHashStringOfField('field', 'urn:epc:id:sgtin:0614141.011111.987', true);
    expect(str).to.be.equal('field=https://id.gs1.org/01/00614141111114/21/987');
  });

  it('should follow rule n°17', () => {
    const str = getPreHashStringOfField('field', 'https://dlnkd.tn.gg/01/9780345418913?key=value', true);
    expect(str).to.be.equal('field=https://id.gs1.org/01/09780345418913');
  });

  it('should follow rule n°18', () => {
    const str = eventToPreHashedString(
      {
        "ilmd":{
          "ext1:value": 3,
          "ext1:boolean":"true",
          'ext2:object': {
            'ext2:sub': 'ok'
          },
        }
      },
      {
        'ext1': 'ok',
        'ext2': 'aa'
      },
    );
    expect(str).to.be.equal('ilmd{aa}object{aa}sub=ok{ok}boolean=true{ok}value=3');
  });

  it('should follow rule n°18', () => {
    const str = eventToPreHashedString(
      {
        "ext1:value": 3,
        "ext1:boolean":"true",
        type: "ObjectEvent",
        'ext2:object': {
          'ext2:sub': 'ok'
        },
      },
      {
        'ext1': 'ok',
        'ext2': 'aa'
      },
    );
    expect(str).to.be.equal('eventType=ObjectEvent{aa}object{aa}sub=ok{ok}boolean=true{ok}value=3');
  });

  it('should follow rule n°19', () => {
    const str = eventToPreHashedString(
      {
        "destination": "test",
        "readPoint": {
          "id": "abc",
          "ext1:rp": "val"
        },
        "ext1:value": 3,
        "ext1:boolean":"true",
        type: "ObjectEvent",
        'ext2:object': {
          'ext2:sub': 'ok'
        },
      },
      {
        'ext1': 'ok',
        'ext2': 'aa'
      },
    );
    expect(str).to.be.equal('eventType=ObjectEventreadPointid=abcdestination=testreadPoint{ok}rp=val{aa}object{aa}sub=ok{ok}boolean=true{ok}value=3');
  });

});
