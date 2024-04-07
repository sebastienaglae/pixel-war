import PixelBoardComponent from "@components/pixelBoard/PixelBoardComponent";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Placeholder } from "reactstrap";
import { useEffect, useState } from "react";
import { useApi } from "@hooks/api";

function BoardPage() {
  const data = {
    title: "My Board Page",
    date: "2025-09-01",
    delay: "5",
    mode: "no-overwrite",
    resolution: {
      x: 10,
      y: 10,
    },
  };
  const { id } = useParams(); // Access id from URL=
  const [timer, setTimer] = useState("");
  const { loading } = useApi(`/boards/${id}`);
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const now = new Date();
    const distance = new Date(data.date) - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleHeatmap = () => {
    navigate(`/board/heatmap/${id}`);
  };

  return (
    <Container className='my-5'>
      <h2 className='text-center mb-5'>
        <Placeholder animation={loading ? null : "wave"}>
          {data.title}
        </Placeholder>
      </h2>
      <p className='text-center'>
        <Placeholder animation={loading ? null : "wave"}>
          Temps restant: {timer}
        </Placeholder>
      </p>
      <p className='text-center'>
        <Placeholder animation={loading ? null : "wave"}>
          Le délai est de {data.delay} secondes
        </Placeholder>
      </p>
      <p className='text-center'>
        <Placeholder animation={loading ? null : "wave"}>
          Taille: {data.resolution.x}x{data.resolution.y}
        </Placeholder>
      </p>
      <PixelBoardComponent id={id} loading={loading} />
      <Button
        color='primary'
        className='mt-5 d-flex justify-content-center mx-auto'
        onClick={handleHeatmap}
      >
        Voir la heatmap
      </Button>
    </Container>
  );
}

export default BoardPage;
