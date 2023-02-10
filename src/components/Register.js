import { useState } from "react";
import { registerUser } from "../Services/Auth";
import { useGlobalContext } from "../context/context";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Loading from "./Loading";

const Register = () => {
  const {
    setUser,
    userEmail,
    setUserEmail,
    password,
    setPassword,
    setUserRegister,
    setAuthToken,
    isLoading,
    saveUserLocalStorage,
    setIsLoading,
  } = useGlobalContext();

  const [userName, setUserName] = useState("");

  const handleSubmitRegister = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const credentials = {
        name: userName,
        email: userEmail,
        password,
      };
      const data = await registerUser(credentials);

      saveUserLocalStorage(data);
      setUser(data);
      setAuthToken(data.token);
      setUserName("");
      setUserEmail("");
      setPassword("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="login">
      <form onSubmit={handleSubmitRegister} className="login-form">
        <div className="form-input">
          <div className="input-icon">
            <FaUserAlt className="icon" />
          </div>
          <input
            type="text"
            name="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name"
            required
          />
        </div>
        <div className="form-input">
          <div className="input-icon">
            <FaUserAlt className="icon" />
          </div>
          <input
            type="text"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-input">
          <div className="input-icon">
            {" "}
            <FaLock className="icon" />
          </div>
          <input
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div onClick={() => setUserRegister(false)} className="register-login">
          <p>Loggin</p>
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
