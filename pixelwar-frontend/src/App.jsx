import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage";
import BoardPage from "@pages/BoardPage";
import CreatePage from "@pages/CreatePage";
import FindBoardPage from "./pages/FindBoardPage";
import LoginPage from "@pages/LoginPage";
import SignupPage from "@pages/SignupPage";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/common/NavigationBar";
import CreateBoardPage from "@pages/admin/CreateBoardPage";
import EditBoardPage from "@pages/admin/EditBoardPage";
import PixelBoardListPage from "@pages/admin/PixelBoardsPage";
import { useEffect, useState, createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  themePreference: "auto", // 'auto' or 'user'
  setTheme: () => {},
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/find_board" element={<FindBoardPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/create_board" element={<CreatePage />} />
        <Route path='/admin/create-board' element={<CreateBoardPage />} />
        <Route path='/admin/edit-board/:boardId' element={<EditBoardPage />} />
        <Route path='/admin' element={<PixelBoardListPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  const [theme, setTheme] = useState();
  const [themePreference, setThemePreference] = useState();

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
    const savedThemePreference =
      localStorage.getItem("themePreference") || "auto";

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
    if (!theme || !themePreference) return;
    localStorage.setItem("theme", theme);
    localStorage.setItem("themePreference", themePreference);
  }, [theme, themePreference]);

  const manualSetTheme = (newTheme) => {
    setThemePreference("user");
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: manualSetTheme, themePreference }}
    >
      <NavigationBar />
      <Outlet />
    </ThemeContext.Provider>
  );
}

export default App;
