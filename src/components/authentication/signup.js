import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import "../css/signup.css";
import { signupApi } from "../api/authService";
import AlertComponent from "../utils/alert";
import Loader from "../utils/loader";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [alert, setAlert] = useState({ icon: "", message: "", color: "", background: "", show: false });
  const [isLoading, setLoading] = useState(false);
  const [key, setKey] = useState(0); 

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    signupApi(data)
      .then((response) => {
        window.location.href = '/login';
        setLoading(false);
        setAlert({ icon: 'faCircleCheck', message: "Signup Successful", color: "#aaec8a", show: true });
        setKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        setLoading(false);
        setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
        setKey((prevKey) => prevKey + 1);
      });
  };

  return (
    <Container className="signup">
      {isLoading && <Loader />}
      <div className="signup-form">
        <h2>Create an Account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

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

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={(e) => setpasswordConfirm(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: "black",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#6c757d"; // Change the color on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "black"; // Reset the color when leaving hover
            }}
          >
            Already have an account?
          </p>
        </Form>
      </div>
      <AlertComponent key={key} alert={alert} />
    </Container>
  );
};

export default Signup;
