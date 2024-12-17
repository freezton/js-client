// context/ThemeContext.js
import React, { createContext, useState, useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("theme") === "light" || false
  );

  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    localStorage.setItem("theme", newTheme ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      <StyledThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
