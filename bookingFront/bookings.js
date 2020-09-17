export {loadBookedRooms, saveBookedRoom};

function loadBookedRooms(callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "http://127.0.0.1:5000/");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send();
    httpRequest.onreadystatechange = () => parseBookingResponse(httpRequest, callback);
}

function parseBookingResponse(httpRequest, callback) {
    if (httpRequest.readyState === 4) {
        console.log(httpRequest.response);
        const savedBookings = JSON.parse(httpRequest.response);
        console.log('savedBookings', savedBookings);
        callback(savedBookings);
    }
}

function sendBookedRoom(request) {
    console.log('request', request);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://127.0.0.1:5000/bookRoom");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(request));
}

function saveBookedRoom(event) {
    const bookedRoom = {
        classroom: event.target.getAttribute('classroom'),
        hour: event.target.getAttribute('hour'),
        date: event.target.getAttribute('date'),
        surname: event.target.getAttribute('surname'),
        status: event.target.getAttribute('status')
    }
    sendBookedRoom(bookedRoom)
}
