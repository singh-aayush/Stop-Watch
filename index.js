let startTime = 0;
let interval;
let passedTime = 0;

const timeDisplay = document.getElementById("time");
const lapTimes = document.getElementById("lap-times");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

function formatTime(ms) {
  const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(
    Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(Math.floor((ms % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );
  const milliseconds = String(ms % 1000).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateTime() {
  const currentTime = Date.now();
  passedTime = currentTime - startTime;
  timeDisplay.textContent = formatTime(passedTime);
}

startButton.addEventListener("click", () => {
  if (!interval) {
    startTime = Date.now() - passedTime;
    interval = setInterval(updateTime, 10);
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});

resetButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  passedTime = 0;
  timeDisplay.textContent = "00:00:00:000";
  lapTimes.innerHTML = "";
});

lapButton.addEventListener("click", () => {
  if (passedTime > 0) {
    const lapTime = document.createElement("div");
    lapTime.textContent = formatTime(passedTime);
    lapTimes.appendChild(lapTime);
  }
});
