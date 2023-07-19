import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

const FormPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <section className="container">
      <article className="half">
        <h1 className="title">Please Log in or Sign up</h1>
        <div className="tabs">
          <span
            className={activeTab === "login" ? "tab active" : "tab"}
            onClick={() => setActiveTab("login")}
          >
            <a>Log in</a>
          </span>
          <span
            className={activeTab === "signup" ? "tab active" : "tab"}
            onClick={() => setActiveTab("signup")}
          >
            <a>Sign up</a>
          </span>
        </div>
        <div className="content">
          {activeTab === "login" ? (
            <LoginForm />
          ) : (
            <SignupForm />
          )}
        </div>
      </article>
    </section>
  );
};

export default FormPage;
