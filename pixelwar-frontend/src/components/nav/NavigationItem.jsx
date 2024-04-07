import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

function NavigationItem({ to, title, icon, onClick }) {
  return (
      <NavItem>
      <NavLink
          onClick={onClick}
          to={to}
          className='text-decoration-none px-2'
          style={{ color: "white" }}
        >
          {icon} {title}
        </NavLink>
      </NavItem>
  );
}

export default NavigationItem;
