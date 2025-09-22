import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled, createTheme, ThemeProvider, keyframes } from '@mui/material/styles';
import HeroImage from './assets/hero-image.jpg';  // Add a suitable hero image
import DiseaseImage from './assets/3909077.jpg';  // Add a suitable disease prediction image
import ImageProcessing from './assets/2807710.jpg';  // Add a suitable image processing image
import MedicineInfo from './assets/medicine-info.jpg';  // Add a suitable medicine information image

// Define a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#f1faee', // Updated primary color for app bar
    },
    secondary: {
      main: '#f50057', // Adjust secondary color as needed
    },
    text: {
      primary: '#333', // Adjust primary text color
      secondary: '#666', // Adjust secondary text color
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // Use Poppins font family
    h3: {
      fontSize: '3rem', // Adjust font size for h3
      fontWeight: 700, // Make the text bold
      color: '#1976d2', // White color for contrast
    },
    h5: {
      fontSize: '1.5rem', // Adjust font size for h5
      fontWeight: 500, // Semi-bold text
      color: '#115293', // White color for contrast
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Add more easing functions as needed
    },
    duration: {
      complex: 750, // Adjust animation duration
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

// Styled component prefixes
const PREFIX = 'HomePage';

// CSS classes for styling
const classes = {
  appBar: `${PREFIX}-appBar`,
  heroSection: `${PREFIX}-heroSection`,
  heroImage: `${PREFIX}-heroImage`,
  heroText: `${PREFIX}-heroText`,
  section: `${PREFIX}-section`,
  card: `${PREFIX}-card`,
  media: `${PREFIX}-media`,
  disclaimer: `${PREFIX}-disclaimer`,
};

// Styled component Root
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.appBar}`]: {
    backgroundColor: theme.palette.primary.main,
  },
  [`& .${classes.heroSection}`]: {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
    marginBottom: theme.spacing(8), // Adjust the margin bottom to create space
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
    paddingTop: '56.25%', // 16:9 aspect ratio
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
  [`& .${classes.disclaimer}`]: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h7">Medimate</Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.heroSection}>
          <img src={HeroImage} alt="Hero" className={classes.heroImage} />
          <div className={classes.heroText}>
            <Typography variant="h3" component="h1" gutterBottom>Welcome to Medimate</Typography>
            <Typography variant="h5" component="p">Your Health, Our Priority</Typography>
          </div>
        </div>

        <Container>
          <Grid container spacing={4} className={classes.section}>
            <Grid item xs={12} sm={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={DiseaseImage}
                  title="Disease Prediction"
                >
                  <img src={DiseaseImage} alt="Disease Prediction" />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Disease Prediction
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Predict diseases based on symptoms with our machine learning model.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={ImageProcessing}
                  title="Image Processing"
                >
                  <img src={ImageProcessing} alt="Image Processing" />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Image Processing
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Analyze medical images to identify medicines and more.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={MedicineInfo}
                  title="Medicine Information"
                >
                  <img src={MedicineInfo} alt="Medicine Information" />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Medicine Information
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Search and find detailed information about various medicines.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <div className={classes.disclaimer}>
          <Typography variant="body2">
            Disclaimer: The predictions provided by Medimate are not accurate and should not be considered medical advice. Always consult with a qualified medical expert.
          </Typography>
        </div>
      </Root>
    </ThemeProvider>
  );
};

export default HomePage;
