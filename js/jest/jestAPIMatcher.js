"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchAPI(received, expected) {
    var rules = require('../../config/jest/' + expected.split('/').join('.') + '.json');
    if (this.isNot) {
    }
    else {
        var equals = require('jest-matchers/build/jasmine-utils').equals;
        if (received === undefined || received === null) {
            return {
                pass: false,
                message: function () { return 'received 不能为空值'; }
            };
        }
        else {
            var _loop_1 = function (key) {
                var rule = rules[key];
                if (rule.required) {
                    // console.info(`[🐞 ]: `, rule)
                }
                if (!rule.required && received[key] === undefined) {
                    return { value: {
                            pass: true,
                            message: function () { return '选填'; }
                        } };
                }
                else {
                    if (rule.type === 'int') {
                        if (!Number.isInteger(received[key])) {
                            return { value: {
                                    pass: false,
                                    message: function () { return "\u9884\u671F " + key + " \u7684\u503C: " + received[key] + " \u4E0D\u662F\u6574\u6570"; }
                                } };
                        }
                    }
                    else if (rule.type === 'string') {
                        if (typeof received[key] !== 'string') {
                            return { value: {
                                    pass: false,
                                    message: function () { return "\u9884\u671F " + key + " \u7684\u503C: " + received[key] + " \u4E0D\u662F\u5B57\u7B26\u4E32"; }
                                } };
                        }
                    }
                }
            };
            for (var key in rules) {
                var state_1 = _loop_1(key);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
    }
    return {
        pass: true,
        message: function () { return 'ok'; }
    };
}
matchAPI.init = function () {
};
expect.extend({ matchAPI: matchAPI });
exports.default = matchAPI;
