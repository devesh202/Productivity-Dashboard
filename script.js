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
var hours = Array.from({length:17},(elem,idx)=>{
        AMPM = idx < 6 ? "AM" : "PM"
        return  `${6+idx}:00 ${AMPM} - ${7+idx}:00 ${AMPM}`

})
console.log(hours)
var dayPlanner=document.querySelector(".day-planner")
var dayPlanData= JSON.parse(localStorage.getItem('dayPlanData')) || {}


var wholeDaySum=""
hours.forEach((elem,idx)=>{
    var savedData = dayPlanData[idx] || ""; 
    wholeDaySum= wholeDaySum + ` <div class="day-planner-time">
                    <p>${elem}</p>
                    <input type="text" id=${idx} placeholder="...", value="${savedData}">
                </div>`

})

dayPlanner.innerHTML=wholeDaySum
var dayPlannerInput=document.querySelectorAll('.day-planner input')



dayPlannerInput.forEach((elem)=>{
    elem.addEventListener('input',(e)=>{
        dayPlanData[elem.id] = elem.value
        console.log(dayPlanData)
        localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData));
    })
})
}

dailyPlanner()



function motivationalQuote(){
    var motivationalQuote = document.querySelector(".motivation-2 p");
var motivationalQuoteAuthor = document.querySelector(".motivation-3 h2");
async function fetchQuote(){
    let response = await fetch("https://dummyjson.com/quotes/random")
    let data = await response.json()
    motivationalQuote.innerText = data.quote
    motivationalQuoteAuthor.innerText ='- '+ data.author
    
}

fetchQuote()
}

motivationalQuote() 