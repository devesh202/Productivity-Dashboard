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
    var sum = "";

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
