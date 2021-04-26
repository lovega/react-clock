import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classes from './Clock.module.scss';
import moment from 'moment-timezone';

const Clock = props => {
  const { timezone, onChange } = props;
  const [date, setDate] = useState({ h: null, m: null, s: null });

  const getDate = useCallback(() => {
    const d = moment().tz(timezone);
    setDate({ h: d.hours(), m: d.minutes(), s: d.seconds() });
    if (onChange) onChange(d);
  }, [timezone, onChange]);

  const isNotEmpty = str => str !== null && str !== undefined;
  const isFullDate = d => isNotEmpty(d.h) && isNotEmpty(d.m) && isNotEmpty(d.s);
  const formatDate = str => (isNotEmpty(str) && str < 10 ? `0${str}` : str);

  useEffect(() => {
    getDate();
    const interval = setInterval(() => getDate(), 1000);
    return () => clearInterval(interval);
  }, [getDate]);

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.timeZone}>{timezone}</h2>
      <div className={classes.analog}>
        {isFullDate(date) ? (
          <div className={classes.digital}>{`${formatDate(date.h)}:${formatDate(
            date.m
          )}:${formatDate(date.s)}`}</div>
        ) : null}
        <div className={classes.digits}>
          {Array.from(Array(4).keys(), (_, i) => i + 1).map((_, k) => (
            <span key={k} className={`${classes.digit} ${classes.line}`} />
          ))}
          <span className={`${classes.digit} ${classes.vertical}`} />
          <span className={`${classes.digit} ${classes.horizontal}`} />
        </div>
        <div className={classes.dials}>
          {isFullDate(date) ? (
            <Fragment>
              <span
                className={`${classes.dial} ${classes.hours}`}
                style={{ transform: `rotate(${date.h * 30}deg)` }}
              />
              <span
                className={`${classes.dial} ${classes.minutes}`}
                style={{ transform: `rotate(${date.m * 6}deg)` }}
              />
              <span
                className={`${classes.dial} ${classes.seconds}`}
                style={{ transform: `rotate(${date.s * 6}deg)` }}
              />
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Clock.propTypes = {
  timezone: PropTypes.string,
  onChange: PropTypes.func,
};
Clock.defaultProps = {
  timezone: 'Europe/Madrid',
};
export default Clock;
