import * as fetch from 'isomorphic-fetch';
import { debounce } from 'lodash';

let environment = {} as Environment; // 值要从外部 environment.ts 更新
let request = function (url: string, options: RequestInit = {}): Promise<any> {
  throw new Error('调用 request 之前需要先调用 requestWrap(环境变量) 进行初始化')
};

export function requestWrap(env: any) {
  environment = env; // 初始化，将外部的 environment.ts 的值赋给本地 environment

  const debounceErr401 = debounce(() => {
    environment.dispatch({ type: 'login/err401' })
  });
  const debounceErr404 = debounce(() => {
    environment.dispatch({ type: 'login/ajax404' })
  });
  /**
   * Requests a URL, returning a promise.
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   * @return {object}           An object containing either "data" or "err"
   */
  request = function (url: string, options: RequestInit = {}) {
    // 本域为 https 则所有的 ajax 请求必须是 https 开头
    if (url && url.startsWith('http')) {
      const protocolUrl = new URL(url).protocol;
      const protocolApi = new URL(environment.hostAPI).protocol;
      if (protocolApi === 'https:' && protocolUrl === 'http:') {
        url = url.replace('http:', 'https:');
      }
    }

    options.headers = {} as any;
    const token = window.sessionStorage.getItem(environment.tokenName);
    // 需要授权访问的接口
    if (token) {
      options.headers = { Authorization: token } as any;
    }
    if (!url.startsWith('http') && !url.endsWith('.json') && !url.startsWith('/api')) {
      url = `${environment.hostAPI}${url}`;
    }
    const m = (options.method || '').toLocaleLowerCase();
    if (m === 'post' || m === 'put' || m === 'patch') {
      if (!options.headers['Content-Type']) {
        options.headers['Content-Type'] = 'application/json';
      }
    }
    options.headers['Accept-Language'] = environment.locale;
    return fetch(url, options)
      .then(response => {
        let jsonObj = Promise.resolve(response);
        if (response.status === 401) {
          jsonObj = Promise.reject(response);
          debounceErr401();
        } else if (response.status === 404) {
          jsonObj = Promise.reject(response);
          debounceErr404();
        } else {
          try {
            jsonObj = response.json();
          } catch (err) {
            jsonObj = Promise.reject(response);
          }
        }
        return jsonObj;
      })
      .then(response => response)
      .catch(err => ({ status: err && err.status, state: 4, message: err && err.message }));
  };
  return request;
}

export default {
  request
};

interface Environment {
  dispatch: any;
  hostAPI: string;
  locale: string;
  tokenName: string;
}
