let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 0;
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");
startStopBtn.addEventListener("click", startStop);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", reset);
function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1000);
        running = true;
        startStopBtn.innerText = "Stop";
        startStopBtn.style.backgroundColor = "#dc3545";
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerText = "Start";
        startStopBtn.style.backgroundColor = "#28a745";
    }
}
function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerText = "Start";
    startStopBtn.style.backgroundColor = "#28a745";
    display.innerText = "00:00:00";
    laps.innerHTML = "";
    difference = 0;
    lapCounter = 0;
}
function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = display.innerText;
        const lapElement = document.createElement("div");
        lapElement.innerText = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}
function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    display.innerText = `${hours}:${minutes}:${seconds}`;
}