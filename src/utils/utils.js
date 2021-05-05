/**
 *
 * @param {number} number - the number to convert (e.g 1 or 74)
 * @return {string} the number to convert (e.g "01" or "74")
 */
export const numberToTwoCharString = (number) => {
  if (number > 99 || number < 0) {
    throw new Error('The number has to be between 0 and 99');
  }

  if (number > 9) {
    return number.toString();
  }

  return `0${number.toString()}`;
};

/**
 *
 * @param {number} hours
 * @param {number} minutes
 * @return {string} - a string corresponding to the offset (e.g "+02:00")
 */
export const offsetToString = (hours, minutes) => {
  if (hours >= 0) {
    return `+${numberToTwoCharString(hours)}:${numberToTwoCharString(minutes)}`;
  }
  return `-${numberToTwoCharString(-1 * hours)}:${numberToTwoCharString(minutes)}`;
};

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

    let sign = 0;

    if (strHours.charAt(0) === '+') {
      sign = 1;
    } else if (strHours.charAt(0) === '-') {
      sign = -1;
    } else {
      throw new Error('The first character of the offset shall be a \'+\' or a \'-\'');
    }

    strHours = strHours.substring(1);

    if (Number.isNaN(Number(strHours)) || Number.isNaN(Number(strMinutes))) {
      throw new Error('The hours and minutes shall be numbers in the string');
    }

    const hours = sign * parseInt(strHours, 10);
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
  if (!((typeof date) === 'string')) {
    throw new Error('The parameter has to be a string');
  }
  if (date.length < 7) {
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
