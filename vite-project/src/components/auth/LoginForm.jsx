import React from "react";
import { useNavigate } from "react-router-dom";
import { app } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Buttons from "../Buttons";

const LoginForm = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      console.log("User signed in")
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <ErrorMessage name="email" component="p" className="error" />
        <Field type="email" name="email" placeholder="Your email" />
        <ErrorMessage name="password" component="p" className="error" />
        <Field type="password" name="password" placeholder="Your password" />
        <Buttons type="submit" text="Log In" />
      </Form>
    </Formik>
  );
};

export default LoginForm;
