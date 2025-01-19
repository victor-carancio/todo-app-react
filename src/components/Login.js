import { loginUser } from "../Services/Auth";
import { useGlobalContext } from "../context/context";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Loading from "./Loading";

const Login = () => {
  const {
    setUser,
    userEmail,
    setUserEmail,
    password,
    setPassword,
    setUserRegister,
    setAuthToken,
    saveUserLocalStorage,
    isLoading,
    setIsLoading,
  } = useGlobalContext();

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const credentials = {
        email: userEmail,
        password,
      };
      const data = await loginUser(credentials);

      saveUserLocalStorage(data);
      setUser(data);
      setAuthToken(data.token);
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
      <form onSubmit={handleLoginSubmit} className="login-form">
        {/* <h2>LOGIN</h2> */}
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

        <div onClick={() => setUserRegister(true)} className="register-login">
          <p>Don't have an account? Sign in</p>
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
