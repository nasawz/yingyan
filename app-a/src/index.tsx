import { h, render, Component } from 'preact';
import cxs from 'cxs';

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
cxs.prefix('_app-a_');
const clockStyle = cxs({
  padding: '32px',
  backgroundColor: 'tomato'
});

// render an instance of Clock into <body>:
render(<Clock />, document.body);
