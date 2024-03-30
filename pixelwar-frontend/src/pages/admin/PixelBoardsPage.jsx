import React, { useState, useEffect } from "react";
import { Container, Row, CardColumns } from "reactstrap";
import BoardItem from "@components/admin/BoardItem";
import PaginationComponent from "@components/common/PaginationComponent";
import SearchBar from "@components/common/SearchBar";
import FilterSortComponent from "@components/common/FilterSortComponent";

function PixelBoardListPage() {
  const initialBoards = [
    {
      id: 1,
      name: "Mon pixel board",
      description: "Le meilleur pixel board de tous les temps",
      image: "https://picsum.photos/200",
      date: "2021-10-12T00:00:00.000Z",
      author: "Test",
    },
    {
      id: 2,
      name: "Mon pixel board 2",
      description: "Le meilleur pixel board de tous les temps",
      image: "https://picsum.photos/200",
      date: "2021-10-12T00:00:00.000Z",
      author: "Test",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [filterField, setFilterField] = useState("name");
  const [pixelBoards, setPixelBoards] = useState(initialBoards);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  const filterOptions = [
    { label: "Name", value: "name" },
    { label: "Author", value: "author" },
  ];

  const sortOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  useEffect(() => {
    const filtered = pixelBoards.filter((board) =>
      board[filterField].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBoards(filtered);
  }, [pixelBoards, searchTerm, filterField]);

  const handleFilterChange = (filterValue) => {
    console.log("Filtering with:", filterValue);
  };

  const handleSortChange = (sortValue) => {
    console.log("Sorting with:", sortValue);
  };

  return (
    <Container className='mt-5'>
      <Row>
        <SearchBar onSearch={handleSearch} />
      </Row>
      <Row>
        <FilterSortComponent
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          filterOptions={filterOptions}
          sortOptions={sortOptions}
        />
      </Row>
      <Row>
        <CardColumns>
          {pixelBoards.map((board) => (
            <BoardItem key={board.id} data={board} />
          ))}
        </CardColumns>
      </Row>
      <br />
      <Row>
        <PaginationComponent
          itemsPerPage={itemsPerPage}
          totalItems={pixelBoards.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newSize) => {
            setItemsPerPage(newSize);
            setCurrentPage(1);
          }}
        />
      </Row>
    </Container>
  );
}

export default PixelBoardListPage;
