import os
from flask import Flask
from flask_cors import CORS
from databaseConfig import db
from config import ProductionConfig, DevelopmentConfig
from models import booking_model, classroom_model, login_model, user_model

app = Flask(__name__)

if os.getenv('ENV') == "prod":
    app.config.from_object(ProductionConfig())
else:
    app.config.from_object(DevelopmentConfig())


CORS(app)
db.app = app
db.init_app(app)
db.create_all()
db.session.commit()


if __name__ == '__main__':
    app.run(host='0.0.0.0')

import droppingIntoDatabase
import endpoints
import endpoints_start_page
import vaidation_error





