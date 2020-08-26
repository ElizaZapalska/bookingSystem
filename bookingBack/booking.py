from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import date

app = Flask(__name__)
CORS(app)

bookings_details = {
    "classrooms": {
        "4": [
            {"hour": "6:30", "classroom": "4", "date": "2020-09-08", "surname": "Wojtas", "status": "booked"},
            {"hour": "14:00", "classroom": "4", "date": "2020-09-08", "surname": "Wojtas", "status": "booked"}],
        "7": [
            {"hour": "6:30", "classroom": "7", "date": "2020-09-08", "surname": "Eliz", "status": "booked"},
            {"hour": "7:00", "classroom": "7", "date": "2020-09-08", "surname": "Eliz", "status": "booked"}],
        "8": [
            {"hour": "10:30", "classroom": "8", "date": "2020-09-08", "surname": "Golaz", "status": "booked"},
            {"hour": "11:00", "classroom": "8", "date": "2020-09-08", "surname": "Golaz", "status": "booked"}],
        "11": []
    }

}
classrooms = ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']


@app.route('/', methods=['GET'])
def send_booked_rooms():
    return jsonify(bookings_details)


@app.route('/bookedRooms', methods=['POST'])
def pick_up_bookings():
    bookings = request.json
    print('dupa')
    bookings_details['classrooms'] = bookings
    print("bookings_details", bookings_details)
    return bookings_details


if __name__ == '__main__':
    app.run()
