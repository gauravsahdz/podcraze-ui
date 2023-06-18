import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

import '../css/footer.css'

const Footer = () => {
    return (
            <Container className='footer-container'>
                <Row className='footer-row1'>
                    <Col sm={4} className='footer-col1 col'>
                        <h3>PODCRAZE</h3>
                        <p>
                            Enjot the best podcasts from around the world. Listen to your favourite podcasts in your own language.
                        </p>


                    </Col>
                    <Col sm={4} className='footer-col2 col'>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Podcast</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </Col>

                    <Col sm={4} className='footer-col3 col'>
                        <ul>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </Col>

                </Row>
                <Row className='footer-row2'>
                    <Col sm={8} className='footer-col4 col'>
                        <p>&copy; 2023 Podcraze Pvt. Ltd. All rights reserved.</p>
                    </Col>
                    <Col sm={4} className='footer-col5 col'>
                        <div className="social-icons">
                            <span className="me-2 icon">
                                <FontAwesomeIcon size='lg' icon={faInstagram} />
                            </span>
                            <span className="me-2 icon">
                                <FontAwesomeIcon size='lg' icon={faFacebook} />
                            </span>
                            <span className="me-2 icon">
                                <FontAwesomeIcon size='lg' icon={faTwitter} />
                            </span>
                        </div>
                    </Col>
                </Row>
            </Container>
    )
};

export default Footer