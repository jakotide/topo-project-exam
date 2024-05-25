import { useUser } from "../../../hooks/useStore";

export const getNavLinks = () => {
  const user = useUser(); // Get the user data from Zustand store
  const userName = user ? user.name : null;

  return [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Venues",
      to: "/venues",
    },
    {
      title: "Profile",
      to: userName ? `/profiles/${userName}` : "/login", // Fallback to login if userName is null
    },
    {
      title: "Contact",
      to: "/contact",
    },
  ];
};

export const footerLinks = [
  {
    title: "Facebook",
  },
  {
    title: "Twitter",
  },
  {
    title: "Instagram",
  },
  {
    title: "Youtube",
  },
];

export const topNavLinks = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Venues",
    to: "/venues",
  },
  {
    title: "Contact",
    to: "/contact",
  },
];
