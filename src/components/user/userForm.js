import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import AlertComponent from "../utils/alert";
import { createUser, getUserById, updateUser } from "../api/authService";

const UserForm = ({ setLoading }) => {
  const params = new URLSearchParams(window.location.search); // getting the query params from the url
  const id = params.get("id"); // getting the id from the query params
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ variant: "", message: "", show: false });
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");
  const [key, setKey] = useState(0); // used to reset the alert component


  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      getUserById(id)
        .then((response) => {
          const user = response.data.user;
          setUsername(user.username);
          setEmail(user.email);
          setRole(user.role);
          setLoading(false);
        })
        .catch((error) => {
          setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
          setKey((prevKey) => prevKey + 1);
          setLoading(false);
        });
    }
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (id === "new") {
      createNewUser();
    } else {
      const data = {
        username,
        email,
        role,
      };
      updateUserData(id, data); // Call the updateUserData function directly
    }
  };

  const createNewUser = (e) => {
    setLoading(true);
    const data = {
      username,
      email,
      password,
      passwordConfirm,
      role,
    };
    createUser(data)
      .then((response) => {
        setAlert({ icon: 'faCircleCheck', message: 'User created successfully', color: "#aaec8a", background: "#313e2c, #aaec8a", show: true });
        setKey((prevKey) => prevKey + 1);
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setRole("");
        setLoading(false);
      })
      .catch((error) => {
        setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
        setKey((prevKey) => prevKey + 1);
        setLoading(false);
      });
  };

  const updateUserData = (id, data) => {
    setLoading(true);
    updateUser(id, data)
      .then((response) => {
        setAlert({ icon: 'faCircleCheck', message: 'User updated successfully', color: "#aaec8a", background: "#313e2c, #aaec8a", show: true });
        setKey((prevKey) => prevKey + 1);
        setLoading(false);
      })
      .catch((error) => {
        setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
        setKey((prevKey) => prevKey + 1);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit} className="podcast-form">
        <Row className="podcastForm-row">
          <Col>
            <Form.Group controlId="username">
              <Form.Label className="podcastForm-label">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="podcastForm-control"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="podcastForm-row">
          <Col>
            <Form.Group controlId="email">
              <Form.Label className="podcastForm-label">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="podcastForm-control"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="podcastForm-row">
          <Col>
            <Form.Group controlId="role">
              <Form.Label className="podcastForm-label">Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="podcastForm-control"
              >
                <option value="">Select user role</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="podcastForm-row">
          <Col>
            <Form.Group controlId="password">
              <Form.Label className="podcastForm-label">Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="podcastForm-control"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Confirm Password">
              <Form.Label className="podcastForm-label">
                Confirm password
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter podcast creator"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="podcastForm-control"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          className="podcastForm-submit-button"
        >
          {id === "new" ? "Create" : "Update"}
        </Button>
      </Form>
      <AlertComponent alert={alert} />
    </Container>
  );
};

export default UserForm;
