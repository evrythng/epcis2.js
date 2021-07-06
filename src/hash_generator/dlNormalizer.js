/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-disable no-useless-escape */

/**
 * it protects some character with '%..'
 * @param {string} input - the string to protect
 * @return {string} the updated string
 */
export const webUriPercentEncoder = (input) => input.split('!').join('%21')
  .split('(').join('%28')
  .split(')')
  .join('%29')
  .split('*')
  .join('%2A')
  .split('+')
  .join('%2B')
  .split(',')
  .join('%2C')
  .split(':')
  .join('%3A');

/**
 * @param {string} input - id that requires checkdigit
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @return {number} the checkDigit of the parameter
 */
const getCheckDigit = (input, throwError) => {
  try {
    const array = input.split('').reverse();
    let total = 0;
    let i = 1;
    array.forEach((number) => {
      const n = parseInt(number, 10);
      if (i % 2 === 0) {
        total += n;
      } else {
        total += n * 3;
      }
      i += 1;
    });
    return Math.ceil(total / 10) * 10 - total;
  } catch (e) {
    if (throwError) {
      throw new Error(`There was a problem during the check digit operation of ${input}`);
    }
    return 0;
  }
};

/**
 * it adds the check sum at the end of the input and return a zero-padded result with a pre-defined
 * length
 * @param {string} raw - the string to convert
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @param length - the length of the output string
 * @return {string} the updated string
 */
export const addCheckDigitAndZeroPad = (raw, throwError, length = 14) => {
  let newRaw = raw;
  newRaw += getCheckDigit(newRaw, throwError);
  while (newRaw.length < length) {
    newRaw = `0${newRaw}`;
  }
  return newRaw;
};

/**
 * Converts any standard URI conveying a GS1 Key in Canonical GS1 DL URI.
 * @param originalUri - any URI to be used in EPCIS events that convey a GS1 key, i.e. EPC URIs, EPC
 * Class URIs, EPC ID Pattern URIs, or GS1 Digital Link URIs.
 * @param {boolean} throwError - if set to true, it will throw an error if the event misses some
 * fields for example. Otherwise, it won't throw an error and it will still return the generated id
 * @return a corresponding, constrained version of a canonical GS1 Digital Link URI, i.e. with the
 * lowest level of identification and without CPV/query string.
 */
