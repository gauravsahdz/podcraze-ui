import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../css/adminDashboard.css";
import SidebarComponent from "./sidebar";
import ManageUsers from "./manageusers";
import DashboardContent from "./dashboardContent";
import { Routes, Route, useLocation } from "react-router-dom";
import ManagePodcasts from "./managePodcasts";
import PodcastForm from "../podcast/podcastForm";
import UserForm from "../user/userForm";
import Loader from "../utils/loader";

const AdminDashboard = () => {
  const location = useLocation(); // location.pathname
  const [isLoading, setLoading] = useState(false);

  return (
    <Container className="dashboard-container">
      {isLoading && <Loader />}
      <Row className="dashboard-row1"></Row>
      <Row className="dashboard-row2">
        <Col sm={4} className="sidebarComponent">
          <SidebarComponent />
        </Col>
        <Col sm={8} className="dashboard">
          <Routes location={location}>
            <Route path="/"  element={<DashboardContent setLoading={setLoading} />} />
            <Route path="/users"  element={<ManageUsers setLoading={setLoading} />} />
            <Route path="/podcasts" element={<ManagePodcasts setLoading={setLoading}/>} />
            <Route path="podcasts/action" element={<PodcastForm setLoading={setLoading}/>} />
            <Route path="users/action" element={<UserForm setLoading={setLoading}/>} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
