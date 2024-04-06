import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Container } from "reactstrap";
import UserInfo from "@components/profile/UserInfo";
import BoardGrid from "@components/profile/BoardGrid";

const UserProfilePage = () => {
  const [totalPixels, setTotalPixels] = useState(0);

  const userBoards = useMemo(
    () => [
      {
        id: 1,
        idUser: 1,
        title: "Board 1",
        dateCreated: "2022-04-01",
        status: "In Progress",
        pixelsNumber: 543,
        previewImage: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        idUser: 1,
        title: "Board 2",
        dateCreated: "2022-04-02",
        status: "Finished",
        pixelsNumber: 128,
        previewImage: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        idUser: 1,
        title: "Board 3",
        dateCreated: "2022-04-03",
        status: "In Progress",
        pixelsNumber: 630,
        previewImage: "https://via.placeholder.com/150",
      },
      {
        id: 4,
        idUser: 1,
        title: "Board 4",
        dateCreated: "2022-04-04",
        status: "Finished",
        pixelsNumber: 497,
        previewImage: "https://via.placeholder.com/150",
      },
      {
        id: 5,
        idUser: 1,
        title: "Board 5",
        dateCreated: "2022-04-05",
        status: "In Progress",
        pixelsNumber: 252,
        previewImage: "https://via.placeholder.com/150",
      },
    ],
    []
  );

  useEffect(() => {
    const calculateTotalPixels = () => {
      const total = userBoards.reduce(
        (accumulator, board) => accumulator + board.pixelsNumber,
        0
      );
      setTotalPixels(total);
    };

    calculateTotalPixels();
  }, [userBoards]);

  const userData = {
    username: "username",
    email: "user@example.com",
    bio: "This is a user bio",
    profileImage:
      "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg",
  };

  return (
    <Container className='mt-4'>
      <Row className='g-4 '>
        <Col md='12' xl='auto' className='d-flex flex-row h-100 justify-content-center'>
          <UserInfo userData={userData} loading={false} />
        </Col>
        <Col sm='12' md>
          <BoardGrid userBoards={userBoards} totalPixels={totalPixels} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
