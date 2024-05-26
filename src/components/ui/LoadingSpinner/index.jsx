import "./LoadingSpinner.scss";

export const Loader = ({ backgroundColor = "#ffffff" }) => {
  return <div className="loader" style={{ background: backgroundColor }}></div>;
};
