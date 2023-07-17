import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

const FormPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEffects = () => {
      $(".tabs .tab").click(function () {
        if ($(this).hasClass("login")) {
          $(".tabs .tab").removeClass("active");
          $(this).addClass("active");
          $(".cont").hide();
          $(".login-cont").show();
        }
        if ($(this).hasClass("signup")) {
          $(".tabs .tab").removeClass("active");
          $(this).addClass("active");
          $(".cont").hide();
          $(".signup-cont").show();
        }
      });
      $(".container .bg").mousemove(function (e) {
        var amountMovedX = (e.pageX * -1) / 30;
        var amountMovedY = (e.pageY * -1) / 9;
        $(this).css(
          "background-position",
          amountMovedX + "px " + amountMovedY + "px"
        );
      });
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
        <h1 className="title">Pleas Log in or Sing up</h1>
        <div className="tabs">
          <span className="tab login active">
            <a href="#login">Log in</a>
          </span>
          <span className="tab signup">
            <a href="#signup">Sign up</a>
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
      <div className="half bg"></div>
    </section>
  );
};

export default FormPage;
