import { loadBookedRooms, saveBookedRoom } from './bookings.js';
import {generateTable, setBookingEvent} from "./table.js";

setBookingEvent(bookingEvent);
loadBookedRooms(generateTable);

function bookingEvent(event) {
    console.log(event.target)
    saveBookedRoom(event);
}