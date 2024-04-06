import { useState, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Label,
  CardGroup,
  Placeholder,
} from "reactstrap";
import EditableField from "./EditableField";
import { ThemeContext } from "@contexts/ThemeContext";

function UserInfo({ userData, loading = true }) {
  const [isEditing, setIsEditing] = useState(false);
  const { theme, setTheme, themePreference, setThemePreference } =
    useContext(ThemeContext);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    };
    
    const toggleThemePreference = () => {
        setThemePreference(themePreference === "auto" ? "user" : "auto");
    };

  const userInfoFields = [
    {
      title: "Nom d'utilisateur",
      value: userData.username,
      inputType: "text",
      inputName: "username",
    },
    {
      title: "Email",
      value: userData.email,
      inputType: "email",
      inputName: "email",
    },
    {
      title: "Bio",
      value: userData.bio,
      inputType: "text",
      inputName: "bio",
    },
  ];
  return (
    <Card color='background-secondary' style={{ width: "300px" }}>
      <CardHeader style={{ fontWeight: "bold" }}>
        <Placeholder animation={loading ? null : "wave"}>
          {userData.username}
        </Placeholder>
      </CardHeader>
      <CardBody>
        <img
          src={userData.profileImage}
          alt='Profile'
          className='rounded-circle mb-3'
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        {userInfoFields.map((field, index) => (
          <EditableField
            key={index}
            isEditing={isEditing}
            value={field.value}
            title={field.title}
            inputType={field.inputType}
            inputName={field.inputName}
            loading={loading}
          />
        ))}
        <CardGroup className='my-2 d-flex flex-column'>
          <div style={{ fontWeight: "bold" }}>Theme</div>
          <Label check>
            <Input
              type='checkbox'
              checked={theme == "dark"}
              onChange={toggleTheme}
            />{" "}
            {theme == "dark" ? "Theme Sombre" : "Theme Clair"}
          </Label>
          <Label check>
            <Input
              type='checkbox'
              checked={themePreference == "auto"}
              onChange={toggleThemePreference}
              disabled={loading}
            />{" "}
            {themePreference == "auto" ? "Automatique" : "Utilisateur"}
          </Label>
        </CardGroup>
        <div style={{ display: "flex", justifyContent: "flex-left" }}>
          <Button onClick={handleEditClick} disabled={loading}>
            {isEditing ? "Sauvegarder" : "Modifier"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default UserInfo;
