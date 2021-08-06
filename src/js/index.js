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
