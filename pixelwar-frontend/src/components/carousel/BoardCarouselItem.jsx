import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Placeholder,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function BoardCarouselItem({ item, loading = true }) {
  const navigate = useNavigate();
  const onCardClick = () => {
    navigate(`/board/${item.id}`);
  };
  return (
    <Card
      style={{
        width: "18rem",
      }}
      color='dark'
    >
      <img
        alt='Sample'
        src={item.image}
        className='w-100'
        style={{ height: "200px", objectFit: "cover" }}
      />
      <CardBody>
        <CardTitle tag='h5'>
          <Placeholder animation={loading ? null : "glow"}>
            <span>{item.title}</span>
          </Placeholder>
        </CardTitle>
        <CardText>
          <Placeholder animation={loading ? null : "glow"}>
            <span>{item.description}</span>
          </Placeholder>
        </CardText>
        <Button color='primary' onClick={onCardClick} disabled={loading}>
          Voir
        </Button>
      </CardBody>
    </Card>
  );
}

export default BoardCarouselItem;
