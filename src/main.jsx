import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "../src/scss/main.scss";
import { Layout } from "./components/Layout";
import { HomePage, Venues, Contact } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,

    children: [
      { path: "/", element: <HomePage /> },
      { path: "/venues", element: <Venues /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
