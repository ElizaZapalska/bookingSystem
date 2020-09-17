from databaseConfig import db


class Booking(db.Model):
    __tablename__ = "bookings"
    id = db.Column(db.Integer, primary_key=True)
    classroom = db.Column(db.String(40))
    hour = db.Column(db.String(10), unique=False)
    date = db.Column(db.Date(), nullable=True)
    user = db.Column(db.String(50))
    status = db.Column(db.String(10))

    def __repr__(self):
       return '<Booking id=%r, classroom=%r, hour=%r, date=%r, user=%r, status=%r>'\
              % (self.id, self.classroom, self.hour, self.date, self.user, self.status)
