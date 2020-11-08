/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button';
import EmptyList from '../../components/EmptyList/EmptyList';
import Pagination from '../../components/Pagination/Pagination';
import TicketItem from '../../components/TicketItem/TicketItem';
import classes from './TicketsList.module.scss';
import {
  getSearchId, loadingTicketsList, buttonClick,
  paginate, startButtonClick, endButtonClick,
} from '../../redux/actions/aviasales';

const TicketsList = (props) => {
  useEffect(() => {
    props.getSearchId();
  }, [])

  useEffect(() => {
    if (props.searchId) {
      props.loadingTicketsList();
    }
  }, [props.searchId])

  const filteredTicketsData = props.ticketsData.filter((item) => {
    for (let i = 0; i < props.activeFilters.length; i++) {
      if (props.activeFilters[i] === item.segments[0].stops.length) {
        return true
      }
    }
  })
  const sortedList = (data, sort = 'cheap') => {
    function sortFunc(a, b) {
      if (sort === 'fast') {
        return a.segments[0].duration - b.segments[0].duration;
      }
      return a.price - b.price;
    }
    return data.sort(sortFunc);
  }
  const sortedTicketsData = sortedList(filteredTicketsData, props.sort);

  const fullTicketsList = sortedTicketsData.map((dataItem, index) => (
      <TicketItem key={index}
      data={dataItem}/>
  ))

  const indexOfLastTicket = props.currentPage * props.ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - props.ticketsPerPage;

  const currentTickets = fullTicketsList.slice(indexOfFirstTicket, indexOfLastTicket);

  const viewContent = currentTickets.length === 0 ? <EmptyList/> : currentTickets;
  const viewPagination = currentTickets.length === 0 ? null : <Pagination
                                                                ticketsPerPage={props.ticketsPerPage}
                                                                currentPage={props.currentPage}
                                                                totalTickets={fullTicketsList.length}
                                                                paginate={props.paginate}
                                                                startButtonClick={props.startButtonClick}
                                                                endButtonClick={props.endButtonClick}
                                                              />
  const buttons = props.buttons.map((buttonItem, index) => <Button name={buttonItem.name}
                                                            key={index}
                                                            value={buttonItem.value}
                                                            btnActiveClass={buttonItem.active}
                                                            func={props.buttonClick} />)

  return (
    <div className={classes['tickets-list']}>
      <div className={classes.buttons}>
        {buttons}
      </div>
      <div>
        {viewContent}
      </div>
      {viewPagination}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ticketsData: state.aviasales.ticketsData,
    searchId: state.aviasales.searchId,
    activeFilters: state.aviasales.activeFilters,
    loading: state.aviasales.loading,
    buttons: state.aviasales.buttons,
    sort: state.aviasales.sort,
    currentPage: state.aviasales.currentPage,
    ticketsPerPage: state.aviasales.ticketsPerPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getSearchId: () => dispatch(getSearchId()),
    buttonClick: (name) => dispatch(buttonClick(name)),
    loadingTicketsList: () => dispatch(loadingTicketsList()),
    paginate: (page) => dispatch(paginate(page)),
    startButtonClick: () => dispatch(startButtonClick()),
    endButtonClick: (lastPage) => dispatch(endButtonClick(lastPage)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);