import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Label,
  CardGroup,
  Placeholder,
  Form,
} from "reactstrap";
import EditableField from "./EditableField";
import { ThemeContext } from "@contexts/ThemeContext";
import { useRequest } from "@hooks/api";

function UserInfo({ userData, loading = true }) {
  const [isEditing, setIsEditing] = useState(false);
  const { theme, setTheme, themePreference, setThemePreference } =
    useContext(ThemeContext);
  const { success, execute } = useRequest("/users", {}, "put");
  const [formData, setFormData] = useState({}); // State to hold form data

  useEffect(() => {
    // Populate form data with user data initially
    if (userData) {
      setFormData({
        nickname: userData.nickname,
        email: userData.email,
        bio: userData.bio,
      });
    }
  }, [userData]);

  const handleEditClick = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log(formData);
      execute("/me", {
        method: "PUT",
        data: formData, // Send updated form data
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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const userInfoFields = [
    {
      title: "Nom d'utilisateur",
      value: formData.nickname || "",
      inputType: "text",
      inputName: "nickname",
    },
    {
      title: "Email",
      value: formData.email || "",
      inputType: "email",
      inputName: "email",
    },
    {
      title: "Bio",
      value: formData.bio || "",
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
              value={field.value}
              title={field.title}
              inputType={field.inputType}
              inputName={field.inputName}
              loading={loading}
              onChange={handleFieldChange} // Pass the onChange handler
            />
          ))}
        <Form onSubmit={handleEditClick}>
          <CardGroup className='my-2 d-flex flex-column'>
            <div style={{ fontWeight: "bold" }}>Theme</div>
            <Label check>
              <Input
                type='checkbox'
                checked={theme === "dark"}
                onChange={toggleTheme}
              />{" "}
              {theme === "dark" ? "Theme Sombre" : "Theme Clair"}
            </Label>
            <Label check>
              <Input
                type='checkbox'
                checked={themePreference === "auto"}
                onChange={toggleThemePreference}
                disabled={loading}
              />{" "}
              {themePreference === "auto" ? "Automatique" : "Utilisateur"}
            </Label>
          </CardGroup>
          <div style={{ display: "flex", justifyContent: "flex-left" }}>
            <Button type='submit' disabled={loading}>
              {isEditing ? "Sauvegarder" : "Modifier"}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}

export default UserInfo;
