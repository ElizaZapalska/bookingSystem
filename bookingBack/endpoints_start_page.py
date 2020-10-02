from flask import jsonify, request
from app import app
from databaseConfig import db
from user_model import User
from vaidation_error import ValidationError


@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    try:
        check_email_database(email)
        check_password(email, password)
        return jsonify({}), 204
    except Exception as error:
        exceptions = error.args
        print(exceptions[0].field)
        error_info = {
            "field": exceptions[0].field,
            "description": exceptions[0].description
        }
        return jsonify(error_info)


@app.route('/signUp', methods=['POST'])
def signUp():
    sign_up_data = {
        'username': request.json['username'],
        'email': request.json['email'],
        'password': request.json['password'],
    }
    response_body = {"errors": []}
    errors = []
    error_username = check_username(sign_up_data)
    error_email = check_email_signup(sign_up_data)
    if error_username:
        errors.append(error_username)
    if error_email:
        errors.append(error_email)
    if not errors:
        save_database(sign_up_data)
        return jsonify({}), 201
    else:
        print('errors', errors)
        for error in errors:
            error_info = {
                "field": error.field,
                "description": error.description
            }
            response_body["errors"].append(error_info)
        return jsonify(response_body), 401


def save_database(sign_up_data):
    user = User(username=sign_up_data['username'], email=sign_up_data['email'], password=sign_up_data['password'])
    db.session.add(user)
    db.session.commit()


def check_email_signup(sign_up_data):
    email = User.query.filter_by(email=sign_up_data['email']).first()
    if email:
        return ValidationError.EMAIL_TAKEN


def check_username(sign_up_data):
    username = User.query.filter_by(username=sign_up_data['username']).first()
    if username:
        return ValidationError.USERNAME_TAKEN


def check_email_database(email):
    user = User.query.filter_by(email=email).first()
    print(user)
    if not user:
        raise Exception(ValidationError.LOGIN_INCORRECT)


def check_password(email, password):
    user = User.query.filter_by(email=email).first()
    if user.password != password:
        raise Exception(ValidationError.LOGIN_PASSWORD_INCORRECT)
