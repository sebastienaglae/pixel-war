import { Card, CardHeader, CardBody, Placeholder } from "reactstrap";

function CardStat({ title, value, color, loading = true }) {
  return (
    <Card
      className='my-2 placeholder-glow'
      color={color}
      inverse
      style={{ width: "18rem" }}
    >
      <CardHeader className='text-white'>{title}</CardHeader>
      <CardBody>
        <Placeholder animation={loading ? null : "wave"} className='d-flex'>
          <span>{value}</span>
        </Placeholder>
      </CardBody>
    </Card>
  );
}

export default CardStat;
