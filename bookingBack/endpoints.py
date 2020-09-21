from flask import jsonify, request
from app import app
from booking import get_all_bookings_DB, check_booking_DB, delete_from_DB


@app.route('/', methods=['POST'])
def get_booked_rooms():
    bookingsDate = request.json['date']
    return jsonify(get_all_bookings_DB(bookingsDate))


@app.route('/bookRoom', methods=['POST'])
def save_bookings():
    booking = request.json
    check_booking_DB(booking)
    if booking['status'] == 'newBooking':
        return jsonify(booking)
    else:
        return {"info": "You can't book this room"}


@app.route('/deleteBooking', methods=['POST'])
def delete_booking():
    deleted_booking = request.json
    if deleted_booking['status'] == "newBooking" or deleted_booking["surname"] == "me":
        free_room = delete_from_DB(deleted_booking)
        return free_room
    else:
        return {"info": "You can't delete this booking"}
