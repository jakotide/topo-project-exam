import "./ArrowRightSvg.scss";

export const ArrowRightSvg = ({ options }) => {
  const {
    fill = "#f9f5f3",
    width = "18px",
    height = "20px",
    ...rest
  } = options;

  return (
    <svg
      fill={fill}
      width={width}
      height={height}
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
    </svg>
  );
};
