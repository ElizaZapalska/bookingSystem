export { generateTable,takeSavedBookedRooms };



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
        appendClassrooms(savedThings)
    }
}



function generateTable(hours, classrooms) {
    appendHours(hours);
    appendClassrooms(classrooms, hours, savedThings);

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

function appendClassrooms(classrooms, hours, savedThings) {
    const table = document.getElementById('table')
    for (let classroom of classrooms) {
        let newRow = document.createElement("tr");
        let classNumber = document.createElement("td");
        classNumber.innerText = classroom
        newRow.appendChild(classNumber)
        drawSchedule(newRow, hours, classroom, savedThings);
        table.appendChild(newRow)
    }
}

function drawSchedule(newRow, hours, classroom, savedThings) {
    let i = 0;
    while (i < hours.length - 1) {
        let td = document.createElement("td");
        console.log('savedThings', savedThings)
        td.setAttribute("hour", hours[i+1])
        td.setAttribute("classroom", classroom)
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

