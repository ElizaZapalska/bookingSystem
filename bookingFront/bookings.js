
export {loadBookedRooms, loadUserName, saveBookedRoom, deleteBookedRoom };
import {updateSchedule, getDateText} from "./table.js";
import {config} from "./config.js";

let user_surname = "me";


let url = config.url

function loadBookedRooms(date, callback) {
    const dateConfiguration = {
        date : getDateText(date)
    }
    console.log('dateConfiguration', dateConfiguration)
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', url + "/api/loadRooms");
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

function loadUserName() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url + "/api/loadUserName");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send();
    httpRequest.onreadystatechange = () => setUserName(httpRequest);
}

function setUserName(httpRequest) {
    if (httpRequest.readyState === 4) {
        console.log("username", httpRequest.response);
        const userName = JSON.parse(httpRequest.response);
        document.getElementById("welcome").innerHTML = "welcome" + userName;
    }
}
function sendBookedRoom(payload, event) {
    console.log('request', payload);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', url + "/api/bookRoom");
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
    httpRequest.open('POST', url + "/api/deleteBooking");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(deletedBooking));
    httpRequest.onreadystatechange = () => updateSchedule(httpRequest, event)

}