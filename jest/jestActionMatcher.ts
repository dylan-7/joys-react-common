// use the declare global wrapper from within a module to augment a global type declaration.
declare global {
  namespace jest {
    interface Matchers<R> {
      matchAction: any;
    }
  }
}

function matchAction(this: jest.MatcherUtils | any, received: any, expected?: any): { pass: boolean; message (): string; } {
  const actions = (matchAction as matchActionFn).actions;
  const action = actions.find(v => v.type === expected.type);
  if (this.isNot) {
    expect(action).toBeNull();
  } else {
    const { equals } = require('jest-matchers/build/jasmine-utils');
    if (action === undefined) {
      return {
        pass: false,
        message: () => 'action type expect to be ' + expected.type
      };
    } else {
      if (!action.payload) action.payload = {};
      if (!expected.payload) expected.payload = {};
      if (!equals(action.payload, expected.payload)) {
        return {
          pass: false,
          message: () => 'action payload ' + JSON.stringify(action.payload,null, '  ') +' expect to be ' + JSON.stringify(expected.payload)
        };
      }
    }
  }
  return {
    pass: true,
    message: () => 'ok'
  }
}

type matchActionFn = typeof matchAction & {actions: any; init: any, isNot: any};


(matchAction as matchActionFn).init = function (store) {
  store.subscribe(() => {
    (matchAction as matchActionFn).actions = store.getActions();
  });
}

expect.extend({ matchAction });

export default matchAction as matchActionFn;