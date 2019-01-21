import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert
} from "reactstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signIn } from "../../actions/auth_action";

class Login extends Component {
  componentDidUpdate() {
    const { error, isAuth } = this.props;
    if (error && this.bag) {
      this.bag.setSubmitting(false);
    }
    if (isAuth) {
      this.props.history.push("/");
    }
  }

  onSubmit(e, bag) {
    this.props.signIn(e);
    this.bag = bag;
  }

  render() {
    const { error } = this.props;

    return (
      <div style={{ padding: 20 }}>
        <h2>Sign in</h2>
        <hr />

        {error.error && <Alert color="danger">{error.error}</Alert>}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={this.onSubmit.bind(this)}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .min(6)
              .required()
          })}
          render={({
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
            handleBlur,
            errors,
            touched
          }) => (
            <div>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  invalid={errors.email && touched.email}
                  name="email"
                  type="email"
                  placeholder="enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <FormFeedback>{errors.email}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  invalid={errors.password && touched.password}
                  name="password"
                  type="password"
                  placeholder="enter password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <FormFeedback>{errors.password}</FormFeedback>
                ) : null}
              </FormGroup>
              <Button
                color="primary"
                block
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                Signin
              </Button>
            </div>
          )}
        />
        <Link to="/signup">Do not have an account? Sign Up now</Link>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  attempting: PropTypes.any.isRequired
  // error: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  attempting: state.auth.attempting,
  error: state.auth.error,
  isAuth: state.auth.isAuth
});

export default connect(
  mapStateToProps,
  { signIn }
)(Login);
