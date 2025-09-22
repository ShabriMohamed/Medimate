import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Spinner, Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BiInfoCircle } from 'react-icons/bi'; 
import tabletImage from './assets/tablet.gif';

const MedicineSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/medicines/search?name=${query}`);
      setMedicines(response.data || []);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const clearResults = () => {
    setMedicines([]);
  };

  return (
    <Container className="medicine-search">
      <Row className="justify-content-md-center mt-5">
        <Col md={12} className="text-center">
          <h2>Search Your Medicine</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md={5} className="text-center"> {/* Center the image */}
          <img src={tabletImage} alt="Medicine" style={{ maxWidth: '20%', height: 'auto', borderRadius: '0.25rem' }} />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md="4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search for medicines..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                variant="primary"
                onClick={handleSearch}
                style={{ borderRadius: '0.25rem', width: 'fit-content', height:'30px', padding:'10px', marginLeft:'10px', paddingBottom:'30px'}}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Search'
                )}
              </Button>
            </InputGroup>
          </motion.div>
          {medicines.length > 0 && (
            <div className="text-center">
              <Button variant="secondary" style={{ borderRadius: '0.25rem', width: 'fit-content', height:'30px', padding:'10px', marginLeft:'10px', paddingBottom:'30px', marginBottom:'10px'}} onClick={clearResults}>Clear Results</Button>
            </div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="8">
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {medicines.length > 0 ? (
              medicines.map((medicine) => (
                <Card key={medicine._id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{medicine.medical_name}</Card.Title>
                    <Card.Text>{medicine.description}</Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <BiInfoCircle /> <strong>Usage:</strong> {medicine.usage}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <BiInfoCircle /> <strong>Dosage:</strong> {medicine.dosage}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <BiInfoCircle /> <strong>Side Effects:</strong> {medicine.side_effects.join(', ')}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>No results found</div>
            )}
          </motion.ul>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicineSearch;
