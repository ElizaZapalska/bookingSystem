
database = mysql.connector.connect(
    host="localhost",
    user="root",
    password="haslo",
    database="bookingsystemdb"
)

cursor = database.cursor()
cursor.execute("CREATE TABLE bookings (id INT AUTO_INCREMENT PRIMARY KEY, hour VARCHAR(255), date DATE,"
               " classroom VARCHAR(225), user VARCHAR(225), status ENUM('booked', 'free'))")