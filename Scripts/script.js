let hours = document.getElementById("hours"),
  minutes = document.getElementById("minutes"),
  seconds = document.getElementById("seconds");
let timerStatus = document.getElementById("timer-status");
let start = document.getElementById("start"),
  reset = document.getElementById("reset");

function toggleTimer(boolean) {
  timerOn = !boolean;
  hours.disabled = timerOn;
  minutes.disabled = timerOn;
  seconds.disabled = timerOn;
  showBorders(timerOn);
  timeUpBorder.style.animation = "";
}

let border = document.querySelector(".timer-container .border");
let timeUpBorder = document.querySelector(".timer-container .time-up");
function showBorders(boolean) {
  if (boolean) {
    border.style.animation =
      "spin 4s linear infinite, appear 1s ease-in-out forwards";
  } else {
    border.style.animation =
      "spin 4s linear infinite, disappear 1s ease-in-out forwards";
  }
}

function validate() {
  if (seconds.value == "") seconds.value = 0;
  if (minutes.value == "") minutes.value = 0;
  if (hours.value == "") hours.value = 0;
  if (
    isNaN(parseInt(hours.value)) ||
    isNaN(parseInt(minutes.value)) ||
    isNaN(parseInt(seconds.value))
  ) {
    timerStatus.innerHTML = "Please enter numbers only";
    return false;
  } else if (
    (hours.value == 0 && minutes.value == 0 && seconds.value == 0) ||
    hours.value < 0 ||
    minutes.value < 0 ||
    seconds.value < 0
  ) {
    timerStatus.innerHTML = "Please enter values greater than 0";
    return false;
  }
  if (seconds.value > 60) {
    minutes.value = parseInt(minutes.value) + Math.floor(seconds.value / 60);
    seconds.value = parseInt(seconds.value) % 60;
  }
  if (minutes.value > 60) {
    hours.value = parseInt(hours.value) + Math.floor(minutes.value / 60);
    minutes.value = parseInt(minutes.value) % 60;
  }

  return true;
}

function countDown() {
  let secondsRemaining =
    parseInt(seconds.value) +
    parseInt(minutes.value) * 60 +
    parseInt(hours.value) * 3600 -
    1;
  timerStatus.innerHTML = "Time remaining: " + secondsRemaining + " seconds";
  if (seconds.value > 0) {
    seconds.value--;
  } else if (minutes.value > 0) {
    minutes.value--;
    seconds.value = 59;
  } else if (hours.value > 0) {
    hours.value--;
    minutes.value = 59;
    seconds.value = 59;
  }
  if (secondsRemaining == 0) {
    clearInterval(interval);
    start.innerHTML = "Start";
    toggleTimer(timerOn);
    timeUpBorder.style.animation = "timeUp 2s ease forwards";
    
    setTimeout(function () {
      timerStatus.innerHTML = "Time is up";
      resetState();
    }, 1000);
   
  }
}

function resetState(){
  if(hours.value==0 && minutes.value==0 && seconds.value==0){
    reset.classList.add('reset-inactive');
  }
  else reset.classList.remove('reset-inactive');
}

let interval = null,
  timerOn = false;

start.addEventListener("click", function () {
  if (!timerOn && validate()) {
    toggleTimer(timerOn);

    interval = setInterval(countDown, 1000);
    start.innerHTML = "Pause";
    timerStatus.innerHTML = "Timer has started";
  } else if (timerOn) {
    toggleTimer(timerOn);
    clearInterval(interval);
    start.innerHTML = "Continue";
    timerStatus.innerHTML = "Timer is paused";
  }
});

reset.addEventListener("click", function () {
  if (timerOn) {
    clearInterval(interval);
    toggleTimer(timerOn);
  }
  timerStatus.innerHTML = "Timer is off";
  start.innerHTML = "Start";
  hours.value = 0;
  minutes.value = 0;
  seconds.value = 0;
  resetState();
});

hours.addEventListener("change", resetState);
minutes.addEventListener("change", resetState);
seconds.addEventListener("change", resetState);