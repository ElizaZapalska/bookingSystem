from datetime import datetime
from os.path import exists

from booking_table import Booking
from classroom_table import Classroom
from databaseConfig import db

user_surname = 'me'


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
    print('dateeeeee', date)
    bookings = Booking.query.filter_by(date=date).all()
    for booking in bookings:
        booking_json = {
            'classroom': booking.classroom,
            'hour': booking.hour,
            'date': booking.date.isoformat(),
            'surname': booking.user,
            'status': booking.status
        }
        print('booking_json', booking_json)
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
        for booking in all_bookings:
            bookings_details['classrooms'][classroom] = classroom_details
            if booking['classroom'] == classroom:
                classroom_details.append(booking)

    print(bookings_details)
    return bookings_details


def check_booking_DB(booking):
    # TODO: change this, there is another way to reformat date
    filtered_booking = Booking.query.filter_by(date=booking['date'], classroom=booking['classroom'],
                                               hour=booking['hour']).first()
    print(filtered_booking)
    if not filtered_booking:
        booking['surname'] = user_surname
        booking['status'] = 'booked'
        save_booking_DB(booking)
        print('success')
        return 'True'
    elif booking['classroom'] == filtered_booking.classroom:
        print('I cant accept this')
        return 'False'
