import React from 'react'
import { BrowserRouter as Router, Route , Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

 const ProtectedRoute = ({component: Component , isAuth, ...otherProps}) => {
  return (
    <Route {...otherProps} render={props => isAuth ? 
        (<Component {...props} />) : (<Redirect to="/login" />)}/>      
  )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(ProtectedRoute);