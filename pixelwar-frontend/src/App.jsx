// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Collapse } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

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
                    <Button color="primary">Login</Button>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Routes> {/* Use <Routes> instead of <Switch> */}
            <Route path="/login" element={<Login />} /> {/* Use 'element' prop instead of 'component' */}
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
