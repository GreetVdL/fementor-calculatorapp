import "../css/style.scss";

// THEME BUTTON FUNCTIONALITY

const firstSquare = document.querySelector("#theme-bullets div:nth-child(1)");
const secondSquare = document.querySelector("#theme-bullets div:nth-child(2)");
const thirdSquare = document.querySelector("#theme-bullets div:nth-child(3)");
const bullet = document.querySelector("#bullet");

firstSquare.addEventListener("click", function () {
  bullet.style.marginRight = "0";
  document.body.classList.remove("theme2", "theme3");
});

secondSquare.addEventListener("click", function () {
  bullet.style.marginRight = "-45px";
  document.body.classList.remove("theme1", "theme3");
  document.body.classList.add("theme2");
});

thirdSquare.addEventListener("click", function () {
  bullet.style.marginRight = "-90px";
  document.body.classList.remove("theme2", "theme1");
  document.body.classList.add("theme3");
});

// CALCULATING FUNCTIONALITY

// *display functionality*

const displayField = document.querySelector("section span");
// the string that will be shown in the display field
let toBeShown = "";

// this array will catch all the keyboard input and will hold all the calculations
const operations = [];
// the index to move through the operations array
let index = 0;

// has the equals button been pressed yet or not
let equalsPressed = false;
// has a result already been displayed; this will be a rounded result then
let resultBeenCalculated = false;

function updateDisplay() {
  // display defaults to zero
  if (operations.length === 0) {
    toBeShown = "0";
  }
  // display shows the contents of the toBeShown variable
  displayField.textContent = toBeShown;
}

// event listener for the numbers and comma
const values = document.querySelectorAll(".value");
values.forEach((value) => {
  value.addEventListener("click", function () {
    const actualValue = this.textContent;
    console.log(equalsPressed);
    // if a result has already been calculated, start anew by emptying the operations array
    // and setting the operations index to zero
    if (equalsPressed) {
      resultBeenCalculated = false;
      operations.length = 0;
      index = 0;
      operations[index] = actualValue;
      equalsPressed = false;
    } else {
      // if there isn't an operations array item yet with that index, create the item and set it to the input value
      if (!operations[index]) {
        operations[index] = actualValue;
      } else {
        // otherwise, append the input value to the already existing sting item of the operations array
        operations[index] += actualValue;
      }
    }
    console.log(operations);
    // display the concatenated string of the items of the operations array
    if (resultBeenCalculated) {
      toBeShown = operations
        .map((item) => {
          if (operations.indexOf(item) === 0) {
            return Math.round(item * 10000) / 10000;
          } else {
            return item;
          }
        })
        .join("");
    } else {
      toBeShown = operations.join("");
    }
    updateDisplay();
  });
});

// event listener for the operands
const operands = document.querySelectorAll(".operand");
operands.forEach((operand) => {
  operand.addEventListener("click", function () {
    //  if you want to make additional calculations (e.g. +5) than everything will reset when you press five because equalsPressed was set to true,
    // for that reason, set equalsPressed to false again
    equalsPressed = false;
    const actualOperand = this.textContent;
    // if there isn't an operations array item yet with that index, create the item and set it to the input operand
    // and let the index go one up for a new values filled item to be created
    if (!operations[index]) {
      operations[index] = actualOperand;
      index++;
    } else {
      // create a new array item for the operand
      // and let the index go one up for a new values filled item to be created
      index++;
      operations[index] = actualOperand;
      index++;
    }
    console.log(operations);
    // display the concatenated string of the items of the operations array
    if (resultBeenCalculated) {
      toBeShown = operations
        .map((item) => {
          if (operations.indexOf(item) === 0) {
            return Math.round(item * 10000) / 10000;
          } else {
            return item;
          }
        })
        .join("");
    } else {
      toBeShown = operations.join("");
    }
    updateDisplay();
  });
});

