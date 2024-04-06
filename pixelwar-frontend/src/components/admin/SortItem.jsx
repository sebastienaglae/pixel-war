import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';

function SortItem({ onSortChange, option }) {
  return (
    <DropdownItem key={option.value} onClick={() => onSortChange(option.value)}>
      <FontAwesomeIcon
        icon={option.value.includes("asc") ? faSortAlphaDown : faSortAlphaUp}
        className='me-2'
      />
      {option.label}
    </DropdownItem>
  );
}

export default SortItem;