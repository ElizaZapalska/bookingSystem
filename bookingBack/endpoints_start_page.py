from flask import jsonify, request
from app import app


@app.route('/login', methods=['POST'])
def login():
    print('coś')
    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']
        print(email, password)
        return {'hello': 'ej'}


@app.route('/signUp', methods=['POST'])
def signUp():
    print('coś')
    if request.method == 'POST':
        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        confirmed_password = request.json['confirm']

        print(username, password)
        return {"hello": "ok"}
