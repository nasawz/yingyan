import Router, { route } from 'preact-router';
import createHashHistory from 'history/createHashHistory';
import { h, render, Component } from 'preact';
import cxs from 'cxs';
import config from './app.json';
import { customEvent } from './helper/customEvent';
import { YY_EVENT } from './helper/constants';
import { navigate } from './helper/navigate';
declare const window: any;

class Home extends Component {
  constructor() {
    super();
  }
  clickHandle() {
    navigate({ name: config.name, prefix: config.prefix, router: '/clock' });
  }
  walkHandle() {
    navigate({ name: 'mobile_walk_power', prefix: '/walk_power', router: '' });
  }
  render() {
    return (
      <div>
        My Home
        <p>
          <button onClick={this.clickHandle.bind(this)}>clock</button>
          <br />
          <button onClick={this.walkHandle.bind(this)}>walk</button>
        </p>
      </div>
    );
  }
}

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
          <Router history={createHashHistory()}>
            <Home path={window[config.name].prefix} />
            <Clock path={`${window[config.name].prefix}/clock`} />
          </Router>
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
window[config.name] = window[config.name] || {};
window[config.name].prefix = window[config.name].prefix || config.prefix;

let routingChangeHandler: any = (event: CustomEvent) => {
  if (event.detail.app.name === config.name) {
    route(`${window[config.name].prefix}${event.detail.router}`, true);
  }
};

let appInstance: any;
let targetElement: any;
const mount = () => {
  targetElement = document.getElementById(`${config.name}@${config.version}`) || document.body;
  appInstance = render(<Conatiner />, targetElement);
  customEvent(YY_EVENT.CHILD_MOUNT, { name: config.name });
  window.addEventListener(YY_EVENT.ROUTING_CHANGE, routingChangeHandler);
};
const unmount = (module: any) => {
  if (appInstance) {
    _conatiner.setState({ r: false });
    appInstance.parentNode.removeChild(appInstance);
    window[config.name] = undefined;
    customEvent(YY_EVENT.CHILD_UNMOUNT, { name: config.name });
    window.removeEventListener(YY_EVENT.ROUTING_CHANGE, routingChangeHandler);
  }
};

export { mount, unmount };

if (!window.yingyan.instance) {
  mount();
  if (window.location.hash === '#/') {
    route(`${config.prefix}`, true);
  }
}
