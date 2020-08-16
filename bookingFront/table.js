import {urlRequest } from "./constants.js";
export { generateTable };


function generateTable(hours, classrooms) {
    appendHours(hours);
    appendClassrooms(classrooms, hours);

}

function appendHours(hours) {
    const table = document.getElementById('table')
    const firstRow = document.createElement("tr");
    table.appendChild(firstRow)
    for (let hour of hours) {
        let th = document.createElement("th");
        th.innerText = hour
        firstRow.appendChild(th)
    }
}

function appendClassrooms(classrooms, hours) {
    const table = document.getElementById('table')
    for (let classroom of classrooms) {
        let newRow = document.createElement("tr");
        let classNumber = document.createElement("td");
        classNumber.innerText = classroom
        newRow.appendChild(classNumber)
        addEmptyCells(newRow, hours, classroom);
        table.appendChild(newRow)
    }
}

function addEmptyCells(newRow, hours, classroom) {
    let i = 0;
    while (i < hours.length - 1) {
        let td = document.createElement("td");
        td.setAttribute("hour", hours[i+1])
        td.setAttribute("classroom", classroom)

        const dateToday = {};
        sendRequest('GET', dateToday, 'date')

        td.onclick = () => markAsBooked(td);
        newRow.appendChild(td)
        i += 1;
    }
}

function markAsBooked(td) {
    if (td.classList.contains("booked")) {
        td.classList.remove("booked")
    } else {
        td.setAttribute("class", "booked")
    }
}



function sendRequest(method, request, requestText) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open(method, urlRequest + requestText);
    console.log(method, urlRequest + requestText);
    httpRequest.setRequestHeader('Content-Type', 'application/json')
    console.log('request', request)
    httpRequest.send(JSON.stringify(request));
    httpRequest.onreadystatechange = () => takeSavedValues(request)
}

function takeSavedValues(response) {
    if (response.readyState === 4) {
        const savedThings = JSON.parse(response.response)
        console.log(savedThings)
    }
}
