import PixelBoardComponent from "@components/pixelBoard/PixelBoardComponent";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Placeholder } from "reactstrap";
import { useEffect, useState } from "react";
import { useApi } from "@hooks/api";

function BoardPage() {
  const { id } = useParams();
  const [timer, setTimer] = useState("");
  const { loading, data } = useApi(`/boards/${id}`);
  const navigate = useNavigate();
  const colorTable = [
    '#FFFFFF',
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF'
  ];

  const calculateTimeLeft = () => {
    const now = new Date();
    const distance = new Date(data.startAt) - now;

    if (distance < 0)
    {
      setTimer("Terminé !")
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimer(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    if (!data)
      return;
    calculateTimeLeft();
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const handleHeatmap = () => {
    navigate(`/board/heatmap/${id}`);
  };

  return (
    <Container className='my-5'>
      <h2 className='text-center mb-5'>
        <Placeholder animation={loading ? null : "wave"}>
          {data && data.name}
        </Placeholder>
      </h2>
      <p className='text-center'>
        <Placeholder animation={loading ? null : "wave"}>
          Temps restant: {timer}
        </Placeholder>
      </p>
      <p className='text-center'>
        <Placeholder animation={loading ? null : "wave"}>
          Le délai est de {data && data.delay} secondes
        </Placeholder>
      </p>
      <p className='text-center'>
        <Placeholder animation={loading ? null : "wave"}>
          Taille: {data && data.resolution.x}x{data && data.resolution.y}
        </Placeholder>
      </p>
      <p className='text-center'>
        <Placeholder animation={loading ? null : "wave"}>
          Regle: {data && data.mode}
        </Placeholder>
      </p>
      {
        data && 
      <PixelBoardComponent id={id} colorTable={data.colors} loading={loading} />
      }
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
