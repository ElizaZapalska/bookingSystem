import {config} from "./config.js";

const signUpButtonFirst = document.getElementById('signUpButtonFirst');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const signUpUser = document.getElementById('signUpUserName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const signUpConfirm = document.getElementById('signUpConfirm');
const loginButton = document.getElementById('loginButton');
const signUpButton = document.getElementById('signUpButton');

signUpButtonFirst.onclick = () => showSignUpContainer();
loginButton.onclick = () => getLoginValues();
signUpButton.onclick = () => getSignUpValues();

const url = config.url
console.log(url)

function catchToken() {
    const splitCookie = document.cookie.split('=')
    const tokenCookie = splitCookie[1]
    return tokenCookie
}

function showSignUpContainer() {
    document.getElementById('signUpContainer').style.display = "block";
    document.getElementById('signUpContainer').scrollIntoView();
}

function getLoginValues() {
    const loginData = {
        email: loginEmail.value,
        password: loginPassword.value,
        token: catchToken()

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
    sendSignUpValues(signUpData)
}

function sendSignUpValues(request) {
    console.log('request', request);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', url + "/api/signUp");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(request));
    httpRequest.onreadystatechange = () => pickUpSignUpInfo(httpRequest);
}

function pickUpSignUpInfo(httpRequest) {
    if (httpRequest.readyState === 4) {
        document.getElementById('userNameError').style.display = "none";
        document.getElementById('emailError').style.display = "none";
        document.getElementById('userEmailError').style.display = "none";
        document.getElementById('passwordError').style.display = "none";
        document.getElementById('confirmError').style.display = "none";
        const response = JSON.parse(httpRequest.response);
        if (response["info"] === "sign up") {
            document.getElementById("signUpInfo").style.display = "block"
        } else {
            const errors = response["errors"];
            for (const error of errors) {
                console.log(error)
                const field = document.getElementById(error["field"]);
                field.style.display = "block";
                field.innerHTML = error["description"]
            }
        }
    }
}

function sendLoginValues(request) {
    console.log('request', request);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', url+ "/api/login");
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(request));
    httpRequest.onreadystatechange = () => pickUpLoginInfo(httpRequest);
}

function pickUpLoginInfo(httpRequest) {
    if (httpRequest.readyState === 4) {
        console.log(httpRequest.response);
        const loginInfo = JSON.parse(httpRequest.response);
        document.getElementById('loginEmailError').style.display = "none";
        document.getElementById('loginPasswordError').style.display = "none";
        if (loginInfo["info"] === "log in") {
            document.getElementById("loginInfo").style.display = "block"
            window.location.href = config.replaceUrl;
        } else {
            const loginInfoField = loginInfo["field"];
            const loginInfoDescription = loginInfo["description"];
            const field = document.getElementById(loginInfoField);
            field.style.display = "block";
            field.innerHTML = loginInfoDescription
        }
    }
}

