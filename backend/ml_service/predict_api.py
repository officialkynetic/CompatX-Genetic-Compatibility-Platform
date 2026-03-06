from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app) # Allows your Node.js server to talk to this Python server

# Load the brain we trained in Step 2
model = joblib.load('compatx_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # The model expects a list of numbers: [Age, Gender, Family_H, Hemoglobin...]
        features = np.array(data['features']).reshape(1, -1)
        
        prediction = model.predict(features)
        
        # Return the result (0, 1, 2, 3, or 4 from your dataset)
        return jsonify({'disease_category': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000) # Python will run on port 5000