// event listener for the delete button
const del = document.querySelector("#del");
del.addEventListener("click", function () {
  // if there is more than one item in the operations array, let the index move one down...
  if (index) {
    index--;
  }
  // ... because the last item of the array will be removed
  operations.pop();
  // display the concatenated string of the items of the operations array
  if (resultBeenCalculated) {
    toBeShown = operations
      .map((item) => {
        if (operations.indexOf(item) === 0) {
          return Math.round(item * 10000) / 10000;
        } else {
          return item;
        }
      })
      .join("");
  } else {
    toBeShown = operations.join("");
  }
  updateDisplay();
  console.log(operations);
});

// event listener for the reset button
const reset = document.querySelector("#reset");
reset.addEventListener("click", function () {
  // emty the operations array and set the array's index to zero again
  operations.length = 0;
  index = 0;
  // the display will default to zero
  updateDisplay();
  console.log(operations);
  resultBeenCalculated = false;
});

// *calculation functionality*

// event listener for the equals button
const equals = document.querySelector("#equals");
equals.addEventListener("click", function () {
  // call the calculateAndDisplayResult function
  calculateAndDisplayResult();
  // set equalsPressed to true
  equalsPressed = true;
  resultBeenCalculated = true;
});

// the function that contains the calculating logic
function calculateAndDisplayResult() {
  // when the user's input starts with an operand, an error will be shown and the array and index will be reset
  if (
    operations[0] === "-" ||
    operations[0] === "+" ||
    operations[0] === "x" ||
    operations[0] === "/"
  ) {
    toBeShown = "ERROR";
    updateDisplay();
    operations.length = 0;
    index = 0;
    return;
  }

  // operations' index with a different name than the global one for clarity
  let index2;

  // transform division operations into multiply operations
  // if a division operand is found...
  while ((index2 = operations.indexOf("/")) != -1) {
    // dividing by zero will give an error and the array and index will be reset
    if (parseFloat(operations[index2 + 1]) === 0) {
      toBeShown = "ERROR";
      updateDisplay();
      operations.length = 0;
      index = 0;
      console.log(operations);
      return;
    } else {
      // ...transform the dividing operand into a multiplying operand
      operations[index2] = "x";
      // and change the following value to 1/value
      operations[index2 + 1] = divide(1, operations[index2 + 1]);
    }
  }
  console.log(operations);

  // find and process multiply operations
  // if a multiplying operand is found...
  while ((index2 = operations.indexOf("x")) != -1) {
    // calculate the result
    let tempResult = multiply(operations[index2 - 1], operations[index2 + 1]);
    // and replace the "value x value" by the result
    operations.splice(index2, 2);
    operations[index2 - 1] = tempResult;
  }
  console.log(operations);

  // transform substraction operations into addition operations
  // if a substraction operand is found...
  while ((index2 = operations.indexOf("-")) != -1) {
    // ...transform the substraction operand into an addition operand
    operations[index2] = "+";
    // and change the following value to a negative value
    operations[index2 + 1] = multiply(-1, operations[index2 + 1]);
  }
  console.log(operations);

  // find and process addition operations
  // if an addition operand is found...
  while ((index2 = operations.indexOf("+")) != -1) {
    // calculate the result
    let tempResult = add(operations[index2 - 1], operations[index2 + 1]);
    // and replace the "value + value" by the result
    operations.splice(index2, 2);
    operations[index2 - 1] = tempResult;
  }
  console.log(operations);

  // show error when given wrong input and reset the array and index
  if (operations.includes(NaN)) {
    toBeShown = "ERROR";
    updateDisplay();
    operations.length = 0;
    index = 0;
    console.log(operations);
    return;
  }

  // show the final result with a maximum of 4 digits after the comma
  toBeShown = Math.round(operations[0] * 10000) / 10000;
  updateDisplay();
  // operations.splice(1);
  // set the index of the array to zero again
  index = 0;
  console.log(operations);
}

// helper functions to do the actual math
function add(left, right) {
  return parseFloat(left) + parseFloat(right);
}
function substract(left, right) {
  return parseFloat(left) - parseFloat(right);
}
function multiply(left, right) {
  return parseFloat(left) * parseFloat(right);
}
function divide(left, right) {
  return parseFloat(left) / parseFloat(right);
}
