import { loadBookedRooms, saveBookedRoom, deleteBookedRoom } from './bookings.js';
import {generateTable, setBookingEvent, setDeleteEvent, getNewDate} from "./table.js";
import {loadUserName} from "./bookings.js";
export {bookingEvent, loadBookedRooms}



setBookingEvent(bookingEvent);
setDeleteEvent(deleteEvent)
loadUserName()
loadBookedRooms(getNewDate(), generateTable);

function bookingEvent(event) {
    event.target.surname = "me";
    saveBookedRoom(event);
}

function deleteEvent(event) {
    deleteBookedRoom(event)
}