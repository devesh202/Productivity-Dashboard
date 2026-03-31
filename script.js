function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var allFullElems = document.querySelectorAll(".fullElem");
  var allFullElemsBackBtn = document.querySelectorAll(".fullElem .back");
  // on clicking the elems each page should appear
  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      var id = elem.id;
      allFullElems[id].style.display = "block";
    });
  });

  allFullElemsBackBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      allFullElems[btn.id].style.display = "none";
    });
  });
}

openFeatures();

function todoList() {
  var currTask = [];

  if (localStorage.getItem("currTask")) {
    currTask = JSON.parse(localStorage.getItem("currTask"));
  } else {
    console.log("task list is empty");
  }

  function renderTask() {
    var allTask = document.querySelector(".allTask");
    let sum = "";

    currTask.forEach((task, index) => {
      sum += `<div class="task">
    <h5>${task.task} <span class=${task.imp}>imp</span></h5>
    <button id=${index}>Mark as Completed</button>
</div>`;
    });
    allTask.innerHTML = sum;
    var markCompletedBtn = document.querySelectorAll(".task button");
    console.log(markCompletedBtn);

    markCompletedBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        currTask.splice(btn.id, 1);
        localStorage.setItem("currTask", JSON.stringify(currTask));
        renderTask();
      });
    });
  }

  renderTask();

  let taskInput = document.querySelector(".addTask form input");
  let form = document.querySelector(".addTask form");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(
    '.addTask form input[type="checkbox"]'
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log('hello') //we will not able to see this in console as it refreshes the page.
    // to get values of input from form use .value
    let task = taskInput.value;
    let taskDetails = taskDetailsInput.value;
    let checked = taskCheckbox.checked;
    currTask.push({
      task: task,
      details: taskDetails,
      imp: checked,
    });
    localStorage.setItem("currTask", JSON.stringify(currTask));
    renderTask();
    form.reset();
  });
}

todoList();

function dailyPlanner() {
  //to get time in hours create an array
  var hours = Array.from({ length: 17 }, (elem, idx) => {
    AMPM = idx < 6 ? "AM" : "PM";
    return `${6 + idx}:00 ${AMPM} - ${7 + idx}:00 ${AMPM}`;
  });
  console.log(hours);
  var dayPlanner = document.querySelector(".day-planner");
  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var wholeDaySum = "";
  hours.forEach((elem, idx) => {
    var savedData = dayPlanData[idx] || "";
    wholeDaySum =
      wholeDaySum +
      ` <div class="day-planner-time">
                    <p>${elem}</p>
                    <input type="text" id=${idx} placeholder="...", value="${savedData}">
                </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;
  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", (e) => {
      dayPlanData[elem.id] = elem.value;
      console.log(dayPlanData);
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

function motivationalQuote() {
  var motivationalQuote = document.querySelector(".motivation-2 p");
  var motivationalQuoteAuthor = document.querySelector(".motivation-3 h2");
  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();
    motivationalQuote.innerText = data.quote;
    motivationalQuoteAuthor.innerText = "- " + data.author;
  }

  fetchQuote();
}

motivationalQuote();

function pomodoroTimer() {
    let totalSeconds = 25 * 60;
let timer = document.querySelector(".pomo-timer h1");
var start = document.querySelector(".start-timer");
var pause = document.querySelector(".pause-timer");
var reset = document.querySelector(".reset-timer");
let timerInterval = null;
var isWorkSession = true;
let session = document.querySelector(".session");
function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  timer.innerText = `${String(minutes).padStart(2, "0")}: ${String(
    seconds
  ).padStart(2, "0")}`; //padStart(2,"0") will add 0 before the number if the number is less than 2 digits.  seconds}`
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  if (isWorkSession) {
    
    
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        isWorkSession = false;
        clearInterval(timerInterval);
        timer.innerHTML = "05:00";
         session.innerText = "Take a Break";
    session.style.backgroundColor = "var(--blue)";
    totalSeconds = 5 * 60;
      }
    }, 1000);
  } else {
   
    
    timerInterval = setInterval(() => {
        
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        isWorkSession = true;
        clearInterval(timerInterval);
        timer.innerHTML = "25:00";
        session.innerText = "Work Session";
    session.style.backgroundColor = "var(--green)";
    totalSeconds = 25 * 60;

      }
    }, 1000);
  }
}
start.addEventListener("click", startTimer);

function pauseTimer() {
  clearInterval(timerInterval);
}
pause.addEventListener("click", pauseTimer);

function resetTimer() {
  clearInterval(timerInterval);
  totalSeconds = 25 * 60;
}
reset.addEventListener("click", resetTimer);
}

pomodoroTimer();

