import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from bookingBack.bookingTable import Booking

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:haslo@localhost/bookingsystemdb?host=localhost?port=3306"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

db.create_all()

newBooking = Booking(hour='6:30', classroom=4)

userSurname = "Sznuruwa"
bookings_details = {
    "classrooms": {
        "4": [
            {"hour": "6:30", "classroom": "4", "date": "2020-09-08", "surname": "Wojtas", "status": "booked"},
            {"hour": "14:00", "classroom": "4", "date": "2020-09-08", "surname": "Wojtas", "status": "booked"}],
        "5": [],
        "6": [],
        "7": [
            {"hour": "6:30", "classroom": "7", "date": "2020-09-08", "surname": "Eliz", "status": "booked"},
            {"hour": "7:00", "classroom": "7", "date": "2020-09-08", "surname": "Eliz", "status": "booked"}],
        "8": [
            {"hour": "10:30", "classroom": "8", "date": "2020-09-08", "surname": "Golaz", "status": "booked"},
            {"hour": "11:00", "classroom": "8", "date": "2020-09-08", "surname": "Golaz", "status": "booked"}],
        "9": [],
        "10": [],
        "11": [],
        "12": []
    }

}


@app.route('/', methods=['GET'])
def send_booked_rooms():
    return jsonify(bookings_details)


@app.route('/bookedRoom', methods=['POST'])
def pick_up_bookings():
    booking = request.json
    print(booking)

    return booking


if __name__ == '__main__':
    app.run()
