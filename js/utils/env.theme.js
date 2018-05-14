"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = require("querystring");
function getThemeByName(name) {
    if (name === void 0) { name = ''; }
    var theme;
    switch (name.toLowerCase()) {
        case 'purplestage':
            theme = '1';
            break;
        case 'blacksky':
            theme = '2';
            break;
        case 'shark':
            theme = '3';
            break;
        case 'redclassics':
            theme = '4';
            break;
        case 'venice':
            theme = '5';
            break;
    }
    return theme;
}
exports.getThemeByName = getThemeByName;
// 从 setting 读取主题配置并本地缓存
// 开发时以 url 传参优先
// 生产时以 settings 优化
var defaultTheme = '1';
function initTheme(settingTheme, isDevTheme) {
    var urlParams = querystring_1.parse(location.search.slice(1));
    var theme;
    if (isDevTheme) {
        if (urlParams.theme) {
            theme = urlParams.theme;
            window.localStorage.setItem('_theme', theme);
        }
        else {
            theme = window.localStorage.getItem('_theme') || defaultTheme;
        }
    }
    else {
        theme = getThemeByName(settingTheme) || urlParams.theme || window.localStorage.getItem('theme') || defaultTheme;
        window.localStorage.setItem('theme', theme);
    }
    return theme;
}
exports.initTheme = initTheme;
