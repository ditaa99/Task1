import React from "react";

const Input = (props) => {
  const { value, type = "number", onChange } = props;

  return <input type={type} value={value} onChange={onChange} />;
};

export default Input;
