// src/PredictionForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
    const [symptoms, setSymptoms] = useState('');
    const [prediction, setPrediction] = useState('');

    const handlePrediction = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                symptoms: symptoms.split(',').map(s => s.trim())
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error predicting:', error);
            setPrediction('Prediction failed. Please try again.');
        }
    };

    const handleSelectChange = (event) => {
        setSymptoms(event.target.value);
    };

    const diseases = [
        'Fungal infection',
        'Allergy',
        'GERD',
        'Chronic cholestasis',
        // Add more diseases as needed
    ];

    return (
        <div>
            <h1>Disease Prediction</h1>
            <div>
                <label htmlFor="symptoms">Enter Symptoms (comma-separated):</label><br />
                <input
                    type="text"
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                /><br /><br />
                <button onClick={handlePrediction}>Predict</button>
            </div>
            {prediction && (
                <div>
                    <h2>Prediction Result:</h2>
                    <p>{`Prediction: ${prediction}`}</p>
                </div>
            )}
            <div>
                <label htmlFor="diseaseSelect">Select Disease:</label><br />
                <select id="diseaseSelect" onChange={handleSelectChange}>
                    <option value="">Select a disease</option>
                    {diseases.map((disease, index) => (
                        <option key={index} value={disease}>{disease}</option>
                    ))}
                </select><br /><br />
                <button onClick={handlePrediction}>Predict</button>
            </div>
        </div>
    );
};

export default PredictionForm;
