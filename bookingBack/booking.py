from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import date

app = Flask(__name__)
CORS(app)

bookings_details = {}


@app.route('/', methods=['GET'])
def send_booked_rooms():
    return jsonify(bookings_details)


@app.route('/bookedRooms', methods=['POST'])
def pick_up_bookings():
    bookings = request.json
    bookings_details['classrooms'] = bookings
    print(bookings_details)
    return bookings_details


if __name__ == '__main__':
    app.run()
