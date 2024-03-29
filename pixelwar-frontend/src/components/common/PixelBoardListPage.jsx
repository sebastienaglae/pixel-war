import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import BoardFilter from "./board/BoardFilter";
import BoardSorter from "./BoardSorter";
import BoardCard from "./BoardCard";

const PixelBoardListPage = () => {
  const [pixelBoards, setPixelBoards] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("date");

  useEffect(() => {
    // setPixelBoards(loadedBoards);
  }, [filter, sort]);

  return (
    <Container>
      <Row className='mb-3'>
        <Col>
          <BoardFilter onChange={setFilter} />
        </Col>
        <Col>
          <BoardSorter onChange={setSort} />
        </Col>
      </Row>
      <Row>
        {pixelBoards.map((board) => (
          <Col key={board.id} sm='12' md='6' lg='4' xl='3'>
            <BoardCard board={board} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PixelBoardListPage;
