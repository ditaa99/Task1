import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseConfig";
import Buttons from "../Buttons";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      // console.log(error);
      setError("Email or password is incorrect");
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email"
        />
        <label htmlFor="email">Your email</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
        />
        <label htmlFor="password">Your password</label>
        <Buttons type="submit" text="Log In" />
      </form>
    </>
  );
};

export default LoginForm;
