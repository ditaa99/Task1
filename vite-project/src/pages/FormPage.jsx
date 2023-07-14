import React from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from '../components/auth/SignupForm';

const FormPage = () => {
  return (
    <div>
      <h1>Login/Register Page</h1>
      <LoginForm />
      <SignupForm />
    </div>
  );
};

export default FormPage;
