import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress, Button, styled } from '@mui/material';
import { motion } from 'framer-motion'; 
import SearchResultsComponent from './SearchResultsComponent';
import uploadImageGif from './assets/upload-image.gif'; 


const DropzoneBox = styled(Box)({
  border: '2px dashed #cccccc',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '#f9f9f9',
});

const UploadComponent = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [medicineInfo, setMedicineInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(URL.createObjectURL(file)); 

    const formData = new FormData();
    formData.append('image', file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMedicineInfo(response.data.medicineInfo);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const clearResults = () => {
    setUploadedImage(null);
    setMedicineInfo(null);
    setError(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          Search Your Medicine by Uploading an Image
        </Typography>
        <img src={uploadImageGif} alt="Upload Image" style={{ maxWidth: '20%', height: 'auto' }} />
        <DropzoneBox {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography variant="h6" sx={{ marginBottom: '10px', color: '#555555' }}>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              'Drag \'n\' drop an image here, or click to select an image'
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '20px' }}>
            Upload an image of a medicine package to search for related information.
          </Typography>
        </DropzoneBox>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '20px' }}
        >
         
        </motion.div>
      </motion.div>
      {uploadedImage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '20px' }}
        >
          <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </motion.div>
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '10px' }}
        >
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </motion.div>
      )}
      {medicineInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <SearchResultsComponent medicineInfo={medicineInfo} uploadedImage={uploadedImage} />
          <Button onClick={clearResults} variant="outlined" sx={{ marginTop: '10px' }}>
            Clear Results
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default UploadComponent;
