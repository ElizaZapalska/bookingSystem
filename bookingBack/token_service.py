import secrets
from datetime import datetime, timedelta
from databaseConfig import db
from login_model import LoginSession


def create_token(username):
    token = secrets.token_urlsafe(16)
    exp_date = datetime.now()
    print(exp_date)
    exp_date += timedelta(seconds=900)
    print(exp_date)
    save_session_db(username, token, exp_date)
    return token


def save_session_db(username, token, exp_date):
    session = LoginSession(username=username, token=token, expiration_date=exp_date)
    db.session.add(session)
    db.session.commit()