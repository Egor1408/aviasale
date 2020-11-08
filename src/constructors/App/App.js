import React from 'react';
import Filters from '../Filters/Filters';
import TicketsList from '../TicketsList/TicketsList';
import classes from './App.module.scss';
import Logo from '../../components/Logo/Logo';

function App() {
  return (
    <div className={classes.wrap}>
      <div className={classes.logo}>
        <Logo/>
      </div>
      <div className={classes['main-content']}>
        <Filters />
        <TicketsList />

      </div>
    </div>
  );
}

export default App;
