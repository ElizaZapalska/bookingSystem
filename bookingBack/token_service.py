import secrets
from datetime import datetime, timedelta
from databaseConfig import db
from models.login_model import LoginSession
from vaidation_error import ValidationError


def create_token(username):
    token = secrets.token_urlsafe(16)
    now = datetime.now()
    exp_date = now + timedelta(seconds=600)
    save_session_db(username, token, exp_date)
    return token


def save_session_db(username, token, exp_date):
    session = LoginSession(username=username, token=token, expiration_date=exp_date)
    db.session.add(session)
    db.session.commit()


def check_session(token):
    filtered_token = LoginSession.query.filter_by(token=token).first()
    print('filtered_token', filtered_token)
    if not filtered_token:
        return ValidationError.SESSION_HAS_EXPIRED #TODO you can make custom exception here
    exp_date = filtered_token.expiration_date
    now = datetime.now()
    print('exp_date', exp_date)
    print('now', now)
    if exp_date < now:
        return ValidationError.SESSION_HAS_EXPIRED #TODO you can make custom exception here


def check_username(token):
    filtered_token = LoginSession.query.filter_by(token=token).first()
    username = filtered_token.username
    return username
