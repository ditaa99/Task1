import React from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Buttons from "../Buttons";

const SignupForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { firstName, lastName, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
      console.log("User signed up")
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <ErrorMessage name="firstName" component="p" className="error" />
        <Field type="text" name="firstName" placeholder="Your first name" />
        <ErrorMessage name="lastName" component="p" className="error" />
        <Field type="text" name="lastName" placeholder="Your last name" />
        <Field
          type="text"
          name="phoneNumber"
          placeholder="Phone number (optional)"
        />
        <ErrorMessage name="email" component="p" className="error" />
        <Field type="email" name="email" placeholder="Your email" />
        <ErrorMessage name="password" component="p" className="error" />
        <Field type="password" name="password" placeholder="Your password" />
        <ErrorMessage name="confirmPassword" component="p" className="error" />
        <Field
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />
        <Buttons type="submit" text="Sign Up" />
      </Form>
    </Formik>
  );
};

export default SignupForm;
