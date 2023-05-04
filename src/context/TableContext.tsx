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
}
const UserContext = createContext<UserContextType>({} as UserContextType);

function Provider({ children }: any) {
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
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:3000/users");
    setUsers(data);
  };
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
  };
  return (
    <UserContext.Provider value={sharedValuesAndMethods}>
      {children}
    </UserContext.Provider>
  );
}

export { Provider };
export default UserContext;
