from flask import jsonify, request
from app import app
from booking_service import get_all_bookings_DB, check_booking_DB, delete_from_DB, check_limit, check_date, check_name
from token_service import check_session, check_username


@app.route('/api/loadUserName', methods=['GET'])
def load_user_name():
    token = request.cookies.get('access-token')
    #token = "Hx38mTjebo3_d8tOtE4fHQ" #TODO delete this
    session_error = check_session(token)
    errors = []
    response_body = {"errors": []}
    if session_error:
        errors.append(session_error)
        response_body['errors'] = errors
        return jsonify(response_body), 401
    else:
        username = check_username(token)
        username_info = {
            "username": username
        }
        return jsonify(username_info), 200


@app.route('/api/loadRooms', methods=['POST'])
def get_booked_rooms():
    bookings_date = request.json['date']
    return jsonify(get_all_bookings_DB(bookings_date))


@app.route('/api/bookRoom', methods=['POST'])
def save_bookings():
    booking = request.json
    cookies = request.cookies
    token = request.cookies.get('access-token')
    #token = "Hx38mTjebo3_d8tOtE4fHQ" #TODO delete this
    print(cookies)
    print(token)
    response_body = {'errors': []}
    errors = []
    error_session = check_session(token)
    date_error = check_date(booking)
    limit_error = check_limit(booking)
    database_error = check_booking_DB(booking)
    if error_session:
        errors.append(error_session.description)
    if date_error:
        errors.append(date_error.description)
    if limit_error:
        errors.append(limit_error.description)
    if database_error:
        errors.append(database_error.description)
    if not errors:
        return jsonify(booking), 200
    else:
        response_body["errors"] = errors
        print('errors', response_body)
        return jsonify(response_body), 401


@app.route('/api/deleteBooking', methods=['POST'])
def delete_booking():
    deleted_booking = request.json
    token = request.cookies.get('access-token')
    #token = "Hx38mTjebo3_d8tOtE4fHQ" #TODO delete this
    response_body = {"errors": []}
    errors = []
    error_session = check_session(token)
    date_error = check_date(deleted_booking)
    name_error = check_name(deleted_booking, token)
    if error_session:
        errors.append(error_session.description)
    if date_error:
        errors.append(date_error.description)
    if name_error:
        errors.append(name_error.description)
    if not errors:
        free_room = delete_from_DB(deleted_booking)
        return free_room, 200
    else:
        response_body["errors"] = errors
        print('errors', response_body)
        return jsonify(response_body), 401
