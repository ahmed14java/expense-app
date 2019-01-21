import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import FloatButton from "./FloatButton";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

import { createExpense , getExpense } from '../actions/expense_actions';
import ErrorMessageComponent from "./ErrorMessageComponent";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidUpdate(){
    const {saved , error , getExpense} = this.props;
    const { modal } = this.state;

    if(error){
      this.bag.setSubmitting(false);
    }

    if(saved && modal){
      getExpense();
      this.toggle();
      this.bag.resetForm();
    }
  }

  onSubmit(e , bag) {
      this.props.createExpense(e);
      this.bag = bag;
  }

  render() {
    const now = moment().format("YYYY-MM-DD");
    return (
      <div>
        <FloatButton onClick={this.toggle} />
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Expense</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{ description: "", ammount: "", created: now }}
              validationSchema={Yup.object().shape({
                description: Yup.string().min(3),
                ammount: Yup.number()
                  .min(1)
                  .required(),
                created: Yup.date().required()
              })}
              onSubmit={this.onSubmit.bind(this)}
              render={({
                handleChange,
                handleSubmit,
                isValid,
                isSubmitting,
                handleBlur,
                errors,
                touched,
                values
              }) => (
                <div>
                  <ErrorMessageComponent />
                  <FormGroup>
                    <Label>Description</Label>
                    <Input
                      invalid={errors.description && touched.description}
                      name="description"
                      type="text"
                      value={values.description}
                      placeholder="enter description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Ammount</Label>
                    <Input
                      invalid={errors.ammount && touched.ammount}
                      name="ammount"
                      type="number"
                      value={values.ammount}
                      placeholder="enter Expense ammount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Date</Label>
                    <Input
                      invalid={errors.created && touched.created}
                      name="created"
                      type="date"
                      value={values.created}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <Button color="primary" onClick={handleSubmit} disabled={!isValid || isSubmitting}>
                    Save Expense
                  </Button>
                </div>
              )}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  saved: state.expense.saved,
  error: state.errors.message
});
export default connect(mapStateToProps , {createExpense , getExpense})(AddForm);
