const hours = [
     "classroom/hour","6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00",
        "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00",
        "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
        "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

const classrooms =[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
const hoursLength = hours.length

function generateTable(hours, classrooms) {
    const table = document.getElementById('table')
    const firstRow = document.createElement("tr");
    table.appendChild(firstRow)
    for (let hour of hours) {
        let th = document.createElement("th");
        th.innerText = hour
        firstRow.appendChild(th)
    }
    for (let classroom in classrooms) {
        let newRow = document.createElement("tr");
        let classNumber = document.createElement("td");
        classNumber.innerText = classroom
        newRow.appendChild(classNumber)
        let i = 0;
        while (i < hoursLength - 1) {
            let td = document.createElement("td");
            newRow.appendChild(td)
            console.log("i", i)
            i += 1;
        }
        table.appendChild(newRow)
    }
}
generateTable(hours, classrooms)

