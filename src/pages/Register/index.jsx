import React, { useState, useRef, useEffect } from "react";
import { registerUser } from "../../api/auth/register";
import { useUserActions } from "../../hooks/useStore";
import "./Register.scss";
import { SuccessModal } from "../../components/ui/SuccessModal";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [avatar, setAvatar] = useState({ url: "", alt: "" });
  const [banner, setBanner] = useState({ url: "", alt: "" });
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setUser } = useUserActions();
  // const dialogRef = useRef(null);

  const isValidNoroffEmail = (email) => {
    return email.endsWith("@stud.noroff.no");
  };

  // useEffect(() => {
  //   if (success) {
  //     dialogRef.current.showModal();
  //   }
  // }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidNoroffEmail(email)) {
      setEmailError("Email must end with @stud.noroff.no");
      return;
    }

    const userDetails = {
      name,
      email,
      password,
      venueManager,
      ...((avatar.url || avatar.alt) && { avatar }),
      ...((banner.url || banner.alt) && { banner }),
      ...(bio && { bio }),
    };

    try {
      const response = await registerUser(userDetails);
      setUser(response);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message);
    }
  };

  return (
    <section className="register__container">
      <div>
        <h2 className="register__login__header">Register</h2>
        <form onSubmit={handleSubmit} className="register__form">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {emailError && <p className="email__error">{emailError}</p>}
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Avatar URL:</label>
          <input
            placeholder="Optional"
            type="url"
            value={avatar.url}
            onChange={(e) => setAvatar({ ...avatar, url: e.target.value })}
          />

          <div className="venuemanager__checkbox">
            <label>Venue Manager:</label>
            <input
              type="checkbox"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
            />
          </div>
          <button type="submit" className="register__login__btn">
            Register
          </button>
          {error && (
            <p
              style={{ color: "black", margin: "8px 0" }}
              className="register-error-message"
            >
              {error}
            </p>
          )}
          <div className="switch__form__box">
            <p>Already got an account?</p>
            <Link to="/login" className="switch__link">
              Log in here!
            </Link>
          </div>
        </form>
      </div>
      <AnimatePresence>
        {success && (
          <SuccessModal>
            Thank you for signing up! You can now login to your account.
          </SuccessModal>
        )}
      </AnimatePresence>
    </section>
  );
};
