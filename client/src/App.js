import React, { Component } from "react";
import { Button } from "reactstrap";
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import Home from "./components/layout/Home";
import Login from "./components/layout/Login";
import NavBar from "./components/layout/NavBar";
import ProtectedRoute  from './securityUtils/ProtectedRoute';
import { Container } from "reactstrap";
import { Provider } from 'react-redux';
import store from './store/store';
import SignUp from "./components/layout/SignUp";
import { onLoadingSignIn } from './actions/auth_action';

store.dispatch(onLoadingSignIn());

class App extends Component {
  
  render() {
    
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <Container>
              <Switch>
                <ProtectedRoute path="/" component={Home} exact />
              </Switch>
              <Route path="/login" component={Login} exact />
              <Route path="/signup" component={SignUp} exact />
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
