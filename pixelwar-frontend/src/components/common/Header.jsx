import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { FaHome, FaRedditAlien, FaSignInAlt, FaHammer } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar expand='md' color='primary'>
      <NavbarBrand href='/' style={{ color: "white", fontWeight: "bold" }}>
        <FaRedditAlien style={{ marginRight: "10px" }} />
        Reddot
      </NavbarBrand>
      <Nav className='ml-auto' navbar>
        <NavItem>
          <NavLink href='/' style={{ color: "white" }}>
            <FaHome style={{ marginRight: "5px" }} /> Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/admin' style={{ color: "white" }}>
            <FaHammer style={{ marginRight: "5px" }} /> Admin
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/login' style={{ color: "white" }}>
            <FaSignInAlt style={{ marginRight: "5px" }} /> Login
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
