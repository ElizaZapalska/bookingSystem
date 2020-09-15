from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db
from bookingTable import Booking


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:haslo@localhost/bookingsystemdb?host=localhost?port=3306"
CORS(app)
db.app = app
db.init_app(app)

db.create_all()

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

bookings = bookings_details["classrooms"]

for key in bookings:
    one_booking = bookings[key]

    for booking in one_booking:
        newBooking = Booking(
            classroom=booking['classroom'],
            hour=booking['hour'],
            date=booking['date'],
            user=booking['surname'],
            status=booking['status'])
        db.session.add(newBooking)

db.session.commit()

userSurname = "Sznuruwa"

query = Booking.query.all()
print(query[0])


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
