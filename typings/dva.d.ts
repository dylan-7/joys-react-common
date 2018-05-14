// 此文件是要显式 import 才有效
// 但是 declare module 是不起作用的
import {Action, Dispatch} from 'redux';
import { IntlXlz } from './intl';

export interface DvaAction extends Action {
  payload: any;
}

export interface DvaDispatch {
  dispatch: Dispatch<any>;
}

export interface LangSiteState {
  site?: IntlXlz;
  skin?: any;
  dispatch?: Dispatch<any>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: any;
    }
  }
  // export class ActiveXObject {
  //   constructor(s: string);
  //   CreateShortcut(s: string): Shortcut;
  //   SpecialFolders(s: string): string;
  // }
  export interface Shortcut {
    TargetPath: string;
    Save();
  }
  export namespace HistoryModule {
    export const History: any;
  }
  interface Window {
    settings: {
      domain: string;
      ssl: boolean;
      site: {
        title: string;
        theme: string;
        lang: string;
        copyright: string;
        favicon: string;
        sport: string;
      },
      base: {
        maintaining: boolean;
        site_status: boolean;
      },
      logo: {
        normal: string;
        small: string;
        medium: string;
        large: string;
      }
    }
  }
  interface NodeRequire {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) =>   T) => any, name: string) => React.ReactElement<any>;
  }
}