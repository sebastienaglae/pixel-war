import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
<<<<<<< HEAD
import { FaHome, FaRedditAlien, FaSignInAlt, FaHammer } from "react-icons/fa";
import PropTypes from "prop-types";
=======
import { FaHome, FaRedditAlien, FaSignInAlt, FaHammer, FaPaintRoller } from "react-icons/fa";
>>>>>>> 2360c1c (feat(front): HomePage initialization)

function NavigationBar({isAdmin}) {
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
        {isAdmin ? (
          <NavItem>
            <NavLink href='/admin' style={{ color: "white" }}>
              <FaHammer style={{ marginRight: "5px" }} /> Admin
            </NavLink>
          </NavItem>
        ) : null}
      </Nav>
    </Navbar>
  );
}

NavigationBar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default NavigationBar;
