import "./LinkItem.scss";
import { Link } from "react-router-dom";

export const LinkItem = ({ data }) => {
  const { title, to, index } = data;

  return <Link to={to}>{title}</Link>;
};
