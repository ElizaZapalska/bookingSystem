import { loadBookedRooms, saveBookedRoom, deleteBookedRoom, loadUserName, user_surname } from './bookings.js';
import {generateTable, setBookingEvent, setDeleteEvent, getNewDate} from "./table.js";
export {bookingEvent, loadBookedRooms}



loadUserName()
setBookingEvent(bookingEvent);
setDeleteEvent(deleteEvent)
loadBookedRooms(getNewDate(), generateTable);

function bookingEvent(event) {
    event.target.surname = user_surname;
    saveBookedRoom(event);
}

function deleteEvent(event) {
    deleteBookedRoom(event)
}