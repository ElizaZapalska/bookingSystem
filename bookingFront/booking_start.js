
const loginEmail = document.getElementById('loginEmail')
const loginPassword = document.getElementById('loginPassword')
const signUpUser = document.getElementById('signUpUserName')
const signUpEmail = document.getElementById('signUpEmail')
const signUpPassword = document.getElementById('signUpPassword')
const signUpConfirm = document.getElementById('signUpConfirm')

const loginButton = document.getElementById('loginButton')
const signUpButton = document.getElementById('signUpButton')

loginButton.onclick = () => getLoginValues();
signUpButton.onclick = () => getSignUpValues();

function getLoginValues() {
    const loginData = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    sendRequest(loginData, "login")
}

function getSignUpValues() {
    const signUpData = {
        username: signUpUser.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
        confirm: signUpConfirm.value
    }
    validEmail(signUpData)
    validPassword(signUpData)
    validConfirmation(signUpData)
    if (validEmail(signUpData) &&  validPassword(signUpData) && validConfirmation(signUpData)){
        console.log('successful sending')
        sendSignUpValues(signUpData)
    }
}

function sendSignUpValues(request) {
    console.log('request', request);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://127.0.0.1:5000/signUp");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(request));
    httpRequest.onreadystatechange = () => pickUpSignUpInfo(httpRequest);
}

function pickUpSignUpInfo(httpRequest) {
    if (httpRequest.readyState === 4) {
        const response = JSON.parse(httpRequest.response);
        console.log('response', response);
        if (response.info !== "Success") {
            document.getElementById('userNameError').style.display = "block";
        }
        else {
            console.log("load booking page");
            document.getElementById('userNameError').style.display = "none";
        }
    }
}

function sendRequest(request, endpoint) {
    console.log('request', request);
    let httpRequest = new XMLHttpRequest();
    const urlText = "http://127.0.0.1:5000/" + endpoint;
    console.log(urlText)
    httpRequest.open('POST', urlText);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(request));
}

function validEmail(signUpData) {
    console.log(signUpData)
    if (signUpData.email.includes('@') ) {
        document.getElementById('emailError').style.display = "none";
        signUpEmail.style.border = "none";
        return true
    } else {
        signUpEmail.style.border = "2px solid #b61010";
        document.getElementById('emailError').style.display = "block";
        return false
    }
}

function validPassword(signUpData) {
    if (signUpData.password.length >= 8) {
        document.getElementById('passwordError').style.display = "none";
        signUpPassword.style.border = "none";
        return true
    } else {
        signUpPassword.style.border = "2px solid #b61010";
        document.getElementById('passwordError').style.display = "block";
        return false
    }

}

function validConfirmation(signUpData) {
    if (signUpData.password === signUpData.confirm) {
        document.getElementById('confirmError').style.display = "none"
        signUpPassword.style.border = "none";
        signUpConfirm.style.border = "none";
        return true
    } else {
        signUpPassword.style.border = "2px solid #b61010"
        signUpConfirm.style.border = "2px solid #b61010"
        document.getElementById('confirmError').style.display = "block"
        return false
    }
}