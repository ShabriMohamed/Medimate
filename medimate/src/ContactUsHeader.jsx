import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';
import ContactUsImage from './assets/contact-us.jpg';  // Add a suitable contact us image

// Define a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#f1faee',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h3: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#ffffff',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      complex: 750,
    },
  },
});

// Fade-in animation keyframes
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

// Floating animation keyframes
const floating = keyframes({
  '0%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-8px)' },
  '100%': { transform: 'translateY(0)' },
});

// Styled component Root
const Root = styled('div')(({ theme }) => ({
  position: 'relative',
  textAlign: 'center',
  color: 'white',
  marginBottom: theme.spacing(8),
  overflow: 'hidden',
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[5],
  '& .heroImage': {
    width: '100%',
    height: '70vh',
    objectFit: 'cover',
    filter: 'brightness(70%)',
    animation: `${fadeIn} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}`,
  },
  '& .heroText': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    animation: `${fadeIn} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}, ${floating} 6s infinite`,
  },
  '& .ctaButton': {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const ContactUsHeader = () => {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Medimate</Typography>
          </Toolbar>
        </AppBar>

        <div>
          <img src={ContactUsImage} alt="Contact Us" className="heroImage" />
          <div className="heroText">
            <Typography variant="h3" component="h1" gutterBottom>Get in Touch with Us</Typography>
            <Typography variant="h5" component="p">We're here to help and answer any questions you might have</Typography>
            <Button variant="contained" className="ctaButton">Contact Us</Button>
          </div>
        </div>
      </Root>
    </ThemeProvider>
  );
};

export default ContactUsHeader;
