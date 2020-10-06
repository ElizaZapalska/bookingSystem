from models.classroom_model import Classroom
from databaseConfig import db
from models.booking_model import Booking


bookings_details = {
    "classrooms": {
        "4": [
            {"hour": "6:30", "classroom": "4", "date": "2020-09-08", "surname": "Wojtas", "status": "booked"},
            {"hour": "14:00", "classroom": "4", "date": "2020-09-08", "surname": "Wojtas", "status": "booked"}],
        "5": [],
        "6": [],
        "7": [
            {"hour": "6:30", "classroom": "7", "date": "2020-09-08", "surname": "Eliz", "status": "booked"},
            {"hour": "7:00", "classroom": "7", "date": "2020-09-08", "surname": "Eliz", "status": "booked"}],
        "8": [
            {"hour": "10:30", "classroom": "8", "date": "2020-09-08", "surname": "Golaz", "status": "booked"},
            {"hour": "11:00", "classroom": "8", "date": "2020-09-08", "surname": "Golaz", "status": "booked"}],
        "9": [],
        "10": [],
        "11": [],
        "12": []
    }

}

all_classrooms = ['4', '5', '6', '7', '8', '9', '10', '11', '12', 'aula', 'concert hall']

bookings = bookings_details["classrooms"]

for key in bookings:
    one_booking = bookings[key]

    for booking in one_booking:
        newBooking = Booking(
            classroom=booking['classroom'],
            hour=booking['hour'],
            date=booking['date'],
            user=booking['surname'],
            status=booking['status'])
        db.session.add(newBooking)

db.session.commit()

for classroom in all_classrooms:
    newClassroom = Classroom(
        classroom=classroom
    )
    db.session.add(newClassroom)

db.session.commit()


