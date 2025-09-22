const mongoose = require('mongoose');

const hypertensionAwarenessSchema = new mongoose.Schema({
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

const HypertensionAwarenessData = mongoose.model('HypertensionAwarenessData', hypertensionAwarenessSchema);

module.exports = HypertensionAwarenessData;
