import React, { useState } from "react";
import { Container, Row, CardColumns } from "reactstrap";
import BoardItem from "@components/admin/BoardItem";
import PaginationComponent from "@components/common/PaginationComponent";
import SearchBar from "@components/common/SearchBar";

function PixelBoardListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pixelBoards, setPixelBoards] = useState([
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
  ]);

    const handleSearch = (searchTerm) => {
    // Implement your search logic here
    // For example, filter `pixelBoards` based on `searchTerm`
    console.log("Searching for:", searchTerm);
  };

  return (
    <Container className='mt-5'>
            <Row>
        <SearchBar onSearch={handleSearch} />
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
