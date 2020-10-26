import React from 'react';
import classes from './FilterItem.module.scss';

const FilterItem = ({
  name, id, checked, checkboxClick,
}) => {
  const inputId = `check-box__${id}`;
  return (
    <li className={classes['filter-item']}>
      <input className={classes['check-box']}
        id={inputId}
        // name={inputId}
        type='checkbox'
        checked={checked}
        onChange={() => checkboxClick(id)}
        // onClick={() => console.log(inputId)}
      />
      <label htmlFor={inputId}><span>{name}</span></label>
    </li>
  )
}

export default FilterItem;