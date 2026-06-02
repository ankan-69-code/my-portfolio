from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize the Python Backend App
app = Flask(__name__)
CORS(app) # This allows your HTML file to securely talk to your Python API

# Create an endpoint to receive the contact form data
@app.route('/api/contact', methods=['POST'])
def handle_contact():
    # Extract the JSON data sent from script.js
    data = request.json
    
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # In a production environment, you would hook this up to Python's smtplib 
    # to actually forward the email to ankankarmakar061@gmail.com. 
    # For now, it successfully logs the interception on your local server.
    print(f"\n--- NEW TRANSMISSION RECEIVED ---")
    print(f"From: {name} ({email})")
    print(f"Message: {message}")
    print(f"---------------------------------\n")
    
    # Send a success response back to the frontend
    return jsonify({
        "status": "success", 
        "message": "Transmission logged successfully."
    }), 200

if __name__ == '__main__':
    # Starts the server on port 5000
    print("Backend server is running on http://localhost:5000")
    app.run(port=5000, debug=True)
