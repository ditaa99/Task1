import React from "react";

const Buttons = (props) => {
  const { className = "", onClick, text } = props;

  return <button className={className} onClick={onClick}>{text}</button>;
};

export default Buttons;