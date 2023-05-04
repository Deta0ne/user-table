import React, { useState, useEffect } from "react";
import {
  Avatar,
  Stack,
  Paper,
  Button,
  IconButton,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import Vector from "../assets/Button.png";
import axios from "axios";
import { User } from "../types/User";
//Dialog İmport
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//Tab İmport
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
//Icons İmport
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckBox } from "@mui/icons-material";
import AddUserForm from "./AddUserForm";

const DataTable = () => {
  //Tab and role filter
  const [tabValue, setTabValue] = useState("all");
  //Add User Form Dialog
  const [openAddDialog, setopenAddDialog] = useState(false);
  const handleAddClickOpen = () => {
    setopenAddDialog(true);
  };
  const handleAddClose = () => {
    setopenAddDialog(false);
  };
  //Fetch Users
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:3000/users");
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // Search User
  const [searched, setSearched] = useState<string>("");
  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);
  };
  const filteredUsers = users.filter((user: User) => {
    return (
      user.email.toLowerCase().includes(searched.toLowerCase()) ||
      user.username.toLowerCase().includes(searched.toLowerCase())
    );
  });

  //Add users to table
  const userRows = filteredUsers.map((user: User) => (
    <TableRow key={user.id}>
      <TableCell>
        <CheckBox />
      </TableCell>
      <TableCell>
        <Avatar src={user.avatar ? `/src/assets/${user.avatar}.png` : ""} />
      </TableCell>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        {/* Düzenleme işlemini burada gerçekleştirebilirsiniz */}
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <Paper>
        <Stack direction={"row"}>
          <Button
            variant="text"
            sx={{
              background: `url(${Vector})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <Typography>Users</Typography>
          <TabContext value={tabValue}>
            <TabList>
              <Tab label="All" value="all" />
              <Tab label="Contributor" value="contributor" />
              <Tab label="Author" value="author" />
              <Tab label="Administrator" value="administrator" />
              <Tab label="Subscriber" value="subscriber" />
            </TabList>
          </TabContext>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddClickOpen}
          >
            Add New User
          </Button>
        </Stack>
        <Divider />
        <Stack direction={"row"}>
          <TextField
            value={searched}
            onChange={(e) => requestSearch(e.target.value)}
            variant="standard"
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
          <IconButton
            onClick={() => {
              setSearched("");
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Button variant="text">Delete</Button>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <CheckBox />
                </TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{userRows}</TableBody>
          </Table>
        </TableContainer>
        <Stack>
          <Pagination />
        </Stack>
        <Dialog open={openAddDialog} onClose={handleAddClose}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <AddUserForm />
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
};

export default DataTable;
