
from flask import jsonify, request
from app import app
from databaseConfig import db
from encryption import encrypt_password, check_encrypted_password
from token_service import create_token
from models.user_model import User
from vaidation_error import ValidationError


@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    try:
        check_email_database(email)
        check_password(email, password)
        user = User.query.filter_by(email=email).first()
        username = user.username
        login_info = {
            "info": "log in",
            "user": username,
            "token": create_token(username)
        }
        
        return jsonify(login_info), 201, {"Set-Cookie": "access-token=%s; Path=/;" % login_info["token"]}
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
        'confirm': request.json['confirm']
    }
    response_body = {"errors": []}
    errors = []
    error_syntax_username = check_syntax_username(sign_up_data)
    error_username = check_username(sign_up_data)
    error_email = check_email_signup(sign_up_data)
    error_syntax_email = check_email_syntax(sign_up_data)
    error_password = check_sign_up_password(sign_up_data)
    error_confirm = check_passwords_are_same(sign_up_data)
    if error_syntax_username:
        errors.append(error_syntax_username)
    if error_username:
        errors.append(error_username)
    if error_email:
        errors.append(error_email)
    if error_syntax_email:
        errors.append(error_syntax_email)
    if error_password:
        errors.append(error_password)
    if error_confirm:
        errors.append(error_confirm)
    if not errors:
        save_database(sign_up_data)
        return jsonify({"info": "sign up"}), 201
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
    encrypted_password = encrypt_password(sign_up_data['password'])
    user = User(username=sign_up_data['username'], email=sign_up_data['email'], password=encrypted_password)
    db.session.add(user)
    db.session.commit()


def check_username(sign_up_data):
    username = User.query.filter_by(username=sign_up_data['username']).first()
    if username:
        return ValidationError.USERNAME_TAKEN


def check_syntax_username(sign_up_data):
    username = sign_up_data['username']
    characters = [" ", ".", "&", "=", "<", ">", "+", ","]
    if any(x in username for x in characters):
        return ValidationError.USERNAME_SYNTAX


def check_email_signup(sign_up_data):
    email = User.query.filter_by(email=sign_up_data['email']).first()
    if email:
        return ValidationError.EMAIL_TAKEN


def check_email_syntax(sign_up_data):
    email = sign_up_data["email"]
    if "@" not in email:
        return ValidationError.EMAIL_SYNTAX


def check_sign_up_password(sign_up_data):
    password = sign_up_data["password"]
    if len(password) < 8:
        return ValidationError.PASSWORD_LENGTH


def check_passwords_are_same(sign_up_data):
    password = sign_up_data["password"]
    confirm_password = sign_up_data["confirm"]
    if password != confirm_password:
        return ValidationError.PASSWORDS_NOT_SAME


def check_email_database(email):
    user = User.query.filter_by(email=email).first()
    print(user)
    if not user:
        raise Exception(ValidationError.LOGIN_INCORRECT)


def check_password(email, password):
    user = User.query.filter_by(email=email).first()
    if not check_encrypted_password(password, user.password):
        raise Exception(ValidationError.LOGIN_PASSWORD_INCORRECT)
