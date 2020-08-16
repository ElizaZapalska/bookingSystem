


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
        addEmptyCells(newRow, hours);
        table.appendChild(newRow)
    }
}

function addEmptyCells(newRow, hours) {
    let i = 0;
    while (i < hours.length - 1) {
        let td = document.createElement("td");
        newRow.appendChild(td)
        i += 1;
    }
}

export { generateTable };

