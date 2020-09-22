
export {loadBookedRooms, saveBookedRoom, deleteBookedRoom };
import {updateSchedule, getDateText} from "./table.js";

let user_surname = "me";

function loadBookedRooms(date, callback) {
    const dateConfiguration = {
        date : getDateText(date)
    }
    console.log('dateConfiguration', dateConfiguration)
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://127.0.0.1:5000/");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(dateConfiguration));
    httpRequest.onreadystatechange = () => parseBookingResponse(httpRequest, callback);
}

function parseBookingResponse(httpRequest, callback) {
    if (httpRequest.readyState === 4) {
        console.log(httpRequest.response);
        const savedBookings = JSON.parse(httpRequest.response);
        console.log('savedBookings', savedBookings);
        callback(savedBookings);
    }
}

function sendBookedRoom(payload, event) {
    console.log('request', payload);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://127.0.0.1:5000/bookRoom");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(payload));
    httpRequest.onreadystatechange = () => updateSchedule(httpRequest, event);

}

function saveBookedRoom(event) {
    const bookedRoom = {
        classroom: event.target.getAttribute('classroom'),
        hour: event.target.getAttribute('hour'),
        date: event.target.getAttribute('date'),
        surname: user_surname,
        status: event.target.getAttribute('status')
    }
    sendBookedRoom(bookedRoom, event)
}

function deleteBookedRoom(event) {
    const deletedBooking = {
        'classroom': event.target.getAttribute('classroom'),
        'hour': event.target.getAttribute('hour'),
        'date': event.target.getAttribute('date'),
        'surname': event.target.getAttribute('surname'),
        'status': event.target.getAttribute('status'),
    }
    deleteBooking(deletedBooking, event )
}



function deleteBooking(deletedBooking, event) {
    console.log('deletedBooking', deletedBooking)
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://127.0.0.1:5000/deleteBooking");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(deletedBooking));
    httpRequest.onreadystatechange = () => updateSchedule(httpRequest, event)

}