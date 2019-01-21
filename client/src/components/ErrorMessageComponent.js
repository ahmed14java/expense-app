import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    Button,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Alert
  } from "reactstrap";

function ErrorMessageComponent({ message }) {

  if(message){
      return(
        <Alert color="danger">{message}</Alert>
      )
  }
  return null;
}

const mapStateToProps = state => ({
    message: state.errors.message
})

export default connect(mapStateToProps , {})(ErrorMessageComponent);
