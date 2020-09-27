const loginEmail = document.getElementById('loginEmail')
const loginPassword = document.getElementById('loginPassword')
const signUpUser = document.getElementById('signUpUserName').value
const signUpEmail = document.getElementById('signUpEmail').value
const signUpPassword = document.getElementById('signUpPassword').value
const signUpConfirm = document.getElementById('signUpConfirm').value

const loginButton = document.getElementById('loginButton')
const signUpButton = document.getElementById('signUpButton')

loginButton.onclick = () => getLoginValues;

function getLoginValues() {
    const loginEmailText = loginEmail.value
    const loginPasswordText = loginPassword.value
    const loginData = {
        login: loginEmailText,
        password: loginPasswordText
    }
    sendRequest(loginData)
}

function sendRequest(request) {
    console.log('request', request);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://127.0.0.1:5000/login");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(request));
}