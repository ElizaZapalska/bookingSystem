import { loadBookedRooms, saveBookedRoom, deleteBookedRoom } from './bookings.js';
import {setDate, generateTable, setBookingEvent, setDeleteEvent} from "./table.js";
export {bookingEvent}

let userSurname = 'me'; //TODO; hard-coded userSurname :(

setDate()
setBookingEvent(bookingEvent);
setDeleteEvent(deleteEvent)
loadBookedRooms(generateTable);

function bookingEvent(event) {
    event.target.surname = userSurname;
    saveBookedRoom(event);
}


function deleteEvent(event) {
    deleteBookedRoom(event)
}