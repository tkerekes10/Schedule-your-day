const timeblockHour = document.getElementsByClassName("timeblock");
const saveButton = document.getElementById("saveButton");
const timeBlockContainer = $("#hours-container");
const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let currentHour = moment().format("HH");
let noteInput;

//Function for controlling the color of the hour rows based on the currentHour
function changeTimeColor() {
  for (var i = 0; i < 9; i++) {
    //If the current hour is less than the overall time
    if (currentHour > Number(timeblockHour[i].id)) {
      timeblockHour[i].classList.add("future");

      //If the current hour is greater than the overall time
    } else if (currentHour < Number(timeblockHour[i].id)) {
      timeblockHour[i].classList.add("past");

      //If the current hour is equal to the overall time
    } else {
      timeblockHour[i].classList.add("present");
    }
  }
}

//This function controls the making of the blocks dynamically when the page loads in
function makeTimeBlocks() {
  for (let i = 0; i < hours.length; i++) {
    let timeBlock = $(
      `<di class="row timeblock" id="${hours[i]}"> 
      
      <div class="col-2" id="text-${hours[i]}">${
        hours[i] <= 12 ? hours[i] + " AM" : hours[i] - 12 + " PM"
      }</div> </div>
          <div class="col-9" id="note-${
            hours[i]
          }"> <input type="text" class = "input" placeholder="Enter Action Items Here" data="toDo" id="input-${
        hours[i]
      }"> </div>
        <div class="col-1">
        <button class="Btn" id="${hours[i]}">Save</button>
      </div>
      </div>`
    );

    timeBlockContainer.append(timeBlock);
  }

  //On page load needs to be here to update the page with the data from local storage
  onPageLoad();

  //I had to hardcode the "12 PM" timeblock because the ternary operator showed "AM"
  const timeblockHour12 = document.getElementById("text-12");
  timeblockHour12.innerHTML = "12 PM";
}

//This function takes the user input and saves it to the page as well as to the local storage
function saveText(hour) {
  const noteInputEl = document.getElementById(`input-${hour}`);

  const noteInput = noteInputEl.value;

  localStorage.setItem(`toDo-${hour}`, noteInput);

  let storedInput = localStorage.getItem(`toDo-${hour}`);
  noteInputEl.textContent = storedInput;
}

const saveButtons = $(".Btn");

saveButtons.on("click", function (event) {
  saveText(event.target.id);
});

//This function add in the local storage data into the correct hour block
function onPageLoad() {
  for (let i = 0; i < hours.length; i++) {
    let storedInput = localStorage.getItem(`toDo-${hours[i]}`);
    const noteInputEl = document.getElementById(`input-${hours[i]}`);

    if (storedInput) {
      const noteInputEl = document.getElementById(`input-${hours[i]}`);
      noteInputEl.placeholder = storedInput;
    }
  }
}

makeTimeBlocks();

changeTimeColor();

onPageLoad();
