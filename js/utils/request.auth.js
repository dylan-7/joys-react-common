"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require("isomorphic-fetch");
var lodash_1 = require("lodash");
var environment = {}; // 值要从外部 environment.ts 更新
var request = function (url, options) {
    if (options === void 0) { options = {}; }
    throw new Error('调用 request 之前需要先调用 requestWrap(环境变量) 进行初始化');
};
function requestAuthWrap(env) {
    environment = env; // 初始化，将外部的 environment.ts 的值赋给本地 environment
    var debounceErr401 = lodash_1.debounce(function () {
        environment.dispatch({ type: 'login/err401' });
    });
    var debounceErr404 = lodash_1.debounce(function () {
        environment.dispatch({ type: 'login/ajax404' });
    });
    /**
     * Requests a URL, returning a promise.
     *
     * @param  {string} url       The URL we want to request
     * @param  {object} [options] The options we want to pass to "fetch"
     * @return {object}           An object containing either "data" or "err"
     */
    request = function (url, options) {
        if (options === void 0) { options = {}; }
        // 本域为 https 则所有的 ajax 请求必须是 https 开头
        if (url && url.startsWith('http')) {
            var protocolUrl = new URL(url).protocol;
            var protocolApi = new URL(environment.hostAPI).protocol;
            if (protocolApi === 'https:' && protocolUrl === 'http:') {
                url = url.replace('http:', 'https:');
            }
        }
        options.headers = {};
        var token = window.sessionStorage.getItem(environment.tokenName);
        // 需要授权访问的接口
        if (token) {
            options.headers = { Authorization: "Bearer " + token };
        }
        if (!url.startsWith('http') && !url.endsWith('.json') && !url.startsWith('/api')) {
            url = "" + environment.hostAPI + url;
        }
        var m = (options.method || '').toLocaleLowerCase();
        if (m === 'post' || m === 'put' || m === 'patch') {
            if (!options.headers['Content-Type']) {
                options.headers['Content-Type'] = 'application/json';
            }
        }
        options.headers['Accept-Language'] = environment.locale;
        return fetch(url, options)
            .then(function (response) {
            var jsonObj = Promise.resolve(response);
            if (response.status === 401) {
                jsonObj = Promise.reject(response);
                debounceErr401();
            }
            else if (response.status === 404) {
                jsonObj = Promise.reject(response);
                debounceErr404();
            }
            else {
                try {
                    jsonObj = response.json();
                }
                catch (err) {
                    jsonObj = Promise.reject(response);
                }
            }
            return jsonObj;
        })
            .then(function (response) { return response; })
            .catch(function (err) { return ({ status: err && err.status, state: 4, message: err && err.message }); });
    };
    return request;
}
exports.requestAuthWrap = requestAuthWrap;
exports.default = {
    request: request
};
