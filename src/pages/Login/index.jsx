import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin.jsx";
import { Link } from "react-router-dom";
import "./Login.scss";

export const LoginPage = () => {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className="login__container">
      <div>
        <h2 className="login__header">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="register__form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="register__login__btn login__btn"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="switch__form__box">
        <p>Don't have an account?</p>
        <Link to="/register" className="switch__link">
          Sign up here!
        </Link>
      </div>
    </section>
  );
};
