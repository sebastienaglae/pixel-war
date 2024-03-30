// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Collapse } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Pixel War</NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/pixel_boards/">All Pixel Boards</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/creators/">Creators</NavLink>
                </NavItem>
              </Nav>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/login">
                    <Button color="primary">Login / Signin</Button>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </Router>
    );
  }
}

export default App;
