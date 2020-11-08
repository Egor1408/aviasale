import React from 'react';
import classes from './EmptyList.module.scss';

export default function () {
  return (
    <div className={classes.wrapper}>
        <h3>Рейсов, подходящих под заданные фильтры, не найдено</h3>
    </div>
  )
}