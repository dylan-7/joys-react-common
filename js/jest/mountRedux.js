"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// setup file
var enzyme_1 = require("enzyme");
var enzyme_adapter_react_15_1 = require("enzyme-adapter-react-15");
enzyme_1.configure({ adapter: new enzyme_adapter_react_15_1.default() });
var enzyme_2 = require("enzyme");
exports.mount = enzyme_2.mount;
exports.shallow = enzyme_2.shallow;
exports.ReactWrapper = enzyme_2.ReactWrapper;
exports.default = enzyme_2.default;
