/* eslint-disable react/prop-types */
import "./Screen.css";

export const Screen = ({ id, className, valueToDisplay }) => {
  return (
    <div id={id} className={`screen ${className}`}>
      {valueToDisplay}
    </div>
  );
};
