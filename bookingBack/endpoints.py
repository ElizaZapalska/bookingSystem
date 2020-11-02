from flask import jsonify, request
from app import app
from booking_service import get_all_bookings_DB, check_booking_DB, delete_from_DB, check_limit, check_date, check_name, \
    change_attributes, check_other_classrooms_this_hour
from token_service import check_session, check_username, change_exp_date


@app.route('/api/loadUserName', methods=['GET'])
def load_user_name():
    token = request.cookies.get('access-token')
    session_error = check_session(token)
    print('session_error', session_error)
    errors = []
    response_body = {"errors": []}
    if session_error:
        errors.append(session_error.description)
        response_body['errors'] = errors
        return jsonify(response_body), 440
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
    token = request.cookies.get('access-token')
    response_body = {'errors': []}
    booking["surname"] = check_username(token)
    session_error = check_session(token)
    if session_error:
        session_info = {
            "error": session_error.description
        }
        return jsonify(session_info), 440
    try:
        check_date(booking)
        check_other_classrooms_this_hour(booking, booking["surname"])
        check_limit(booking)
        booking = check_booking_DB(booking)
        return jsonify(booking), 201
    except Exception as error:
        exceptions = error.args
        response_body['errors'] = exceptions[0].description
        return jsonify(response_body), 403


@app.route('/api/deleteBooking', methods=['POST'])
def delete_booking():
    deleted_booking = request.json
    token = request.cookies.get('access-token')
    response_body = {"errors": []}
    session_error = check_session(token)
    if session_error:
        session_info = {
            "error": session_error.description
        }
        return jsonify(session_info), 440
    try:
        check_date(deleted_booking)
        check_name(deleted_booking, token)
        delete_from_DB(deleted_booking)
        change_attributes(deleted_booking)
        print(deleted_booking)
        return deleted_booking, 201
    except Exception as error:
        exceptions = error.args
        response_body['errors'] = exceptions[0].description
        return jsonify(response_body), 403


@app.route('/api/logOut', methods=['GET'])
def log_out():
    token = request.cookies.get('access-token')
    change_exp_date(token)
    return jsonify({}), 200
