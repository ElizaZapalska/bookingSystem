from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import datetime
from datetime import date

app = Flask(__name__)
CORS(app)


@app.route('/date', methods=['GET'])
def sendDateToday():
    request = request.json
    print('myrequestoooooooooooooooo', request)
    date_today = {
        'date': datetime.datetime.now().date()
    }
    print(dateToday)

    return jsonify(date_today)


if __name__ == '__main__':
    app.run()

