import {generateTable} from './table.js';
import {hours, classrooms } from "./constants.js";
import {urlRequest} from "./constants"; //doesn't work


generateTable(hours, classrooms)
takeSavedBookedRooms()

function takeSavedBookedRooms() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "http://127.0.0.1:5000/");
    httpRequest.setRequestHeader('Content-Type', 'application/json')
    httpRequest.send(JSON.stringify(httpRequest));
    httpRequest.onreadystatechange = () => takeSavedValues(httpRequest)
}


function takeSavedValues(response) {
    if (response.readyState === 4) {
        const savedThings = JSON.parse(response.response)
        console.log(savedThings)
        //drawSchedule(savedThings) not created yet
    }
}

