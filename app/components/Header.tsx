"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-0 right-0 left-0 md:left-64 bg-white dark:bg-gray-900 z-20 flex justify-between items-center h-16 px-4 md:px-6 border-b border-gray-200 dark:border-gray-800">
      <div className="ml-12 md:ml-0">
        <h1 className="text-lg md:text-2xl text-black dark:text-white font-bold truncate">
          Welcome back, Manager
        </h1>
      </div>
      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        <DarkModeSwitch
          checked={theme === "dark"}
          onChange={toggleTheme}
          size={25}
        />
      </div>
    </div>
  );
};

export default Header;