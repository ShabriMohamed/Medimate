import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './About.css'; 

const About = () => {
    return (
        <section className="About" id="About">
            <Container>
                <Row className="align-items-center">
                    <Col lg={6}>
                        <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                            <Image src="src\assets\Medical research-bro.svg" alt="Medical research" fluid rounded className="about-image" />
                        </CSSTransition>
                    </Col>
                    <Col lg={6}>
                        <div className="content">
                            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                <h1 className="heading">About Us</h1>
                            </CSSTransition>
                            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                <h2>We take care of your healthy life</h2>
                            </CSSTransition>
                            <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                <p>
                                    Welcome to Medimate, your trusted online destination for comprehensive healthcare information and resources. At Medimate, we are committed to empowering individuals with the knowledge and tools they need to make informed decisions about their health and well-being.
                                </p>
                            </CSSTransition>
                            <div className="mission">
                                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                    <h3>Our Mission:</h3>
                                </CSSTransition>
                                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                    <p>
                                        At Medimate, our mission is to provide accessible, accurate, and up-to-date healthcare information to individuals worldwide. We strive to be a reliable source of medical knowledge, offering guidance and support to help people lead healthier lives.
                                    </p>
                                </CSSTransition>
                            </div>
                            <div className="commitment">
                                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                    <h3>Our Commitment:</h3>
                                </CSSTransition>
                                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                    <p>
                                        At Medimate, we are committed to promoting health literacy, fostering a supportive online community, and advocating for the well-being of our users. We continuously strive to improve and expand our resources to meet the evolving needs of our audience.
                                    </p>
                                </CSSTransition>
                            </div>
                            <div className="join">
                                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                    <h3>Join Us:</h3>
                                </CSSTransition>
                                <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
                                    <p>
                                        Whether you're seeking reliable health information, looking for support and guidance, or simply striving to live a healthier lifestyle, we invite you to explore all that Medimate has to offer. Together, let's embark on a journey towards better health and wellness.
                                    </p>
                                </CSSTransition>
                                
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default About;
