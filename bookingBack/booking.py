from booking_table import Booking
from classroom_table import Classroom
from databaseConfig import db


def save_booking_DB(booking):
    new_booking = Booking(
        classroom=booking['classroom'],
        hour=booking['hour'],
        date=booking['date'],
        user='user1',
        status='booked')
    db.session.add(new_booking)
    db.session.commit()
    print(booking)


def get_all_bookings_DB(date):
    all_bookings = change_data_to_JSON_format(date)
    all_classrooms = get_all_classrooms_DB()
    booking_details = convertData(all_bookings, all_classrooms)
    return booking_details


def change_data_to_JSON_format(date):
    all_bookings = []
    bookings = Booking.query.filter_by(date=date).all()
    for booking in bookings:
        booking_json = {
            'classroom': booking.classroom,
            'hour': booking.hour,
            'date': booking.date,
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
        for booking in all_bookings:
            bookings_details['classrooms'][classroom] = classroom_details
            if booking['classroom'] == classroom:
                classroom_details.append(booking)

    print(bookings_details)
    return bookings_details