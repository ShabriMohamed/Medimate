const mongoose = require('mongoose');

const DiabetesAwarenessDataSchema = new mongoose.Schema({
  title: String,
  content: String,
  sections: [{
    title: String,
    content: String,
  }],
  resources: [{
    title: String,
    url: String,
  }]
}, { timestamps: true });

const DiabetesAwarenessData = mongoose.model('DiabetesAwarenessData', DiabetesAwarenessDataSchema);

module.exports = DiabetesAwarenessData;
