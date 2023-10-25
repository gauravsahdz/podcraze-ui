import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import "../css/signup.css";
import { signupApi } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../utils/alert/alert";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [logginIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
    icon: "",
    message: "",
    color: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const data = {
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      };
      const response = await signupApi(data);
      if (response.status === "success") {
        setAlert({
          show: true,
          icon: "successIcon",
          message: "Signup Successful! Redirecting to login page...",
          color: "green",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setAlert({
        show: true,
        icon: "errorIcon",
        message: error.response ? error.response.data.message : "something went wrong!",
        color: "red",
      });
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <Container className="signup">
      <AlertComponent alert={alert} />
      <div className="signup-form">
        <h2>Create an Account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="form_group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="form_group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="form_group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm" className="form_group">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={logginIn}>
            {logginIn ? "Loading..." : "Sign Up"}
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
    </Container>
  );
};

export default Signup;
