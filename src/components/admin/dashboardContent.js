import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../css/dashboardContent.css";

import { getAllPodcasts } from "../../api/podcastService";
import { getAllUsers } from "../../api/authService";
import AlertComponent from "../../utils/alert/alert";
import Loader from "../../utils/loader/loader";

const DashboardContent = () => {
  const [audioPodcastsLength, setAudioPodcastsLength] = useState(0);
  const [videoPodcastsLength, setVideoPodcastsLength] = useState(0);

  const [usersList, setUsersList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    icon: "",
    message: "",
    color: "",
  });

  const fetchPodcasts = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPodcasts();
      const podcasts = response.data.podcasts;

      const audioPodcasts = podcasts.filter(
        (podcast) => podcast.mediaType === "audio"
      );
      const videoPodcasts = podcasts.filter(
        (podcast) => podcast.mediaType === "video"
      );

      setAudioPodcastsLength(audioPodcasts.length);
      setVideoPodcastsLength(videoPodcasts.length);
    } catch (error) {
      setKey((prevKey) => prevKey + 1);
      setAlert({
        show: true,
        icon: "errorIcon",
        message: error.response ? error.response.data.message : "something went wrong!",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getAllUsers();
      const users = response.data.users;
      if (users) {
        setUsersList(users);
      }
    } catch (error) {
      setKey((prevKey) => prevKey + 1);
      setAlert({
        show: true,
        icon: "errorIcon",
        message: error.response ? error.response.data.message : "something went wrong!",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
    fetchUsers();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <AlertComponent alert={alert} key={key} />
      <Row className="dashboard-row">
        <Col md={4} className="col-md-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title className="dashboard-card-title">
                Total Users
              </Card.Title>
              <Card.Text className="dashboard-card-text">
                {usersList.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="col-md-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title className="dashboard-card-title">
                Total audio Podcasts
              </Card.Title>
              <Card.Text className="dashboard-card-text">
                {audioPodcastsLength}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="col-md-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title className="dashboard-card-title">
                Total video podcasts
              </Card.Title>
              <Card.Text className="dashboard-card-text">
                {videoPodcastsLength}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardContent;
