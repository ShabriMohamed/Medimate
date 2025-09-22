import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import UploadComponent from './UploadComponent';
import SearchResultsComponent from './SearchResultsComponent';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContent from './MainContent';
import NonCommunicableDiseases from './NonCommunicableDiseases';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiabetesAwareness from './DiabetesAwareness';
import CholesterolAwareness from './CholesterolAwareness';
import HypertensionAwareness from './HypertensionAwareness';
import MedicineSearch from './MedicineSearch';
import Contact from './Contact';
import About from './About';
import MediMateServices from './MediMateServices';
import DiseasePrediction from './DiseasePrediction';
import HomePage from './HomePage';
import ContactUsHeader from './ContactUsHeader';
import ContactPage from './ContactPage';
import HomePageWrapper from './HomePageWrapper';
import DiseasePredictionWrapper from './DiseasePredictionWrapper';
import PromotionalPage from './PromotionalPage';

function App() {
  const [medicineInfo, setMedicineInfo] = useState(null);

  const handleUploadSuccess = async (data) => {
    try {
      const response = await axios.post('/upload', data);
      setMedicineInfo(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleClearNavigation = () => {
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePageWrapper />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/disease-prediction" element={<DiseasePredictionWrapper />} />
          <Route exact path="/" element={<NonCommunicableDiseases />} />
          <Route path="/diabetes" element={<DiabetesAwareness onClear={handleClearNavigation} />} />
          <Route path="/cholesterol" element={<CholesterolAwareness onClear={handleClearNavigation} />} />
          <Route path="/hypertension" element={<HypertensionAwareness onClear={handleClearNavigation} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<PromotionalPage />} />
          <Route path="/disease-prediction" element={<DiseasePrediction />} />
        </Routes>
        <h1>Medicine Search</h1>
        <MedicineSearch />
        <UploadComponent onUploadSuccess={handleUploadSuccess} />
        {medicineInfo && <SearchResultsComponent medicineInfo={medicineInfo} />}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
