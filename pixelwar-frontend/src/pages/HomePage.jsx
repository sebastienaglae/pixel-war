import { useState } from "react";
import { Row, Col, Container } from "reactstrap";
import CardStat from "@components/common/CardStat";
import BoardCarousel from "@components/carousel/BoardCarousel";
import { useApi } from "@hooks/api";

function HomePage() {
  const latestBoards = [
    {
      id: 1,
      title: "Board 1",
      description: "Description of board 1",
      image: "https://picsum.photos/200",
    },
    {
      id: 2,
      title: "Board 2",
      description: "Description of board 2",
      image: "https://picsum.photos/200",
    },
    {
      id: 3,
      title: "Board 3",
      description: "Description of board 3",
      image: "https://picsum.photos/200",
    },
    {
      id: 4,
      title: "Board 4",
      description: "Description of board 4",
      image: "https://picsum.photos/200",
    },
    {
      id: 5,
      title: "Board 5",
      description: "Description of board 5",
      image: "https://picsum.photos/200",
    },
    {
      id: 6,
      title: "Board 6",
      description: "Description of board 6",
      image: "https://picsum.photos/200",
    },
    {
      id: 7,
      title: "Board 7",
      description: "Description of board 7",
      image: "https://picsum.photos/200",
    },
    {
      id: 8,
      title: "Board 8",
      description: "Description of board 8",
      image: "https://picsum.photos/200",
    },
    {
      id: 9,
      title: "Board 9",
      description: "Description of board 9",
      image: "https://picsum.photos/200",
    },
    {
      id: 10,
      title: "Board 10",
      description: "Description of board 10",
      image: "https://picsum.photos/200",
    },
    {
      id: 11,
      title: "Board 11",
      description: "Description of board 11",
      image: "https://picsum.photos/200",
    },
  ];

  const finishedBoards = [
    {
      id: 6,
      title: "Board 1",
      description: "Description of finished board 1",
      image: "https://picsum.photos/200",
    },
    {
      id: 7,
      title: "Board 2",
      description: "Description of finished board 2",
      image: "https://picsum.photos/200",
    },
    {
      id: 8,
      title: "Board 3",
      description: "Description of finished board 3",
      image: "https://picsum.photos/200",
    },
    {
      id: 9,
      title: "Board 4",
      description: "Description of finished board 4",
      image: "https://picsum.photos/200",
    },
    {
      id: 10,
      title: "Board 5",
      description: "Description of finished board 5",
      image: "https://picsum.photos/200",
    },
    {
      id: 11,
      title: "Board 6",
      description: "Description of finished board 6",
      image: "https://picsum.photos/200",
    },
    {
      id: 12,
      title: "Board 7",
      description: "Description of finished board 7",
      image: "https://picsum.photos/200",
    },
    {
      id: 13,
      title: "Board 8",
      description: "Description of finished board 8",
      image: "https://picsum.photos/200",
    },
  ];
  const itemsPerPage = 3;

  const [userCount, setUserCount] = useState("Statistique indisponible");
  const [boardCount, setBoardCount] = useState("Statistique indisponible");

  const { loading: loadingStats, data: dataStats } = useApi("/stats");
  const { loading: loadingLast, data: dataLast } = useApi("/boards/latest");
  const { loading: loadingFinished, data: dataFinished } =
    useApi("/boards/finished");

  return (
    <Container className='my-5'>
      <h1 className='text-center'>Bienvenu sur Reddot</h1>

      {/* First Row of Cards stats */}
      <Row className='justify-content-center my-5'>
        <Col xs='auto'>
          <CardStat
            title="Nombre d'utilisateurs"
            value={userCount}
            loading={loadingStats}
            color='primary'
          />
        </Col>

        <Col xs='auto'>
          <CardStat
            title='Nombre de PixelBoard'
            value={boardCount}
            loading={loadingStats}
            color='secondary'
          />
        </Col>
      </Row>

      {/* Second Row of Cards lastest. To map them later and maybe implement a carousel*/}
      <h3 className='text-center'>Derniere PixelBoard</h3>
      <BoardCarousel
        boards={latestBoards}
        itemsPerPage={itemsPerPage}
        loading={loadingLast}
      />

      {/* Third row finished boards*/}
      <h3 className='text-center'>PixelBoard terminées</h3>
      <BoardCarousel
        boards={finishedBoards}
        itemsPerPage={itemsPerPage}
        loading={loadingFinished}
      />
    </Container>
  );
}

export default HomePage;
