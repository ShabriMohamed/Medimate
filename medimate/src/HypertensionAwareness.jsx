import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Card, Image, Button } from 'semantic-ui-react';
import { motion } from 'framer-motion';
import styled from 'styled-components'; 
import './DiabetesAwareness.css'; 


const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

const Article = styled(Card)`
  &&& {
    margin-bottom: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const Content = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h4`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

const HypertensionAwareness = ({ onClear }) => {
  const [awarenessData, setAwarenessData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/hypertension-awareness');
        const data = Array.isArray(response.data) ? response.data : [];
        setAwarenessData(data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, []);

  const handleClear = () => {
    setAwarenessData([]);
    setError(null);
    
    onClear();
  };

  
  const imageUrls = [
    'https://plus.unsplash.com/premium_photo-1682124039589-6295a4e9a9e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://miro.medium.com/v2/resize:fit:828/format:webp/1*WrHmWc-DVAHToRXkI4-UPA.jpeg',
    'https://st4.depositphotos.com/1763191/40487/v/1600/depositphotos_404878838-stock-illustration-hypertension-sign-symptoms-information-infographic.jpg',
    
  ];

  return (
    <Container className="container">
      <Title>
        Hypertension Awareness
      </Title>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {awarenessData.map((data, index) => (
            <Article key={index} className="article">
              <Image src={imageUrls[index]} className="image" />
              <Content>
                <Header as="h3">{data.title}</Header>
                <p>{data.content}</p>
                {data.sections && data.sections.length > 0 && (
                  <div>
                    {data.sections.map((section, idx) => (
                      <div key={idx} className="section">
                        <a href={section.content} target="_blank" rel="noopener noreferrer">{section.title}</a>
                      </div>
                    ))}
                  </div>
                )}
              </Content>
            </Article>
          ))}
        </motion.div>
      )}
      <Button onClick={handleClear} color="red">Clear</Button>
    </Container>
  );
};

export default HypertensionAwareness;