function WeatherAndDate(){
  var data  = null;
var currentTime = document.querySelector(".header1 h1");
var DayDate = document.querySelector(".header1 h2");
var header2Temp = document.querySelector(".header2 h2");
var header2Condition = document.querySelector(".header2 h4");
var humidity = document.querySelector(".header2 .Humidity");
var wind = document.querySelector(".header2 .wind");
var precipitation = document.querySelector(".header2 .Precipitation");
async function weatherAPICall() {
    try {
        const APIKEY = '9d6e04f42c0a44e7854174145260101'
        var res= await fetch("https://api.weatherapi.com/v1/current.json?key="+APIKEY+"&q=mumbai");
        if (!res.ok) throw new Error("Weather API failed");
        data = await res.json();
        header2Temp.innerText =  Math.round(data.current.temp_c) + "°C";
        header2Condition.innerText = data.current.condition.text;
        wind.innerText = "Wind: " + data.current.wind_kph + " km/h";
        humidity.innerText = "Humidity: " + data.current.humidity + "%";
        precipitation.innerText = "Precipitation: " + data.current.precip_mm + " mm";
    } catch (err) {
        console.error("Weather Data Error:", err);
        header2Temp.innerText = "-- °C";
        header2Condition.innerText = "Unavailable";
    }
}


weatherAPICall();


function timeDate(){
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var dayOfWeek = daysOfWeek[date.getDay()];
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0'); //date.getMinutes();
    var seconds = String(date.getSeconds()).padStart(2, '0'); // date.getSeconds();
    var Todaydate = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    DayDate.innerHTML = Todaydate + " " + months[month - 1] + "," + year;
    if(hours>12){
            currentTime.innerHTML = dayOfWeek + " " +(hours-12)+ ":" + minutes + ":" + seconds+ " PM";
    }
    else currentTime.innerHTML = dayOfWeek + " " + hours + ":" + minutes + ":" + seconds + " AM";
    
}
setInterval(() => {
    timeDate();
    
}, 1000);
}

WeatherAndDate();

var themeToggle = document.getElementById("themeToggle");
var themeIcon = document.getElementById("themeIcon");

const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  document.body.classList.add("light-theme");
  if(themeIcon) themeIcon.classList.replace("ri-sun-fill", "ri-moon-fill");
}

if(themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      let theme = "dark";
      if (document.body.classList.contains("light-theme")) {
        theme = "light";
        themeIcon.classList.replace("ri-sun-fill", "ri-moon-fill");
      } else {
        themeIcon.classList.replace("ri-moon-fill", "ri-sun-fill");
      }
      localStorage.setItem("theme", theme);
    });
}

function initDailyGoals() {
  const goalsForm = document.getElementById("goalsForm");
  const goalInput = document.getElementById("goalInput");
  const goalsList = document.getElementById("goalsList");
  const goalsProgressFill = document.getElementById("goalsProgressFill");
  const progressText = document.getElementById("progressText");

  if (!goalsForm) return;

  let goals = JSON.parse(localStorage.getItem("dailyGoals")) || [];

  function saveGoals() {
    localStorage.setItem("dailyGoals", JSON.stringify(goals));
  }

  function updateProgress() {
    if (goals.length === 0) {
      goalsProgressFill.style.width = "0%";
      progressText.innerText = "No goals yet";
      return;
    }
    const completed = goals.filter(g => g.completed).length;
    const percentage = Math.round((completed / goals.length) * 100);
    goalsProgressFill.style.width = `${percentage}%`;
    progressText.innerText = `${percentage}% Completed`;
    
    if (percentage === 100) {
        goalsProgressFill.style.background = "var(--green)";
    } else {
        goalsProgressFill.style.background = "var(--accent)";
    }
  }

  function renderGoals() {
    goalsList.innerHTML = "";
    goals.forEach((goal, idx) => {
      const item = document.createElement("div");
      item.className = `daily-goal-item ${goal.completed ? "completed" : ""}`;
      
      item.innerHTML = `
        <div class="goal-left">
          <input type="checkbox" id="goal-${idx}" ${goal.completed ? "checked" : ""}>
          <label for="goal-${idx}"><span>${goal.text}</span></label>
        </div>
        <button class="goal-delete" data-index="${idx}"><i class="ri-delete-bin-line"></i></button>
      `;

      const checkbox = item.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", (e) => {
        goals[idx].completed = e.target.checked;
        saveGoals();
        renderGoals();
      });

      const delBtn = item.querySelector(".goal-delete");
      delBtn.addEventListener("click", () => {
        goals.splice(idx, 1);
        saveGoals();
        renderGoals();
      });

      goalsList.appendChild(item);
    });
    updateProgress();
  }

  goalsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = goalInput.value.trim();
    if (text) {
      goals.push({ text: text, completed: false });
      goalInput.value = "";
      saveGoals();
      renderGoals();
    }
  });

  renderGoals();
}

initDailyGoals();