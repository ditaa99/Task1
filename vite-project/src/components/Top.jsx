import React from "react";
import Buttons from "./Buttons";
import "../index.css";

const Top = (props) => {
  const { className = "top", onClick, text } = props;

  return (
    <div className="top">
      {/* {isLoggedIn && <p>Welcome, {auth.currentUser.displayName}</p>} */}
      <Buttons onClick={onClick} text="Log Out" />
    </div>
  );
};

export default Top;
