import React from 'react';
import Button from '../../components/Button/Button'
import TicketItem from '../../components/TicketItem/TicketItem';
import classes from './TicketsList.module.scss';

const TicketsList = () => {
  const arr = [11, 22, 33, 44, 55];
  const elem = arr.map((i, index) => (
      <TicketItem key={`${i}${index}`}/>
  ))

  return (
    <div className={classes['tickets-list']}>
      <div className={classes.buttons}>
        <Button name='Самый дешевый' btnActiveClass='true'/>
        <Button name='Самый быстрый' />
      </div>
      {elem}
    </div>
  )
}

export default TicketsList;