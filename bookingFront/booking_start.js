
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
    sendLoginValues(loginData)
}

function getSignUpValues() {
    const signUpData = {
        username: signUpUser.value.trim(),
        email: signUpEmail.value.trim(),
        password: signUpPassword.value.trim(),
        confirm: signUpConfirm.value.trim()
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
        document.getElementById('userNameError').style.display = "none";
        document.getElementById('emailError').style.display = "none";
        document.getElementById('userEmailError').style.display = "none";
        const response = JSON.parse(httpRequest.response);
        const errors = response["errors"];
        for (const error of errors) {
            console.log(error)
            const field = document.getElementById(error["field"]);
            field.style.display = "block";
            field.innerHTML = error["description"]
        }
    }
}

function sendLoginValues(request) {
    console.log('request', request);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "http://127.0.0.1:5000/login");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(request));
    httpRequest.onreadystatechange = () => pickUpLoginInfo(httpRequest);
}

function pickUpLoginInfo(httpRequest) {
    if (httpRequest.readyState === 4) {
        console.log(httpRequest.response);
        const loginInfo = JSON.parse(httpRequest.response);
        const loginInfoField = loginInfo["field"];
        const loginInfoDescription = loginInfo["description"];
        document.getElementById('loginEmailError').style.display = "none";
        document.getElementById('loginPasswordError').style.display = "none";

        const field = document.getElementById(loginInfoField);
        field.style.display = "block";
        field.innerHTML = loginInfoDescription
    }
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