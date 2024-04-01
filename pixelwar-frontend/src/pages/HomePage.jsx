import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, CardText } from "reactstrap";


function HomePage() {

    const [registeredUsers, setRegisteredUsers] = useState(0);
    const [pixelBoardsCreated, setPixelBoardsCreated] = useState(0);
    const [latestInProgress, setLatestInProgress] = useState([]);
    const [latestCompleted, setLatestCompleted] = useState([]);

    useEffect(() => {
        // Simulated data
        const simulatedRegisteredUsers = 1000;
        const simulatedPixelBoardsCreated = 50;
        const simulatedLatestInProgress = [
            { id: 1, author: "Ernesto98", creationDate: "28.02.2024"},
            { id: 2, author: "MikeMike", creationDate: "02.03.2024"},
            { id: 3, author: "Seb", creationDate: "15.03.2024"},
            { id: 4, author: "HunnyBunny", creationDate: "27.03.2024"}
        ];
        const simulatedLatestCompleted = [
            { id: 5, author: "Banana582893", creationDate: "17.01.2024"},
            { id: 6, author: "ToTo", creationDate: "30.01.204"},
            { id: 7, author: "Madame_84920", creationDate: "18.03.2024"},
            { id: 7, author: "Anonym007", creationDate: "30.03.2024"}
        ];

        setRegisteredUsers(simulatedRegisteredUsers);
        setPixelBoardsCreated(simulatedPixelBoardsCreated);
        setLatestInProgress(simulatedLatestInProgress);
        setLatestCompleted(simulatedLatestCompleted);
    }, []);

    return (  
        <div >
            <h1 style={{ margin: '10px', textAlign: 'center'}}>Create you own PixelBoard!</h1>
            <div>
                <p style={{ margin: '10px' }}>Number of registered users: {registeredUsers}</p>
                <p style={{ margin: '10px' }}>Number of PixelBoards created: {pixelBoardsCreated}</p>
            </div>
            <h2 style={{ margin: '10px', textAlign: 'center' }}>Latest PixelBoards in Progress:</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {latestInProgress.map(board => (
                    <Card key={board.id} style={{ margin: '0 10px' }}>
                        <img alt="Sample" src="https://picsum.photos/300/200"/>
                        <CardBody>
                            <CardTitle>Author: {board.author}</CardTitle>
                            <CardText>Creation Date: {board.creationDate}</CardText>
                            <CardText>This PixelBoard is in progress.</CardText>
                            <Button>Open</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
            <h2 style={{ margin: '10px', textAlign: 'center' }}>Latest Completed PixelBoards:</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {latestCompleted.map(board => (
                    <Card key={board.id} style={{ margin: '0 10px' }}>
                        <img alt="Sample" src="https://picsum.photos/300/200"/>
                        <CardBody>
                            <CardTitle>Author: {board.author}</CardTitle>
                            <CardText>Creation Date: {board.creationDate}</CardText>
                            <CardText>This PixelBoard is completed.</CardText>
                            <Button>Open</Button>
                        </CardBody>
                    </Card>
                ))}
            </div>
            {/* <Button color="primary">Primary</Button> */}
        </div>
    );
}

export default HomePage;