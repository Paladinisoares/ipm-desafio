from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/users', methods=['GET'])
def get_users():
    page = request.args.get('page', default=1, type=int)
    results_per_page = 8
    response = requests.get(f"https://randomuser.me/api/?results={results_per_page}&page={page}")
    
    if response.status_code == 200:
        data = response.json()
        users = [
            {
                "name": f"{user['name']['first']} {user['name']['last']}",
                "email": user['email'],
                "picture": user['picture']['medium']
            } for user in data['results']
        ]
        return jsonify({"users": users, "page": page})
    else:
        return jsonify({"error": "Não foi possível obter os dados."}), 500

if __name__ == '__main__':
    app.run(debug=True)