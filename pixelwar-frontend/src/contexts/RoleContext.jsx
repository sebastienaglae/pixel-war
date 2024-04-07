import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const RoleContext = createContext({
  role: "visitor", // 'admin', 'visitor', user
  token: null,
  isVisitor: () => {},
  isAdmin: () => {},
  setRole: () => {},
  setToken: () => {},
  isUser: () => {},
  isLoggedIn: () => { },
  reset: () => {},
});

const getRoleFromToken = (token) => {
  if (token == "null") {
    return "visitor";
  }
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp < Date.now() / 1000) {
    return "visitor";
  }
  return decodedToken.admin ? "admin" : "user";
}

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("admin");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isAdmin = () => role === "admin";
  const isVisitor = () => role === "visitor";
  const isUser = () => role === "user";
  const isLoggedIn = () => role !== "visitor";
  const reset = () => setToken(null);

  useEffect(() => {
    localStorage.setItem("token", token);
    if (token) {
      setRole(getRoleFromToken(token));
    }
    else {
      setRole("visitor");
    }
  }, [token]);

  const value = {
    role,
    isAdmin,
    isVisitor,
    isUser,
    isLoggedIn,
    setRole,
    setToken,
    reset,
    token
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
