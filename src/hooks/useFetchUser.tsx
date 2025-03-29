import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Define the User type
interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

// Define the context type
interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: (page: number) => void;
}

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, error, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};
