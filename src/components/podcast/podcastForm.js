import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "../css/podcastForm.css";

import {
    createPodcast,
    getPodcastById,
    updatePodcast,
} from "../api/podcastService";
import AlertComponent from "../utils/alert";

const PodcastForm = ({ setLoading }) => {
    const [header, setHeader] = useState("Create New Podcast");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [category, setCategory] = useState("");
    const [host, setHost] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [image, setImage] = useState(null);
    const [imageFileName, setImageFileName] = useState("No file selected");
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaFileName, setMediaFileName] = useState("No file selected");

    const [alert, setAlert] = useState({
        icon: "",
        message: "",
        color: "",
        background: "",
        show: false,
    });
    const [key, setKey] = useState(0);

    const params = new URLSearchParams(window.location.search); // getting the query params from the url
    const id = params.get("id"); // getting the id from the query params

    // setting the state of the form fields to the values of the podcast
    useEffect(() => {
        if (id !== "new") {
            setHeader("Edit Podcast");
            setLoading(true);
            getPodcastById(id)
                .then((response) => {
                    const podcast = response.data.podcast;
                    setTitle(podcast.title);
                    setDescription(podcast.description);
                    setMediaType(podcast.mediaType);
                    setCategory(podcast.category);
                    setHost(podcast.host);
                    setCreatedBy(podcast.createdBy);
                    setLoading(false);
                })
                .catch((error) => {
                    setAlert({
                        icon: "faCircleXmark",
                        message: error.response.data.message,
                        color: "#e87474",
                        show: true,
                    });
                    setKey((prevKey) => prevKey + 1);
                    setLoading(false);
                });
        }
    }, [id]);

    const categories = [
        "music",
        "news",
        "sports",
        "education",
        "entertainment",
        "comedy",
        "religion",
        "politics",
        "health",
        "business",
        "technology",
        "other",
    ];

    // handling the form submission based on whether the podcast is new or not
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (id === "new") {
            createNewPodcast();
        } else {
            editPodcast();
        }
    };

    // creating a new podcast
    const createNewPodcast = () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("mediaType", mediaType);
        formData.append("category", category);
        formData.append("host", host);
        formData.append("createdBy", createdBy);
        formData.append("image", image);
        formData.append("mediaFile", mediaFile);

        createPodcast(formData)
            .then((response) => {
                setAlert({
                    icon: "faCircleCheck",
                    message: response.message,
                    color: "#aaec8a",
                    background: "#313e2c, #aaec8a",
                    show: true,
                });
                setKey((prevKey) => prevKey + 1);
                setLoading(false);
                setTitle("");
                setDescription("");
                setMediaType("");
                setCategory("");
                setHost("");
                setCreatedBy("");
                setImage(null);
                setImageFileName("No file selected");
                setMediaFile(null);
                setMediaFileName("No file selected");
            })
            .catch((error) => {
                setAlert({
                    icon: "faCircleXmark",
                    message: error.response.data.message,
                    color: "#e87474",
                    show: true,
                });
                setKey((prevKey) => prevKey + 1);
                setLoading(false);
            });
    };

    // updating an existing podcast
    const editPodcast = () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("mediaType", mediaType);
        formData.append("category", category);
        formData.append("host", host);
        formData.append("createdBy", createdBy);

        updatePodcast(id, formData)
            .then((response) => {
                setAlert({
                    icon: "faCircleCheck",
                    message: response.message,
                    color: "#aaec8a",
                    background: "#313e2c, #aaec8a",
                    show: true,
                });
                setKey((prevKey) => prevKey + 1);
                setLoading(false);
            })
            .catch((error) => {
                setAlert({
                    icon: "faCircleXmark",
                    message: error.response.data.message,
                    color: "#e87474",
                    show: true,
                });
                setKey((prevKey) => prevKey + 1);
                setLoading(false);
            });
    };

    // handling the change of the image file
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        setImageFileName(selectedFile ? selectedFile.name : "No file selected");
    };

    // handling the change of the media file
    const handleMediaFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setMediaFile(selectedFile);
        setMediaFileName(selectedFile ? selectedFile.name : "No file selected");
    };

    const disableSubmitButton = () => {
        if (
            !title ||
            !description ||
            !mediaType ||
            !category ||
            !host ||
            !createdBy ||
            !image ||
            !mediaFile
        ) {
            return true;
        } else if (setLoading) {
            return true;
        }
    };

    return (
        <Container>
            <h1>{header}</h1>
            <Form onSubmit={handleFormSubmit} className="podcast-form">
                <Row className="podcastForm-row">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label className="podcastForm-label">Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter podcast title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="podcastForm-control"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="podcastForm-row">
                    <Col>
                        <Form.Group controlId="description">
                            <Form.Label className="podcastForm-label">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter podcast description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="podcastForm-control"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="podcastForm-row">
                    <Col>
                        <Form.Group controlId="mediaType">
                            <Form.Label className="podcastForm-label">Media Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={mediaType}
                                onChange={(e) => setMediaType(e.target.value)}
                                className="podcastForm-control"
                            >
                                <option value="">Select media type</option>
                                <option value="audio">Audio</option>
                                <option value="video">Video</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="category">
                            <Form.Label className="podcastForm-label">Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="podcastForm-control"
                            >
                                <option value=""
                                >Select media type</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="podcastForm-row">
                    <Col>
                        <Form.Group controlId="host">
                            <Form.Label className="podcastForm-label">Host</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter podcast host"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                                className="podcastForm-control"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="createdBy">
                            <Form.Label className="podcastForm-label">Created By</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter podcast creator"
                                value={createdBy}
                                onChange={(e) => setCreatedBy(e.target.value)}
                                className="podcastForm-control"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="podcastForm-row">
                    <Col>
                        <Form.Group controlId="image">
                            <Form.Label className="podcastForm-label">Thumbnail</Form.Label>
                            <div className="podcastForm-file-container">
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="podcastForm-file-input"
                                    id="imageInput"
                                    disabled={id === "new" ? false : true}
                                />
                                <label
                                    htmlFor="imageInput"
                                    className="podcastForm-file-label"
                                    style={
                                        id === "new"
                                            ? { cursor: "pointer" }
                                            : { cursor: "not-allowed" }
                                    }
                                >
                                    Choose File
                                </label>
                                <span className="podcastForm-file-name">{imageFileName}</span>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="mediaFile">
                            <Form.Label className="podcastForm-label">Media File</Form.Label>
                            <div className="podcastForm-file-container">
                                <input
                                    type="file"
                                    onChange={handleMediaFileChange}
                                    className="podcastForm-file-input"
                                    id="mediaFileInput"
                                    disabled={id === "new" ? false : true}
                                />
                                <label
                                    htmlFor="mediaFileInput"
                                    className="podcastForm-file-label"
                                    style={
                                        id === "new"
                                            ? { cursor: "pointer" }
                                            : { cursor: "not-allowed" }
                                    }
                                >
                                    Choose File
                                </label>
                                <span className="podcastForm-file-name">{mediaFileName}</span>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Button
                    variant="primary"
                    type="submit"
                    className="podcastForm-submit-button"
                    disabled={disableSubmitButton()}
                >
                    {id === "new" ? "Create" : "Update"}
                </Button>
            </Form>
            <AlertComponent key={key} alert={alert} />
        </Container>
    );
};

export default PodcastForm;
