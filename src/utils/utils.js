/**
 *
 * @param {String|Date} date - it can be either a String (e.g "2005-04-03T20:33:31.116000-06:00")
 * or a Date object
 *
 * @return {Date} the date instance created from the date passed in parameter
 */
export const getDateFromStringOrDate = (date) => {
    if ((typeof date) === "string") {
      return new Date(Date.parse(date));
    }
    // can't use "date instanceof Date" since it returns true also for invalid dates
    if (Object.prototype.toString.call(date) === '[object Date]') {
      return date;
    }
    throw new Error("A Date or a String shall be provided");
}
