import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Container } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import MedicineInfoGif from './assets/medicine-info.gif'; // Import local GIFs
import DiseaseAwarenessGif from './assets/disease-awareness.gif';
import HealthManagementToolsGif from './assets/health-management-tools.gif';
import CommunitySupportGif from './assets/community-support.gif';

// Example service data for MediMate with GIF icons
const services = [
  {
    id: 1,
    title: 'Medicine Information',
    description: 'Comprehensive details on medications for chronic diseases.',
    iconGif: MedicineInfoGif // Local GIF import
  },
  {
    id: 2,
    title: 'Disease Awareness',
    description: 'Informative content on prevention and management of NCDs.',
    iconGif: DiseaseAwarenessGif
  },
  {
    id: 3,
    title: 'Health Management Tools',
    description: 'Tools to manage and track your health and medication schedules.',
    iconGif: HealthManagementToolsGif
  },
  {
    id: 4,
    title: 'Community Support',
    description: 'Connect with a supportive community for advice and experiences.',
    iconGif: CommunitySupportGif
  },
];

const MediMateServices = () => {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 200 });

  const serviceCardStyle = {
    backgroundColor: '#edf6f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transition: 'transform 0.3s ease',
    textAlign: 'center',
  };

  const serviceIconStyle = {
    width: '100px', // Adjust icon size
    height: '100px',
    marginBottom: '20px',
  };

  const serviceTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const serviceDescriptionStyle = {
    fontSize: '0.9rem',
    color: '#666',
  };

  return (
    <Container className="py-12">
      <h2 className="text-4xl font-bold text-center mb-6">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <animated.div key={service.id} style={{ ...props, ...serviceCardStyle }} className="service-card">
            <img src={service.iconGif} alt={service.title} style={serviceIconStyle} />
            <div>
              <h5 style={serviceTitleStyle}>{service.title}</h5>
              <p style={serviceDescriptionStyle}>{service.description}</p>
            </div>
          </animated.div>
        ))}
      </div>
    </Container>
  );
};

export default MediMateServices;
