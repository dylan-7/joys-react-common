"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchAction(received, expected) {
    var actions = matchAction.actions;
    var action = actions.find(function (v) { return v.type === expected.type; });
    if (this.isNot) {
        expect(action).toBeNull();
    }
    else {
        var equals = require('jest-matchers/build/jasmine-utils').equals;
        if (action === undefined) {
            return {
                pass: false,
                message: function () { return 'action type expect to be ' + expected.type; }
            };
        }
        else {
            if (!action.payload)
                action.payload = {};
            if (!expected.payload)
                expected.payload = {};
            if (!equals(action.payload, expected.payload)) {
                return {
                    pass: false,
                    message: function () { return 'action payload ' + JSON.stringify(action.payload, null, '  ') + ' expect to be ' + JSON.stringify(expected.payload); }
                };
            }
        }
    }
    return {
        pass: true,
        message: function () { return 'ok'; }
    };
}
matchAction.init = function (store) {
    store.subscribe(function () {
        matchAction.actions = store.getActions();
    });
};
expect.extend({ matchAction: matchAction });
exports.default = matchAction;
