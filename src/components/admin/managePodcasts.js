import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";


import "../css/managePodcasts.css";
import PodcastCard from "../podcast/podcastCard";
import ModalDialog from './utilities/modal';
import { getAllPodcasts, deletePodcast, searchPodcast } from "../api/podcastService";
import AlertComponent from "../utils/alert";
import PodcastPlayer from "../podcast/podcastPlayer";
import SelectedPodcastContext from '../podcast/selectedPodcastContext';

const ManagePodcasts = ({ setLoading }) => {
    const [podcastsList, setPodcastsList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [podcastIdToDelete, setPodcastIdtoDelete] = useState("");
    const [alert, setAlert] = useState({ icon: "", message: "", color: "", background: "", show: false });
    const [searchText, setSearchText] = useState("");
    const { selectedPodcast, setSelectedPodcast } = useContext(SelectedPodcastContext);
    const [key, setKey] = useState(0);


    const navigate = useNavigate();
    const fetchPodcasts = async () => {
        try {
            const response = await getAllPodcasts();
            const podcasts = response.data.podcasts;
            setPodcastsList(podcasts);
        } catch (error) {
            setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
            setKey((prevKey) => prevKey + 1);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchPodcasts().finally(() => setLoading(false));
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


    const deletePodcastHandler = () => {
        setLoading(true);
        return deletePodcast(podcastIdToDelete)
            .then((response) => {
                closeModal();
                setAlert({ icon: 'faCircleCheck', message: response.message, color: "#aaec8a", background: "#313e2c, #aaec8a", show: true });
                setKey((prevKey) => prevKey + 1);
                fetchPodcasts();
                setLoading(false);
            })
            .catch((error) => {
                setAlert({ icon: 'faCircleXmark', message: error.response.data.message, color: "#e87474", show: true });
                setKey((prevKey) => prevKey + 1);
                setLoading(false);
            });
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
            <AlertComponent key={key} alert={alert} />

        </Container>
    );
};

export default ManagePodcasts;
