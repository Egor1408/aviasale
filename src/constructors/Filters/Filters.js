import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../redux/actions/actions';
import { checkboxClick } from '../../redux/actions/actions';
import FilterItem from '../../components/FilterItem/FilterItem';
import classes from './Filters.module.scss';

const Filters = (props) => {
  const elem = props.data.map((item, index) => (
      <FilterItem
        name={item.name}
        checked={item.checked}
        id={item.id}
        key={index}
        checkboxClick={props.checkClick}
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
    data: state.filters.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkClick: (id) => dispatch(checkboxClick(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filters);