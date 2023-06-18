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
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import "../css/podcastPlayer.css";

import { user } from '../utils/authUtils'

const PodcastPlayer = ({ podcast }) => {
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

    const isAudio = mediaType === "audio" ? true : false;

    const playerRef = useRef(null);

    const [isLikedClicked, setIsLikedClicked] = useState(false);
    const [isAddedToPlaylistClicked, setIsAddedToPlaylistClicked] = useState(
        false
    );
    const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);


    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isAddedToPlaylist, setIsAddedToPlaylist] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [timer, setTimer] = useState("00:00");
    const [totalDuration, setTotalDuration] = useState("00:00");


    // setting the initial state of the player
    useEffect(() => {
        setIsPlaying(true);
    }, []);
    useEffect(() => {
        if (userFavouritePodcasts.includes(podcast._id)) {
            setIsFavouriteClicked(true);
        }

        if (userLikedPodcasts.includes(podcast._id)) {
            setIsLikedClicked(true);
        }

        if (userPlaylist.includes(podcast._id)) {
            setIsAddedToPlaylistClicked(true);
        }

    }, [userFavouritePodcasts, userLikedPodcasts, userPlaylist]);

    const handlePlayPause = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    const handleSkipForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    };

    const handleSkipBackward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    };

    const handleLike = () => {
        setIsLikedClicked(prevState => !prevState);
        setIsLiked((prevIsLiked) => !prevIsLiked);
    };

    const handleAddToPlaylist = () => {
        setIsAddedToPlaylistClicked(prevState => !prevState);
        setIsAddedToPlaylist((prevIsAddedToPlaylist) => !prevIsAddedToPlaylist);
    };

    const handleFavourite = () => {
        setIsFavouriteClicked(prevState => !prevState);
        setIsFavourite((prevIsFavourite) => !prevIsFavourite);
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
        // close this component 
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
                    playing={isPlaying}
                    controls={false}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    hidden={true}
                />
            )}
            <Card className="player-card">
                <div className="tool-button-container">
                    <FontAwesomeIcon icon={faXmark} className="tool-icon" size="lg" onClick={
                        closePlayer
                    }/>
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
                                onClick={handleSkipBackward}
                            />
                            <FontAwesomeIcon
                                icon={isPlaying ? faPause : faPlay}
                                onClick={handlePlayPause}
                                className="control-icon"
                            />
                            <FontAwesomeIcon
                                icon={faStepForward}
                                onClick={handleSkipForward}
                                className="control-icon"
                            />
                            <FontAwesomeIcon
                                icon={faThumbsUp}
                                className={`control-icon ${isLikedClicked ? "clicked" : ""}`}
                                onClick={handleLike}
                            />
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={`control-icon ${isFavouriteClicked ? "clicked" : ""}`}
                                onClick={handleFavourite}
                            />
                            <FontAwesomeIcon
                                icon={isAddedToPlaylist ? faPlus : faPlusSquare}
                                className={`control-icon ${isAddedToPlaylistClicked ? "clicked" : ""}`}
                                onClick={handleAddToPlaylist}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default PodcastPlayer;
