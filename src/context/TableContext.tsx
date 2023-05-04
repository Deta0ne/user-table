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
  fetchUsers: () => Promise<void>;
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

  const sharedValuesAndMethods: UserContextType = {
    users,
    setUsers,
    tabValue,
    setTabValue,
    openAddDialog,
    handleAddClickOpen,
    handleAddClose,
    fetchUsers,
  };
  return (
    <UserContext.Provider value={sharedValuesAndMethods}>
      {children}
    </UserContext.Provider>
  );
}

export { Provider };
export default UserContext;
