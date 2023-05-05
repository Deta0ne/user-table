import React, { createContext, useState } from "react";
import axios from "axios";
import { User } from "../types/User";

interface UserContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  tabValue: string;
  setTabValue: (value: string) => void;
  openAddDialog: boolean;
  handleAddClickOpen: () => void;
  handleAddClose: () => void;
  handleAddSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleAvatarChange: (
    e: React.MouseEvent<HTMLElement>,
    newAvatar: string
  ) => void;
  fetchUsers: () => Promise<void>;
  setFullName: (fullName: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  role: string;
  setRole: (role: string) => void;
  selectedAvatar: string;
  isSubmitting: boolean;
  requestSearch: (searchedVal: string) => void;
  searched: string;
  setSearched: (searched: string) => void;
  checkedUsers: Set<number>;
  setCheckedUsers: (checkedUsers: Set<number>) => void;
  selectAll: boolean;
  setSelectAll: (selectAll: boolean) => void;
  handleSelectAll: () => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  handleChangePage: (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => void;
  deleteUser: (id: number) => Promise<void>;
  deleteSelectedUsers: () => Promise<void>;
  filterByRole: (user: User) => boolean;
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  filteredUsersByRole: User[];
  searchedUsers: User[];
}
const UserContext = createContext<UserContextType>({} as UserContextType);

function Provider({ children }: any) {
  //DataTable
  //Delete User
  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    fetchUsers();
  };
  const deleteSelectedUsers = async () => {
    try {
      const deletePromises = Array.from(checkedUsers).map((userId) =>
        axios.delete(`http://localhost:3000/users/${userId}`)
      );
      await Promise.all(deletePromises);
      fetchUsers();
      setCheckedUsers(new Set());
      setSelectAll(false);
    } catch (error) {
      console.log("Seçili kullanıcılar silinemedi");
    }
  };

  // Pagintaiton
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
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
      searchedUsers.forEach((user) => {
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
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
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
    event: React.MouseEvent<HTMLElement>,
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

  //Paylaşılanlar
  const sharedValuesAndMethods: UserContextType = {
    users,
    setUsers,
    tabValue,
    setTabValue,
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
    filteredUsersByRole,
    searchedUsers,
  };
  return (
    <UserContext.Provider value={sharedValuesAndMethods}>
      {children}
    </UserContext.Provider>
  );
}

export { Provider };
export default UserContext;
