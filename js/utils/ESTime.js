"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment_timezone_1 = require("moment-timezone");
/** 美东时间: UI组件 */
var ESTimeUI = /** @class */ (function (_super) {
    __extends(ESTimeUI, _super);
    function ESTimeUI(props) {
        return _super.call(this, props) || this;
    }
    ESTimeUI.prototype.componentDidMount = function () {
        var _this = this;
        window.clearInterval(this.time);
        this.time = setInterval(function () {
            _this.setState({ time: new Date() });
        }, 1000);
    };
    ESTimeUI.prototype.componentWillUnmount = function () {
        window.clearInterval(this.time);
    };
    ESTimeUI.prototype.render = function () {
        var _a = this.props.title, title = _a === void 0 ? '美东时间' : _a;
        return (React.createElement("span", null,
            title,
            " ( -04:00 ) ",
            moment_timezone_1.default().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')));
    };
    return ESTimeUI;
}(React.PureComponent));
exports.ESTimeUI = ESTimeUI;
/** 当前美东时间: 字符串 */
exports.ESTime = function (format) {
    if (format === void 0) { format = 'YYYY-MM-DD HH:mm:ss'; }
    return moment_timezone_1.default().tz('America/Caracas').format(format);
};
