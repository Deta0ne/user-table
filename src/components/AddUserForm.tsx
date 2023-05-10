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

const AddUserForm = () => {
  const {
    isSubmitting,
    handleAddSubmit,
    setFullName,
    setUsername,
    setEmail,
    setRole,
    selectedAvatar,
    handleAvatarChange,
  } = useContext(UserContext);

  return (
    <div>
      <Box
        sx={{
          width: "300px",
          height: "600px",
        }}
        component={"form"}
        onSubmit={handleAddSubmit}
      >
        <Stack sx={{ paddingTop: "18px" }} spacing={4}>
          <TextField
            required={true}
            label="Full Name"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <TextField
            required={true}
            label="Username"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            required={true}
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
              required={true}
              className="formControl"
              label="Age"
              size="small"
              onChange={(e: SelectChangeEvent) => {
                setRole(e.target.value as string);
              }}
            >
              <MenuItem value={"Contributor"}>Contributor</MenuItem>
              <MenuItem value={"Subscriber"}>Subscriber</MenuItem>
              <MenuItem value={"Author"}>Author</MenuItem>
              <MenuItem value={"Administrator"}>Administrator</MenuItem>
              <MenuItem value={"Editor"}>Editor</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <FormLabel
            sx={{
              marginTop: "200px",
              marginBottom: "10px",
            }}
          >
            Select Avatar
          </FormLabel>
          <ToggleButtonGroup
            value={selectedAvatar}
            exclusive
            onChange={handleAvatarChange}
            aria-label="avatar selection"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
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
                sx={{
                  marginLeft: "12px",
                  marginRight: "12px",
                }}
              >
                <img
                  src={`/Avatar${avatarIndex}.png`}
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
          Create User
        </Button>
      </Box>
    </div>
  );
};

export default AddUserForm;