export const dlNormalizer = (originalUri, throwError = true) => {
  let uri = originalUri;

  if (!uri.includes('.')) {
    return uri;
  }

  const partition = uri.indexOf('.');

  // EPC URIs
  if (uri.match('^urn:epc:id:sgtin:(([0-9]{6}.[0-9]{7})|([0-9]{7}.[0-9]{6})|([0-9]{8}.[0-9]{5})|([0-9]{9}.[0-9]{4})|([0-9]{10}.[0-9]{3})|([0-9]{11}.[0-9]{2})|([0-9]{12}.[0-9]{1})).(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,20}$')) {
    const gs1CompanyPrefix = uri.substring(17, partition);
    const itemRef = uri.substring(partition + 1, partition + 1 + (13 - gs1CompanyPrefix.length));
    const rawGTIN = itemRef.substring(0, 1) + gs1CompanyPrefix + itemRef.substring(1);
    const serial = uri.substring(32);
    return (`https://id.gs1.org/01/${addCheckDigitAndZeroPad(rawGTIN, throwError)}/21/${webUriPercentEncoder(serial)}`);
  }

  if (uri.match('^urn:epc:id:sscc:(([0-9]{6}.[0-9]{11})|([0-9]{7}.[0-9]{10})|([0-9]{8}.[0-9]{9})|([0-9]{9}.[0-9]{8})|([0-9]{10}.[0-9]{7})|([0-9]{11}.[0-9]{6})|([0-9]{12}.[0-9]{5}))$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const serialRef = uri.substring(partition + 1);
    const rawSSCC = uri.substring(partition + 1, partition + 2) + gs1CompanyPrefix + serialRef;
    return (`https://id.gs1.org/00/${addCheckDigitAndZeroPad(rawSSCC, throwError, 18)}`);
  }

  if (uri.match('^urn:epc:id:sgln:(([0-9]{6}.[0-9]{6})|([0-9]{7}.[0-9]{5})|([0-9]{8}.[0-9]{4})|([0-9]{9}.[0-9]{3})|([0-9]{10}.[0-9]{2})|([0-9]{11}.[0-9]{1})|([0-9]{12}.)).(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,20}$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const locationRef = uri.substring(partition + 1,
      (partition + 1 + (12 - gs1CompanyPrefix.length)));
    const rawGLN = gs1CompanyPrefix + locationRef;
    const extension = uri.substring(30);
    if (extension === '0') return (`https://id.gs1.org/414/${addCheckDigitAndZeroPad(rawGLN, throwError, 13)}`);
    return `https://id.gs1.org/414/${addCheckDigitAndZeroPad(rawGLN, throwError, 13)}/254/${webUriPercentEncoder(extension)}`;
  }

  if (uri.match('^urn:epc:id:grai:(([0-9]{6}.[0-9]{6})|([0-9]{7}.[0-9]{5})|([0-9]{8}.[0-9]{4})|([0-9]{9}.[0-9]{3})|([0-9]{10}.[0-9]{2})|([0-9]{11}.[0-9]{1})|([0-9]{12}.)).(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,16}$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const assetRef = uri.substring(partition + 1, (partition + 1 + (12 - gs1CompanyPrefix.length)));
    const rawGRAI = `0${gs1CompanyPrefix}${assetRef}`;
    const serial = uri.substring(30);
    return `https://id.gs1.org/8003/${addCheckDigitAndZeroPad(rawGRAI, throwError)}${webUriPercentEncoder(serial)}`;
  }

  if (uri.match('^urn:epc:id:giai:(([0-9]{6}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,24})|([0-9]{7}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,23})|([0-9]{8}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,22})|([0-9]{9}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,21})|([0-9]{10}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,20})|([0-9]{11}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,19})|([0-9]{12}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,18}))$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const assetRef = uri.substring(partition + 1);
    return (`https://id.gs1.org/8004/${gs1CompanyPrefix}${webUriPercentEncoder(assetRef)}`);
  }

  if (uri.match('^urn:epc:id:gsrn:(([0-9]{6}.[0-9]{11})|([0-9]{7}.[0-9]{10})|([0-9]{8}.[0-9]{9})|([0-9]{9}.[0-9]{8})|([0-9]{10}.[0-9]{7})|([0-9]{11}.[0-9]{6})|([0-9]{12}.[0-9]{5}))$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const serviceRef = uri.substring(partition + 1);
    const rawGSRN = gs1CompanyPrefix + serviceRef;
    return (`https://id.gs1.org/8018/${addCheckDigitAndZeroPad(rawGSRN, throwError, 18)}`);
  }

  if (uri.match('^urn:epc:id:gsrnp:(([0-9]{6}.[0-9]{11})|([0-9]{7}.[0-9]{10})|([0-9]{8}.[0-9]{9})|([0-9]{9}.[0-9]{8})|([0-9]{10}.[0-9]{7})|([0-9]{11}.[0-9]{6})|([0-9]{12}.[0-9]{5}))$')) {
    const gs1CompanyPrefix = uri.substring(17, partition);
    const serviceRef = uri.substring(partition + 1);
    const rawGSRNP = gs1CompanyPrefix + serviceRef;
    return (`https://id.gs1.org/8017/${addCheckDigitAndZeroPad(rawGSRNP, throwError, 18)}`);
  }

  if (uri.match('^urn:epc:id:gdti:(([0-9]{6}.[0-9]{6})|([0-9]{7}.[0-9]{5})|([0-9]{8}.[0-9]{4})|([0-9]{9}.[0-9]{3})|([0-9]{10}.[0-9]{2})|([0-9]{11}.[0-9]{1})|([0-9]{12}..))(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,20}$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const documentType = uri.substring(partition + 1,
      (partition + 1 + (12 - gs1CompanyPrefix.length)));
    const rawGDTI = gs1CompanyPrefix + documentType;
    const serial = uri.substring(30);
    return `https://id.gs1.org/253/${addCheckDigitAndZeroPad(rawGDTI, throwError, 13)}${webUriPercentEncoder(serial)}`;
  }

  if (uri.match('^urn:epc:id:cpi:(([0-9]{6}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,24})|([0-9]{7}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,23})|([0-9]{8}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,22})|([0-9]{9}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,21})|([0-9]{10}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,20})|([0-9]{11}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,19})|([0-9]{12}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,18})).[0-9]{1,12}$')) {
    const gs1CompanyPrefix = uri.substring(15, partition);
    const separator = uri.lastIndexOf('.');
    const cpref = uri.substring(partition + 1, separator);
    const rawCPI = gs1CompanyPrefix + cpref;
    const serial = uri.substring(separator + 1);
    return (`https://id.gs1.org/8010/${webUriPercentEncoder(rawCPI)}/8011/${serial}`);
  }

  if (uri.match('^urn:epc:id:sgcn:(([0-9]{6}.[0-9]{6})|([0-9]{7}.[0-9]{5})|([0-9]{8}.[0-9]{4})|([0-9]{9}.[0-9]{3})|([0-9]{10}.[0-9]{2})|([0-9]{11}.[0-9]{1})|([0-9]{12}.)).[0-9]{1,12}$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const couponRef = uri.substring(partition + 1,
      (partition + 1 + (12 - gs1CompanyPrefix.length)));
    const rawSGCN = gs1CompanyPrefix + couponRef;
    const serial = uri.substring(30);
    return (`https://id.gs1.org/255/${addCheckDigitAndZeroPad(rawSGCN, throwError, 13)}${serial}`);
  }

  if (uri.match('^urn:epc:id:ginc:(([0-9]{6}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,24})|([0-9]{7}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,23})|([0-9]{8}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,22})|([0-9]{9}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,21})|([0-9]{10}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,20})|([0-9]{11}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,19})|([0-9]{12}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,18}))$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const consignmentRef = uri.substring(partition + 1);
    return (`https://id.gs1.org/401/${gs1CompanyPrefix}${webUriPercentEncoder(consignmentRef)}`);
  }

  if (uri.match('^urn:epc:id:gsin:(([0-9]{6}.[0-9]{10}$)|([0-9]{7}.[0-9]{9}$)|([0-9]{8}.[0-9]{8}$)|([0-9]{9}.[0-9]{7}$)|([0-9]{10}.[0-9]{6}$)|([0-9]{11}.[0-9]{5}$)|([0-9]{12}.[0-9]{4}$))')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const shipperRef = uri.substring(partition + 1);
    const rawGSIN = gs1CompanyPrefix + shipperRef;
    return (`https://id.gs1.org/402/${addCheckDigitAndZeroPad(rawGSIN, throwError, 17)}`);
  }

  if (uri.match('^urn:epc:id:itip:(([0-9]{6}.[0-9]{7})|([0-9]{7}.[0-9]{6})|([0-9]{8}.[0-9]{5})|([0-9]{9}.[0-9]{4})|([0-9]{10}.[0-9]{3})|([0-9]{11}.[0-9]{2})|([0-9]{12}.[0-9]{1})).[0-9]{2}.[0-9]{2}.(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,20}$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const itemRef = uri.substring(partition + 1, (partition + 1 + (13 - gs1CompanyPrefix.length)));
    const rawGTIN = itemRef.substring(0, 1) + gs1CompanyPrefix + itemRef.substring(1);
    const piece = uri.substring(31, 33);
    const total = uri.substring(34, 36);
    const serial = uri.substring(37);
    return (`https://id.gs1.org/8006/${addCheckDigitAndZeroPad(rawGTIN, throwError)
    }${piece}${total}/21/${webUriPercentEncoder(serial)}`);
  }

  if (uri.match('^urn:epc:id:upui:(([0-9]{6}.[0-9]{7})|([0-9]{7}.[0-9]{6})|([0-9]{8}.[0-9]{5})|([0-9]{9}.[0-9]{4})|([0-9]{10}.[0-9]{3})|([0-9]{11}.[0-9]{2})|([0-9]{12}.[0-9]{1})).(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,28}$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const itemRef = uri.substring(partition + 1, (partition + 1 + (13 - gs1CompanyPrefix.length)));
    const rawGTIN = itemRef.substring(0, 1) + gs1CompanyPrefix + itemRef.substring(1);
    const serial = uri.substring(31);
    return (`https://id.gs1.org/01/${addCheckDigitAndZeroPad(rawGTIN, throwError)}/235/${webUriPercentEncoder(serial)}`);
  }

  if (uri.match('^urn:epc:id:pgln:(([0-9]{6}.[0-9]{6})|([0-9]{7}.[0-9]{5})|([0-9]{8}.[0-9]{4})|([0-9]{9}.[0-9]{3})|([0-9]{10}.[0-9]{2})|([0-9]{11}.[0-9]{1})|([0-9]{12}.))$')) {
    const gs1CompanyPrefix = uri.substring(16, partition);
    const partyRef = uri.substring(partition + 1, (partition + 1 + (12 - gs1CompanyPrefix.length)));
    const rawGLN = gs1CompanyPrefix + partyRef;
    return (`https://id.gs1.org/417/${addCheckDigitAndZeroPad(rawGLN, throwError, 13)}`);
  }

  if (uri.match('^urn:epc:class:lgtin:(([0-9]{6}.[0-9]{7})|([0-9]{7}.[0-9]{6})|([0-9]{8}.[0-9]{5})|([0-9]{9}.[0-9]{4})|([0-9]{10}.[0-9]{3})|([0-9]{11}.[0-9]{2})|([0-9]{12}.[0-9]{1})).(%2[125-9A-Fa-f]|%3[0-9A-Fa-f]|%4[1-9A-Fa-f]|%5[0-9AaFf]|%6[1-9A-Fa-f]|%7[0-9Aa]|[!\')(*+,.0-9:;=A-Za-z_-]){1,20}$')) {
    const gs1CompanyPrefix = uri.substring(20, partition);
    const itemRef = uri.substring(partition + 1, (partition + 1 + (13 - gs1CompanyPrefix.length)));
    const rawGTIN = itemRef.substring(0, 1) + gs1CompanyPrefix + itemRef.substring(1);
    const lot = uri.substring(35);
    return (`https://id.gs1.org/01/${addCheckDigitAndZeroPad(rawGTIN, throwError)}/10/${webUriPercentEncoder(lot)}`);
  }

  if (uri.match('^urn:epc:idpat:sgtin:(([0-9]{6}.[0-9]{7})|([0-9]{7}.[0-9]{6})|([0-9]{8}.[0-9]{5})|([0-9]{9}.[0-9]{4})|([0-9]{10}.[0-9]{3})|([0-9]{11}.[0-9]{2})|([0-9]{12}.[0-9]{1})).\*$')) {
    const gs1CompanyPrefix = uri.substring(20, partition);
    const itemRef = uri.substring(partition + 1, (partition + 1 + (13 - gs1CompanyPrefix.length)));
    const rawGTIN = itemRef.substring(0, 1) + gs1CompanyPrefix + itemRef.substring(1);
    return (`https://id.gs1.org/01/${addCheckDigitAndZeroPad(rawGTIN, throwError)}`);
  }

  if (uri.match('^urn:epc:idpat:grai:(([0-9]{6}.[0-9]{6})|([0-9]{7}.[0-9]{5})|([0-9]{8}.[0-9]{4})|([0-9]{9}.[0-9]{3})|([0-9]{10}.[0-9]{2})|([0-9]{11}.[0-9]{1})|([0-9]{12}..)).\*$')) {
    const gs1CompanyPrefix = uri.substring(19, partition);
    const assetRef = uri.substring(partition + 1, (partition + 1 + (12 - gs1CompanyPrefix.length)));
    const rawGRAI = `0${gs1CompanyPrefix}${assetRef}`;
    return (`https://id.gs1.org/8003/${addCheckDigitAndZeroPad(rawGRAI, throwError)}`);
  }

  if (uri.match('^urn:epc:idpat:gdti:(([0-9]{6}.[0-9]{6})|([0-9]{7}.[0-9]{5})|([0-9]{8}.[0-9]{4})|([0-9]{9}.[0-9]{3})|([0-9]{10}.[0-9]{2})|([0-9]{11}.[0-9]{1})|([0-9]{12}..)).\*$')) {
    const gs1CompanyPrefix = uri.substring(19, partition);
    const documentType = uri.substring(partition + 1, (
      partition + 1 + (12 - gs1CompanyPrefix.length)));
    const rawGDTI = gs1CompanyPrefix + documentType;
    return (`https://id.gs1.org/253/${addCheckDigitAndZeroPad(rawGDTI, throwError, 13)}`);
  }

  if (uri.match('^urn:epc:idpat:sgcn:(([0-9]{6}.[0-9]{6})|([0-9]{7}.[0-9]{5})|([0-9]{8}.[0-9]{4})|([0-9]{9}.[0-9]{3})|([0-9]{10}.[0-9]{2})|([0-9]{11}.[0-9]{1})|([0-9]{12}..)).\*$')) {
    const gs1CompanyPrefix = uri.substring(19, partition);
    const couponRef = uri.substring(
      partition + 1, (partition + 1 + (12 - gs1CompanyPrefix.length)),
    );
    const rawSGCN = gs1CompanyPrefix + couponRef;
    return (`https://id.gs1.org/255/${addCheckDigitAndZeroPad(rawSGCN, throwError, 13)}`);
  }

  if (uri.match('^urn:epc:idpat:cpi:(([0-9]{6}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,24})|([0-9]{7}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,23})|([0-9]{8}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,22})|([0-9]{9}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,21})|([0-9]{10}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,20})|([0-9]{11}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,19})|([0-9]{12}.(%2[3dfDF]|%3[0-9]|%4[1-9A-Fa-f]|%5[0-9Aa]|[0-9A-Z-]){1,18})).\*$')) {
    const gs1CompanyPrefix = uri.substring(18, partition);
    const separator = uri.lastIndexOf('.');
    const cpref = uri.substring(partition + 1, separator);
    const rawCPI = gs1CompanyPrefix + cpref;
    return (`https://id.gs1.org/8010/${webUriPercentEncoder(rawCPI)}`);
  }

  if (uri.match('^urn:epc:idpat:itip:(([0-9]{6}.[0-9]{7})|([0-9]{7}.[0-9]{6})|([0-9]{8}.[0-9]{5})|([0-9]{9}.[0-9]{4})|([0-9]{10}.[0-9]{3})|([0-9]{11}.[0-9]{2})|([0-9]{12}.[0-9]{1})).[0-9]{2}.[0-9]{2}.\*$')) {
    const gs1CompanyPrefix = uri.substring(19, partition);
    const itemRef = uri.substring(partition + 1, (partition + 1 + (13 - gs1CompanyPrefix.length)));
    const rawGTIN = itemRef.substring(0, 1) + gs1CompanyPrefix + itemRef.substring(1);
    const piece = uri.substring(34, 36);
    const total = uri.substring(37, 39);
    return (`https://id.gs1.org/8006/${addCheckDigitAndZeroPad(rawGTIN, throwError)}${piece}${total}`);
  }

  if (uri.match('^urn:epc:idpat:upui:(([0-9]{6}.[0-9]{7})|([0-9]{7}.[0-9]{6})|([0-9]{8}.[0-9]{5})|([0-9]{9}.[0-9]{4})|([0-9]{10}.[0-9]{3})|([0-9]{11}.[0-9]{2})|([0-9]{12}.[0-9]{1})).\*$')) {
    const gs1CompanyPrefix = uri.substring(19, partition);
    const itemRef = uri.substring(partition + 1, (partition + 1 + (13 - gs1CompanyPrefix.length)));
    const rawGTIN = itemRef.substring(0, 1) + gs1CompanyPrefix + itemRef.substring(1);
    return (`https://id.gs1.org/01/${addCheckDigitAndZeroPad(rawGTIN, throwError)}`);
  }

  if (!uri.match('^https?:(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?((([^?#]*)(\/(01|gtin|8006|itip|8010|cpid|414|gln|417|party|8017|gsrnp|8018|gsrn|255|gcn|00|sscc|253|gdti|401|ginc|402|gsin|8003|grai|8004|giai)\/)([0-9]{4}[^\/]+)?[\/]?(([^?\n]*))?(#([^]*))?)|(\/[A-Za-z_-]{10}$))')) {
    return uri;
  }

  if (uri.includes('?')) {
    uri = uri.substring(0, uri.indexOf('?'));
  }

  uri = uri.split('/gtin/').join('/01/')
    .split('/itip/').join('/8006/')
    .split('/cpid/')
    .join('/8010/')
    .split('/gln/')
    .join('/414/')
    .split('/party/')
    .join('/417/')
    .split('/gsrnp/')
    .join('/8017/')
    .split('/gsrn/')
    .join('/8018/')
    .split('/gcn/')
    .join('/255/')
    .split('/sscc/')
    .join('/00/')
    .split('/gdti/')
    .join('/253/')
    .split('/ginc/')
    .join('/401/')
    .split('/gsin/')
    .join('/402/')
    .split('/grai/')
    .join('/8003/')
    .split('/giai/')
    .join('/8004/')
    .split('/cpv/')
    .join('/22/')
    .split('/lot/')
    .join('/10/')
    .split('/ser/')
    .join('/21/');

  if (!uri.match('^https:\/\/id.gs1.org\/(01|8006|8010|414|417|8017|8018|255|00|253|401|402|8003|8004)\/([0-9]{4}[^\/]+)(\/[^\/]+\/[^\/]+)?[\/]?(([^?\n]*))?(#([^\n]*))?|(\/[A-Za-z_-]{10}$)')) {
    if (uri.indexOf('/00/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/00/'))}`;
    else if (uri.indexOf('/01/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/01/'))}`;
    else if (uri.indexOf('/253/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/253/'))}`;
    else if (uri.indexOf('/255/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/255/'))}`;
    else if (uri.indexOf('/401/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/401/'))}`;
    else if (uri.indexOf('/402/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/402/'))}`;
    else if (uri.indexOf('/414/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/414/'))}`;
    else if (uri.indexOf('/417/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/417/'))}`;
    else if (uri.indexOf('/8003/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/8003/'))}`;
    else if (uri.indexOf('/8004/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/8004/'))}`;
    else if (uri.indexOf('/8006/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/8006/'))}`;
    else if (uri.indexOf('/8010/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/8010/'))}`;
    else if (uri.indexOf('/8017/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/8017/'))}`;
    else if (uri.indexOf('/8018/') !== -1) uri = `https://id.gs1.org${uri.substring(uri.indexOf('/8018/'))}`;
  }

  if (!uri.match('^https:\/\/id.gs1.org\/01\/[0-9]{14}')) {
    if (uri.match('^https:\/\/id.gs1.org\/01\/[0-9]{13}')) {
      uri = uri.replace('/01/', '/01/0');
    } else if (uri.match('^https:\/\/id.gs1.org\/01\/[0-9]{12}')) {
      uri = uri.replace('/01/', '/01/00');
    } else if (uri.match('^https:\/\/id.gs1.org\/01\/[0-9]{8}')) {
      uri = uri.replace('/01/', '/01/000000');
    }
  }

  // remove cpv
  const x = uri.substring(uri.indexOf('/22/') + 4);

  // for 01/8006 only
  if (
    uri.match('https:\/\/id.gs1.org\/8006\/[0-9]{18}\/22\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$') ||
    uri.match('https:\/\/id.gs1.org\/01\/[0-9]{14}\/22\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$')
  ) {
    uri = uri.substring(0, uri.indexOf('/22/')) + x.substring(x.indexOf('/'), x.length - 1);
  }

  // for 01/8006 followed by other key qualifiers
  if (
    uri.match('https:\/\/id.gs1.org\/8006\/[0-9]{18}\/22\/([\x2F\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$') ||
    uri.match('https:\/\/id.gs1.org\/01\/[0-9]{14}\/22\/([\x2F\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$')
  ) {
    uri = uri.substring(0, uri.indexOf('/22/')) + x.substring(x.indexOf('/'));
  }

  // take only lowest ID granularity level (i.e. if serial is present, omit lot)
  if (
    uri.match('https:\/\/id.gs1.org\/8006\/[0-9]{18}\/10\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})\/21\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$') ||
    uri.match('https:\/\/id.gs1.org\/01\/([0-9]{14})\/10\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})\/21\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$')
  ) {
    const y = uri.substring(uri.indexOf('/22/') + 4);
    uri = uri.substring(0, uri.indexOf('/10/')) + y.substring(y.indexOf('/'));
  }

  if (
    uri.match('https:\/\/id.gs1.org\/00\/([0-9]{18})$') ||
    uri.match('https:\/\/id.gs1.org\/01\/([0-9]{14})\/21\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$') ||
    uri.match('https:\/\/id.gs1.org\/01\/([0-9]{14})\/10\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$') ||
    uri.match('https:\/\/id.gs1.org\/01\/([0-9]{14})$') ||
    uri.match('https:\/\/id.gs1.org\/01\/([0-9]{14})\/235\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,28})$') ||
    uri.match('https:\/\/id.gs1.org\/253\/([0-9]{13})([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,17})$') ||
    uri.match('https:\/\/id.gs1.org\/255\/([0-9]{13})([0-9]{0,12})$') ||
    uri.match('https:\/\/id.gs1.org\/401\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,30})$') ||
    uri.match('https:\/\/id.gs1.org\/402\/([0-9]{17})$') ||
    uri.match('https:\/\/id.gs1.org\/414\/([0-9]{13})$') ||
    uri.match('https:\/\/id.gs1.org\/414\/([0-9]{13})\/254\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$') ||
    uri.match('https:\/\/id.gs1.org\/417\/([0-9]{13})$') ||
    uri.match('https:\/\/id.gs1.org\/8003\/([0-9]{14})([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,16})$') ||
    uri.match('https:\/\/id.gs1.org\/8004\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,30})$') ||
    uri.match('https:\/\/id.gs1.org\/8006\/([0-9]{18})\/21\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$') ||
    uri.match('https:\/\/id.gs1.org\/8006\/([0-9]{18})\/10\/([\x22\x27\x2D\x2E\x30-\x39\x3B-\x3F\x41-\x5A\x5F\x61-\x7A]{0,20})$') ||
    uri.match('https:\/\/id.gs1.org\/8006\/([0-9]{18})$') ||
    uri.match('https:\/\/id.gs1.org\/8010\/([\x23\x2D\x2F\x30-\x39\x41-\x5A]{0,30})\/8011\/([0-9]{0,12})$') ||
    uri.match('https:\/\/id.gs1.org\/8010\/([\x23\x2D\x2F\x30-\x39\x41-\x5A]{0,30})$') ||
    uri.match('https:\/\/id.gs1.org\/8017\/([0-9]{18})$') ||
    uri.match('https:\/\/id.gs1.org\/8018\/([0-9]{18})$')
  ) {
    return uri;
  }

  return originalUri;
};
