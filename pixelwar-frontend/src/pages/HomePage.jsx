import { useState } from "react";
import { Row, Col, Container } from "reactstrap";
import CardStat from "@components/common/CardStat";
import BoardCarousel from "@components/carousel/BoardCarousel";
import { useApi } from "@hooks/api";

function HomePage() {
  const itemsPerPage = 3;

  const [userCount, setUserCount] = useState("Statistique indisponible");
  const [boardCount, setBoardCount] = useState("Statistique indisponible");

  const { loading: loadingStats, data: dataStats } = useApi("/dashboard/stats");
  const { loading: loadingLast, data: dataLast } = useApi(
    "/boards/?status=active&sortType=startAt-desc"
  );
  const { loading: loadingFinished, data: dataFinished } = useApi(
    "/boards/?status=ended&sortType=endAt-desc"
  );

  const statsData = [
    {
      title: "Nombre d'utilisateurs",
      value: dataStats ? dataStats.users : "Statistique indisponible",
      loading: loadingStats,
      color: "primary",
    },
    {
      title: "Nombre de PixelBoard",
      value: dataStats ? dataStats.boards : "Statistique indisponible",
      loading: loadingStats,
      color: "secondary",
    },
  ];

  return (
    <Container className='my-5'>
      <h1 className='text-center'>Bienvenu sur Reddot</h1>
      {/* First Row of Cards stats */}
      <Row className='justify-content-center my-5'>
        {statsData.map((stat, index) => (
          <Col xs='auto' key={index}>
            <CardStat
              title={stat.title}
              value={stat.value}
              loading={stat.loading}
              color={stat.color}
            />
          </Col>
        ))}
      </Row>

      {/* Second Row of Cards lastest. To map them later and maybe implement a carousel*/}
      <h3 className='text-center'>Derniere PixelBoard</h3>
      <BoardCarousel
        data={dataLast}
        itemsPerPage={itemsPerPage}
        loading={loadingLast}
      />

      {/* Third row finished boards*/}
      <h3 className='text-center'>PixelBoard terminées</h3>
      <BoardCarousel
        data={dataFinished}
        itemsPerPage={itemsPerPage}
        loading={loadingFinished}
      />
    </Container>
  );
}

export default HomePage;
