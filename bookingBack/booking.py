from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import date

app = Flask(__name__)
CORS(app)

classrooms = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
bookings_details = {}


@app.route('/', methods=['GET'])
def send_booked_rooms():
    print('dupa')
    return jsonify(booking_details)


@app.route('/bookedRooms', methods=['POST'])
def pick_up_bookings():
    bookings = request.json
    bookings_details['classrooms'] = bookings
    return bookings_details


if __name__ == '__main__':
    app.run()
