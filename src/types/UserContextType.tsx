import { User } from "./User";

export interface UserContextType {
  username: string;
  fullName: string;
  email: string;
  setSelectedAvatar: (selectedAvatar: string) => void;
  setUsers: (users: User[]) => void;
  tabValue: string;
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
  handleSelectAll: () => void;
  page: number;
  rowsPerPage: number;
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
  openEditDialog: boolean;
  handleEditClickOpen: (id: number) => void;
  handleEditClose: () => void;
  handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
