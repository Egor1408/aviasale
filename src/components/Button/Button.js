import React from 'react';
import classes from './Button.module.scss';

const Button = ({
  func, value, name, btnActiveClass = false,
}) => {
  const cls = [classes.button]
  if (btnActiveClass) {
    cls.push(classes.active);
  }
  return (
    <button name={name}
            className={cls.join(' ')}
            onClick={() => { func(name) }}
    >{value}</button>
  )
}

export default Button;