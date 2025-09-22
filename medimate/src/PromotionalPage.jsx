// src/PromotionalPage.jsx
import React from 'react';
import { Container, Grid, Typography, Button, Card, CardContent, CardMedia, Box } from '@mui/material';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';
import ServiceImage1 from './assets/service1.jpg'; // Replace with actual image paths
import ServiceImage2 from './assets/c1.gif';
import ServiceImage3 from './assets/service2.gif';
import ServiceImage4 from './assets/service3.gif';
import ServiceImage5 from './assets/service1.gif';
import ServiceImage6 from './assets/service1.gif';

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
      color: '#8338ec',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#000000',
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

const PREFIX = 'PromotionalPage';

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
    marginBottom: theme.spacing(8),
    overflow: 'hidden',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
    marginTop: theme.spacing(8), // Added top margin
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
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
      height: '100%',
      objectFit: 'contain',
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

const PromotionalPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <div className={classes.heroSection}>
          <img src={ServiceImage1} alt="Our Services" className={classes.heroImage} />
          <div className={classes.heroText}>
            <Typography variant="h3" component="h1" gutterBottom>
              Medimate Services
            </Typography>
            <Typography variant="h5" component="p">
              Discover the range of health services we offer to support your well-being.
            </Typography>
          </div>
        </div>

        <Container>
          <Grid container spacing={4} className={classes.section}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia className={classes.media}>
                  <img src={ServiceImage2} alt="Disease Prediction" />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Disease Prediction
                  </Typography>
                  <Typography variant="body1" component="p">
                    Predict diseases based on symptoms with our machine learning model.
                  </Typography>
                  <Button variant="contained" className={classes.actionButton}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia className={classes.media}>
                  <img src={ServiceImage3} alt="Image Processing" />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Image Processing
                  </Typography>
                  <Typography variant="body1" component="p">
                    Analyze medical images to identify medicines and more.
                  </Typography>
                  <Button variant="contained" className={classes.actionButton}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia className={classes.media}>
                  <img src={ServiceImage4} alt="Medicine Information" />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Medicine Information
                  </Typography>
                  <Typography variant="body1" component="p">
                    Search and find detailed information about various medicines.
                  </Typography>
                  <Button variant="contained" className={classes.actionButton}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Root>
    </ThemeProvider>
  );
};

export default PromotionalPage;
