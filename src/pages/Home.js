import React from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Login from "../components/Login";
import Register from "../components/Register";
import Tasks from "../components/TasksComponent";
import { useGlobalContext } from "../context/context";

const Home = () => {
  const { isDark, userRegister, user, isLoading } = useGlobalContext();

  return (
    <main className={isDark ? "dark-theme" : ""}>
      <Header />

      {user ? <Tasks /> : userRegister ? <Register /> : <Login />}

      {/* <Tasks /> */}
    </main>
  );
};

export default Home;
