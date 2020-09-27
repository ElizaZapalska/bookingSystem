from flask import jsonify, request, render_template, redirect, url_for
from app import app


@app.route('/login', methods=['POST', 'GET'])
def login():
    print('coś')
    if request.method == 'POST':
        print('geeeeeew')
        username = request.json['username']
        password = request.json['password']
        print(username, password)
        return {"hello": "ok"}