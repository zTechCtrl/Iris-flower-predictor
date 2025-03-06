from flask import Flask, request, jsonify
from flask_cors import CORS  # Allows frontend to call backend
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # ✅ Allow frontend to call this backend

# ✅ Define the /predict routem
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Get input from frontend
        features = np.array(data['features']).reshape(1, -1)
        model = joblib.load('iris_model.pkl')  # Load trained model
        prediction = model.predict(features)[0]  # Get prediction result

        return jsonify({'prediction': int(prediction)})  # Return prediction
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
