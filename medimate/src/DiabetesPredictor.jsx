import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, AppBar, Toolbar, Slide, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import diabetesImage from './assets/diabetes-image.jpg'; // Replace with your image path

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    borderRadius: 8,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  clearButton: {
    marginLeft: theme.spacing(1),
  },
  predictionResult: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  appBar: {
    backgroundColor: '#1976d2',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  image: {
    width: '50%',
    height: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(10),
    borderRadius: 8,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
}));

const DiabetesPredictor = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    glucose: '',
    bloodpressure: '',
    skinthickness: '',
    insulin: '',
    bmi: '',
    dpf: '',
    age: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict-diabetes', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  const handleClear = () => {
    setFormData({
      glucose: '',
      bloodpressure: '',
      skinthickness: '',
      insulin: '',
      bmi: '',
      dpf: '',
      age: '',
    });
    setPrediction(null);
  };

  return (
    <div>
      <Slide direction="down" in={true} timeout={1000}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Diabetes Predictor
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Container component="main" maxWidth="md" className={classes.root}>
        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="Glucose"
                  name="glucose"
                  value={formData.glucose}
                  onChange={handleChange}
                  className={classes.inputField}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="Blood Pressure"
                  name="bloodpressure"
                  value={formData.bloodpressure}
                  onChange={handleChange}
                  className={classes.inputField}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="Skin Thickness"
                  name="skinthickness"
                  value={formData.skinthickness}
                  onChange={handleChange}
                  className={classes.inputField}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="Insulin"
                  name="insulin"
                  value={formData.insulin}
                  onChange={handleChange}
                  className={classes.inputField}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="BMI"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  className={classes.inputField}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="DPF"
                  name="dpf"
                  value={formData.dpf}
                  onChange={handleChange}
                  className={classes.inputField}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={classes.inputField}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitButton}
            >
              Predict
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              className={classes.clearButton}
              onClick={handleClear}
            >
              Clear
            </Button>
          </form>
        </Zoom>
        {prediction !== null && (
          <Slide direction="up" in={true} timeout={1000}>
            <div className={classes.predictionResult}>
              <Typography variant="h6">
                Prediction: {prediction ? 'Positive for Diabetes' : 'Negative for Diabetes'}
              </Typography>
            </div>
          </Slide>
        )}
      </Container>
      <Zoom in={true} style={{ transitionDelay: '1000ms' }}>
        <img src={diabetesImage} alt="Diabetes Image" className={classes.image} />
      </Zoom>
    </div>
  );
};

export default DiabetesPredictor;
