from flask import jsonify, request
from app import app
from databaseConfig import db
from user_model import User


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
    sign_up_data = {
        'username': request.json['username'],
        'email': request.json['email'],
        'password': request.json['password'],
    }
    db_info = checkInDatabase(sign_up_data)
    if db_info == "Success":
        saveDatabase(sign_up_data)
    return jsonify({"info": db_info})


def saveDatabase(sign_up_data):
    user = User(username=sign_up_data['username'], email=sign_up_data['email'], password=sign_up_data['password'])
    db.session.add(user)
    db.session.commit()


def checkInDatabase(sign_up_data):
    user = User.query.filter_by(email=sign_up_data['email']).first()
    print(user)
    if user:
        print("User with such e-mail already exists")
        return "User with such e-mail already exists"
    else:
        print("Success")
        return "Success"
