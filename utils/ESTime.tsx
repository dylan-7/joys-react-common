import * as React from 'react';
import moment from 'moment-timezone';

/** 美东时间: UI组件 */
export class ESTimeUI extends React.PureComponent<Props, {}> {
  // tslint:disable-next-line:no-any
  private time: any;

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    window.clearInterval(this.time);
    this.time = setInterval(() => {
      this.setState({ time: new Date() });
    },                      1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.time);
  }

  render() {
    const { title = '美东时间' } = this.props;
    return (
      <span>
        {title} ( -04:00 ) {moment().tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss')}
      </span>
    );
  }
}

interface Props {
  title?: string;
}

/** 当前美东时间: 字符串 */
export const ESTime = (format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return moment().tz('America/Caracas').format(format);
};
