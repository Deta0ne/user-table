import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import "../css/AddUserForm.css";
import { User } from "../types/User";

const AddUserForm = () => {
  //User State
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // Rol State
  const [role, setRole] = React.useState<string>("");

  // Avatar State
  const [selectedAvatar, setSelectedAvatar] = React.useState("");
  const handleAvatarChange = (
    event: React.MouseEvent<HTMLElement>,
    newAvatar: string
  ) => {
    setSelectedAvatar(newAvatar);
  };
  //Add User Submit
  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      fullName: fullName,
      username: username,
      email: email,
      role: role,
      avatar: selectedAvatar,
    };
    try {
      const { data } = await axios.post("http://localhost:3000/users", newUser);
      console.log(data);
    } catch (error) {
      console.log("Kullanıcı Oluşturulamadı");
    }
  };

  return (
    <div>
      <Box component={"form"} onSubmit={handleAddSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Full Name"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <TextField
            label="Username"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormControl>
            <InputLabel>Rol</InputLabel>
            <Select
              label="Age"
              size="small"
              value={role}
              onChange={(e: SelectChangeEvent) => {
                setRole(e.target.value as string);
              }}
            >
              <MenuItem value={"Contributor"}>Contributor</MenuItem>
              <MenuItem value={"Subscriber"}>Subscriber</MenuItem>
              <MenuItem value={"Author"}>Author</MenuItem>
              <MenuItem value={"Administrator"}>Administrator</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <FormLabel>Select Avatar</FormLabel>
          <ToggleButtonGroup
            value={selectedAvatar}
            exclusive
            onChange={handleAvatarChange}
            aria-label="avatar selection"
          >
            {Array.from({ length: 6 }, (_, i) => i + 1).map((avatarIndex) => (
              <ToggleButton
                key={`Avatar${avatarIndex}`}
                value={`Avatar${avatarIndex}`}
                aria-label={`Avatar${avatarIndex}`}
                className={`avatar-button${
                  selectedAvatar === `Avatar${avatarIndex}`
                    ? " avatar-button-selected"
                    : ""
                }`}
              >
                <img
                  src={`/src/assets/Avatar${avatarIndex}.png`}
                  alt={`Avatar${avatarIndex}`}
                  className="avatar-image"
                />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        <Button type="submit" variant="contained" className="form-button">
          Create User
        </Button>
      </Box>
    </div>
  );
};

export default AddUserForm;
