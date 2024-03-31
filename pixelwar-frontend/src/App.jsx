import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage";
<<<<<<< HEAD
import TestPage from "@pages/TestPage";
import LoginPage from "@pages/LoginPage";
import SignupPage from "@pages/SignupPage";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar";
import CreateBoardPage from "@pages/admin/CreateBoardPage";
import EditBoardPage from "@pages/admin/EditBoardPage";
import PixelBoardListPage from "@pages/admin/PixelBoardsPage";
import React, { useEffect, useState, createContext } from "react";


export const ThemeContext = createContext({
  theme: "light",
  themePreference: "auto", // 'auto' or 'user'
  setTheme: () => {},
});
=======
import BoardPage from "@pages/BoardPage";
import CreatePage from "@pages/CreatePage";
import { Outlet } from "react-router-dom";
import { socket } from "./socket";
import { useEffect } from "react";
import FindBoardPage from "./pages/FindBoardPage";
>>>>>>> 69833e7 (refactor(front): some refactor on find board page and socket is now given as parameter to pixelboard component)

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      return () => {
        socket.off("connect");
      };
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
<<<<<<< HEAD
        <Route path='/test' element={<TestPage />} />
        <Route path='/admin/create-board' element={<CreateBoardPage />} />
        <Route path='/admin/edit-board/:boardId' element={<EditBoardPage />} />
        <Route path='/admin' element={<PixelBoardListPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
=======
        <Route path="/find_board" element={<FindBoardPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/create_board" element={<CreatePage />} />
>>>>>>> 69833e7 (refactor(front): some refactor on find board page and socket is now given as parameter to pixelboard component)
      </Route>
    </Routes>
  );
}

function Layout() {
  const [theme, setTheme] = useState("light");
  const [themePreference, setThemePreference] = useState("auto");

  useEffect(() => {
    const getPreferredTheme = () => {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      } else {
        return "light";
      }
    };

    const savedTheme = localStorage.getItem("theme");
    const savedThemePreference = localStorage.getItem("themePreference") || "auto";

    if (savedThemePreference === "auto") {
      setTheme(getPreferredTheme());
      setThemePreference("auto");
    } else {
      setTheme(savedTheme || "dark");
      setThemePreference("user");
    }


  }, []);

  useEffect(() => {
    document.body.className = `${theme}-mode`;
    localStorage.setItem("theme", theme);
    localStorage.setItem("themePreference", themePreference);
  }, [theme, themePreference]);

  const manualSetTheme = (newTheme) => {
    setTheme(newTheme);
    setThemePreference("user");
  };

  return (
<<<<<<< HEAD
    <ThemeContext.Provider
      value={{ theme, setTheme: manualSetTheme, themePreference }}
    >
      <NavigationBar />
=======
    <>
      <h1>Navigation</h1>
      <nav>
        <Link to="/">Index</Link>&nbsp;&nbsp;
        <Link to="/find_board">Find a board</Link>&nbsp;&nbsp;
        <Link to="/create_board">Create Board</Link>&nbsp;&nbsp;
      </nav>
>>>>>>> 69833e7 (refactor(front): some refactor on find board page and socket is now given as parameter to pixelboard component)
      <Outlet />
    </ThemeContext.Provider>
  );
}

export default App;
