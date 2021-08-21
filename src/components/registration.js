import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../helpers/auth-context";


function Registration() {
  const history = useHistory()
  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const login = (data) => {
    axios.post("https://twitterclone-benedictng.herokuapp.com/auth/login", data).then((response) => {
        if (response.data.error) {
            alert(response.data.error)
        } else {
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            });
            history.push("/");
        }
      console.log(response.data);
    });
  };

  const onSubmit = (data) => {
    axios.post("https://twitterclone-benedictng.herokuapp.com/auth", data).then(() => {
      console.log(data);
      login(data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;