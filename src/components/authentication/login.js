import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import "../css/login.css";
import { loginApi } from "../api/authService";
import AlertComponent from "../utils/alert";
import Loader from "../utils/loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ icon: "", message: "", color: "", background: "", show: false });
  const [isLoading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    loginApi(data)
      .then((response) => {
        const token = response.token;
        const user = response.data.user;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          setLoading(false);
          setAlert({ icon: 'faCircleXmark', message: 'Login Failed', color: "#e87474", background: "#313e2c, #e87474", show: true });
          setKey((prevKey) => prevKey + 1);
        }

        if (user.role === "admin" || user.role === "moderator") {
          window.location.href = "/admin/dashboard";
        } else {
          setLoading(false);
          window.location.href = "/";
        }
        setAlert({ icon: 'faCircleCheck', message: 'Login Successful', color: "#aaec8a", background: "#313e2c, #aaec8a", show: true });
        setKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        setLoading(false);
        setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", background: "#313e2c, #e87474", show: true });
        setKey((prevKey) => prevKey + 1);
      });
  };

  return (
    <Container className="login">
      {isLoading && <Loader />}
      <div className="login-form">
        <h2>Log In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>

      <AlertComponent key={key} alert={alert} />

    </Container>
  );
};

export default Login;
