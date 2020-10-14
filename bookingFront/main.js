import { loadBookedRooms, saveBookedRoom, deleteBookedRoom } from './bookings.js';
import {generateTable, setBookingEvent, setDeleteEvent, getNewDate} from "./table.js";
export {bookingEvent, loadBookedRooms}


console.log("cookies", document.cookie)
console.log(document.cookie[0])
const splittedCookie = document.cookie[0].split('==')
console.log('splittedCookie', splittedCookie)

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