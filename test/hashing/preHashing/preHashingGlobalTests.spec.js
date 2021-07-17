/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import { expect } from 'chai';
import documentWithComment from '../../data/hashing/epcisDocHavingEventWithComment.json';
import { eventToPreHashedString } from '../../../src/hash_generator/EPCISEventToPreHashedString';
import {
  epcisDocHavingEventWithCommentPreHash,
  epcisDocWithCustomSchemaInContextPreHash,
  epcisDocWithDefaultSchemaInContextPreHash,
  epcisDocWithSensorDataObjectEventPreHash,
  epcisDocWithShippingAndTransportingEventPreHash,
  epcisDocWithSingleEventPreHash,
  epcisDocWithVariousEventTypesPreHash,
  epcisDocWithXMLStartTagAndErrorDeclarationPreHash,
  epcListNormalisationPreHash,
  referenceEventHashAlgorithm2PreHash, referenceEventHashAlgorithm3PreHash,
  referenceEventHashAlgorithmPreHash,
} from '../../data/hashing/samplePrehashesAndHashes';
import documentWithCustomSchema from '../../data/hashing/epcisDocWithCustomSchemaInContext.json';
import documentWithDefaultSchema from '../../data/hashing/epcisDocWithDefaultSchemaInContext.json';
import documentWithSensorData from '../../data/hashing/epcisDocWithSensorDataObjectEvent.json';
import documentWithShippingAndTransportingEvents
  from '../../data/hashing/epcisDocWithShippingAndTransportingEvent.json';
import documentWithSingleEvent from '../../data/hashing/epcisDocWithSingleEvent.json';
import documentWithVariousEvents from '../../data/hashing/epcisDocWithVariousEventTypes.json';
import documentWithErrorDeclaration from '../../data/hashing/epcisDocWithXMLstartTagAndErrorDeclaration.json';
import documentWithManyEPCs from '../../data/hashing/epclist_normalisation.json';
import ReferenceEventHashAlgorithm from '../../data/hashing/event-hash-reference-document.json';
import ReferenceEventHashAlgorithm2 from '../../data/hashing/event-hash-reference-document2.json';
import ReferenceEventHashAlgorithm3 from '../../data/hashing/event-hash-reference-document3.json';

describe('global tests for pre-hashing', () => {
  it('should pre-hash a document with comment', () => {
    for (let i = 0; i < documentWithComment.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(documentWithComment.epcisBody.eventList[i],
        documentWithComment['@context'][1], false);
      expect(str).to.be.equal(epcisDocHavingEventWithCommentPreHash[i]);
    }
  });

  it('should pre-hash a document with custom schema in context', () => {
    for (let i = 0; i < documentWithCustomSchema.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(documentWithCustomSchema.epcisBody.eventList[i],
        documentWithCustomSchema['@context'][1]);
      expect(str).to.be.equal(epcisDocWithCustomSchemaInContextPreHash[i]);
    }
  });

  it('should pre-hash a document with default schema in context', () => {
    for (let i = 0; i < documentWithDefaultSchema.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(
        documentWithDefaultSchema.epcisBody.eventList[i],
        {},
      );
      expect(str).to.be.equal(epcisDocWithDefaultSchemaInContextPreHash[i]);
    }
  });

  it('should pre-hash a document with sensor data', () => {
    for (let i = 0; i < documentWithSensorData.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(documentWithSensorData.epcisBody.eventList[i],
        documentWithSensorData['@context'][1]);
      expect(str).to.be.equal(epcisDocWithSensorDataObjectEventPreHash[i]);
    }
  });

  it('should pre-hash a document with shipping and transporting events', () => {
    for (let i = 0;
      i < documentWithShippingAndTransportingEvents.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(
        documentWithShippingAndTransportingEvents.epcisBody.eventList[i],
        {},
      );
      expect(str).to.be.equal(epcisDocWithShippingAndTransportingEventPreHash[i]);
    }
  });

  it('should pre-hash a document with single event', () => {
    const str = eventToPreHashedString(documentWithSingleEvent.epcisBody.event,
      documentWithSingleEvent['@context'][1]);
    expect(str).to.be.equal(epcisDocWithSingleEventPreHash[0]);
  });

  it('should pre-hash a document with various events', () => {
    for (let i = 0; i < documentWithVariousEvents.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(documentWithVariousEvents.epcisBody.eventList[i],
        {});
      expect(str).to.be.equal(epcisDocWithVariousEventTypesPreHash[i]);
    }
  });

  it('should pre-hash a document with error declaration', () => {
    for (let i = 0;
      i < documentWithErrorDeclaration.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(
        documentWithErrorDeclaration.epcisBody.eventList[i],
        {},
      );
      expect(str).to.be.equal(epcisDocWithXMLStartTagAndErrorDeclarationPreHash[i]);
    }
  });

  it('should pre-hash a document with many EPCs', () => {
    for (let i = 0; i < documentWithManyEPCs.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(documentWithManyEPCs.epcisBody.eventList[i],
        {});
      expect(str).to.be.equal(epcListNormalisationPreHash[i]);
    }
  });

  it('should pre-hash a reference document of the hash algorithm (1)', () => {
    // https://github.com/RalphTro/epcis-event-hash-generator#canonical-property-order
    for (let i = 0; i < ReferenceEventHashAlgorithm.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(ReferenceEventHashAlgorithm.epcisBody.eventList[i],
        {});
      expect(str).to.be.equal(referenceEventHashAlgorithmPreHash[i]);
    }
  });

  it('should pre-hash a reference document of the hash algorithm (2)', () => {
    // https://github.com/RalphTro/epcis-event-hash-generator#canonical-property-order
    for (let i = 0; i < ReferenceEventHashAlgorithm2.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(ReferenceEventHashAlgorithm2.epcisBody.eventList[i],
        ReferenceEventHashAlgorithm2['@context'][1]);
      expect(str).to.be.equal(referenceEventHashAlgorithm2PreHash[i]);
    }
  });

  it('should pre-hash a reference document of the hash algorithm (3)', () => {
    // https://github.com/RalphTro/epcis-event-hash-generator#canonical-property-order
    for (let i = 0; i < ReferenceEventHashAlgorithm3.epcisBody.eventList.length; i += 1) {
      const str = eventToPreHashedString(ReferenceEventHashAlgorithm3.epcisBody.eventList[i],
        ReferenceEventHashAlgorithm3['@context'][1]);
      expect(str).to.be.equal(referenceEventHashAlgorithm3PreHash[i]);
    }
  });
});
