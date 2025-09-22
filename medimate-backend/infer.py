import sys
import json
import pandas as pd
from joblib import load

def predict_disease(symptoms):
    df_test = pd.DataFrame([symptoms])
    clf = load("./saved_model/random_forest.joblib")  # Adjust the path to your saved model
    result = clf.predict(df_test)
    return result[0]

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Error: No symptoms provided.")
        sys.exit(1)

    symptoms = json.loads(sys.argv[1])
    predicted_disease = predict_disease(symptoms)
    print(predicted_disease);