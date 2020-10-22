import React from 'react';
import classes from './TicketItem.module.scss';

const TicketItem = () => {
  const ticketCost = '13 400 Р';
  return (
    <div className={classes['ticket-item']}>
      <div className={classes['company-logo']}></div>
      <div className={classes.price}>
        <span>{ticketCost}</span>
      </div>
      <div className={classes.direction}>
        <div className={classes.route}>
          <span>MOV - HKT</span>
          <span>10:45 - 08:00</span>
        </div>
        <div className={classes.length}>
          <span>В пути</span>
          <span>21ч 15м</span>
        </div>
        <div className={classes.stops}>
          <span>2 пересадки</span>
          <span>HKG, JNB</span>
        </div>
      </div>
      <div className={classes.direction}>
        <div className={classes.route}>
          <span>MOV - HKT</span>
          <span>10:45 - 08:00</span>
        </div>
        <div className={classes.length}>
          <span>В пути</span>
          <span>21ч 15м</span>
        </div>
        <div className={classes.stops}>
          <span>2 пересадки</span>
          <span>HKG, JNB</span>
        </div>
      </div>
    </div>
  )
}

export default TicketItem;