import moment from 'moment-timezone';

/** 美东时间 */
/**
 * @param {string} format
 * @example
 * ESTime('YYYY-MM-DD HH:mm:ss')
 */
export default function ESTime(format = 'YYYY-MM-DD HH:mm:ss'): String {
  return moment().tz('America/Caracas').format(format);
};
