import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';
import DiseaseImage from './assets/dp2.jpg'; // Add a suitable image

const theme = createTheme({
  palette: {
    primary: {
      main: '#57cc99',
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
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#ffffff',
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const floating = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const PREFIX = 'DiseasePredictionComponent';

const classes = {
  heroSection: `${PREFIX}-heroSection`,
  heroImage: `${PREFIX}-heroImage`,
  heroText: `${PREFIX}-heroText`,
  section: `${PREFIX}-section`,
  card: `${PREFIX}-card`,
  media: `${PREFIX}-media`,
  actionButton: `${PREFIX}-actionButton`,
  contentBox: `${PREFIX}-contentBox`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.heroSection}`]: {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(8), // Added marginTop for top margin
    overflow: 'hidden',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
  },
  [`& .${classes.heroImage}`]: {
    width: '100%',
    height: '60vh',
    objectFit: 'cover',
    filter: 'brightness(70%)',
    animation: `${fadeIn} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}`,
  },
  [`& .${classes.heroText}`]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    animation: `${fadeIn} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}, ${floating} 6s infinite`,
  },
  [`& .${classes.section}`]: {
    marginBottom: theme.spacing(6),
    animation: `${slideIn} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}`,
  },
  [`& .${classes.card}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[8],
    },
  },
  [`& .${classes.media}`]: {
    height: 0,
    paddingTop: '56.25%',
    position: 'relative',
    '& img': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  [`& .${classes.actionButton}`]: {
    marginTop: theme.spacing(2),
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
    transition: 'background-color 0.3s ease-in-out',
  },
  [`& .${classes.contentBox}`]: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
    background: 'rgba(0, 0, 0, 0.6)',
    animation: `${fadeIn} ${theme.transitions.duration.complex}ms ${theme.transitions.easing.easeInOut}`,
  },
}));

const DiseasePredictionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <div className={classes.heroSection}>
          <img src={DiseaseImage} alt="Disease Prediction" className={classes.heroImage} />
          <div className={classes.heroText}>
            <Typography variant="h3" component="h1" gutterBottom>
              Disease Prediction Service
            </Typography>
            <Typography variant="h5" component="p">
              Predict diseases based on symptoms with our advanced machine learning model.
            </Typography>
          </div>
        </div>

        <Container>
          <Grid container spacing={4} className={classes.section}>
            <Grid item xs={12}>
              <Box className={classes.contentBox}>
                <Typography variant="h5" component="div" gutterBottom>
                  How It Works
                </Typography>
                <Typography variant="body1" component="p">
                  Enter your symptoms and get a prediction of possible diseases. Our machine learning algorithm analyzes your symptoms to provide you with the most likely diagnoses. This service is designed to help you understand your health better and take appropriate action.
                </Typography>
                <Button variant="contained" className={classes.actionButton}>
                  Get Started
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Root>
    </ThemeProvider>
  );
};

export default DiseasePredictionComponent;
