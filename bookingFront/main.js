import { loadBookedRooms, saveBookedRoom, deleteBookedRoom } from './bookings.js';
import {generateTable, setBookingEvent, setDeleteEvent, getNewDate} from "./table.js";
export {bookingEvent, loadBookedRooms}


console.log("cookies", document.cookie)
const splittedCookie = document.cookie.split('=')
console.log('splittedCookie', splittedCookie)
console.log('token', splittedCookie[1])

setBookingEvent(bookingEvent);
setDeleteEvent(deleteEvent)
loadBookedRooms(getNewDate(), generateTable);

function bookingEvent(event) {
    event.target.surname = "me";
    saveBookedRoom(event);
}

function deleteEvent(event) {
    deleteBookedRoom(event)
}