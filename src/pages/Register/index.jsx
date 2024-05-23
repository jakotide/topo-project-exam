import React, { useState, useRef, useEffect } from "react";
import { registerUser } from "../../api/auth/register";
import { useUserActions } from "../../hooks/useStore";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";

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
  const dialogRef = useRef(null);

  const isValidNoroffEmail = (email) => {
    return email.endsWith("@stud.noroff.no");
  };

  useEffect(() => {
    if (success) {
      dialogRef.current.showModal();
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidNoroffEmail(email)) {
      setEmailError("Please use your @stud.noroff.no email address");
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
        {error && <p style={{ color: "red" }}>{error}</p>}
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
            type="url"
            value={avatar.url}
            onChange={(e) => setAvatar({ ...avatar, url: e.target.value })}
          />
          <label>Avatar Alt Text:</label>
          <input
            type="text"
            value={avatar.alt}
            onChange={(e) => setAvatar({ ...avatar, alt: e.target.value })}
          />

          <label>Banner URL:</label>
          <input
            type="url"
            value={banner.url}
            onChange={(e) => setBanner({ ...banner, url: e.target.value })}
          />
          <label>Banner Alt Text:</label>
          <input
            type="text"
            value={banner.alt}
            onChange={(e) => setBanner({ ...banner, alt: e.target.value })}
          />

          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

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
          <div className="switch__form__box">
            <p>Already got an account?</p>
            <Link to="/login" className="switch__link">
              Log in here!
            </Link>
          </div>
        </form>
      </div>
      {success && (
        <dialog ref={dialogRef} className="success__dialog">
          <p>Thank you for signing up! You can now login to your account.</p>
          <button onClick={() => dialogRef.current.close()}>Close</button>
        </dialog>
      )}
    </section>
  );
};
