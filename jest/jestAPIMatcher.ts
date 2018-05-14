
import fetch from 'isomorphic-fetch';



// use the declare global wrapper from within a module to augment a global type declaration.
declare global {
  namespace jest {
    interface Matchers<R> {
      matchAPI: any;
    }
  }
}

function matchAPI(this: jest.MatcherUtils | any, received: any, expected?: any): { pass: boolean; message (): string; } {
  const rules = require('../../config/jest/' + expected.split('/').join('.') + '.json')

  if (this.isNot) {
  } else {
    const { equals } = require('jest-matchers/build/jasmine-utils');
    if (received === undefined || received === null) {
      return {
        pass: false,
        message: () => 'received 不能为空值'
      };
    } else {
      for(const key in rules) {
        let rule = rules[key]
        if(rule.required) {
          // console.info(`[🐞 ]: `, rule)
        }
        if (!rule.required && received[key] === undefined) {
          return {
            pass: true,
            message: () => '选填'
          };
        } else {
          if(rule.type==='int') {
            if (!Number.isInteger(received[key])) {
              return {
                pass: false,
                message: () => `预期 ${key} 的值: ${received[key]} 不是整数`
              };
            }
          } else if (rule.type==='string') {
            if (typeof received[key] !== 'string') {
              return {
                pass: false,
                message: () => `预期 ${key} 的值: ${received[key]} 不是字符串`
              };
            }
          }
        }
      }
    }
  }
  return {
    pass: true,
    message: () => 'ok'
  }
}

type matchAPIFn = typeof matchAPI & { params: any; init: any, isNot: any};


(matchAPI as matchAPIFn).init = function () {
}

expect.extend({ matchAPI });

export default matchAPI as matchAPIFn;