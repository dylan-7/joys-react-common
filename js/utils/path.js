"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
function getLocalPath(path, placeholder) {
    if (placeholder === void 0) { placeholder = ''; }
    var pathFull = placeholder;
    if (path && path.length > 0) {
        if (path.startsWith('http')) {
            pathFull = path;
        }
        else {
            pathFull = window.location.origin + '/' + path;
        }
    }
    return pathFull;
}
exports.getLocalPath = getLocalPath;
function getFullPath(path, placeholder) {
    if (placeholder === void 0) { placeholder = ''; }
    var pathFull = placeholder;
    if (path && path.length > 0) {
        if (path.startsWith('http')) {
            pathFull = path;
        }
        else {
            pathFull = environment_1.default.wwwimgurl + path;
        }
    }
    return pathFull;
}
exports.getFullPath = getFullPath;
