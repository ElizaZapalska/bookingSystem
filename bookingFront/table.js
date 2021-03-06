import {displayAttributes} from "./events.js";
import {config} from "./config.js";
export {getDateText, generateTable, setBookingEvent, setDeleteEvent, drawOneField, updateSchedule, setNewDate, getNewDate}
import {user_surname} from "./bookings.js";


const weekDay = document.getElementById('weekDay');
let displayedDate = new Date();
displayWeekDay(displayedDate);


const hours = [
    "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00",
    "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
    "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

let onBookingEvent;
let onDeleteEvent;

function setNewDate(date) {
    displayedDate = date;
    displayWeekDay(displayedDate);
}

function getNewDate() {
    return displayedDate
}

function getDateText(newDate) {
    const newDateText = newDate.toISOString();
    const splitText = newDateText.split('T');
    const dateText = splitText[0];
    return dateText
}

function displayWeekDay(date) {
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekDay.innerHTML = weekday[date.getDay()];
}

function setBookingEvent(event) {
    onBookingEvent = event;
}

function setDeleteEvent(event) {
    onDeleteEvent = event;
}

function generateTable(savedBookings) {
    createTable()
    appendHours(hours);
    appendClassrooms(savedBookings);
}


function createTable() {
    if (document.getElementById('table')) {
        const oldTable = document.getElementById('table');
        oldTable.remove()
        const table = document.createElement('table')
        table.setAttribute('id', 'table')
        document.body.appendChild(table)
        return table
    } else {
        const table = document.createElement('table')
        table.setAttribute('id', 'table')
        document.body.appendChild(table)
        return table
    }
}

function drawOneField(td, booking) {
    td.setAttribute('surname', booking.surname)
    td.setAttribute('bookingStatus', booking.bookingStatus)
    if (booking.surname === user_surname) {
        td.setAttribute('class', 'bookedByMe');
        td.onmouseover = () => displayAttributes(td);
    } else {
        td.setAttribute('class', booking.bookingStatus)
    }
    if (booking.bookingStatus === "free"){
        td.onclick = onBookingEvent;
    } else if (booking.bookingStatus ==="newBooking") {
        td.setAttribute('class', 'bookByMe')
    }
    else {
        td.onclick = onDeleteEvent;
    }
    if (booking.bookingStatus === 'booked'){
        td.onmouseover = () => displayAttributes(td);
    }
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
        let bookings = savedClassrooms[classNumber];
        let newRow = document.createElement("tr");
        newRow.setAttribute("classroom", classNumber);
        let classroomField = document.createElement("td");
        classroomField.innerText = classNumber;
        classroomField.setAttribute('class', 'classroomField')
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
        td.setAttribute('date', getDateText(displayedDate))
        let defaultField = {
            surname: '',
            bookingStatus: 'free',
        }
        drawOneField(td, defaultField)
        newRow.appendChild(td);
    }
    for (let booking of bookings) {
        const bookingHour = booking.hour;
        const bookingClassroom = booking.classroom;
        const queryString = '[hour="' + bookingHour + '"][classroom="' + bookingClassroom + '"]';
        const bookedField = newRow.querySelectorAll(queryString)[0];
        bookedField.setAttribute('date', booking.date);
        drawOneField(bookedField, booking)
    }
}

function updateSchedule(httpRequest, event) {
    if (httpRequest.readyState === 4) {
        console.log(httpRequest.status)
        const response = JSON.parse(httpRequest.response)
        console.log("updatescheduleresponse", response)
        if (httpRequest.status === 201) {
            if (response['bookingStatus'] === "newBooking") {
                console.log("You've booked")
                event.target.onclick = onDeleteEvent;
                drawOneField(event.target, response)
            } else if (response['bookingStatus'] === "free") {
                drawOneField(event.target, response)
            }
        } else if (httpRequest.status === 403) {
            alert(response['errors'])
        } else if (httpRequest.status === 440) {
            console.log('session has expired')
            location.replace(config.url)
        }
    }
}