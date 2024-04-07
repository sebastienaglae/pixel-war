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
import { useRequest } from "@hooks/api";

function UserInfo({ userData, loading = true }) {
  const [isEditing, setIsEditing] = useState(false);
  const { theme, setTheme, themePreference, setThemePreference } =
    useContext(ThemeContext);
  const { success, execute } = useRequest("/users", {}, "put");

  const handleEditClick = () => {
    if (isEditing) {
      execute("/me", {
        data: userData,
      });
    }

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
      value: () => userData.nickname,
      inputType: "text",
      inputName: "nickname",
    },
    {
      title: "Email",
      value: () => userData.email,
      inputType: "email",
      inputName: "email",
    },
    {
      title: "Bio",
      value: () => userData.bio,
      inputType: "text",
      inputName: "bio",
    },
  ];
  return (
    <Card color='background-secondary' style={{ width: "300px" }}>
      <CardHeader style={{ fontWeight: "bold" }}>
        <Placeholder animation={loading ? null : "wave"}>
          {userData && userData.nickname}
        </Placeholder>
      </CardHeader>
      <CardBody>
        <img
          src='https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg'
          alt='Profile'
          className='rounded-circle mb-3'
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        {userData &&
          userInfoFields.map((field, index) => (
            <EditableField
              key={index}
              isEditing={isEditing}
              value={field.value()}
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
