from flask import jsonify, request
from app import app
from booking_service import get_all_bookings_DB, check_booking_DB, delete_from_DB, check_limit, check_date
from token_service import check_session, check_username


@app.route('/api/loadUserName', methods=['GET'])
def load_user_name():
    token = request.cookies.get('access-token')
    session_error = check_session(token)
    errors = []
    response_body = {"errors": []}
    if session_error:
        errors.append(session_error)
        response_body['errors'] = errors
        return jsonify(response_body), 401
    else:
        username = check_username(token)
        return username, 201


@app.route('/api/loadRooms', methods=['POST'])
def get_booked_rooms():
    bookings_date = request.json['date']
    return jsonify(get_all_bookings_DB(bookings_date))


@app.route('/api/bookRoom', methods=['POST'])
def save_bookings():
    booking = request.json
    cookies = request.cookies
    token = request.cookies.get('access-token')
    print(cookies)
    print(token)
    response_body = {'errors': []}
    errors = []
    error_session = check_session(token)
    date_error = check_date(booking)
    if error_session:
        errors.append(error_session)
    if date_error:
        errors.append(date_error)
    if not date_error and check_limit(booking):
        check_booking_DB(booking)
    if not errors and booking['status'] == 'newBooking':
        return jsonify(booking), 201
    else:
        response_body["errors"] = errors
        return jsonify(response_body), 401


@app.route('/api/deleteBooking', methods=['POST'])
def delete_booking():
    deleted_booking = request.json
    token = request.cookies.get('access-token')
    response_body = {"errors": []}
    errors = []
    error_session = check_session(token)
    date_error = check_date(deleted_booking)
    if error_session:
        errors.append(error_session)
    if date_error:
        errors.append(date_error)
    if not errors and \
            (deleted_booking['status'] == "newBooking" or deleted_booking["surname"] == check_username(token)):
        free_room = delete_from_DB(deleted_booking)
        return free_room, 201
    else:
        response_body["errors"] = errors
        return jsonify(response_body), 401
