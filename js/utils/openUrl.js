"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("dva/router");
var environment_1 = require("./environment");
// 链接和按钮的打开方式，应用到 菜单项 和 首页子页的按钮
// 1 当前弹窗打开 viewport 电子游艺
// 2 新窗口打开 window.open
// 3 跳转 重定向 _self
// 4 展开 折叠 click
function openUrl(e, ernav) {
    if (ernav.open == 1) {
        // 当前弹窗 电子游艺
        e.preventDefault();
        var mode = ernav.mode || 'real';
        environment_1.default.dispatch({ type: 'viewport/addFirst', payload: __assign({}, ernav, { mode: mode }) });
    }
    else if (ernav.open == 2) {
        // 新窗口 视讯
        if (ernav.href.indexOf('game/third') >= 0) {
            environment_1.default.dispatch({ type: 'listviewport/realMode', payload: __assign({}, ernav, { enter: ernav.href, mode: 'real' }) });
        }
        else {
            e.preventDefault();
            window.open(ernav.href, ernav.name);
        }
    }
    else if (ernav.open == 3) {
        // 跳转
        var url = ernav.enter || ernav.href || ernav.url;
        var host = window.location.protocol + '//' + window.location.host;
        if (url.startsWith('http') && !url.startsWith(host)) {
            window.location.href = url; // 外链
        }
        else {
            environment_1.default.dispatch(router_1.routerRedux.push(url)); // 内链
        }
    }
    else {
        if (ernav.name == 'lottery') {
            return;
        }
    }
    // 视讯：通过 localStorage，同步 token 到新窗口
    environment_1.default.dispatch({ type: 'syncWindow' });
}
exports.openUrl = openUrl;
