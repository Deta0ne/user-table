import { useState, useEffect, useContext } from "react";
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
  Checkbox,
} from "@mui/material";
import Vector from "../assets/Button.png";
import { User } from "../types/User";
import UserContext from "../context/TableContext";
//Dialog İmport
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
//Tab İmport
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
//Icons İmport
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddUserForm from "./AddUserForm";

const DataTable = () => {
  const {
    fetchUsers,
    users,
    setTabValue,
    tabValue,
    handleAddClose,
    handleAddClickOpen,
    openAddDialog,
    requestSearch,
    filteredUsers,
    searched,
    setSearched,
    checkedUsers,
    setCheckedUsers,
    selectAll,
    setSelectAll,
    handleSelectAll,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleChangePage,
    deleteUser,
    deleteSelectedUsers,
    filterByRole,
    handleTabChange,
  } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  //Add users to table
  const userRows = filteredUsers
    .filter(filterByRole)
    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    .map((user: User) => (
      <TableRow key={user.id}>
        <TableCell>
          <Checkbox
            checked={user.id ? checkedUsers.has(user.id) : false}
            onChange={() => {
              if (user.id) {
                const newCheckedUsers = new Set(checkedUsers);
                if (checkedUsers.has(user.id)) {
                  newCheckedUsers.delete(user.id);
                } else {
                  newCheckedUsers.add(user.id);
                }
                setCheckedUsers(newCheckedUsers);
              }
            }}
          />
        </TableCell>
        <TableCell>
          <Avatar src={user.avatar ? `/src/assets/${user.avatar}.png` : ""} />
        </TableCell>
        <TableCell>{user.fullName}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          <IconButton onClick={() => user.id && deleteUser(user.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
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
            <TabList onChange={handleTabChange}>
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
          <Button variant="text" onClick={deleteSelectedUsers}>
            Delete
          </Button>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
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
          <Pagination
            defaultPage={1}
            count={Math.ceil(filteredUsers.length / rowsPerPage)}
            shape="rounded"
            size="small"
            color="primary"
            page={page + 1}
            onChange={handleChangePage}
          />
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
