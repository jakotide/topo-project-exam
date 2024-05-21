// import React, { useState } from "react";
// import { useLogin } from "../../hooks/useLogin"; // Adjust the import according to your hooks file location
// import { Link } from "react-router-dom";
// import "./Login.scss";
// import { useNavigate } from "react-router-dom";

// export const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { login } = useLogin(); // Get the login function from useLogin hook

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       await login(email, password); // Call the login function with email and password
//       navigate("/"); // Redirect to profile page or another page
//     } catch (error) {
//       setError("Failed to log in. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>
//             Email:
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Password:
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </label>
//         </div>
//         {error && <p>{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin"; // Adjust the import according to your hooks file location
import { Link } from "react-router-dom";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useLogin(); // Get the login function from useLogin hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); // Call the login function with email and password
    } catch (error) {
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
