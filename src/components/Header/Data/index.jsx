import { useUser } from "../../../hooks/useStore";

export const getNavLinks = () => {
  const user = useUser();
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
      title: userName ? "Profile" : "Login",
      to: userName ? `/profiles/${userName}` : "/login",
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
