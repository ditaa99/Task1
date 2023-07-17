import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

const FormPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEffects = () => {
      // function to handle effects when tabs are clicked
      $(".tabs .tab").click(function () {
        if ($(this).hasClass("login")) {
          // if login tab is clicked
          $(".tabs .tab").removeClass("active"); // remove active class from all tabs, affects looks
          $(this).addClass("active"); // add active class to login tab
          $(".cont").hide(); // hide all content
          $(".login-cont").show(); // show login content
        }
        if ($(this).hasClass("signup")) {
          // if signup tab is clicked
          $(".tabs .tab").removeClass("active"); // remove active class from all tabs
          $(this).addClass("active"); // add active class to signup tab
          $(".cont").hide(); // hide all content
          $(".signup-cont").show(); // show signup content
        }
      });
      $(".container").mousemove(function (e) {
        // function to handle mouse movement over background
        var amountMovedX = (e.pageX * -1) / 30;
        var amountMovedY = (e.pageY * -1) / 9;
      });

      // Set login tab as active by default
      $(".tabs .tab.login").addClass("active");
      $(".cont").hide();
      $(".login-cont").show();
    };

    // Check if jQuery is available
    if (typeof $ === "undefined") {
      const script = document.createElement("script");
      script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
      script.onload = handleEffects;
      document.body.appendChild(script);
    } else {
      handleEffects();
    }
  }, []);

  return (
    <section className="container">
      <article className="half">
        <h1 className="title">Please Log in or Sing up</h1>
        <div className="tabs">
          <span className="tab login active">
            <a>Log in</a>
          </span>
          <span className="tab signup">
            <a>Sign up</a>
          </span>
        </div>
        <div className="content">
          <div className="login-cont cont">
            <LoginForm />
          </div>
          <div className="signup-cont cont">
            <SignupForm />
          </div>
        </div>
      </article>
    </section>
  );
};

export default FormPage;
