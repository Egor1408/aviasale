import React from 'react';
import { connect } from 'react-redux';
import { checkboxClick } from '../../redux/actions/aviasales';
import FilterItem from '../../components/FilterItem/FilterItem';
import classes from './Filters.module.scss';

const Filters = (props) => {
  const elem = props.filtersData.map((item, index) => (
      <FilterItem
        name={item.name}
        checked={item.checked}
        id={item.id}
        key={index}
        checkboxClick={props.checkboxClick}
      />
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

function mapStateToProps(state) {
  return {
    filtersData: state.aviasales.filtersData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkboxClick: (id) => dispatch(checkboxClick(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);