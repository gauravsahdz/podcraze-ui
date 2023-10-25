import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  ProgressBar,
  Overlay,
} from "react-bootstrap";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faPlay,
  faPause,
  faStepForward,
  faHeart,
  faPlus,
  faThumbsUp,
  faExpand,
  faTimes,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare as faPlusSquareRegular } from "@fortawesome/free-regular-svg-icons";

import "../css/podcastPlayer.css";

import { user } from "../../utils/authUtils";

const PodcastPlayer = ({ podcast, onClose }) => {
  const {
    title,
    host,
    description,
    category,
    media_link,
    image_link,
    mediaType,
  } = podcast;

  const userLikedPodcasts = user().liked;
  const userFavouritePodcasts = user().favourites;
  const userPlaylist = user().playlists;

  const isAudio = mediaType === "audio";

  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [initialPlay, setInitialPlay] = useState(true);

  const [isLikedClicked, setIsLikedClicked] = useState(false);
  const [isAddedToPlaylistClicked, setIsAddedToPlaylistClicked] =
    useState(false);
  const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const skipTime = (seconds) => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + seconds);
  };

  const toggleLike = () => {
    setIsLikedClicked((prevState) => !prevState);
  };

  const toggleAddToPlaylist = () => {
    setIsAddedToPlaylistClicked((prevState) => !prevState);
  };

  const toggleFavourite = () => {
    setIsFavouriteClicked((prevState) => !prevState);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const closePlayer = () => {
    setIsPlaying(false);
    setInitialPlay(false);
    onClose();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
        setDuration(duration);
        setTimer(formatTime(currentTime));
        setTotalDuration(formatTime(duration));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid className="spotify-player-container">
      {isAudio && (
        <ReactPlayer
          ref={playerRef}
          url={media_link}
          playing={initialPlay && isPlaying}
          controls={false}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          hidden={true}
        />
      )}
      <Card className="player-card">
        <div className="tool-button-container">
          <FontAwesomeIcon
            icon={faTimes}
            className="tool-icon"
            size="lg"
            onClick={closePlayer}
          />
          <FontAwesomeIcon icon={faExpand} className="tool-icon" />
        </div>
        <Row className="align-items-center">
          <Col xs={3} md={2} className="d-flex justify-content-center">
            <Image src={image_link} alt={title} className="song-cover" />
          </Col>
          <Col xs={9} md={10}>
            <div className="song-info">
              <h5>{title}</h5>
              <p>{host}</p>
              <div className="timer-and-total-duration">
                <span>{timer}</span>
                <ProgressBar
                  now={progress}
                  min={0}
                  max={100}
                  className="progress"
                />
                <span>{totalDuration}</span>
              </div>
            </div>
            <div className="controls">
              <FontAwesomeIcon
                icon={faStepBackward}
                className="control-icon"
                onClick={() => skipTime(-10)}
              />
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                onClick={togglePlayPause}
                className="control-icon"
              />
              <FontAwesomeIcon
                icon={faStepForward}
                onClick={() => skipTime(10)}
                className="control-icon"
              />
              <FontAwesomeIcon
                icon={faThumbsUp}
                className={`control-icon ${isLikedClicked ? "clicked" : ""}`}
                onClick={toggleLike}
              />
              <FontAwesomeIcon
                icon={faHeart}
                className={`control-icon ${
                  isFavouriteClicked ? "clicked" : ""
                }`}
                onClick={toggleFavourite}
              />
              <FontAwesomeIcon
                icon={faPlus}
                className={`control-icon ${
                  isAddedToPlaylistClicked ? "clicked" : ""
                }`}
                onClick={toggleAddToPlaylist}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PodcastPlayer;
