"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_timezone_1 = require("moment-timezone");
/** 美东时间 */
/**
 * @param {string} format
 * @example
 * ESTime('YYYY-MM-DD HH:mm:ss')
 */
function ESTime(format) {
    if (format === void 0) { format = 'YYYY-MM-DD HH:mm:ss'; }
    return moment_timezone_1.default().tz('America/Caracas').format(format);
}
exports.default = ESTime;
;
