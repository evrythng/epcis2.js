/**
 *
 * @param {String|Date} date - it can be either a String (e.g "2005-04-03T20:33:31.116000-06:00")
 * or a Date object
 *
 * @return {Date} the date instance created from the date passed in parameter
 */
import TimeZoneOffset from '../entity/model/TimeZoneOffset'

export const getDateFromStringOrDate = (date) => {
  if ((typeof date) === 'string') {
    const dateFromString = new Date(Date.parse(date))
    if (isAValidDate(dateFromString)) {
      return dateFromString
    }
    throw new Error("The string provided doesn't have the good format")
  }
  if (isAValidDate(date)) {
    return date
  }
  throw new Error('A Date or a String shall be provided')
}

/**
 * @param {Date} date
 * @param {TimeZoneOffset} [timeZoneOffset] - the time zone offset of the date
 * @return {String} - A string corresponding to the Date in the format used in the EPCIS standard
 */
export const dateToString = (date, timeZoneOffset = null) => {
  let offset

  if (!timeZoneOffset) {
    offset = date.getTimezoneOffset()
  } else {
    offset = timeZoneOffset.toMinutes()
  }

  // include the offset in the date
  const nDate = new Date(date.getTime() + offset * 60000)
  // remove the 'Z' + show that the offset has been included
  return nDate.toISOString().substring(0, nDate.toISOString().length - 1) + (new TimeZoneOffset(+offset / 60)).toString()
}

/**
 *
 * @param {Date} date
 * @return {boolean} true if it is a valid date - false otherwise
 */
export const isAValidDate = (date) => {
  return (Object.prototype.toString.call(date) === '[object Date]' && date.toString() !== 'Invalid Date')
}

/**
 *
 * @param {number} number - the number to convert (e.g 1 or 74)
 * @return {String} the number to convert (e.g "01" or "74")
 */
export const numberToTwoCharString = (number) => {
  if (number > 99 || number < 0) {
    throw new Error('The number has to be between 0 and 99')
  }

  if (number > 9) { return number.toString() }

  return '0' + number.toString()
}
