export {generateTable, hours, classrooms}

const hours = [
    "classroom / hour ","6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00",
    "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00",
    "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

const classrooms =[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];



function loadBookedRooms() {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "http://127.0.0.1:5000/");
    httpRequest.setRequestHeader('Content-Type', 'application/json')
    httpRequest.send();
    httpRequest.onreadystatechange = () => takeSavedValues(httpRequest)
}


function takeSavedValues(httpRequest) {
    if (httpRequest.readyState === 4) {
        const savedBookings = JSON.parse(httpRequest.response)
        generateTable(hours, classrooms)

    }
}

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
    const bookings = [];
    for (let classroom of classrooms) {
        let newRow = document.createElement("tr");
        let classNumber = document.createElement("td");
        classNumber.innerText = classroom
        newRow.appendChild(classNumber)
        table.appendChild(newRow)
        drawSchedule(newRow, hours, classroom, bookings);


    }
    console.log('bookings', bookings)
    sendBookedRooms(bookings)
}

function drawSchedule(newRow, hours, classroom, bookings) {
    let i = 0;

    while (i < hours.length - 1) {
        let td = document.createElement("td");
        td.setAttribute("hour", hours[i+1])
        td.setAttribute("classroom", classroom)
        td.setAttribute('date', '2020-08-22')
        td.setAttribute('class', "free")
        td.onclick = () => markAsBooked(td);
        newRow.appendChild(td)
        i += 1;
        let roomAttributes = {
            "hour": td.getAttribute('hour'),
            "classroom": td.getAttribute('classroom'),
            "date": td.getAttribute('date'),
            "status": td.getAttribute('class'),
            "surname": td.getAttribute('surname')
        };
        bookings.push(roomAttributes)
    }

}

function sendBookedRooms(request) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://127.0.0.1:5000/bookedRooms");
    httpRequest.setRequestHeader('Content-Type', 'application/json')
    httpRequest.send(JSON.stringify(request));

}



function markAsBooked(td) {
    if (td.classList.contains("booked")) {
        td.classList.remove("booked")
        td.setAttribute("class", "free")
    } else {
        td.setAttribute("class", "booked")
        td.classList.remove("free")
        td.setAttribute('surname','user1')
    }
}


