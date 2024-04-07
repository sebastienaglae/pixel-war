import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Container } from "reactstrap";
import UserInfo from "@components/profile/UserInfo";
import BoardGrid from "@components/profile/BoardGrid";
import { useApi } from "@hooks/api";

const UserProfilePage = () => {
  const [totalPixels, setTotalPixels] = useState(0);
  const { data: userData, loading: loadingUser } = useApi("/users/me");

  return (
    <Container className='mt-4'>
      <Row className='g-4 '>
        <Col
          md='12'
          xl='auto'
          className='d-flex flex-row h-100 justify-content-center'
        >
          <UserInfo userData={userData} loading={loadingUser} />
        </Col>
        <Col sm='12' md>
          <BoardGrid
            userBoards={userData}
            totalPixels={totalPixels}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
