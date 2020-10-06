import secrets
from datetime import datetime, timedelta
from databaseConfig import db
from models.login_model import LoginSession


def create_token(username):
    token = secrets.token_urlsafe(16)
    now = datetime.now()
    exp_date = now + timedelta(seconds=900)
    save_session_db(username, token, exp_date)
    return token


def save_session_db(username, token, exp_date):
    session = LoginSession(username=username, token=token, expiration_date=exp_date)
    db.session.add(session)
    db.session.commit()