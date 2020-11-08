import React from 'react';
import { connect } from 'react-redux';
import classes from './Lodo.module.scss';
import Spinner from '../Spinner/Spinner';

const Logo = (props) => {
  const spin = props.loading ? <Spinner /> : null;
  return (
    <div className={classes.logo}>
      {spin}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.aviasales.loading,
  }
}
export default connect(mapStateToProps)(Logo);