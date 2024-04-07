import React, { useState, useContext } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav } from "reactstrap";
import {
  FaHome,
  FaRedditAlien,
  FaSignInAlt,
  FaHammer,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { RoleContext } from "@contexts/RoleContext"; 
import NavigationItem from "./NavigationItem";

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, isLoggedIn, reset } = useContext(RoleContext);

  const toggle = () => setIsOpen(!isOpen); 

  const onLogout = () => {
    reset();
  };

  return (
    <Navbar expand='md' color='primary' dark>
      <NavbarBrand href='/' style={{ color: "white", fontWeight: "bold" }}>
        <FaRedditAlien style={{ marginRight: "10px" }} />
        Reddot
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse className='justify-content-end' isOpen={isOpen} navbar>
        <Nav navbar className='align-items-center'>
          <NavigationItem to='/' title='Accueil' icon={<FaHome />} />
          <NavigationItem to='/board' title='Créer' icon={<FaPlus />} />
          <NavigationItem to='/boards' title='Chercher' icon={<FaSearch />} />
          {!isLoggedIn() && (
            <>
              <NavigationItem
                to='/login'
                title='Se connecter'
                icon={<FaSignInAlt />}
              />
              <NavigationItem
                to='/signup'
                title="S'inscrire"
                icon={<FaSignInAlt />}
              />
            </>
          )}
          {isLoggedIn() && (
            <NavigationItem
              to='/profile'
              title='Profil'
              icon={<FaSignInAlt />}
            />
          )}
          {isLoggedIn() && (
            <NavigationItem
              onClick={onLogout}
              title='Déconnexion'
              icon={<FaSignInAlt />}
            />
          )}
          {isAdmin() && (
            <NavigationItem to='/admin' title='Admin' icon={<FaHammer />} />
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar;
