const inputContainer = document.querySelector("#input-container");
const countdownForm = document.querySelector("#countdownForm");
const dateEl = document.querySelector("#date-picker");

let countdownTitle = "";
let countdownDate = "";

//Set Date Input Min with today Date

const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//Take Values from Form Input
const updateCountdow = (event) => {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
};

//Event Listeners
countdownForm.addEventListener("submit", updateCountdow);
