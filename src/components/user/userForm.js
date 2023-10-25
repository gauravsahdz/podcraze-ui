import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../../api/authService";
import AlertComponent from "../../utils/alert/alert";
import Loader from "../../utils/loader/loader";

const UserForm = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
  });

  const [key, setKey] = useState(0);
  const [operating, setOperating] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    icon: "",
    message: "",
    color: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "username":
        if (!value) return "Username is required.";
        if (value.length < 5 || value.length > 15)
          return "Username should be between 5 and 15 characters.";
        return "";
      case "email":
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!value) return "Email is required.";
        if (!emailPattern.test(value))
          return "Please enter a valid email address.";
        return "";
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 8 || value.length > 15)
          return "Password should be between 8 and 15 characters.";
        return "";
      case "passwordConfirm":
        if (formData.password !== value) return "Passwords do not match.";
        return "";
      default:
        return "";
    }
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
    setErrors({ ...errors, [fieldName]: validateField(fieldName, value) });
  };

  const setUserEditData = async () => {
    try {
      const response = await getUserById(id);
      if (response.status === "success") {
        const user = response.data.user;
        setFormData({
          username: user.username,
          email: user.email,
          role: user.role,
        });
      }
    } catch (error) {
      setKey((prevKey) => prevKey + 1);
      setAlert({
        show: true,
        icon: "errorIcon",
        message: error.response
          ? error.response.data.message
          : "Something went wrong!",
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setUserEditData();
    }
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const fieldNames = ["username", "email", "password"];
    const hasErrors = fieldNames.some(
      (fieldName) => validateField(fieldName, formData[fieldName]) !== ""
    );

    if (!hasErrors || id !== "new") {
      setOperating(true);

      try {
        const data = {
          username: formData.username,
          email: formData.email,
          role: formData.role,
        };

        if (id === "new") {
          data.password = formData.password;
          data.passwordConfirm = formData.passwordConfirm;
          const response = await createUser(data);

          if (response.status === "success") {
            setKey((prevKey) => prevKey + 1);
            setAlert({
              show: true,
              icon: "successIcon",
              message: "User created successfully!",
              color: "green",
            });

            setTimeout(() => {
              navigate("/admin/dashboard/users");
            }, 1000);
          }
        } else {
          const response = await updateUser(id, data);

          if (response.status === "success") {
            setKey((prevKey) => prevKey + 1);
            setAlert({
              show: true,
              icon: "successIcon",
              message: "User updated successfully!",
              color: "green",
            });

            setTimeout(() => {
              navigate("/admin/dashboard/users");
            }, 1000);
          }
        }
      } catch (error) {
        setKey((prevKey) => prevKey + 1);
        setAlert({
          show: true,
          icon: "errorIcon",
          message: error.response
            ? error.response.data.message
            : "Something went wrong!",
          color: "red",
        });
      } finally {
        setOperating(false);
      }
    }
  };

  return (
    <Container>
      <AlertComponent alert={alert} key={key} />
      <Loader isLoading={operating} />
      <Form onSubmit={handleFormSubmit} className="podcast-form">
        <Row className="podcastForm-row">
          <Col>
            <Form.Group controlId="username">
              <Form.Label className="podcastForm-label">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => handleFieldChange("username", e.target.value)}
                className="podcastForm-control"
              />
              {errors.username && (
                <div className="error-message">{errors.username}</div>
              )}
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
                value={formData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className="podcastForm-control"
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="podcastForm-row">
          <Col>
            <Form.Group controlId="role">
              <Form.Label className="podcastForm-label">Role</Form.Label>
              <Form.Control
                as="select"
                value={formData.role}
                onChange={(e) => handleFieldChange("role", e.target.value)}
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
        {!id || id === "new" ? (
          <Row className="podcastForm-row">
            <Col>
              <Form.Group controlId="password">
                <Form.Label className="podcastForm-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value)
                  }
                  className="podcastForm-control"
                />
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="confirmPassword">
                <Form.Label className="podcastForm-label">
                  Confirm password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    handleFieldChange("passwordConfirm", e.target.value)
                  }
                  className="podcastForm-control"
                />
                {errors.passwordConfirm && (
                  <div className="error-message">{errors.passwordConfirm}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
        ) : null}

        <Button
          variant="primary"
          type="submit"
          className="podcastForm-submit-button"
          disabled={
            id === "new"
              ? operating ||
                !formData.username ||
                !formData.email ||
                !formData.password ||
                !formData.passwordConfirm ||
                !!errors.username ||
                !!errors.email ||
                !!errors.password
              : operating ||
                !formData.username ||
                !formData.email ||
                !!errors.username ||
                !!errors.email
          }
        >
          {id === "new" ? "Create" : "Update"}
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;
