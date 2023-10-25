import React from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "../css/podcastCard.css";

const PodcastCard = ({
  podcastData,
  protect,
  openModalDialog,
  onPodcastSelect,
}) => {
  const navigate = useNavigate();

  const editPodcast = (id) => (e) => {
    e.preventDefault();
    navigate(`/admin/dashboard/podcasts/action?id=${id}`);
  };

  const handlePlayPodcast = () => {
    onPodcastSelect(podcastData);
  };

  return (
    <Card className="podcast-card mb-3">
      <div className="card-img-container">
        <Card.Img
          variant="top"
          src={podcastData.image_link}
          alt={podcastData.title}
          className="card-img"
        />
        <div className="play-overlay">
          <FontAwesomeIcon
            icon={faPlayCircle}
            className="play-icon"
            onClick={handlePlayPodcast}
          />
        </div>
      </div>
      <Card.Body>
        <div className="category-row">
          <FontAwesomeIcon icon={faHeadphones} className="headphone-icon" />
          <Card.Text className="category">{podcastData.category}</Card.Text>
        </div>
        <Card.Title className="title">{podcastData.title}</Card.Title>
        <Card.Subtitle className="mb-2 host">{podcastData.host}</Card.Subtitle>
        <div className={`card-actions ${!protect ? "visible" : "hidden"}`}>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={editPodcast(podcastData._id)}
            className="edit-icon"
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => openModalDialog(podcastData._id)}
            className="delete-icon"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PodcastCard;
