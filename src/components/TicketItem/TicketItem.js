import React from 'react';
import classes from './TicketItem.module.scss';

const TicketItem = ({ data }) => {
  const price = `${data.price} Р`
  const showOrigin = (segment) => data.segments[segment].origin
  const showDestination = (segment) => data.segments[segment].destination

  const minutesToFullTime = (min, format = 'long', arrival = false) => {
    const hours = Math.floor(min / 60).toString();
    let resultHours = '';

    if (arrival === true && hours >= 24) {
      const res = (hours % 24).toString();
      resultHours = res.length === 1 ? `0${res}` : res;
    } else if (hours.length === 1) {
      resultHours = `0${hours}`
    } else {
      resultHours = hours;
    }
    const minutes = (min % 60).toString();
    const resultMinutes = minutes.length === 1 ? `0${minutes}` : minutes;
    const result = format === 'short' ? `${resultHours}:${resultMinutes}` : `${resultHours}ч ${resultMinutes}м`;
    return result;
  }
  const calcDuration = (segment) => {
    const time = data.segments[segment].duration
    return minutesToFullTime(time);
  }

  const calcDepartArrivalTime = (segment) => {
    const departDate = new Date(data.segments[segment].date.toString());
    const departTime = (departDate.getHours() * 60) + departDate.getMinutes();
    const durationTime = data.segments[segment].duration;
    return (`${minutesToFullTime(departTime, 'short')} - ${minutesToFullTime(departTime + durationTime, 'short', true)}`);
  }

  const calcStops = (segment) => {
    const count = data.segments[segment].stops.length;
    let result = '';
    switch (count) {
      case 1:
        result = '1 остановка';
        break;
      case 2:
        result = '2 остановки';
        break;
      case 3:
        result = '3 остановки';
        break;
      default:
        result = 'без остановок';
    }
    return result
  }
  const showStops = (segment) => data.segments[segment].stops.join(', ')

  return (
    <div className={classes['ticket-item']}>
      <div className={classes.price}>
        <span>{price}</span>
        <div className={classes['company-logo']} style={{ background: `url(https://pics.avs.io/99/36/${data.carrier}.png) no-repeat` }}></div>
      </div>
      <div className={classes.direction}>
        <div className={classes.route}>
          <span>{showOrigin(0)} - {showDestination(0)}</span>
          <span>{calcDepartArrivalTime(0)}</span>
        </div>
        <div className={classes.length}>
          <span>В пути</span>
          <span>{calcDuration(0)}</span>
        </div>
        <div className={classes.stops}>
          <span>{calcStops(0)}</span>
          <span>{showStops(0)}</span>
        </div>
      </div>
      <div className={classes.direction}>
        <div className={classes.route}>
          <span>{showOrigin(1)} - {showDestination(1)}</span>
          <span>{calcDepartArrivalTime(1)}</span>
        </div>
        <div className={classes.length}>
          <span>В пути</span>
          <span>{calcDuration(1)}</span>
        </div>
        <div className={classes.stops}>
          <span>{calcStops(1)}</span>
          <span>{showStops(1)}</span>
        </div>
      </div>
    </div>
  )
}

export default TicketItem;