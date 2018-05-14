"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 从后台返回的json数据转换为本地class
 *
 */
var Result = /** @class */ (function () {
    function Result(json) {
        var _this = this;
        Object.keys(json).forEach(function (key) {
            _this[key] = json[key];
        });
    }
    return Result;
}());
exports.Result = Result;
/**
 * 提交数据到后台
 * 会将moment date 转为时间戳
 */
var Post = /** @class */ (function () {
    function Post(data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if (typeof value === 'object' && ('_isAMomentObject' in value || value instanceof Date)) {
                _this[key] = value.valueOf();
            }
            else if (!key.startsWith("__")) {
                _this[key] = value;
            }
        });
    }
    return Post;
}());
exports.Post = Post;
var AjaxState;
(function (AjaxState) {
    AjaxState[AjaxState["\u6210\u529F"] = 0] = "\u6210\u529F";
    AjaxState[AjaxState["\u8B66\u544A"] = 1] = "\u8B66\u544A";
    AjaxState[AjaxState["\u5931\u8D25"] = 2] = "\u5931\u8D25";
    AjaxState[AjaxState["\u9519\u8BEF"] = 3] = "\u9519\u8BEF";
})(AjaxState = exports.AjaxState || (exports.AjaxState = {}));
