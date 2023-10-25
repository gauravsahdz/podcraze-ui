import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "../css/managePodcasts.css";
import PodcastCard from "../podcast/podcastCard";
import ModalDialog from "../../utils/modal";
import { getAllPodcasts, deletePodcast } from "../../api/podcastService";
import SelectedPodcastContext from "../podcast/selectedPodcastContext";
import Loader from "../../utils/loader/loader";
import AlertComponent from "../../utils/alert/alert";

const ManagePodcasts = () => {
  const [podcastsList, setPodcastsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [podcastIdToDelete, setPodcastIdtoDelete] = useState("");
  const [searchText, setSearchText] = useState("");
  const { selectedPodcast, setSelectedPodcast } = useContext(
    SelectedPodcastContext
  );
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [alert, setAlert] = useState({
    show: false,
    icon: "",
    message: "",
    color: "",
  });

  const navigate = useNavigate();
  const fetchPodcasts = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPodcasts();
      const podcasts = response.data.podcasts;
      setPodcastsList(podcasts);
    } catch (error) {
      setKey((prevKey) => prevKey + 1);
      setAlert({
        show: true,
        icon: "errorIcon",
        message: error.response ? error.response.data.message : "something went wrong!",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const addPodcast = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard/podcasts/action?id=new");
  };

  const openModalDialog = (id) => (e) => {
    setShowModal(true);
    setPodcastIdtoDelete(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deletePodcastHandler = async () => {
    setIsLoading(true);
    try {
      const response = await deletePodcast(podcastIdToDelete);
      if (response.status === 'success') {
        closeModal();
        setKey((prevKey) => prevKey + 1);
        setAlert({
          show: true,
          icon: "successIcon",
          message: "Podcast deleted successfully.",
          color: "green",
        });
        fetchPodcasts();
      }
    } catch (error) {
      setKey((prevKey) => prevKey + 1);
      setAlert({
        show: true,
        icon: "errorIcon",
        message: error.response ? error.response.data.message : "something went wrong!",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //automatically console the search text
  useEffect(() => {
    if (searchText) {
      const filteredPodcasts = podcastsList.filter((podcast) => {
        return (
          podcast.title.toLowerCase().includes(searchText.toLowerCase()) ||
          podcast.category.toLowerCase().includes(searchText.toLowerCase()) ||
          podcast.host.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setPodcastsList(filteredPodcasts);
    } else {
      fetchPodcasts();
    }
  }, [searchText]);

  const handlePodcastSelection = (selectedPodcast) => {
    setSelectedPodcast(selectedPodcast);
  };

  return (
    <Container className="manage-podcasts-container">
      <Loader isLoading={isLoading} />
      <AlertComponent key={key} alert={alert} />
      <Row className="manage-podcasts-header">
        <Col>
          <h1>Manage Podcasts</h1>
        </Col>
      </Row>
      <Row className="manage-podcasts-actions">
        <Col xs={12} md={6} lg={3} className="add-podcast-col">
          <Button
            variant="primary"
            className="add-podcast-button"
            onClick={addPodcast}
            type="button"
          >
            Add Podcast
          </Button>
        </Col>
        <Col xs={12} md={6} lg={9} className="search-podcasts-col">
          <Form.Control
            type="text"
            placeholder="Search Podcasts"
            className="search-podcasts-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        <Col className="podcastsCards-container">
          {podcastsList.map((podcast, index) => (
            <PodcastCard
              key={index}
              podcastData={podcast}
              protect={false}
              openModalDialog={openModalDialog(podcast._id)}
              onPodcastSelect={handlePodcastSelection}
            />
          ))}
        </Col>
      </Row>
      {showModal && (
        <ModalDialog
          modalActions={{
            title: "Delete Podcast",
            body: "Are you sure you want to delete this podcast?",
            action: "Delete",
            show: showModal,
            id: podcastIdToDelete,
          }}
          closeModal={() => setShowModal(false)}
          actionToPerfrom={deletePodcastHandler}
        />
      )}
    </Container>
  );
};

export default ManagePodcasts;
