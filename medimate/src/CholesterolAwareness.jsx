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

const CholesterolAwareness = ({ onClear }) => {
  const [awarenessData, setAwarenessData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cholesterol-awareness');
        const data = Array.isArray(response.data) ? response.data : [];
        setAwarenessData(data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

 
  const imageUrls = [
    'https://media.istockphoto.com/id/1000660972/photo/cholesterol-hdl-and-ldl-medical-form-on-a-desk.jpg?s=1024x1024&w=is&k=20&c=TlhdaUyVSaBLTN9UdBJx1T3rOwe_P4-eLpUbBxKTbjo=',
    'https://blog.cuehealth.com/wp-content/uploads/2023/03/Lipids-1-ADDTL-PHOTO.jpg',
    'https://miro.medium.com/v2/resize:fit:828/format:webp/1*0ceLYT-CPfX8W2KnTMItDQ.png',
    'https://qph.cf2.quoracdn.net/main-qimg-1253b443bf27a42f13cdd46deecfb3b3',
    'https://www.eufic.org/en/images/uploads/food-production/Sustainable_tips_en.png',
    'https://plus.unsplash.com/premium_photo-1663852297521-b1b7183b4b46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://kdahweb-static.kokilabenhospital.com/kdah-2019/tips/1630750361.jpg',
    'https://images.unsplash.com/photo-1624821622383-f213ad4c0403?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    // Add more image URLs as needed
  ];

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
        Cholesterol Awareness
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
              <Image src={imageUrls[index]} className="image" /> { }
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

export default CholesterolAwareness;
