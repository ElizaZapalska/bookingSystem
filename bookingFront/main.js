import { loadBookedRooms, saveBookedRoom, deleteBookedRoom } from './bookings.js';
import {generateTable, setBookingEvent, setDeleteEvent, getNewDate} from "./table.js";
export {bookingEvent, loadBookedRooms}

let userSurname = 'me'; //TODO; hard-coded userSurname :(

setBookingEvent(bookingEvent);
setDeleteEvent(deleteEvent)
loadBookedRooms(getNewDate(), generateTable);

function bookingEvent(event) {
    event.target.surname = userSurname;
    saveBookedRoom(event);
}

function deleteEvent(event) {
    deleteBookedRoom(event)
}