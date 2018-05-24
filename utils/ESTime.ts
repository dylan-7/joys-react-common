import moment from 'moment-timezone';

/** 美东时间 */
/**
 * @param {string} format
 * @example
 * ESTime('YYYY-MM-DD HH:mm:ss')
 */
export const ESTime = (format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return moment().tz('America/Caracas').format(format);
};
