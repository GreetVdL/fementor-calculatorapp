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

function updateDisplay() {
  displayField.textContent = toBeShown;
}

const values = document.querySelectorAll(".value");
values.forEach((value) => {
  value.addEventListener("click", function () {
    const actualValue = this.textContent;
    toBeShown += actualValue;
    updateDisplay();
  });
});

const operands = document.querySelectorAll(".operand");
operands.forEach((operand) => {
  operand.addEventListener("click", function () {
    const actualOperand = this.textContent;
    toBeShown += actualOperand;
    updateDisplay();
  });
});

const comma = document.querySelector("#point");
comma.addEventListener("click", function () {
  toBeShown += ",";
  updateDisplay();
});

const del = document.querySelector("#del");
del.addEventListener("click", function () {
  toBeShown = toBeShown.slice(0, toBeShown.length - 1);
  if (toBeShown.length === 0) {
    toBeShown = "0";
  }
  updateDisplay();
});

const reset = document.querySelector("#reset");
reset.addEventListener("click", function () {
  toBeShown = "0";
  updateDisplay();
});

// calculating functionality
