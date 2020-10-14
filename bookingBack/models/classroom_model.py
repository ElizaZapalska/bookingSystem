from databaseConfig import db


class Classroom(db.Model):
    __tablename__ = "classrooms"
    id = db.Column(db.Integer, primary_key=True)
    classroom = db.Column(db.String(40))

    def __repr__(self):
       return '<classroom=%r>' % self.classroom


