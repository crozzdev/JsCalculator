/* eslint-disable react/prop-types */
import "./Screen.css";

export const Screen = ({ className, valueToDisplay }) => {
  return <div className={`screen ${className}`}>{valueToDisplay}</div>;
};
