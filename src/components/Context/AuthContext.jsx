import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Load user data from localStorage
  const getStoredUser = () => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const storedUser = getStoredUser();

  // Initial States
  const [userData, setUserData] = useState(storedUser);
  const [username, setUsername] = useState(() => storedUser?.maxuser?.[0]?.loginid || "");
  const [userId, setUserId] = useState(() => storedUser?.maxuser?.[0]?.userid || "");
  const [password, setPassword] = useState(() => storedUser?.password || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedUser);

  // Login Handler
  const login = (user, name, pass) => {
    const resolvedUsername = name || user?.maxuser?.[0]?.loginid || "";
    const resolvedUserId = user?.maxuser?.[0]?.userid ||user?.personid || "";

    setUserData(user);
    setUsername(resolvedUsername);
    setUserId(resolvedUserId);
    setPassword(pass);
    setIsAuthenticated(true);

    // Store password in localStorage with the user data
    const userWithPassword = {
      ...user,
      cardId: pass,
    };

    localStorage.setItem("userData", JSON.stringify(userWithPassword));
  };

  // Logout Handler
  const logout = () => {
    setUserData(null);
    setUsername("");
    setUserId("");
    setPassword("");
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        isAuthenticated,
        username,
        userId,
        password,
        login,
        logout,
        setUsername,
        setUserId,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
