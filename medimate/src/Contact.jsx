// Contact.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FeedbackForm from './FeedbackForm'; 
import phoneGif from './assets/phone.gif'; 
import emailGif from './assets/email.gif'; 
import addressGif from './assets/address.gif'; 
import './Contact.css'; 

const Contact = () => {
    return (
        <section className="contact" id="Contact">
            <Container>
                <h1 className="heading">Contact Us</h1>
                <Row>
                    <Col md={4}>
                        <Card className="contact-item">
                            <Card.Img variant="top" src={phoneGif} alt="Phone" />
                            <Card.Body>
                                <Card.Title>Phone</Card.Title>
                                <Card.Text>
                                    0371234567
                                    <br />
                                    0750366197
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="contact-item">
                            <Card.Img variant="top" src={emailGif} alt="Email" />
                            <Card.Body>
                                <Card.Title>Email</Card.Title>
                                <Card.Text>
                                    WWW.medimate@Email.com
                                    <br />
                                    medimatecare@gmail.com
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="contact-item">
                            <Card.Img variant="top" src={addressGif} alt="Address" />
                            <Card.Body>
                                <Card.Title>Address</Card.Title>
                                <Card.Text>
                                    Street: 1169 Maradana Road, 08 <br />
                                    State/province/area: Colombo
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {  }
                <FeedbackForm />
            </Container>
        </section>
    );
};

export default Contact;
