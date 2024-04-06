import { Button, Col, Container, Row, CardColumns } from "reactstrap";
import SearchBar from "@components/admin/SearchBar";
import SortComponent from "@components/admin/SortComponent";
import PaginationComponent from "@components/pagination/PaginationComponent";
import BoardItem from "@components/board/BoardItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FindBoardPage() {
  const sortOptions = [
    { label: "Nom (asc)", value: "name-asc" },
    { label: "Nom (desc)", value: "name-desc" },
    { label: "Date de création (asc)", value: "createAt-asc" },
    { label: "Date de création (desc)", value: "createAt-desc" },
    { label: "Date de début (asc)", value: "startAt-asc" },
    { label: "Date de début (desc)", value: "startAt-desc" },
    { label: "Date de fin (asc)", value: "endAt-asc" },
    { label: "Date de fin (desc)", value: "endAt-desc" },
    { label: "Résolution X (asc)", value: "resolution.x-asc" },
    { label: "Résolution X (desc)", value: "resolution.x-desc" },
    { label: "Résolution Y (asc)", value: "resolution.y-asc" },
    { label: "Résolution Y (desc)", value: "resolution.y-desc" },
  ];
  const initialBoards = [
    {
      id: 1,
      name: "Mon pixel board",
      description: "Le meilleur pixel board de tous les temps",
      image: "https://picsum.photos/200",
      date: "2021-10-12T00:00:00.000Z",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("name-asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pixelBoards, setPixelBoards] = useState(initialBoards);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm !== lastSearchTerm) {
      setCurrentPage(1);
    }
    console.log("Searching with:", searchTerm);
    console.log("Sorting with:", sortValue);
    console.log("Current page:", currentPage);
    console.log("Items per page:", itemsPerPage);
    setLastSearchTerm(searchTerm);
  }, [searchTerm, sortValue, currentPage, itemsPerPage]);

  return (
    <Container className='my-5'>
      <Col sm='12' md={{ size: 8, offset: 2 }}>
        <Row>
          <h1>Rechercher un pixel board</h1>
        </Row>
        <Row>
          <SearchBar onSearch={setSearchTerm} />
        </Row>
        <Row>
          <Col className='d-flex flex-row-reverse'>
            <Button color='primary' onClick={() => navigate("/board")}>
              Créer un pixel board
            </Button>
          </Col>
        </Row>
        <Row>
          <SortComponent
            sortOptions={sortOptions}
            setSortValue={setSortValue}
          />
        </Row>
        <Row>
          <CardColumns>
            {pixelBoards.map((board) => (
              <BoardItem key={board.id} data={board} />
            ))}
            {pixelBoards.length === 0 && (
              <p className='text-center'>Aucun pixel board trouvé</p>
            )}
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
      </Col>
    </Container>
  );
}

export default FindBoardPage;
