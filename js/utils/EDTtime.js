"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 当前时间转化为美东时间
function EDTtime() {
    var localeDate = new Date();
    // 本时区的时差,并转换为毫秒：
    var localeOffset = localeDate.getTimezoneOffset() * 60 * 1000;
    // 本时区的当前时间：
    var localeNow = localeDate.getTime();
    // 此时西4区的时差,并转换为毫秒：
    var meidongOffset = (-4 * 60) * 60 * 1000;
    return new Date(localeNow + localeOffset + meidongOffset);
}
exports.default = EDTtime;
