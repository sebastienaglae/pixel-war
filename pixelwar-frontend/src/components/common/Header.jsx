import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { FaHome, FaRedditAlien, FaSignInAlt } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar
      expand='md'
      style={{ backgroundColor: "#FF5700" }}
    >
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
          <NavLink href='/login' style={{ color: "white" }}>
            <FaSignInAlt style={{ marginRight: "5px" }} /> Login
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
