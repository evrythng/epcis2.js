/**
 * (c) Copyright Reserved Digimarc Limited 2022. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */
import settings from '../settings';

const epcTds = require('epc-tds');
const { DigitalLink } = require('digital-link.js');

const buildDigitalLinkFromEpc = (epc, customOptions = {}) => {
  const domain = customOptions.digitalLinkDomain || settings.digitalLinkDomain;
  const parsedEpc = epcTds.valueOf(epc);

  const dl = DigitalLink();
  dl.setDomain(domain);
  dl.setIdentifier('01', parsedEpc.getGtin().toString());
  dl.setKeyQualifier('21', parsedEpc.getSerial().toString());

  return dl.toWebUriString();
};

export default buildDigitalLinkFromEpc;
