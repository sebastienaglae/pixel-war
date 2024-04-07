import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

function PaginationComponent({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  hasNextPage
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  useEffect(() => {
    setPageCount(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-2'>
        <div>Total items: {totalItems}</div>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle color='primary' caret>
            {itemsPerPage} items per page
          </DropdownToggle>
          <DropdownMenu>
            {[1, 5, 10, 15, 20].map((size) => (
              <DropdownItem
                key={size}
                onClick={() => onItemsPerPageChange(size)}
              >
                {size} items per page
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <Pagination aria-label='Page navigation example'>
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink onClick={() => onPageChange(1)}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink onClick={() => onPageChange(+currentPage - 1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PaginationLink>
        </PaginationItem>

        <PaginationItem active>
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>

        <PaginationItem disabled={!hasNextPage}>
          <PaginationLink onClick={() => onPageChange(+currentPage + 1)}>
            <FontAwesomeIcon icon={faAngleRight} />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!hasNextPage}>
          <PaginationLink onClick={() => onPageChange(pageCount)}>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </>
  );
}

export default PaginationComponent;
