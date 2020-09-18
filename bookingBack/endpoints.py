from flask import jsonify, request

from app import app
from booking import save_booking_DB, get_all_bookings_DB, check_booking_DB


@app.route('/', methods=['GET'])
def get_booked_rooms():
    #TODO: change this "hard-coded" date
    return jsonify(get_all_bookings_DB('2020-09-08'))


@app.route('/bookRoom', methods=['POST'])
def save_bookings():
    booking = request.json
    print('booking', booking)
    boolean_status = check_booking_DB(booking)
    return boolean_status

