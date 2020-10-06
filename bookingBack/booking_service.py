from datetime import datetime
from models.booking_model import Booking
from models.classroom_model import Classroom
from databaseConfig import db


def save_booking_DB(booking):
    new_booking = Booking(
        classroom=booking['classroom'],
        hour=booking['hour'],
        date=booking['date'],
        user=booking['surname'],
        status=booking['status'])

    db.session.add(new_booking)
    db.session.commit()
    return new_booking


def get_all_bookings_DB(date):
    all_bookings = change_data_to_JSON_format(date)
    all_classrooms = get_all_classrooms_DB()
    booking_details = convertData(all_bookings, all_classrooms)
    return booking_details


def change_data_to_JSON_format(date):
    all_bookings = []
    print('date', date)
    bookings = Booking.query.filter_by(date=date).all()
    for booking in bookings:
        booking_json = {
            'classroom': booking.classroom,
            'hour': booking.hour,
            'date': booking.date.isoformat(),
            'surname': booking.user,
            'status': booking.status
        }
        all_bookings.append(booking_json)

    return all_bookings


def get_all_classrooms_DB():
    all_classrooms = []
    classrooms = Classroom.query.all()
    for classroom_object in classrooms:
        classroom = classroom_object.classroom
        all_classrooms.append(classroom)
    return all_classrooms


def convertData(all_bookings, all_classrooms):
    bookings_details = {'classrooms': {}}

    for classroom in all_classrooms:
        classroom_details = []
        bookings_details['classrooms'][classroom] = classroom_details
        for booking in all_bookings:

            if booking['classroom'] == classroom:
                classroom_details.append(booking)

    print(bookings_details)
    return bookings_details


def check_booking_DB(booking):
    filtered_booking = Booking.query.filter_by(date=booking['date'], classroom=booking['classroom'],
                                               hour=booking['hour']).first()
    if not filtered_booking:
        booking['status'] = 'booked'
        save_booking_DB(booking)
        booking['status'] = 'newBooking'
        return booking
    else:
        return KeyError


def check_limit(booking):
    checked_bookings = Booking.query.filter_by(date=booking['date'], user=booking['surname']).all()
    if len(checked_bookings) > 3:
        return False
    else:
        return True


def check_date(booking):
    date_today = datetime.today().now()
    time_today = datetime.today().time()
    date_booking = datetime.strptime(booking['date']+booking['hour'], '%Y-%m-%d%H:%M')
    time_booking = datetime.time(date_booking)

    delta_days = date_booking - date_today
    print('weekday', date_booking.weekday(), 'weekday', date_today.weekday())

    split_delta_days_text = str(delta_days).split(' ')
    days = split_delta_days_text[0]
    print('days', days)
    if ":" in days:
        days = 0
    if int(days) > -1:
        return True
    elif int(days) == -1 and date_booking.weekday() > date_today.weekday():
        if time_booking > time_today:
            return True
    elif int(days) == -1 and date_booking.weekday() < date_today.weekday():
        return False
    else:
        return False


def delete_from_DB(deleted_booking):
    check_date(deleted_booking)
    filtered_booking = Booking.query.filter_by(date=deleted_booking['date'], classroom=deleted_booking['classroom'],
                                               hour=deleted_booking['hour']).first()
    print('filtered_booking', filtered_booking)
    db.session.delete(filtered_booking)
    db.session.commit()

    deleted_booking['status'] = "free"
    deleted_booking["surname"] = ""
    return deleted_booking
