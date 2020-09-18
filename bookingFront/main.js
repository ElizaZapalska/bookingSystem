import { loadBookedRooms, saveBookedRoom } from './bookings.js';
import {generateTable, setBookingEvent} from "./table.js";



let userSurname = 'me'; //TODO; hard-coded userSurname :(

setBookingEvent(bookingEvent);
loadBookedRooms(generateTable);

function bookingEvent(event) {
    event.target.surname = userSurname;
    saveBookedRoom(event);
}