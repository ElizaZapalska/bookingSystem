
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

export { generateTable };

