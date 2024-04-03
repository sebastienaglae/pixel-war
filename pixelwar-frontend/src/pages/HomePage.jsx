import React,{ useState } from "react";
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Button, Carousel, CarouselItem, CarouselControl } from "reactstrap";

function HomePage() {

    const [activeIndexLatest, setActiveIndexLatest] = useState(0);
    const [activeIndexFinished, setActiveIndexFinished] = useState(0);
    const itemsPerPage = 3

    const nextLatest = () => {
        setActiveIndexLatest(prevIndex => (prevIndex + 1) % Math.ceil(latestBoards.length / itemsPerPage));
    };

    const previousLatest = () => {
        setActiveIndexLatest(prevIndex => (prevIndex === 0 ? Math.ceil(latestBoards.length / itemsPerPage) - 1 : prevIndex - 1));
    };
    
    const nextFinished = () => {
        setActiveIndexFinished(prevIndex => (prevIndex + 1) % Math.ceil(finishedBoards.length / itemsPerPage));
    };
    
    const previousFinished = () => {
        setActiveIndexFinished(prevIndex => (prevIndex === 0 ? Math.ceil(finishedBoards.length / itemsPerPage) - 1 : prevIndex - 1));
    };

    const latestBoards = [
        { id: 1, title: "Board 1", description: "Description of board 1" },
        { id: 2, title: "Board 2", description: "Description of board 2" },
        { id: 3, title: "Board 3", description: "Description of board 3" },
        { id: 4, title: "Board 4", description: "Description of board 4" },
        { id: 5, title: "Board 5", description: "Description of board 5" },
        { id: 6, title: "Board 6", description: "Description of board 6" },
        { id: 7, title: "Board 7", description: "Description of board 7" },
        { id: 8, title: "Board 8", description: "Description of board 8" },
        { id: 9, title: "Board 9", description: "Description of board 9" },
        { id: 10, title: "Board 10", description: "Description of board 10" },
        { id: 11, title: "Board 11", description: "Description of board 11" }
    ];

    const finishedBoards = [
        { id: 6, title: "Board 1", description: "Description of finished board 1" },
        { id: 7, title: "Board 2", description: "Description of finished board 2" },
        { id: 8, title: "Board 3", description: "Description of finished board 3" },
        { id: 9, title: "Board 4", description: "Description of finished board 4" },
        { id: 10, title: "Board 5", description: "Description of finished board 5" },
        { id: 11, title: "Board 6", description: "Description of finished board 6" },
        { id: 12, title: "Board 7", description: "Description of finished board 7" },
        { id: 13, title: "Board 8", description: "Description of finished board 8" }
    ];

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
            <Carousel 
                activeIndex={activeIndexLatest} 
                next={nextLatest} 
                previous={previousLatest}
                interval={3000}
            >
                {/* <CarouselIndicators items={latestBoards} activeIndex={activeIndex} onClickHandler={setActiveIndex} /> */}
                {Array.from({ length: Math.ceil(latestBoards.length / itemsPerPage) }).map((_, index) => (
                    <CarouselItem key={index}>
                        <Row className="justify-content-center">
                        {latestBoards.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage).map((item, itemIndex) => (
                            <Col xs="auto" key={itemIndex} className="d-flex justify-content-center">
                                <Card style={{ width: '18rem', backgroundColor: 'black', marginBottom: '10px'}}>
                                    <img alt="Sample" src="https://picsum.photos/300/200" />
                                    <CardBody>
                                        <CardTitle tag="h5">{item.title}</CardTitle>
                                        <CardText>{item.description}</CardText>
                                        <Button>Open</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        </Row>
                    </CarouselItem>
                ))}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previousLatest} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={nextLatest} />
            </Carousel>


            {/* Third row finished boards*/}
            <h3 className="text-center">Finished Boards</h3>
            <Carousel 
                activeIndex={activeIndexFinished} 
                next={nextFinished} 
                previous={previousFinished} 
                interval={5000}>
                {Array.from({ length: Math.ceil(finishedBoards.length / itemsPerPage) }).map((_, index) => (
                    <CarouselItem key={index}>
                        <Row className="justify-content-center">
                            {finishedBoards.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage).map((item, itemIndex) => (
                                <Col xs="auto" key={itemIndex} className="d-flex justify-content-center">
                                    <Card style={{ width: '18rem', backgroundColor: 'black', marginBottom: '10px' }}>
                                        <img alt="Sample" src="https://picsum.photos/300/200" />
                                        <CardBody>
                                            <CardTitle tag="h5">{item.title}</CardTitle>
                                            <CardText>{item.description}</CardText>
                                            <Button>Open</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </CarouselItem>
                ))}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previousFinished} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={nextFinished} />
            </Carousel>
        </div>
    );
}

export default HomePage;
