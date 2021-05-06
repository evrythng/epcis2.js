import { expect } from 'chai';
import EPCISMasterData from '../../src/entity/epcis/EPCISMasterData';

const exampleEPCISHeader = {
  epcisMasterData: {
    vocabularyList: [
      {
        vocabularyElementList: [
          {
            isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
            id: 'urn:epc:id:sgln:0037000.00729.0',
            attributes: [
              { id: 'xmda:latitude', attribute: '+18.0000' },
              { id: 'xmda:longitude', attribute: '-70.0000' },
              {
                id: 'xmda:address',
                attribute: {
                  '@context': {
                    '@vocab': 'http://epcis.example.com/ns/',
                  },
                  isA: 'Address',
                  street: '100 Nowhere Street',
                  city: 'Fancy',
                  state: 'DC',
                  zip: '99999',
                },
              },
            ],
            children: [
              'urn:epc:id:sgln:0037000.00729.8201',
              'urn:epc:id:sgln:0037000.00729.8202',
              'urn:epc:id:sgln:0037000.00729.8203',
            ],
          },
          {
            isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
            id: 'urn:epc:id:sgln:0037000.00729.8202',
            attributes: [
              { id: 'cbvmda:sst', attribute: '202' },
            ],
            children: [
              'urn:epc:id:sgln:0037000.00729.8203',
            ],
          },
          {
            isA: 'urn:epcglobal:epcis:vtype:BusinessLocation',
            id: 'urn:epc:id:sgln:0037000.00729.8203',
            attributes: [
              { id: 'cbvmda:sst', attribute: '202' },
              { id: 'cbvmda:ssa', attribute: '402' },
            ],
          },
        ],
      },
      {
        vocabularyElementList: [
          {
            isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
            id: 'urn:epc:id:sgln:0037000.00729.8201',
            attributes: [
              { id: 'cbvmda:site', attribute: '0037000007296' },
              { id: 'cbvmda:sst', attribute: 201 },
            ],
          },
          {
            isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
            id: 'urn:epc:id:sgln:0037000.00729.8202',
            attributes: [
              { id: 'cbvmda:site', attribute: '0037000007296' },
              { id: 'cbvmda:sst', attribute: '202' },
            ],
          },
          {
            isA: 'urn:epcglobal:epcis:vtype:ReadPoint',
            id: 'urn:epc:id:sgln:0037000.00729.8203',
            attributes: [
              { id: 'cbvmda:sst', attribute: 204 },
            ],
          },
        ],
      },
    ],
  },
};

describe('unit tests for the EPCIS classes in the src/entity/epcis folder', () => {
  describe('EPCISMasterData.js', () => {
    it('setters should set the variables correctly', async () => {
      const e = new EPCISMasterData()
        .addVocabularyList(exampleEPCISHeader.epcisMasterData.vocabularyList);

      expect(e.getVocabularyList()).to.deep
        .equal(exampleEPCISHeader.epcisMasterData.vocabularyList);
    });
    it('creation from object should set the variables correctly', async () => {
      const e = new EPCISMasterData(exampleEPCISHeader.epcisMasterData);
      expect(e.toObject()).to.deep.equal(exampleEPCISHeader.epcisMasterData);
    });
  });
});
