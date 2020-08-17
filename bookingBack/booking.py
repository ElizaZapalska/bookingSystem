from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import datetime
from datetime import date

app = Flask(__name__)
CORS(app)

database = mysql.connector.connect(
    host="localhost",
    user="root",
    password="haslo",
    database="bookingsystemdb"
)

cursor = database.cursor()

'''bookedRooms = [{
"id": "26",
"date": "2020 - 08 - 08",
"time": "13:00",
"surname": "Nowak Jan",
"status": "booked"
},
{
"id": "27",
"date": "2020 - 08 - 08",
"time": "13:30",
"surname": "Nowak Jan",
"status": "booked"
}
]'''

bookedRooms = {
    "classroom": "13",
    "date": "2020 - 08 - 08",
    "hour": "13:00",
    "surname": "Nowak Jan",
    "status": "booked"
}


@app.route('/', methods=['GET'])
def sendBookedRooms():
    print('dupa')
    return jsonify(bookedRooms)


if __name__ == '__main__':
    app.run()
