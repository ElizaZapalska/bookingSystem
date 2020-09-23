
import {generateTable, setNewDate, getNewDate, getDateText} from "./table.js";
import {loadBookedRooms} from "./bookings.js";

const narrowRight = document.getElementById('rightArrow');
const narrowLeft = document.getElementById('leftArrow');
const dateElement = document.getElementById('date');
dateElement.innerHTML = getDateText(getNewDate());

narrowRight.onclick = () => changeDateUp();
narrowLeft.onclick = () => changeDateDown();


function changeDateUp() {
    const date = getNewDate()
    console.log('1', date)
    const biggerDate = new Date(date);
    biggerDate.setDate(date.getDate() + 1)
    console.log('2', biggerDate)
    setNewDate(biggerDate)
    dateElement.innerHTML = getDateText(getNewDate());
    loadBookedRooms(getNewDate(), generateTable)
}

function changeDateDown() {
    let date = getNewDate();
    const lowerDate = new Date(date)
    lowerDate.setDate(date.getDate() - 1)
    setNewDate(lowerDate)
    dateElement.innerHTML = getDateText(getNewDate());
    loadBookedRooms(getNewDate(), generateTable)
}

