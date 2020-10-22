import React from 'react';
import classes from './FilterItem.module.scss';

const FilterItem = ({ name, id }) => (
  <li className={classes['filter-item']}>
    <input className={classes['check-box']} id={`check-box__${id}`} name={`check-box__${id}`} type='checkbox'/>
    <label htmlFor={`check-box__${id}`}><span>{name}</span></label>
  </li>
)

export default FilterItem;