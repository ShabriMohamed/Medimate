import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { BiInfoCircle } from 'react-icons/bi';

const SearchResultsComponent = ({ medicineInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mt-4"
    >
      <Container>
        <div className="bg-light rounded p-4 shadow-sm">
          <h2 className="mb-4 text-center text-primary">Medicine Information</h2>
          <Row className="text-start">
            <Col xs={12} md={6}>
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Name:</h5>
                <p className="mb-0">{medicineInfo.medical_name}</p>
              </div>
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Usage:</h5>
                <p className="mb-0">{medicineInfo.usage}</p>
              </div>
              <div>
                <h5 className="fw-bold mb-2">Side Effects:</h5>
                <ListGroup>
                  {medicineInfo.side_effects.map((effect, index) => (
                    <ListGroup.Item key={index}>{effect}</ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mb-4">
                <h5 className="fw-bold mb-2">Description:</h5>
                <p className="mb-0">{medicineInfo.description}</p>
              </div>
              <div>
                <h5 className="fw-bold mb-2">Dosage:</h5>
                <p className="mb-0">{medicineInfo.dosage}</p>
              </div>
            </Col>
         </Row>
          {medicineInfo.alternative_brands && medicineInfo.alternative_brands.length > 0 && (
            <div className="mt-4">
              <h5 className="fw-bold mb-2">Alternative Brands:</h5>
              <ListGroup>
                {medicineInfo.alternative_brands.map((brand, index) => (
                  <ListGroup.Item key={index}>
                    {brand.name} - <a href={brand.link} target="_blank" rel="noopener noreferrer">More Info</a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
          <div className="mt-4 text-center">
            <BiInfoCircle className="text-info me-2" />
            <span className="text-muted">
              This information is provided for informational purposes only. Please consult a healthcare professional for medical advice.
            </span>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default SearchResultsComponent;