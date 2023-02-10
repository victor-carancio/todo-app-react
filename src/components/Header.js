import React from "react";
import { useGlobalContext } from "../context/context";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  const { isDark, setIsDark, user, handleLogout, saveThemeLocalStorage } =
    useGlobalContext();
  const handleTheme = () => {
    setIsDark(!isDark);
    saveThemeLocalStorage();
  };
  return (
    <header className="header ">
      <div className="header-container">
        <h1 className="title">TODO</h1>
        <div className="icons-container">
          <div className="toggle-icon" onClick={() => handleTheme()}></div>
          {user ? (
            <MdOutlineLogout
              className="logout-icon"
              onClick={() => handleLogout()}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
