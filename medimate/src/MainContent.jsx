import React from 'react';
import { Container, Grid, Typography, Button, useTheme } from '@mui/material';
import './MainContent.scss';

const MainContent = () => {
  const theme = useTheme();

  return (
    <div className="main-content">
      <Container maxWidth="lg"> {/* Adjusted for proper spacing */}
        {/* Banner Section */}
        <Grid container spacing={6} alignItems="center" justifyContent="center" style={{ marginBottom: theme.spacing(8) }}>
          <Grid item xs={12} md={6}>
            <div className="text-content">
              <Typography variant="h2" component="h1" gutterBottom color="primary">
                Welcome to Medimate!
              </Typography>
              <Typography variant="body1" component="p" paragraph>
                Your go-to platform for medical information, designed with your health in mind.
              </Typography>
              <Button variant="contained" color="primary" href="/about" size="large">
                Learn More
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="image-content">
              <img src='https://images.unsplash.com/photo-1555633514-abcee6ab92e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80' alt="Healthcare" />
            </div>
          </Grid>
        </Grid>

        {/* Additional Content Sections */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <div className="additional-content">
              <Typography variant="h3" component="h2" gutterBottom color="primary">
                Our Services
              </Typography>
              <Typography variant="body1" component="p" paragraph>
                Discover the wide range of medical services we offer to our users.
              </Typography>
              <Button variant="outlined" color="primary" href="/services" size="large">
                Explore Services
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="additional-content">
              <Typography variant="h3" component="h2" gutterBottom color="primary">
                About Us
              </Typography>
              <Typography variant="body1" component="p" paragraph>
                Learn more about our mission, vision, and values.
              </Typography>
              <Button variant="outlined" color="primary" href="/about" size="large">
                Read More
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MainContent;
