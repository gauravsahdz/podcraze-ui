import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../css/dashboardContent.css';

import { getAllPodcasts } from '../api/podcastService';
import { getAllUsers } from '../api/authService';
import AlertComponent from '../utils/alert';

const DashboardContent = ({ setLoading }) => {
  const [audioPodcastsLength, setAudioPodcastsLength] = useState(0);
  const [videoPodcastsLength, setVideoPodcastsLength] = useState(0);

  const [usersList, setUsersList] = useState([]);

  const [alert, setAlert] = useState({ icon: '', message: '', color: '', background: '', show: false });
  const [key, setKey] = useState(0);

  const fetchPodcasts = async () => {
    try {
      const response = await getAllPodcasts();
      const podcasts = response.data.podcasts;

      const audioPodcasts = podcasts.filter(podcast => podcast.mediaType === 'audio');
      const videoPodcasts = podcasts.filter(podcast => podcast.mediaType === 'video');

      setAudioPodcastsLength(audioPodcasts.length);
      setVideoPodcastsLength(videoPodcasts.length);

    } catch (error) {
      setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
      setKey(prevKey => prevKey + 1);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      const users = response.data.users;
      if (users) {
        setUsersList(users);
      }
    } catch (error) {
      setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
      setKey((prevKey) => prevKey + 1);
    }

  };


  useEffect(() => {
    setLoading(true); // Start loading
    fetchPodcasts()
      .finally(() =>
        setLoading(false)); // Stop loading when API call is finished

    fetchUsers()
      .finally(() => setLoading(false));
  }, []);



  return (
    <>
      <Row className="dashboard-row">
        <Col md={4} className="col-md-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title className="dashboard-card-title">Total Users</Card.Title>
              <Card.Text className="dashboard-card-text">{usersList.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="col-md-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title className="dashboard-card-title">Total audio Podcasts</Card.Title>
              <Card.Text className="dashboard-card-text">{audioPodcastsLength}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="col-md-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title className="dashboard-card-title">Total video podcasts</Card.Title>
              <Card.Text className="dashboard-card-text">{videoPodcastsLength}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <AlertComponent key={key} alert={alert} />
      </Row>
    </>
  )
}

export default DashboardContent