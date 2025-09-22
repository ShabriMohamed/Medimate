import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, FormControl, InputLabel, Select, MenuItem,
  Button, Card, CardContent, Alert, Box, CssBaseline, AppBar, Toolbar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const symptomsList = [
  'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain',
  'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue',
  'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy',
  'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating',
  'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes',
  'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes',
  'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision',
  'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs',
  'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain',
  'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid',
  'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech',
  'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements',
  'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
  'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability',
  'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches',
  'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration',
  'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding',
  'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf',
  'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting',
  'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const DiseasePrediction = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState(null);

  const handleSymptomChange = (event) => {
    setSelectedSymptoms(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict-disease', { symptoms: selectedSymptoms });
      setPrediction(response.data.prediction);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClear = () => {
    setSelectedSymptoms([]);
    setPrediction('');
    setError(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Disease Prediction
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: '50px', marginBottom: '50px' }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Disease Prediction from Symptoms
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Symptoms</InputLabel>
                <Select
                  multiple
                  value={selectedSymptoms}
                  onChange={handleSymptomChange}
                  renderValue={(selected) => selected.map(s => s.replace(/_/g, ' ')).join(', ')}
                >
                  {symptomsList.map((symptom) => (
                    <MenuItem key={symptom} value={symptom}>
                      {symptom.replace(/_/g, ' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                Predict Disease
              </Button>
              <Button onClick={handleClear} variant="outlined" color="secondary" fullWidth style={{ marginTop: '10px' }}>
                Clear
              </Button>
            </form>
            {prediction && (
              <Alert severity="success" style={{ marginTop: '20px' }}>
                <Typography variant="h6">Predicted Disease:</Typography>
                <Typography variant="body1">{prediction}</Typography>
              </Alert>
            )}
            {error && (
              <Alert severity="error" style={{ marginTop: '20px' }}>
                Error: {error}
              </Alert>
            )}
            <Box mt={4}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Disclaimer:</strong> The predictions provided by this tool are not 100% accurate and should not be
                  considered as a definitive diagnosis. Always seek the advice of a qualified medical professional for
                  accurate diagnosis and treatment.
                </Typography>
              </Alert>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default DiseasePrediction;
