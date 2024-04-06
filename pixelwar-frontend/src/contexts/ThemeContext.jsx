import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "light",
  themePreference: "auto", // 'auto' or 'user'
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();
  const [themePreference, setThemePreference] = useState();

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

  useEffect(() => {
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
    let currentTheme = theme;
    if (themePreference === "auto") {
      currentTheme = getPreferredTheme();
    }
    setTheme(currentTheme);
    if (!theme || !themePreference) return;
    localStorage.setItem("themePreference", themePreference);
  }, [themePreference]);

  useEffect(() => {
    if (theme) {
      document.body.className = `${theme}-mode`;
    localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const manualSetTheme = (newTheme) => {
    setThemePreference("user");
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: manualSetTheme,
    themePreference,
    setThemePreference,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
