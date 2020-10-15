from flask import jsonify, request
from app import app
from booking_service import get_all_bookings_DB, check_booking_DB, delete_from_DB, check_limit, check_date
from token_service import check_session
from vaidation_error import ValidationError


@app.route('/api/loadUserName', methods=['GET'])
def load_user_name():
    token = request.cookies.get('access-token')
    username = check_session(token)
    if username != ValidationError.SESSION_HAS_EXPIRED:
        return jsonify(username)
    else:
        return jsonify('session has expired')


@app.route('/api/loadRooms', methods=['POST'])
def get_booked_rooms():
    bookings_date = request.json['date']
    return jsonify(get_all_bookings_DB(bookings_date))


@app.route('/api/bookRoom', methods=['POST'])
def save_bookings():
    booking = request.json
    print("booking,", booking)
    cookies = request.cookies
    token = request.cookies.get('access-token')
    print(cookies)
    print(token)
    username = check_session(token)
    if username != ValidationError.SESSION_HAS_EXPIRED:
        booking['surname'] = username
    else:
        return jsonify('session has expired')

    if check_date(booking) and check_limit(booking):
        check_booking_DB(booking)
    if booking['status'] == 'newBooking':
        return jsonify(booking)
    else:
        return jsonify("you can't book this room")


@app.route('/api/deleteBooking', methods=['POST'])
def delete_booking():
    deleted_booking = request.json
    token = request.cookies.get('access-token')
    username = check_session(token)
    if username != ValidationError.SESSION_HAS_EXPIRED:
        deleted_booking['surname'] = username
    else:
        return jsonify('session has expired')

    if check_date(deleted_booking) and (deleted_booking['status'] == "newBooking" or deleted_booking["surname"] == "me"):
        free_room = delete_from_DB(deleted_booking)
        return free_room
    else:
        return {"info": "You can't delete this booking"}
