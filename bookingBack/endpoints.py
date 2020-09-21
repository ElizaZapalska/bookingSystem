from flask import jsonify, request
from app import app
from booking import get_all_bookings_DB, check_booking_DB, delete_from_DB


@app.route('/', methods=['GET'])
def get_booked_rooms():
    # TODO: change this "hard-coded" date
    return jsonify(get_all_bookings_DB('2020-09-08'))


@app.route('/bookRoom', methods=['POST'])
def save_bookings():
    booking = request.json
    check_booking_DB(booking)
    if booking['status'] == 'newBooking':
        return jsonify(booking)
    else:
        return 'You cant book this room'


@app.route('/deleteBooking', methods=['POST'])
def delete_booking():
    deleted_booking = request.json
    print("deleted_booking", deleted_booking)
    if deleted_booking['status'] == "newBooking" or deleted_booking["surname"] == "me":
        free_room = delete_from_DB(deleted_booking)
        print('free_room', free_room)
        return free_room
    else:
        return "You can't delete this booking"
