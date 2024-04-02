import React, { useState } from "react";
import {
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";

function FilterSortComponent({
  onSortChange,
  sortOptions,
  filterOptions,
  onFilterChange,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleFilterDropdown = () => setFilterDropdownOpen(!filterDropdownOpen);

  return (
    <Row className='mb-3'>
      <div className='d-flex flex-row'>
        <Dropdown
          isOpen={filterDropdownOpen}
          toggle={toggleFilterDropdown}
          className='me-2'
        >
          <DropdownToggle caret color='info'>
            <FontAwesomeIcon icon={faFilter} className='me-2' /> Filtrer par
          </DropdownToggle>
          <DropdownMenu>
            {filterOptions.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => onFilterChange(option.value)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret color='primary'>
            <FontAwesomeIcon icon={faSortAlphaDown} className='me-2' />
            Trier par
          </DropdownToggle>
          <DropdownMenu>
            {sortOptions.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => onSortChange(option.value)}
              >
                <FontAwesomeIcon
                  icon={
                    option.value.includes("_asc")
                      ? faSortAlphaDown
                      : faSortAlphaUp
                  }
                  className='me-2'
                />
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </Row>
  );
}

export default FilterSortComponent;
