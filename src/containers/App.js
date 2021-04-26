import React, { Component } from 'react';
import { Clock, Modal } from '../components/';
import { connect } from 'react-redux';
import { fetchAlarm } from '../store/actions/index';
import moment from 'moment';

const TimeZones = [
  {
    timeZone: 'Europe/Madrid',
    code: 'España',
  },
  {
    timeZone: 'America/New_York',
    code: 'New York',
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.handleTimeZone = this.handleTimeZone.bind(this);
    this.handleAlarm = this.handleAlarm.bind(this);
    this.state = {
      alarm: {},
      timezone: 'Europe/Madrid',
      open: false,
    };
  }

  handleTimeZone = (e, value) => {
    e.preventDefault();
    this.setState({ timezone: value });
  };

  handleAlarm = date => {
    if (!date) return;
    const d = moment(date).format('HH:mm:ss');
    let a = null;
    if (this.props.alarm)
      a = this.props.alarm.find(a => {
        let finalTime = null;
        if (a.active && a.time) {
          const time = a.time.split(':');
          let m = moment();
          m.set({
            hour: time[0],
            minute: time[1],
            second: time[2] ? time[2] : 0,
          });
          finalTime = moment(m).format('HH:mm:ss');
        }
        return finalTime === d;
      });
    if (a) this.setState({ alarm: a, open: true });
  };

  componentDidMount() {
    this.handleAlarm(this.props);
    this.props.fetchAlarm();
  }

  render() {
    return (
      <div id="main-body" className="wrapper">
        <div className="container">
          <div className="form-buttons">
            {TimeZones.map((v, k) => (
              <button
                key={k}
                className={this.state.timezone === v.timeZone ? 'active' : ''}
                onClick={e => this.handleTimeZone(e, v.timeZone)}
              >
                {v.code}
              </button>
            ))}
          </div>
          <Clock
            timezone={this.state.timezone}
            onChange={date => this.handleAlarm(date)}
          />
          <Modal
            open={this.state.open}
            onClose={() => this.setState({ open: null })}
          >
            {`${this.state.alarm.time} ${this.state.alarm.message}`}
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { alarm: state.alarm };
};
export default connect(mapStateToProps, { fetchAlarm })(App);
