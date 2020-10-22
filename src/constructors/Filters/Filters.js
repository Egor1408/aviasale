import React from 'react';
import FilterItem from '../../components/FilterItem/FilterItem';
import classes from './Filters.module.scss';

const Filters = () => {
  const arr = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
  const elem = arr.map((item, index) => (
      <FilterItem name={item} id={index} key={index}/>
  ))
  return (
    <div className={classes.filters}>
      <span className={classes['filters-title']}>Колличество пересадок</span>
      <ul>
        {elem}
      </ul>
    </div>
  )
}
export default Filters;