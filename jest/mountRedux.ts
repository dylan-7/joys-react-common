// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import enzyme, {mount, shallow, ReactWrapper, CommonWrapper} from 'enzyme';
import {Component} from 'react';

declare module "enzyme" {
  interface CommonWrapper<P, S> {
    instance(): ConnectComponent<P, S>;
  }
}

export interface ConnectComponent<P, S> extends Component<P, S> {
  getWrappedInstance?<P>(): Component<P, S>
}


export default enzyme;
export {mount, shallow, ReactWrapper};