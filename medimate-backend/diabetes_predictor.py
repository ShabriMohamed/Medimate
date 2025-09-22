# diabetes_predictor.py

from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the Random Forest Classifier model
model_path = './saved_model/diabetes-model.pkl'
classifier = pickle.load(open(model_path, 'rb'))

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    glucose = data.get('glucose')
    bp = data.get('bloodpressure')
    st = data.get('skinthickness')
    insulin = data.get('insulin')
    bmi = data.get('bmi')
    dpf = data.get('dpf')
    age = data.get('age')
    
    if None in [glucose, bp, st, insulin, bmi, dpf, age]:
        return jsonify({'error': 'Invalid input'}), 400
    
    input_data = np.array([[glucose, bp, st, insulin, bmi, dpf, age]])
    prediction = classifier.predict(input_data)
    
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
