const mongoose = require('mongoose');

const cholesterolAwarenessSchema = new mongoose.Schema({
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

const CholesterolAwarenessData = mongoose.model('CholesterolAwarenessData', cholesterolAwarenessSchema);

module.exports = CholesterolAwarenessData;
