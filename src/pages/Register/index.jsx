// import React, { useState, useEffect, useRef } from "react";
// import { useRegister } from "../../hooks/useRegister.jsx";
// import { Link } from "react-router-dom";
// import "./Register.scss";

// export const RegisterPage = () => {
//   const { register, loading, error, success } = useRegister();
//   const [emailError, setEmailError] = useState(null);
//   const [userDetails, setUserDetails] = useState({
//     name: "",
//     email: "",
//     password: "",
//     venueManager: false,
//     avatarUrl: "",
//     avatarAlt: "",
//     bannerUrl: "",
//     bannerAlt: "",
//   });

//   const isValidNoroffEmail = (email) => {
//     return email.endsWith("@stud.noroff.no");
//   };

//   const dialogRef = useRef(null);

//   useEffect(() => {
//     if (success) {
//       dialogRef.current.showModal();
//     }
//   }, [success]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isValidNoroffEmail(userDetails.email)) {
//       setEmailError(
//         "Please use your Noroff student email (ending with @stud.noroff.no)."
//       );
//       return;
//     }
//     setEmailError(null);
//     register(userDetails);
//   };

//   return (
//     <section className="register__container">
//       <div>
//         <h2 className="register__login__header">Welcome!</h2>
//         <form onSubmit={handleSubmit} className="register__form">
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={userDetails.name}
//             onChange={handleChange}
//             required
//           />
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={userDetails.email}
//             onChange={handleChange}
//             required
//           />
//           {emailError && <p className="error">{emailError}</p>}
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={userDetails.password}
//             onChange={handleChange}
//             required
//           />
//           <div className="venuemanager__checkbox">
//             <label htmlFor="venueManager">Register as a venue manager?</label>
//             <input
//               type="checkbox"
//               id="venueManager"
//               name="venueManager"
//               checked={userDetails.venueManager}
//               onChange={handleChange}
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="register__login__btn"
//           >
//             {loading ? "Registering..." : "Sign up"}
//           </button>
//         </form>
//         {error && <p className="error">{error}</p>}
//       </div>
//       <div className="switch__form__box">
//         <p>Already got an account?</p>
//         <Link to="/login" className="switch__link">
//           Log in here!
//         </Link>
//       </div>
//       {success && (
//         <dialog ref={dialogRef} className="success__dialog">
//           <p>Thank you for signing up! You can now login to your account.</p>
//           <button onClick={() => dialogRef.current.close()}>Close</button>
//         </dialog>
//       )}
//     </section>
//   );
// };

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
  const [avatar, setAvatar] = useState("");
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
      avatar,
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
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
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
