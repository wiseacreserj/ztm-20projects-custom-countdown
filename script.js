const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");

const countdownEl = document.querySelector("#countdown");
const countdownElTitle = document.querySelector("#countdown-title");
const countdownBtn = document.querySelector("#countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.querySelector("#complete");
const completeElInfo = document.querySelector("#complete-info");
const completeBtn = document.querySelector("#complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Date Input Min with today Date

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//Populate Countdown, update UI

const updateDom = () => {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        //Hide Input
        inputContainer.hidden = true;

        //If countdown had ended, show complete
        if (distance < 0) {
            completeEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else, show countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, 1000);
};

//Take Values from Form Input
const updateCountdown = (event) => {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };

    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
    //Check for valid Date

    if (countdownDate === "") {
        alert("Please select a date for countdown");
    } else {
        //Get number version of current Date, update DOM
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
};

//Reset All Values
const reset = () => {
    //Hide Countdown and Show Input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    //Stop Countdown
    clearInterval(countdownActive);
    //Reset Values
    countdownTitle = "";
    countdownDate = "";
    localStorage.removeItem("countdown");
};

const restorePreviousCountdown = () => {
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem("countdown"));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
};

//Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePreviousCountdown();
