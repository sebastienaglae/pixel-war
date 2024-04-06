import { useState } from "react";
import {
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaDown,
} from "@fortawesome/free-solid-svg-icons";
import SortItem from "./SortItem";

function SortComponent({ setSortValue, sortOptions }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <Row className='mb-3'>
      <div className='d-flex flex-row'>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret color='primary'>
            <FontAwesomeIcon icon={faSortAlphaDown} className='me-2' />
            Trier par
          </DropdownToggle>
          <DropdownMenu>
            {sortOptions.map((option) => (
              <SortItem
                key={option.value}
                onSortChange={setSortValue}
                option={option}
              />
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </Row>
  );
}

export default SortComponent;
