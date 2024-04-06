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

function BoardItem({ data }) {
  let navigate = useNavigate();

  const handleDownload = () => {
    console.log("Download action");
  };

  const handleView = () => {
    console.log("View action");
    navigate(`/board/${data.id}`);
  };

  const handleEdit = () => {
    console.log("Edit action");
    navigate(`/admin/board/edit/${data.id}`);
  };

  const handleDelete = () => {
    console.log("Delete action");
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
    {
      color: "primary",
      label: "Modifier",
      onClick: handleEdit,
    },
    {
      color: "danger",
      label: "Supprimer",
      onClick: handleDelete,
    },
  ];

  return (
    <Card className='d-flex flex-row' color='dark' text='white'>
      <CardImg
        variant='left'
        src={data.image || "https://picsum.photos/200"}
        alt='random'
        style={{ objectFit: "cover", width: "200px" }}
        className='rounded-start'
      />
      <div className='d-flex flex-column w-100'>
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>{data.description}</CardText>
          <div className='mt-2 d-block justify-content-end'>
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
          Dernière modification le {new Date(data.date).toLocaleDateString()}{" "}
          par {data.author}
        </CardFooter>
      </div>
    </Card>
  );
}

export default BoardItem;
