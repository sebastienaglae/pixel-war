import { createContext, useState } from "react";

export const RoleContext = createContext({
  role: "visitor", // 'admin', 'visitor', user
  isVisitor: () => {},
  isAdmin: () => {},
  setRole: () => {},
  isUser: () => {},
  isLoggedIn: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("admin");

  const isAdmin = () => role === "admin";
  const isVisitor = () => role === "visitor";
  const isUser = () => role === "user";
  const isLoggedIn = () => role !== "visitor";

  const value = {
    role,
    isAdmin,
    isVisitor,
    isUser,
    isLoggedIn,
    setRole,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
