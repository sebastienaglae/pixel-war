import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { FaHome, FaRedditAlien, FaSignInAlt, FaHammer, FaPaintRoller } from "react-icons/fa";

function NavigationBar() {
  return (
    <Navbar expand='md' color='primary'>
      <NavbarBrand href='/' style={{ color: "white", fontWeight: "bold" }}>
        <FaRedditAlien style={{ marginRight: "10px" }} />
        Reddot
      </NavbarBrand>
      <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink href="/admin/create-board" style={{ color: "white" }}>
              <FaPaintRoller style={{ marginRight: "5px" }} /> Create a board
            </NavLink>
          </NavItem>
        <NavItem>
          <NavLink href='/' style={{ color: "white" }}>
            <FaHome style={{ marginRight: "5px" }} /> Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/login' style={{ color: "white" }}>
            <FaSignInAlt style={{ marginRight: "5px" }} /> Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/signup' style={{ color: "white" }}>
            <FaSignInAlt style={{ marginRight: "5px" }} /> Signup
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/admin' style={{ color: "white" }}>
            <FaHammer style={{ marginRight: "5px" }} /> Admin
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
