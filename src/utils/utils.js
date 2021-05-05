/** A string date with a timezone offset can't be less than 7 chars */
const MIN_DATE_WITH_OFFSET_LENGTH = 7;

/**
 * Convert a number (e.g 7) to a two character string (e.g '07')
 *
 * @param {number} number - the number to convert (e.g 1 or 74)
 * @return {string} the number to convert (e.g "01" or "74")
 */
export const numberToZeroPadString = (number) => {
  if (number > 99 || number < 0) {
    throw new Error('The number has to be between 0 and 99');
  }
  return number < 10 ? `0${number}` : number.toString();
};

/**
 * convert an hour (e.g -6) and minutes (e.g 30) to a string (e.g "-06:30")
 *
 * @param {number} hours
 * @param {number} minutes
 * @return {string} - a string corresponding to the offset (e.g "+02:00")
 */
export const offsetToString = (hours, minutes) => (hours >= 0
  ? `+${numberToZeroPadString(hours)}:${numberToZeroPadString(minutes)}`
  : `-${numberToZeroPadString(-1 * hours)}:${numberToZeroPadString(minutes)}`);

/**
 * Return a string corresponding to the offset passed in parameter
 * @param {number|string} offset - the time zone offset
 * (e.g "+02:30" or "-06:00" if it is a string)
 * (e.g -6 or 2.5 if it is a number)
 * @return {string} a string corresponding to the offset (e.g "+02:00")
 */
export const getTimeZoneOffsetFromStringOrNumber = (offset) => {
  if ((typeof offset) === 'string') {
    let [strHours, strMinutes] = offset.split(':'); // eslint-disable-line prefer-const

    if (offset.length !== 6 || strHours.length !== 3 || strMinutes.length !== 2) {
      throw new Error('The TimeZoneOffset is invalid');
    }

    if (strHours.charAt(0) !== '+' && strHours.charAt(0) !== '-') throw new Error('The first character of the offset shall be a \'+\' or a \'-\'');

    const sign = strHours.charAt(0);
    strHours = strHours.substring(1);

    if (Number.isNaN(Number(strHours)) || Number.isNaN(Number(strMinutes))) {
      throw new Error('The hours and minutes shall be numbers in the string');
    }

    const hours = sign === '+' ? parseInt(strHours, 10) : -parseInt(strHours, 10);
    const minutes = parseInt(strMinutes, 10);
    return offsetToString(hours, minutes);
  }

  if ((typeof offset) === 'number') {
    const hours = Math.floor(offset);
    const minutes = (offset - Math.floor(offset)) * 60;
    return offsetToString(hours, minutes);
  }

  throw new Error('The parameter provided in the constructor should be a number or a string');
};

/**
 * Returns the offset of the date passed in parameter
 * For example:
 *    - '2005-04-03T20:33:31.116-06:00' contains an offset ('-06:00')
 *    - '2005-04-03T20:33:31.116' doesn't contain an offset
 * @param {string} date - the date
 * @return {string|null} the timezone offset (e.g ('+02:00')) - null otherwise
 */
export const getTheTimeZoneOffsetFromDateString = (date) => {
  if (typeof date !== 'string') {
    throw new Error('The parameter has to be a string');
  }
  if (date.length < MIN_DATE_WITH_OFFSET_LENGTH) {
    return null;
  }
  const potentialOffset = date.substring(date.length - 6, date.length);
  try {
    return getTimeZoneOffsetFromStringOrNumber(potentialOffset);
  } catch (e) {
    return null;
  }
};

/**
 * Returns a JSON corresponding to the parameter
 * @param {any} obj
 * @return {Object} - a json if the object passed in param has a toObject function defined - the
 * object passed in param otherwise
 */
export const objectToJSON = (obj) => {
  if (typeof obj.toObject === 'function') {
    return obj.toObject();
  }
  return obj;
};
