import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Header, Card, Image, Button } from 'semantic-ui-react';
import { motion } from 'framer-motion';
import styled from 'styled-components'; // Import styled from Styled Components

// Styled Components for modern styling
const Title = styled.h2`
  font-size: 72px;
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

const ResourceLink = styled.a`
  color: #007bff;
  text-decoration: underline;
`;


const imageUrls = [
  'https://images.unsplash.com/photo-1624454002429-40ed87a5ec04?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1593491205049-7f032d28cf5c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://www.dietburrp.com/wp-content/uploads/WhatsApp-Image-2020-09-04-at-12.52.08-PM.jpeg',
  'https://apollosugar.com/wp-content/uploads/2021/05/Five-Steps-to-Managing-Diabetes.-1024x576.jpg',
  'https://www.stshilohmedicalcenter.com/wp-content/uploads/2022/06/prevent_diabetics.jpeg',
  'https://assets.mrmed.in/others/file-1632987112542-597612264-Side%20effects%20of%20Diabetes.jpeg?w=1080&q=75',
  'https://plus.unsplash.com/premium_photo-1661353203527-d7c26fe64fe5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1683111124427-650aff5592a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1560416313-414b33c856a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


];

const DiabetesAwareness = ({ onClear }) => {
  const [awarenessData, setAwarenessData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/diabetes-awareness');
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

  return (
    <Container className="container">
      <Title>
        Diabetes Awareness
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

export default DiabetesAwareness;
