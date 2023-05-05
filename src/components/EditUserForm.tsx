import { useContext } from "react";
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
import UserContext from "../context/TableContext";

const EditUserForm = () => {
  const {
    isSubmitting,
    handleEditSubmit,
    setFullName,
    setUsername,
    setEmail,
    role,
    setRole,
    selectedAvatar,
    handleAvatarChange,
    username,
    fullName,
    email,
  } = useContext(UserContext);

  return (
    <div>
      <Box component={"form"} onSubmit={handleEditSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Full Name"
            variant="outlined"
            size="small"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            size="small"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            value={email}
            size="small"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormControl>
            <InputLabel>Role</InputLabel>
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
        <Button
          type="submit"
          variant="contained"
          className="form-button"
          disabled={isSubmitting}
        >
          Edit User
        </Button>
      </Box>
    </div>
  );
};

export default EditUserForm;
