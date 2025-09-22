import React from 'react';
import DiseasePredictionComponent from './DiseasePredictionComponent';
import DiseasePrediction from './DiseasePrediction';
import DiabetesPredictor from './DiabetesPredictor';

const DiseasePredictionWrapper = () => {
  return (
    <div>
      <DiseasePredictionComponent />
      <DiseasePrediction />
      <DiabetesPredictor />
      
    </div>
  );
};

export default DiseasePredictionWrapper;
