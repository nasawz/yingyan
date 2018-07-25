import { h, render, Component } from 'preact';
import cxs from 'cxs';
import config from './app.json';
import { customEvent } from './helper/customEvent';
import { YY_EVENT } from './helper/constants';
declare const window: any;

class Clock extends Component {
  timer: any;
  constructor() {
    super();
    // set initial time:
    this.state = {
      time: Date.now()
    };
  }

  componentDidMount() {
    // update time every second
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    // stop when not renderable
    clearInterval(this.timer);
  }

  render(props: any, state: any) {
    let time = new Date(state.time).toLocaleTimeString();
    return <span className={clockStyle}>{time}</span>;
  }
}
let _conatiner: any;
class Conatiner extends Component<{}, { r: any }> {
  constructor() {
    super();
    _conatiner = this;
    this.state = {
      r: true
    };
  }
  render() {
    if (this.state.r) {
      return (
        <div>
          <Clock />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

cxs.prefix(`_${config.name}_`);
const clockStyle = cxs({
  padding: '32px',
  backgroundColor: 'tomato'
});

window.yingyan = window.yingyan || {};
window.yingyan[config.name] = window.yingyan[config.name] || {};
let appInstance: any;
const mount = (name: string, router?: any) => {
  appInstance = render(
    <Conatiner />,
    document.getElementById(`${config.name}@${config.version}`) || document.body
  );
  customEvent(YY_EVENT.CHILD_MOUNT, { name: config.name });
};
const unmount = (module: any) => {
  if (appInstance) {
    _conatiner.setState({ r: false });
    appInstance.parentNode.removeChild(appInstance);
    window.yingyan[config.name] = undefined;
    customEvent(YY_EVENT.CHILD_UNMOUNT, { name: config.name });
  }
};
export { mount, unmount };
