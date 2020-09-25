export {displayAttributes, changeColorOnmouseover, rechangeColor}

function displayAttributes(td) {
    const displayedText = td.getAttribute('surname')
    td.setAttribute('title', displayedText)
}

function changeColorOnmouseover(td) {
    td.style.backgroundColor = '#fffcfc';
}
function rechangeColor(td) {
    td.style.backgroundColor = '#e5e3e3';
}