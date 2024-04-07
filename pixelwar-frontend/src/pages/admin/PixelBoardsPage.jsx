import { useEffect, useState } from "react";
import { Container, Row, CardColumns, Button, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import BoardItem from "@components/admin/BoardItem";
import PaginationComponent from "@components/pagination/PaginationComponent";
import SearchBar from "@components/admin/SearchBar";
import SortComponent from "@components/admin/SortComponent";
import { useRequest } from "@hooks/api";

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
function PixelBoardListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("name-asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, execute } = useRequest("/boards", {}, "get");
  const navigate = useNavigate();

  useEffect(() => {
    execute("");
  }, []);

  useEffect(() => {
    if (searchTerm !== lastSearchTerm) {
      setCurrentPage(1);
    }
    execute("", {
      params: {
        query: searchTerm,
        sortType: sortValue,
        page: currentPage,
        limit: itemsPerPage,
      },
    });
    setLastSearchTerm(searchTerm);
  }, [searchTerm, sortValue, currentPage, itemsPerPage]);

  const onDelete = (id) => {
    execute("", {
      params: {
        query: searchTerm,
        sortType: sortValue,
        page: currentPage,
        limit: itemsPerPage,
      },
    });
  };

  return (
    <Container className='my-5'>
      <Col sm='12' md={{ size: 10, offset: 1 }}>
        <Row>
          <h2 className='text-center mb-5'>Rechercher un pixel board</h2>
        </Row>
        <Row>
          <SearchBar onSearch={setSearchTerm} />
        </Row>
        <Row>
          <Col className='d-flex flex-row-reverse'>
            <Button color='primary' onClick={() => navigate("/admin/board")}>
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
          {data && (
            <CardColumns>
              {data.boards.map((board) => (
                <BoardItem key={board.id} data={board} onDelete={onDelete} />
              ))}
              {data.boards.length === 0 && (
                <p className='text-center'>Aucun pixel board trouvé</p>
              )}
            </CardColumns>
          )}
        </Row>
        <br />
        <Row>
          {data && (
            <PaginationComponent
              itemsPerPage={itemsPerPage}
              totalItems={data.total}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(newSize) => {
                setItemsPerPage(newSize);
                setCurrentPage(1);
              }}
              hasNextPage={data.hasNext}
            />
          )}
        </Row>
      </Col>
    </Container>
  );
}

export default PixelBoardListPage;
