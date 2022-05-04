/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/**
 * An object containing all the possible vtype.
 * More info here: https://www.gs1.org/standards/epcis
 */

const vtype = {
  ReadPointID: 'urn:epcglobal:epcis:vtype:ReadPoint',
  BusinessLocationID: 'urn:epcglobal:epcis:vtype:BusinessLocation',
  BusinessStepID: 'urn:epcglobal:epcis:vtype:BusinessStep',
  DispositionID: 'urn:epcglobal:epcis:vtype:Disposition',
  BusinessTransaction: 'urn:epcglobal:epcis:vtype:BusinessTransaction',
  BusinessTransactionTypeID: 'urn:epcglobal:epcis:vtype:BusinessTransactionType',
  EPCClass: 'urn:epcglobal:epcis:vtype:EPCClass',
  SourceDestTypeID: 'urn:epcglobal:epcis:vtype:SourceDestType',
  SourceDestID: 'urn:epcglobal:epcis:vtype:SourceDest',
  LocationID: 'urn:epcglobal:epcis:vtype:Location',
  PartyID: 'urn:epcglobal:epcis:vtype:Party',
  ErrorReasonID: 'urn:epcglobal:epcis:vtype:ErrorReason',
  SensorPropertyTypeID: 'urn:epcglobal:epcis:vtype:SensorPropertyType',
  MicroorganismID: 'urn:epcglobal:epcis:vtype:Microorganism',
  ChemicalSubstanceID: 'urn:epcglobal:epcis:vtype:ChemicalSubstance',
  ResourceID: 'urn:epcglobal:epcis:vtype:Resource',
};

export default vtype;
