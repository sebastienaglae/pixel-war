import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  CardTitle,
  CardImg,
} from "reactstrap";
import { asset, downloadImage } from "@hooks/api";

function BoardItem({ data }) {
  let navigate = useNavigate();
  const handleDownload = () => {
    downloadImage(`/boards/${data.id}/thumbnail`);
  };

  const handleView = () => {
    navigate(`/board/${data.id}`);
  };

  const actions = [
    {
      color: "warning",
      label: "Télécharger",
      onClick: handleDownload,
    },
    {
      color: "success",
      label: "Voir",
      onClick: handleView,
    },
  ];

  return (
    <Card className='d-flex flex-row' color='dark' text='white'>
      <CardImg
        variant='left'
        src={asset("/boards/" + data.id + "/thumbnail")}
        alt='random'
        style={{ objectFit: "cover", width: "200px" }}
        className='rounded-start'
      />
      <div className='d-flex flex-column w-100'>
        <CardHeader>
          <CardTitle>
            [{data.status === "ended" ? "Terminé": "En cours"}] {data.name}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{data.description}</CardText>
          <div className='mt-2 d-flex justify-content-end'>
            {actions.map((action, index) => (
              <Button
                key={index}
                color={action.color}
                onClick={action.onClick}
                className='ms-2'
              >
                {action.label}
              </Button>
            ))}
          </div>
        </CardBody>
        <CardFooter color='text-muted'>
          Démarré le {new Date(data.startAt).toLocaleDateString()} par{" "}
          {data.owner.nickname}
        </CardFooter>
      </div>
    </Card>
  );
}

export default BoardItem;
