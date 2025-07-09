import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [me, setMe] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setMe(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setMe(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ me, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
