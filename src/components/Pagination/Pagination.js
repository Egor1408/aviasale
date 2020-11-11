import React from 'react';
import classes from './Pagination.module.scss';

const Pagination = ({
  currentPage, ticketsPerPage, totalTickets, paginate, startButtonClick, endButtonClick,
}) => {
  let pageNumbers = [];
  const lastPage = Math.ceil(totalTickets / ticketsPerPage);
  let startButtonDisabled = false;
  let endButtonDisabled = false;

  if (currentPage <= 3) {
    pageNumbers = [1, 2, 3, 4, 5];
    startButtonDisabled = true;
  } else if ((currentPage >= lastPage - 2) && lastPage >= 5) {
    pageNumbers = [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    endButtonDisabled = true;
  } else {
    pageNumbers = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  return (
    <div className={classes.wrap}>
      <div className={classes.fullTickets}><span>Найдено билетов: {totalTickets}</span></div>
      <ul className={classes['pagination-list']}>
        <li><button
          className={classes['start-button']}
          disabled={startButtonDisabled}
          onClick={() => startButtonClick()}
        >В начало</button></li>

        {pageNumbers.map((number) => {
          const cls = [`${classes['pagination-item']}`];
          if (number === currentPage) {
            cls.push(`${classes.active}`)
          }
          return (
          <li key={number}>
            <button onClick = {() => paginate(number)} className={cls.join(' ')}>{number}</button>
          </li>
          )
        })}

        <li><button
          className={classes['end-button']}
          disabled={endButtonDisabled}
          onClick={() => endButtonClick(lastPage)}
        >В конец ({lastPage})</button></li>

      </ul>
    </div>
  )
}

export default Pagination;