import { loadBookedRooms, saveBookedRoom, deleteBookedRoom, loadUserName, user_surname } from './bookings.js';
import {generateTable, setBookingEvent, setDeleteEvent, getNewDate} from "./table.js";
export {bookingEvent, loadBookedRooms}



setBookingEvent(bookingEvent);
setDeleteEvent(deleteEvent)
loadUserName()
loadBookedRooms(getNewDate(), generateTable);

function bookingEvent(event) {
    event.target.surname = user_surname;
    saveBookedRoom(event);
}

function deleteEvent(event) {
    deleteBookedRoom(event)
}