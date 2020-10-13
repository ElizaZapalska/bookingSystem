from flask import Flask
from flask_cors import CORS
from databaseConfig import db
from models import booking_model, classroom_model, login_model, user_model

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:haslo@db-container/bookingsystemdb"
CORS(app)
db.app = app
db.init_app(app)
db.create_all()
db.session.commit()


if __name__ == '__main__':
    app.run()

import endpoints
import endpoints_start_page
import vaidation_error
