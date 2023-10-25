import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../css/navbar.css";
import { isAuthenticated, user, isAdmin } from "../../utils/authUtils";

const NavbarComponent = ({ bg, variant }) => {
  const username = user() ? user().username : "";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("podcrazeUser");
    window.location.href = "/";
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg={bg} variant={variant} fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span className="me-2">
            <FontAwesomeIcon size="lg" icon={faHeadphones} />{" "}
          </span>
          <span className="logo">PODCRAZE</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs">
              Blog
            </Nav.Link>
            <NavDropdown title="Podcast" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Education</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Music</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Politics</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Other</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            {isAuthenticated() && isAdmin() && (
              <>
                <Nav.Link as={Link} to="/admin/dashboard">
                  Dashboard
                </Nav.Link>
              </>
            )}
            {isAuthenticated() && (
              <>
                <Nav.Link as={Link} to="/profile">
                  <NavDropdown title={username} id="collasible-nav-dropdown">
                    <NavDropdown.Item
                      as={Link}
                      to="/favourites"
                    ></NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/account">
                      Account
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav.Link>
              </>
            )}

            {!isAuthenticated() && (
              <>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link
                  eventKey={2}
                  as={Link}
                  to="/login"
                  hidden={isAuthenticated()}
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
