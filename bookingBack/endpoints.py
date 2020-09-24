from flask import jsonify, request
from app import app
from booking_service import get_all_bookings_DB, check_booking_DB, delete_from_DB, check_limit, check_date


@app.route('/', methods=['POST'])
def get_booked_rooms():
    bookingsDate = request.json['date']
    return jsonify(get_all_bookings_DB(bookingsDate))


@app.route('/bookRoom', methods=['POST'])
def save_bookings():
    booking = request.json
    if check_date(booking) and check_limit(booking):
        check_booking_DB(booking)
    if booking['status'] == 'newBooking':
        return jsonify(booking)
    else:
        return jsonify("you can't book this room")


@app.route('/deleteBooking', methods=['POST'])
def delete_booking():
    deleted_booking = request.json
    if check_date(deleted_booking) and (deleted_booking['status'] == "newBooking" or deleted_booking["surname"] == "me"):
        free_room = delete_from_DB(deleted_booking)
        return free_room
    else:
        return {"info": "You can't delete this booking"}
