export {generateTable, setBookingEvent}

const hours = [
    "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00",
    "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
    "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];


let onBookingEvent;

function setBookingEvent(event) {
    onBookingEvent = event;
}

function generateTable(savedBookings) {
    appendHours(hours);
    appendClassrooms(savedBookings);
}

function appendHours(hours) {
    const table = document.getElementById('table');
    const firstRow = document.createElement("tr");
    const tableInfo = document.createElement("th");
    tableInfo.innerText = "classrooms/hours";
    firstRow.appendChild(tableInfo);
    table.appendChild(firstRow);


    for (let hour of hours) {
        let th = document.createElement("th");
        th.innerText = hour;
        firstRow.appendChild(th);
    }
}

function appendClassrooms(savedBookings) {
    const table = document.getElementById('table');
    const savedClassrooms = savedBookings["classrooms"];
    for (let classNumber of Object.keys(savedClassrooms)) {
        console.log('classNumber', classNumber);
        let bookings = savedClassrooms[classNumber];
        console.log("bookings", bookings);
        let newRow = document.createElement("tr");
        newRow.setAttribute("classroom", classNumber);
        let classroomField = document.createElement("td");
        classroomField.innerText = classNumber;
        newRow.appendChild(classroomField);
        table.appendChild(newRow);
        drawSchedule(newRow, bookings);
    }
}

function drawSchedule(newRow, bookings) {
    for (let hour of hours) {
        const td = document.createElement('td');
        td.setAttribute('classroom', newRow.getAttribute('classroom'));
        td.setAttribute('hour', hour);
        td.setAttribute('date', '2020-09-08') //TODO: hard-coded date!
        td.onclick = onBookingEvent;
        newRow.appendChild(td);
    }
    for (let booking of bookings) {
        const bookingHour = booking.hour;
        const bookingClassroom = booking.classroom;
        const queryString = '[hour="' + bookingHour + '"][classroom="' + bookingClassroom + '"]';
        const bookedField = newRow.querySelectorAll(queryString)[0];
        bookedField.setAttribute('date', booking.date);
        bookedField.setAttribute('class', booking.status);
        bookedField.setAttribute('surname', booking.surname);
    }
}

function markAsBooked(td) {
    if (td.classList.contains("booked")) {
        td.classList.remove("booked");
        td.removeAttribute("surname");
        td.setAttribute("class", "free");
    } else {
        td.setAttribute("class", "booked");
        td.classList.remove("free");
        td.setAttribute('surname', 'user1');
    }
}