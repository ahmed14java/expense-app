import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from '../../actions/auth_action';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown
} from "reactstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleButton(){
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  _renderLoginOrLogout(){
    const { isAuth  , logout , profile} = this.props;
    if (isAuth) {
      return (
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleButton.bind(this)}>
        <DropdownToggle caret color="link">
          Welcome { profile.name }
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem  onClick={() => logout()}>Logout</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      );
    }
    return (
      <NavItem>
       <NavLink href="/login">Login</NavLink>
      </NavItem>
    );
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Expense</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
             { this._renderLoginOrLogout() }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  profile: state.auth.profile
})

export default connect(mapStateToProps , {logout})(NavBar);
