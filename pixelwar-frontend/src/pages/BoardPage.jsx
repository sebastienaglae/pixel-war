import PixelBoardComponent from "@components/pixelBoard/PixelBoardComponent";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { useEffect, useState } from "react";

function BoardPage() {
  const data = {
    title: "My Board Page",
    date: "2025-09-01",
    delay: "5",
    mode: "no-overwrite",
  };
  const { id } = useParams(); // Access id from URL
    const [timer, setTimer] = useState("");

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

  return (
    <Container className='my-5'>
      <h2 className='text-center mb-5'>{data.title}</h2>
      <p className='text-center'>Temps restant: {timer}</p>
      <PixelBoardComponent id={id} />
    </Container>
  );
}

export default BoardPage;
