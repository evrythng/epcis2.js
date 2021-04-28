/**
 * Contains two fields: hours and minutes
 */
import { numberToTwoCharString } from '../../utils/utils'

export default class TimeZoneOffset {
  /**
   *
   * @param {number|string} offset - the time zone offset
   * (e.g "+02:30" or "-06:00" if it is a String)
   * (e.g -6 or 2.5 if it is a number)
   */
  constructor (offset) {
    if ((typeof offset) === 'string') {
      let [strHours, strMinutes] = offset.split(':')

      if (offset.length !== 6 || strHours.length !== 3 || strMinutes.length !== 2) {
        throw new Error('The TimeZoneOffset is invalid')
      }

      let sign = 0

      if (strHours.charAt(0) === '+') {
        sign = 1
      } else if (strHours.charAt(0) === '-') {
        sign = -1
      } else {
        throw new Error('The first character of the offset shall be a \'+\' or a \'-\'')
      }

      strHours = strHours.substring(1)

      if (isNaN(strHours) || isNaN(strMinutes)) {
        throw new Error('The hours and minutes shall be numbers in the string')
      }

      this.hours = sign * parseInt(strHours)
      this.minutes = parseInt(strMinutes)

      return
    }

    if ((typeof offset) === 'number') {
      this.hours = Math.floor(offset)
      this.minutes = (offset - Math.floor(offset)) * 60
      return
    }

    throw new Error('The parameter provided in the constructor should be a number of a String')
  }

  toString () {
    if (this.hours >= 0) { return `+${numberToTwoCharString(this.hours)}:${numberToTwoCharString(this.minutes)}` }
    return `-${numberToTwoCharString(-1 * this.hours)}:${numberToTwoCharString(this.minutes)}`
  }

  toMinutes () {
    return this.hours * 60 + this.minutes
  }
}
