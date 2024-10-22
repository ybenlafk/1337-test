"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-0 left-64 right-0 bg-white dark:bg-gray-900 z-10 flex justify-between items-center h-16 px-6">
      <div>
        <h1 className="text-2xl text-black dark:text-white font-bold">
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
