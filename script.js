"use strict";
const numberContainer = document.querySelector(".number-container");
const numberScreen = document.querySelector(".number-screen");
const btnOperators = document.querySelectorAll(".btn-operator");
const symbols = ["+", "-", "*", "/"];
const calculator = {
  add(...n) {
    return n.reduce((summ, cur) => (summ += cur), 0);
  },
  susbtract(...n) {
    return n.reduce((res, cur, i) => (i === 0 ? cur : (res -= cur)), 0);
  },
  multiply(...n) {
    return n.reduce((acc, cur) => cur * acc, 1);
  },
  divide(...n) {
    return n.reduce((acc, cur, i) => (i === 0 ? cur : acc / cur), 0);
  },
  operate(operator, ...n) {
    if (operator === "+") return this.add(...n);
    if (operator === "-") return this.susbtract(...n);
    if (operator === "*") return this.multiply(...n);
    if (operator === "/") return this.divide(...n);
  },
};

for (let i = 1; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.classList.add("btn");
  btn.classList.add("btn-number");
  numberContainer.appendChild(btn);
}

const allButtons = document.querySelectorAll(".btn");
const btnNumber = document.querySelectorAll(".btn-number");

btnNumber.forEach((btn) => {
  btn.addEventListener("click", function () {
    numberScreen.textContent += btn.textContent;
  });
});

btnOperators.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (numberScreen.textContent === "") return;
    if (
      numberScreen.textContent.endsWith("+") ||
      numberScreen.textContent.endsWith("-") ||
      numberScreen.textContent.endsWith("*") ||
      numberScreen.textContent.endsWith("/")
    )
      return;
    numberScreen.textContent += btn.textContent;
  });
});
