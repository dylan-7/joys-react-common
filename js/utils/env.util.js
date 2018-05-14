"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
function getUpperCaseLocale(str) {
    if (str == null) {
        str = 'zh-CN';
    }
    return str.slice(0, 2).toLowerCase() + '-' + str.slice(3).toUpperCase();
}
exports.getUpperCaseLocale = getUpperCaseLocale;
function initLocal(settingLang) {
    var urlParams = querystring_1.parse(location.search.slice(1));
    var urlLocal = urlParams.locale;
    var cacheLocal = window.localStorage.getItem('locale');
    var settingLocal = getUpperCaseLocale(settingLang);
    return urlLocal || settingLocal || cacheLocal;
}
exports.initLocal = initLocal;
function initCode() {
    var urlParams = querystring_1.parse(location.search.slice(1));
    var urlCode = urlParams.code;
    return urlCode;
}
exports.initCode = initCode;
