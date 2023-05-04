import React from "react";
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const AddUserForm = () => {
  // Rol State
  const [role, setRole] = React.useState<string>("");
  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <div>
      <Box>
        <Stack>
          <TextField />
          <TextField />
          <TextField />
          <FormControl>
            <InputLabel>Rol</InputLabel>
            <Select
              label="Age"
              size="small"
              value={role}
              onChange={handleRoleChange}
            >
              <MenuItem value={"Contributor"}>Contributor</MenuItem>
              <MenuItem value={"Subscriber"}>Subscriber</MenuItem>
              <MenuItem value={"Author"}>Author</MenuItem>
              <MenuItem value={"Administrator"}>Administrator</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </div>
  );
};

export default AddUserForm;
