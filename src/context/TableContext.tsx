import React, { createContext, useState } from "react";
import axios from "axios";
import { User } from "../types/User";
import { UserContextType } from "../types/UserContextType";

const UserContext = createContext<UserContextType>({} as UserContextType);

function Provider({ children }: any) {
  //DataTable
  //Delete User
  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    fetchUsers();
  };
  const deleteSelectedUsers = async () => {
    for (const id of checkedUsers) {
      await deleteUser(id);
    }
    setCheckedUsers(new Set());
    setSelectAll(false);
  };

  // Pagintaiton
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage] = useState<number>(10);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage - 1);
  };

  //Checkbox
  const [checkedUsers, setCheckedUsers] = useState(new Set<number>());
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedUsers(new Set());
    } else {
      const newCheckedUsers = new Set<number>();
      const currentPageUsers = filteredUsersByRole.slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
      );
      currentPageUsers.forEach((user) => {
        if (user.id) {
          newCheckedUsers.add(user.id);
        }
      });
      setCheckedUsers(newCheckedUsers);
    }
    setSelectAll(!selectAll);
  };

  //Tab and role filter
  const [tabValue, setTabValue] = useState("all");
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setPage(0);
    setTabValue(newValue);
  };
  const filterByRole = (user: User) => {
    return (
      tabValue === "all" || user.role.toLowerCase() === tabValue.toLowerCase()
    );
  };
  //Add User Form Dialog
  const [openAddDialog, setopenAddDialog] = useState(false);
  const handleAddClickOpen = () => {
    setopenAddDialog(true);
  };
  const handleAddClose = () => {
    setopenAddDialog(false);
  };
  //Fetch Users
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:3000/users");
    setUsers(data);
  };
  // Search User
  const [searched, setSearched] = useState<string>("");
  const requestSearch = (searchedVal: string) => {
    setPage(0);
    setSearched(searchedVal);
  };

  const searchedUsers = users.filter((user: User) => {
    return (
      user.email.toLowerCase().includes(searched.toLowerCase()) ||
      user.username.toLowerCase().includes(searched.toLowerCase())
    );
  });
  const filteredUsersByRole = searchedUsers.filter(filterByRole);

  //AddUserForm
  //User State
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // Rol State
  const [role, setRole] = React.useState<string>("");

  // Avatar State
  const [selectedAvatar, setSelectedAvatar] = React.useState("");
  const handleAvatarChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAvatar: string
  ) => {
    setSelectedAvatar(newAvatar);
  };
  //Add User Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newUser: User = {
      fullName: fullName,
      username: username,
      email: email,
      role: role,
      avatar: selectedAvatar,
    };
    try {
      const { data } = await axios.post("http://localhost:3000/users", newUser);
      setUsers((prevUsers) => [...prevUsers, data]);
      handleAddClose();
    } catch (error) {
      console.log("Kullanıcı Oluşturulamadı");
    } finally {
      setIsSubmitting(false);
    }
  };
  //User Edit Form
  //Edit User Form Dialog
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [editId, setEditId] = useState(Number);
  const handleEditClickOpen = (id: number) => {
    setEditId(id);
    const user = users.find((user) => user.id === id);
    if (user) {
      setFullName(user.fullName);
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
      setSelectedAvatar(user.avatar);
    }
    setopenEditDialog(true);
  };
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const editedUser: User = {
      fullName: fullName,
      username: username,
      email: email,
      role: role,
      avatar: selectedAvatar,
    };
    try {
      const { data } = await axios.put(
        `http://localhost:3000/users/${editId}`,
        editedUser
      );
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        const index = newUsers.findIndex((user) => user.id === editedUser.id);
        newUsers[index] = data;
        return newUsers;
      });
      handleEditClose();
    } catch (error) {
      console.log("Kullanıcı Düzenlenemedi");
    } finally {
      setIsSubmitting(false);
      fetchUsers();
    }
  };

  const handleEditClose = () => {
    setopenEditDialog(false);
  };

  //Paylaşılanlar
  const sharedValuesAndMethods: UserContextType = {
    username,
    fullName,
    email,
    setSelectedAvatar,
    setUsers,
    handleEditSubmit,
    tabValue,
    openAddDialog,
    handleAddClickOpen,
    handleAddClose,
    fetchUsers,
    handleAddSubmit,
    setFullName,
    setUsername,
    setEmail,
    role,
    setRole,
    selectedAvatar,
    handleAvatarChange,
    isSubmitting,
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
    filterByRole,
    handleTabChange,
    filteredUsersByRole,
    searchedUsers,
    openEditDialog,
    handleEditClickOpen,
    handleEditClose,
  };
  return (
    <UserContext.Provider value={sharedValuesAndMethods}>
      {children}
    </UserContext.Provider>
  );
}

export { Provider };
export default UserContext;
