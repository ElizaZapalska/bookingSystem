export {displayAttributes}

function displayAttributes(td) {
    const displayedText = td.getAttribute('surname')
    td.setAttribute('title', displayedText)
}
