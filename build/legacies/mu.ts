// Miscellaneous utilities

/*
 * dateStr() >>> '2024-05-15'
 * Arguments
 * (1) now: Date Object
 *     const date = new Date(2001, 0, 1);
 *     datetimeStr(date) >>> '2001-01-01'
 * (2) delimiter: year-month-day-delimiter
 *     datetimeStr(undefined, '/') >>> '2024/05/15'
 */
export function dateStr(now = new Date(), delimiter = "-"): string {
  const year = String(now.getFullYear()).padStart(4, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDay()).padStart(2, "0");

  const result = year + delimiter + month + delimiter + day;
  return result;
}

/*
 * timeStr() >>> '12:34:56'
 * Arguments
 * (1) now: Date Obect
 *     const date = new Date(2001, 0, 1, 1, 23, 45);
 *     timeStr(date) >>> '01:23:45'
 * (2) withMillis: adding millisecond-value
 *     datetimeStr(undefined, true) >>> '12:34:56.789'
 */
export function timeStr(now = new Date(), withMillis = false): string {
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const millis = String(now.getMilliseconds()).padStart(3, "0");

  const result = hours + ":" + minutes + ":" + seconds;
  if (withMillis) return result + "." + millis;
  else return result;
}

/*
 * datetimeStr() >>> '2024-05-15 12:34:56'
 * Arguments
 * (1) now: Date Object
 *     const date = new Date(2001, 0, 1, 0, 0, 0);
 *     datetimeStr(date) >>> '2001-01-01 00:00:00'
 * (2) delimiter: year-month-day-delimiter
 *     datetimeStr(undefined, '/') >>> '2024/05/15 12:34:56'
 * (4) withMillis: adding millisecond-value
 *     datetimeStr(undefined, undefined, true) >>> '2024-05-15 12:34:56.789'
 */
export function datetimeStr(
  now = new Date(),
  delimiter = "-",
  withMillis = false
): string {
  const result = dateStr(now, delimiter) + " " + timeStr(now, withMillis);
  return result;
}
