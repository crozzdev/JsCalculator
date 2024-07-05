/* eslint-disable react/prop-types */
import "./Button.css";

export const Button = ({ id, className, value, onClick, children }) => {
  return (
    <button
      id={id}
      className={className}
      value={value}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};
