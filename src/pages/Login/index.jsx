import React, { useState } from "react";
import { loginUser } from "../../api/auth/login";
import { useUserActions } from "../../hooks/useStore";
import { Link, useNavigate } from "react-router-dom";
import { useFetchApiKey } from "../../hooks/useFetchApiKey";
import "./Login.scss";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useUserActions();
  const navigate = useNavigate();

  const {
    loading: apiKeyLoading,
    error: apiKeyError,
    fetchApiKey,
  } = useFetchApiKey();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = { email, password, remember };

    try {
      const response = await loginUser(userDetails);
      const user = {
        name: response.data.name,
        email: response.data.email,
        bio: response.data.bio,
        avatar: response.data.avatar,
        banner: response.data.banner,
        venueManager: response.data.venueManager,
        accessToken: response.data.accessToken,
        remember: remember,
      };

      setUser(user);
      console.log("Login successful:", response);

      if (!apiKeyLoading && !apiKeyError) {
        await fetchApiKey();
      }

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);
    }
  };

  return (
    <section className="login__container">
      <div>
        <h2 className="login__header">Login</h2>

        <form onSubmit={handleSubmit} className="login__form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="remember__checkbox">
            <label>Remember Me:</label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
          </div>

          <button type="submit" className="register__login__btn">
            Login
          </button>
          {error && <p className="error__message">{error}</p>}
          <div className="switch__form__box">
            <p>Don't have an account?</p>
            <Link to="/register" className="switch__link">
              Register here!
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
