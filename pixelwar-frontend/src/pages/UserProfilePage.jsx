import React,{ useState, useEffect, useMemo } from "react";
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, CardImg, Input, Label, Button } from "reactstrap";

const UserProfilePage = () => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [totalPixels, setTotalPixels] = useState(0);
    const [darkTheme, setDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
    }, [darkTheme]);

    const handleThemeToggle = () => {
        setDarkTheme(!darkTheme);
      };
      
    const handleEditClick = () => {
        setIsEditing(!isEditing);
      };
    
    const userBoards = useMemo(() => [
        { id: 1, idUser: 1, title: "Board 1", dateCreated: "2022-04-01", status: "In Progress", pixelsNumber: 543, previewImage: "https://via.placeholder.com/150" },
        { id: 2, idUser: 1, title: "Board 2", dateCreated: "2022-04-02", status: "Finished", pixelsNumber: 128, previewImage: "https://via.placeholder.com/150" },
        { id: 3, idUser: 1, title: "Board 3", dateCreated: "2022-04-03", status: "In Progress", pixelsNumber: 630, previewImage: "https://via.placeholder.com/150" },
        { id: 4, idUser: 1, title: "Board 4", dateCreated: "2022-04-04", status: "Finished", pixelsNumber: 497, previewImage: "https://via.placeholder.com/150" },
        { id: 5, idUser: 1, title: "Board 5", dateCreated: "2022-04-05", status: "In Progress", pixelsNumber: 252, previewImage: "https://via.placeholder.com/150" }
    ], []);
    
    useEffect(() => {
        const calculateTotalPixels = () => {
            const total = userBoards.reduce((accumulator, board) => accumulator + board.pixelsNumber, 0);
            setTotalPixels(total);
        };

        calculateTotalPixels();
    }, [userBoards]);

    const userData = {
        username: "username",
        email: "user@example.com",
        bio: "This is a user bio",
        profileImage: "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
    };

    return (
        <div className={`container mt-4 ${darkTheme ? 'dark-mode' : 'light-mode'}`}>
            <Row>
                <Col xs="auto">
                    <Card className={`profile-card ${darkTheme ? 'dark' : ''}`} style={{width:'300px'}}> 
                        <CardHeader style={{ fontWeight: 'bold' }}>{userData.username}</CardHeader>
                        <CardBody>
                            <img src={userData.profileImage} alt="Profile" className="rounded-circle mb-3" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                            <CardTitle><div style={{ fontWeight: 'bold' }}>Nom d&apos;utilisateur</div>
                                {isEditing ? (
                                <Input
                                type="text"
                                defaultValue={userData.username}
                                name="username"
                                id="username"
                                required
                                />
                                ) : (
                                <CardText>{userData.username}</CardText>
                                )}
                            </CardTitle>
                            <CardText><div style={{ fontWeight: 'bold' }}>Email</div>
                                {isEditing ? (
                                <Input
                                    type="text"
                                    defaultValue={userData.email}
                                    name="email"
                                    id="email"
                                    required
                                />
                                ) : (
                                <CardText>{userData.email}</CardText>
                                )}
                            </CardText>
                            <CardText><div style={{ fontWeight: 'bold' }}>Bio</div>
                                {isEditing ? (
                                <Input
                                    type="text"
                                    defaultValue={userData.bio}
                                    name="bio"
                                    id="bio"
                                    required
                                />
                                ) : (
                                <CardText>{userData.bio}</CardText>
                                )}
                            </CardText>
                            <CardText><div style={{ fontWeight: 'bold' }}>Theme</div>
                                <div>
                                    <Label check>
                                    <Input type="checkbox" checked={darkTheme} onChange={handleThemeToggle} />{' '}
                                    {darkTheme ? 'Light Theme' : 'Dark Theme'}
                                    </Label>
                                </div>
                            </CardText>
                            <div style={{ display: 'flex', justifyContent: 'flex-left' }}>
                            <Button onClick={handleEditClick}>{isEditing ? "Save" : "Edit Profile"}</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col sm={8} style={{ width: 'calc(100% - 324px)', marginBottom: '20px' }}>
                    <Card className={`boards-card ${darkTheme ? 'dark' : ''}`}>
                        <CardHeader style={{ fontWeight: 'bold' }}>PixelBoards</CardHeader>
                        <Col sm={4} style={{paddingTop:'8px',paddingLeft: '16px'}}>
                            <Card className="my-2" color="background-secondary" style={{ width: '18rem' }}>
                                <CardHeader style={{borderRadius:'5px',backgroundColor: darkTheme ? '#32464D' : '' }}><div style={{ fontWeight: 'bold', color: darkTheme ? '#ffffff' : '#000000' }}>Total Pixels: {totalPixels}</div></CardHeader>
                            </Card>
                        </Col>
                        <CardBody>
                            <Row>
                                {userBoards.map(board => (
                                <Col sm={4} key={board.id} >
                                    <Card className={`board-card ${darkTheme ? 'dark' : ''}`} style={{ maxWidth: '18rem', marginBottom: '20px', backgroundColor: darkTheme ? '#32464D' : '' }}>
                                        <CardImg src= "https://picsum.photos/300/200" alt="Board Preview" />
                                        <CardBody>
                                            <CardTitle tag="h5">{board.title}</CardTitle>
                                            <CardText>Date Created: {board.dateCreated}</CardText>
                                            <CardText>Number of Pixels: {board.pixelsNumber}</CardText>
                                            <CardText>Status: {board.status}</CardText>
                                            <Button>View Board</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                ))}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default UserProfilePage;
