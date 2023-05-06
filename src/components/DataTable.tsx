import { useEffect, useContext } from "react";
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
import EditUserForm from "./EditUserForm";

const DataTable = () => {
  const {
    fetchUsers,
    tabValue,
    handleAddClose,
    handleAddClickOpen,
    openAddDialog,
    requestSearch,
    searched,
    setSearched,
    checkedUsers,
    setCheckedUsers,
    selectAll,
    handleSelectAll,
    page,
    rowsPerPage,
    handleChangePage,
    deleteUser,
    deleteSelectedUsers,
    handleTabChange,
    searchedUsers,
    filteredUsersByRole,
    openEditDialog,
    handleEditClickOpen,
    handleEditClose,
  } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  //Add users to table
  const userRows = filteredUsersByRole
    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    .map((user: User) => (
      <TableRow key={user.id}>
        <TableCell padding="checkbox" sx={{ paddingLeft: "0" }}>
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
          <Avatar
            variant="rounded"
            src={user.avatar ? `/src/assets/${user.avatar}.png` : ""}
          />
        </TableCell>
        <TableCell>{user.fullName}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell
          sx={{
            paddingLeft: "10 !important",
            paddingRight: "0",
            width: "100px",
          }}
        >
          <IconButton onClick={() => user.id && deleteUser(user.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => user.id && handleEditClickOpen(user.id)}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      <Paper sx={{ width: "1076px", height: "1000px" }}>
        <Stack direction={"row"}>
          <Button
            variant="text"
            sx={{
              background: `url(${Vector})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              marginTop: "6px",
              width: "35px",
              height: "35px",
            }}
          />
          <Typography sx={{ marginTop: "11px" }}>Users</Typography>
          <TabContext value={tabValue}>
            <TabList
              sx={{
                marginLeft: "180px",
                marginRight: "100px",
              }}
              onChange={handleTabChange}
            >
              <Tab
                sx={{ textTransform: "none" }}
                label="All Users"
                value="all"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Contributor"
                value="contributor"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Author"
                value="author"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Administrator"
                value="administrator"
              />
              <Tab
                sx={{ textTransform: "none" }}
                label="Subscriber"
                value="subscriber"
              />
            </TabList>
          </TabContext>
          <Button
            sx={{
              my: "10px",
              height: "40px",
              width: "145px",
              textTransform: "none",
              marginLeft: "10px",
            }}
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddClickOpen}
          >
            Add New User
          </Button>
        </Stack>
        <Divider />
        <Stack sx={{ py: "20px", paddingLeft: "23px" }} direction={"row"}>
          <TextField
            sx={{ marginRight: "700px", paddingTop: "6px" }}
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
          <Button variant="text" color="inherit" onClick={deleteSelectedUsers}>
            Delete
          </Button>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead sx={{ background: "#F5F5F7" }}>
              <TableRow>
                <TableCell sx={{ paddingLeft: "0" }}>
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
        <Stack spacing={2} py={2} sx={{ marginLeft: "500px !important" }}>
          <Pagination
            defaultPage={1}
            count={Math.ceil(searchedUsers.length / rowsPerPage)}
            shape="rounded"
            size="small"
            color="primary"
            page={page + 1}
            onChange={handleChangePage}
          />
        </Stack>
        <Dialog open={openAddDialog} onClose={handleAddClose}>
          <DialogContent>
            <AddUserForm />
          </DialogContent>
        </Dialog>
        <Dialog open={openEditDialog} onClose={handleEditClose}>
          <DialogContent>
            <EditUserForm />
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
};

export default DataTable;
