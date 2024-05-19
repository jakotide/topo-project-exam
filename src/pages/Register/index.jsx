import React, { useState, useEffect, useRef } from "react";
import { useRegister } from "../../hooks/useRegister.jsx";
import { Link } from "react-router-dom";
import "./Register.scss";

export const RegisterPage = () => {
  const { register, loading, error, success } = useRegister();
  const [emailError, setEmailError] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    venueManager: false,
    avatarUrl: "",
    avatarAlt: "",
    bannerUrl: "",
    bannerAlt: "",
  });

  const isValidNoroffEmail = (email) => {
    return email.endsWith("@stud.noroff.no");
  };

  const dialogRef = useRef(null);

  useEffect(() => {
    if (success) {
      dialogRef.current.showModal();
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidNoroffEmail(userDetails.email)) {
      setEmailError(
        "Please use your Noroff student email (ending with @stud.noroff.no)."
      );
      return;
    }
    setEmailError(null);
    const formattedDetails = {
      ...userDetails,
      avatar: {
        url: userDetails.avatarUrl,
        alt: userDetails.avatarAlt,
      },
      banner: {
        url: userDetails.bannerUrl,
        alt: userDetails.bannerAlt,
      },
    };
    register(formattedDetails);
  };

  return (
    <section className="register__container">
      <div>
        <h2 className="register__login__header">Welcome!</h2>
        <form onSubmit={handleSubmit} className="register__form">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="avatarUrl">Avatar URL</label>
          <input
            type="text"
            placeholder="URL"
            name="avatarUrl"
            value={userDetails.avatarUrl}
            onChange={handleChange}
          />
          <label htmlFor="avatarAlt">Avatar Alt Text</label>
          <input
            type="text"
            placeholder="Alt Text"
            name="avatarAlt"
            value={userDetails.avatarAlt}
            onChange={handleChange}
          />
          <label htmlFor="bannerUrl">Banner URL</label>
          <input
            type="text"
            placeholder="URL"
            name="bannerUrl"
            value={userDetails.bannerUrl}
            onChange={handleChange}
          />
          <label htmlFor="bannerAlt">Banner Alt Text</label>
          <input
            type="text"
            placeholder="Alt Text"
            name="bannerAlt"
            value={userDetails.bannerAlt}
            onChange={handleChange}
          />

          <div className="venuemanager__checkbox">
            <label htmlFor="venueManager">Register as a venue manager?</label>
            <input
              type="checkbox"
              id="venueManager"
              name="venueManager"
              checked={userDetails.venueManager}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="register__login__btn"
          >
            {loading ? "Registering..." : "Sign up"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="switch__form__box">
        <p>Already got an account?</p>
        <Link to="/login" className="switch__link">
          Log in here!
        </Link>
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
