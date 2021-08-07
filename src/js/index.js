import "../css/style.scss";
// import Square from "./classes/Square";

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

// display functionality

const displayField = document.querySelector("section span");
let toBeShown = "";

const operations = [];
let index = 0;

function updateDisplay() {
  if (operations.length === 0) {
    toBeShown = "0";
  }
  displayField.textContent = toBeShown;
}

const values = document.querySelectorAll(".value");
values.forEach((value) => {
  value.addEventListener("click", function () {
    const actualValue = this.textContent;
    if (!operations[index]) {
      operations[index] = actualValue;
    } else {
      operations[index] += actualValue;
    }
    console.log(operations);
    toBeShown = operations.join("");
    updateDisplay();
  });
});

const operands = document.querySelectorAll(".operand");
operands.forEach((operand) => {
  operand.addEventListener("click", function () {
    const actualOperand = this.textContent;
    index++;
    operations[index] = actualOperand;
    index++;
    console.log(operations);
    toBeShown = operations.join("");
    updateDisplay();
  });
});

const del = document.querySelector("#del");
del.addEventListener("click", function () {
  if (index) {
    index--;
  }
  operations.pop();
  toBeShown = operations.join("");
  updateDisplay();
  console.log(operations);
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", function () {
  operations.length = 0;
  index = 0;
  updateDisplay();
  console.log(operations);
});
