import React from "react";
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button } from "reactstrap";

function HomePage() {
    return (
        <div>
            <h1 className="text-center">Home Page</h1>

            {/* First Row of Cards stats */}
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Card className="my-2" color="primary" inverse style={{ width: '18rem' }}>
                        <CardHeader className="text-white">Number of users</CardHeader>
                        <CardBody>156</CardBody>
                    </Card>
                </Col>

                <Col xs="auto">
                    <Card className="my-2" color="secondary" inverse style={{ width: '18rem' }}>
                        <CardHeader className="text-white">Number of Boards</CardHeader>
                        <CardBody>12</CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Second Row of Cards lastest. To map them later and maybe implement a carousel*/}
            <h3 className="text-center">Latest Boards</h3>
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Card style={{ width: '18rem', backgroundColor: 'black' }}>
                        <img alt="Sample" src="https://picsum.photos/300/200" />
                        <CardBody>
                            <CardTitle tag="h5">Card title second row?</CardTitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card‘s content.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="auto">
                    <Card style={{ width: '18rem', backgroundColor: 'black' }}>
                        <img alt="Sample" src="https://picsum.photos/300/200" />
                        <CardBody>
                            <CardTitle tag="h5">Card title</CardTitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card‘s content.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="auto">
                    <Card style={{ width: '18rem', backgroundColor: 'black' }}>
                        <img alt="Sample" src="https://picsum.photos/300/200" />
                        <CardBody>
                            <CardTitle tag="h5">Card title</CardTitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card‘s content.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* Third row finished boards*/}
            <h3 className="text-center">Finished Boards</h3>
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Card style={{ width: '18rem', backgroundColor: 'black' }}>
                        <img alt="Sample" src="https://picsum.photos/300/200" />
                        <CardBody>
                            <CardTitle tag="h5">Card title</CardTitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card‘s content.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="auto">
                    <Card style={{ width: '18rem', backgroundColor: 'black' }}>
                        <img alt="Sample" src="https://picsum.photos/300/200" />
                        <CardBody>
                            <CardTitle tag="h5">Card title</CardTitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card‘s content.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="auto">
                    <Card style={{ width: '18rem', backgroundColor: 'black' }}>
                        <img alt="Sample" src="https://picsum.photos/300/200" />
                        <CardBody>
                            <CardTitle tag="h5">Card title</CardTitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card‘s content.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default HomePage;
