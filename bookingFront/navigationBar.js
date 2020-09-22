
import {generateTable, setNewDate, getNewDate} from "./table.js";
import {loadBookedRooms} from "./bookings.js";

const narrowRight = document.getElementById('rightArrow')
const narrowLeft = document.getElementById('leftArrow')

narrowRight.onclick = () => changeDateUp();
narrowLeft.onclick = () => changeDateDown();


function changeDateUp() {
    const date = getNewDate()
    const biggerDate = new Date();
    biggerDate.setDate(date.getDate() + 1)
    setNewDate(biggerDate)
    loadBookedRooms(getNewDate(), generateTable)
}

function changeDateDown() {
    let date = getNewDate();
    const lowerDate = new Date()
    lowerDate.setDate(date.getDate() - 1)
    setNewDate(lowerDate)

    loadBookedRooms(getNewDate(), generateTable)
}