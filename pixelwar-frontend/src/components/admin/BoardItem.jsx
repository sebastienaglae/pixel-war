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
import { useRequest } from "@hooks/api";
import { useEffect } from "react";

function BoardItem({ data, onDelete }) {
  let navigate = useNavigate();
  const { execute, success } = useRequest(`/boards/${data.id}`, {}, "delete");
  const handleDownload = () => {
    downloadImage(`/boards/${data.id}/thumbnail`);
  };

  const handleView = () => {
    navigate(`/board/${data.id}`);
  };

  const handleEdit = () => {
    navigate(`/admin/board/edit/${data.id}`);
  };

  const handleDelete = () => {
    execute();
  };

  useEffect(() => {
    if (success) {
      onDelete(data.id);
    }
  }, [success]);

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
        src={asset("/boards/" + data.id + "/thumbnail")}
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
          Dernière modification le {new Date(data.startAt).toLocaleDateString()}{" "}
          par {data.owner.nickname}
        </CardFooter>
      </div>
    </Card>
  );
}

export default BoardItem;
