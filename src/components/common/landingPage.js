import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";

import "../css/landingpage.css";
import PodcastCard from "../podcast/podcastCard";
import { getTop6Podcasts } from "../../api/podcastService";
import SelectedPodcastContext from "../podcast/selectedPodcastContext";

const LandingPage = () => {
  const [podcastsList, setPodcastsList] = useState([]);
  const { setSelectedPodcast } = useContext(
    SelectedPodcastContext
  );

  const image_link =
    "https://st2.depositphotos.com/1006899/8421/i/600/depositphotos_84219350-stock-photo-word-blog-suspended-by-ropes.jpg";
  const title = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
  const category = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

  const fetchPodcasts = async () => {
    try {
      const response = await getTop6Podcasts();
      const podcasts = response.data.podcasts;
      setPodcastsList(podcasts);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".podcast-card, .blog-card");
      cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight) {
          card.classList.add("animate");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePodcastSelection = (selectedPodcast) => {
    setSelectedPodcast(selectedPodcast);
    
  };

  return (
    <Container className="landing-container">
      <Row className="header">
        <Col className="col1" sm={8}>
          <h1>
            Discover a world of captivating podcasts with PodCraze – your
            ultimate destination for immersive audio experiences.
          </h1>
          <Button variant="outline-light" size="lg" className="play-btn">
            <span className="me-2">
              <FontAwesomeIcon size="lg" icon={faPlay} />
            </span>
            Start Playing
          </Button>
        </Col>
        <Col className="col2" sm={4}></Col>
      </Row>
      <Row className="podcast-row">
        <h2>Popular Podcasts</h2>
        <Col sm={2}></Col>
        <Col sm={8} className="col1">
          {podcastsList.map((podcast, index) => {
            return (
              <PodcastCard
                key={index}
                podcastData={podcast}
                protect={true}
                onPodcastSelect={handlePodcastSelection}
              />
            );
          })}
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row className="blogs-section podcast-row">
        <h2>Popular Blogs</h2>
        <Col sm={2}></Col>
        <Col sm={8} className="col1">
          <Card className="blog-card">
            <Card.Body>
              <Card.Img
                variant="top"
                src={image_link}
                alt={title}
                className="card-img"
              />
              <Card.Title className="title">{title}</Card.Title>
              <Card.Subtitle className="mb-2 host">{description}</Card.Subtitle>
              <Card.Text className="category">{category}</Card.Text>
            </Card.Body>
          </Card>

          <Card className="blog-card">
            <Card.Body>
              <Card.Img
                variant="top"
                src={image_link}
                alt={title}
                className="card-img"
              />
              <Card.Title className="title">{title}</Card.Title>
              <Card.Subtitle className="mb-2 host">{description}</Card.Subtitle>
              <Card.Text className="category">{category}</Card.Text>
            </Card.Body>
          </Card>

          <Card className="blog-card">
            <Card.Body>
              <Card.Img
                variant="top"
                src={image_link}
                alt={title}
                className="card-img"
              />
              <Card.Title className="title">{title}</Card.Title>
              <Card.Subtitle className="mb-2 host">{description}</Card.Subtitle>
              <Card.Text className="category">{category}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
