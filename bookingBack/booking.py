from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import datetime
from datetime import date

app = Flask(__name__)
CORS(app)


@app.route('/date', methods=['GET'])
def sendDateToday():
    date = datetime.datetime.now().date()
    date_today = {
        'date': date
    }
    print(date_today)

    return jsonify(date_today)


if __name__ == '__main__':
    app.run()

