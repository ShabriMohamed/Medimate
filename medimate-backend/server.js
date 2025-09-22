// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const { PythonShell } = require('python-shell');
const Medicine = require('./models/medicine');
const DiabetesAwarenessData = require('./models/DiabetesAwarenessData'); // Import the model
const CholesterolAwarenessData = require('./models/CholesterolAwarenessData'); 
const HypertensionAwarenessData = require('./models/HypertensionAwarenessData');
const Feedback = require('./models/Feedback'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB using 127.0.0.1
mongoose.connect('mongodb://127.0.0.1:27017/medicine_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

let model; // Declare the model variable

// Load the TensorFlow model
const loadModel = async () => {
  try {
    model = await tf.loadLayersModel('file://./model/model.json');
    console.log('Model loaded successfully.');
    startServer(); // Start the server after the model is loaded
  } catch (error) {
    console.error('Error loading the model:', error);
    process.exit(1); // Exit the process if the model fails to load
  }
};

// Define class names for mapping model predictions to human-readable labels
const classNames = ['Metformin', 'Gliclazide', 'Sitagliptin', 'Telmisartan', 'Losartan', 'Atorvastatin', 'Rosuvastatin']; // Adjust according to your model

// Define route for image upload and prediction
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Read and process the uploaded image
    const imageBuffer = fs.readFileSync(req.file.path);
    const tfimage = tf.node.decodeImage(imageBuffer, 3);
    const resized = tf.image.resizeBilinear(tfimage, [224, 224]).div(tf.scalar(255)).expandDims(0);

    // Make predictions using the model
    const predictions = await model.predict(resized).data();
    const predictedClassIndex = predictions.indexOf(Math.max(...predictions));
    const predictedClassName = classNames[predictedClassIndex];

    // Find medicine information from MongoDB based on predicted class name
    const medicineInfo = await Medicine.findOne({ medical_name: predictedClassName });

    if (!medicineInfo) {
      return res.status(404).send('Medicine information not found.');
    }

    res.json({
      message: 'Prediction and medicine info retrieval successful',
      predictedClassName,
      medicineInfo
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image.');
  } finally {
    // Clean up: Delete the uploaded file
    fs.unlinkSync(req.file.path);
  }
});

// Route for inserting feedback into MongoDB
app.post('/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({
      name,
      email,
      message
    });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error inserting feedback:', error);
    res.status(500).send('Error inserting feedback.');
  }
});

// Route for fetching diabetes awareness data
app.get('/diabetes-awareness', async (req, res) => {
  try {
    const data = await DiabetesAwarenessData.find({});
    res.json(data);
  } catch (error) {
    console.error('Error fetching diabetes awareness data:', error);
    res.status(500).send('Error fetching data.');
  }
});

// Route for fetching cholesterol awareness data
app.get('/cholesterol-awareness', async (req, res) => {
  try {
    const data = await CholesterolAwarenessData.find({});
    res.json(data);
  } catch (error) {
    console.error('Error fetching cholesterol awareness data:', error);
    res.status(500).send('Error fetching data.');
  }
});

// Route for fetching hypertension awareness data
app.get('/hypertension-awareness', async (req, res) => {
  try {
    const data = await HypertensionAwarenessData.find({});
    res.json(data);
  } catch (error) {
    console.error('Error fetching hypertension awareness data:', error);
    res.status(500).send('Error fetching data.');
  }
});

// Search endpoint for medicines
app.get('/medicines/search', async (req, res) => {
  const searchQuery = req.query.name;
  if (!searchQuery) {
    return res.status(400).json({ message: "Query parameter 'name' is required." });
  }
  try {
    const results = await Medicine.find({
      medical_name: { $regex: searchQuery, $options: "i" },
    });
    res.json(results);
  } catch (error) {
    console.error('Error searching medicines:', error);
    res.status(500).send('Error searching for medicines.');
  }
});

// Update the predict-disease route in Node.js server
app.post('/predict-disease', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5001/predict', req.body); // Update URL
    res.json(response.data);
  } catch (error) {
    console.error('Error making prediction:', error);
    res.status(500).send('Error making prediction');
  }
});

app.post('/predict-diabetes', async (req, res) => {
  try {
    const response = await axios.post('http://127.0.0.1:5001/predict_diabetes', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error making prediction:', error);
    res.status(500).send('Error making prediction');
  }
});

// Function to start the server
function startServer() {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

// Load the TensorFlow model when the application starts
loadModel();
