import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import "../css/login.css";
import { loginApi } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../utils/alert/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logginIn, setLogginIn] = useState(false);
  const [alertKey, setAlertKey] = useState(0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    show: false,
    icon: "",
    message: "",
    color: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogginIn(true);

    try {
      const data = {
        email: email,
        password: password,
      };

      const response = await loginApi(data);
      if (response.token && response.token !== (undefined || null || "")) {
        const token = response.token;
        const user = response.data.user;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("podcrazeUser", JSON.stringify(user));

          if (user.role === "admin" || user.role === "moderator") {
            setTimeout(() => {
              navigate("/admin/dashboard");
            }, 1000);
          } else {
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        }
      }
      setAlert({
        show: true,
        icon: "successIcon",
        message: "Login Successful!",
        color: "green",
      });
      setAlertKey(alertKey + 1);
    } catch (error) {
      setAlert({
        show: true,
        icon: "errorIcon",
        message: error.response ? error.response.data.message : "something went wrong!",
        color: "red",
      });
      setAlertKey(alertKey + 1);
    } finally {
      setLogginIn(false);
    }
  };

  return (
    <Container className="login">
      <AlertComponent alert={alert} key={alertKey} />
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

          <Button variant="primary" type="submit" disabled={logginIn}>
            {logginIn ? "Loading..." : "Log In"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
