from databaseConfig import db


class LoginSession(db.Model):
    __tablename__ = "login_sessions"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    token = db.Column(db.String(50), unique=True, nullable=False)
    expiration_date = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
       return '<username=%r, token=%r, expiration_date=%r>' % (self.username, self.token, self.expiration_date)