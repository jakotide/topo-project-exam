import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import "./StarRating.scss";

export const StarRating = ({ rating, className }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={stars.length} />);
  }

  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FontAwesomeIcon icon={farStar} key={stars.length} />);
  }

  return <div className={className}>{stars}</div>;
};
