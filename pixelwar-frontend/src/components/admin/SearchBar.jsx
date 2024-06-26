import { useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <InputGroup className='mb-3 rounded'>
      <Input
        placeholder='Rechercher...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='rounded-start'
      />
      <Button color='primary' onClick={handleSearch} className='rounded-end'>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
