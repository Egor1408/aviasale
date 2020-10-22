import React from 'react';
import classes from './Button.module.scss';

const Button = ({ name, btnActiveClass = false }) => {
  const cls = [classes.button]
  if (btnActiveClass) {
    cls.push(classes.active);
  }
  return (
    <button className={cls.join(' ')}>{name}</button>
  )
}

export default Button;