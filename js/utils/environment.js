"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_theme_1 = require("./env.theme");
var env_util_1 = require("./env.util");
var isDev = /^(192\.168|127\.0\.0\.1|localhost)/.test(window.location.host);
var isDevTheme = isDev;
var hasSettings = window.settings && window.settings.domain;
// 所有配置从 settings 中来，如果 settings 为 undefined 则取默认值以防null错误
var _a = window.settings || {}, _b = _a.base, base = _b === void 0 ? { maintaining: false } : _b, _c = _a.domain, domain = _c === void 0 ? location.host : _c, _d = _a.ssl, ssl = _d === void 0 ? location.protocol === 'https:' : _d, _e = _a.site, site = _e === void 0 ? {
    title: '',
    sport: '//mkt.sbapi8888.com/?lang=cs',
    lang: 'zh-CN',
    copyright: '',
    theme: 'purplestage',
} : _e, _f = _a.logo, logo = _f === void 0 ? {
    normal: ''
} : _f;
// 站点标题
document.title = site.title;
var https = ssl ? 'https:' : 'http:';
var environment = {
    hasSetting: hasSettings,
    hostAPI: https + "//api." + domain,
    wwwimgurl: https + "//res." + domain,
    mobileurl: https + "//m." + domain,
    agentURL: https + "//agent." + domain,
    sport: site.sport,
    theme: env_theme_1.initTheme(site.theme, isDevTheme),
    locale: env_util_1.initLocal(site.lang),
    maintaining: base.maintaining === true,
    logo: logo.normal,
    copyrights: site.copyright,
    tokenName: 'xlz_token',
    expiration: 'xlz_exp',
    loginInfo: 'xlz_loginInfo',
    app_link: 'xlz_app_link',
    invitedCode: env_util_1.initCode(),
    dispatch: (function (action) {
        console.warn('this = dva()._store.dispatch');
    }),
};
exports.default = environment;
