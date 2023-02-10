import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //tasks
  const [tasks, setTasks] = useState([]);
  const [currFilter, setCurrFilter] = useState("All");

  //auth
  const [userRegister, setUserRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  /*  const addTask = (task) => {
    const addTask = { id: new Date().getTime().toString(), task };
    setTasks([...tasks, addTask]);
  }; */

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const setAuthToken = (token) => {
    setToken(`Bearer ${token}`);
  };

  const saveUserLocalStorage = (user) => {
    window.localStorage.setItem("loggedTodoAppUser", JSON.stringify(user));
  };

  const loadUserLocalStorage = () => {
    const loggedUser = window.localStorage.getItem("loggedTodoAppUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setAuthToken(user.token);
    }
  };

  const saveThemeLocalStorage = () => {
    window.localStorage.setItem(
      "themeTodoApp",
      JSON.stringify({ isDarkTheme: isDark })
    );
  };

  const loadThemeLocalStorage = () => {
    const localTheme = window.localStorage.getItem("themeTodoApp");
    if (localTheme) {
      const { isDarkTheme } = JSON.parse(localTheme);

      setIsDark(!isDarkTheme);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem("loggedTodoAppUser");
  };

  const handleFilter = (filter) => {
    setCurrFilter(filter);
  };

  useEffect(() => {
    loadUserLocalStorage();
  }, []);
  useEffect(() => {
    loadThemeLocalStorage();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDark,
        setIsDark,
        tasks,
        setTasks,
        deleteTask,
        userRegister,
        setUserRegister,
        user,
        setUser,
        userEmail,
        setUserEmail,
        password,
        setPassword,
        token,
        setAuthToken,
        saveUserLocalStorage,
        loadUserLocalStorage,
        saveThemeLocalStorage,
        currFilter,
        handleFilter,
        isLoading,
        setIsLoading,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
