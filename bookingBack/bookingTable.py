from bookingBack.booking import db


class Booking(db.Model):
    __tablename__ = "bookings"
    id = db.Column(db.Integer, primary_key=True)
    hour = db.Column(db.String(10), unique=False, nullable=False)
    date = db.Column(db.Date(), nullable=False)
    classroom = db.Column(db.String(40), nullable=False)
    user = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return '<Booking %r>' % self.user
