"use strict";
const numberContainer = document.querySelector(".number-container");
const numberScreen = document.querySelector(".number-screen");
const btnOperators = document.querySelectorAll(".btn-operator");
const btnEqual = document.querySelector(".btn-equal");
const symbols = ["+", "-", "*", "/"];
const calculator = {
  add(...n) {
    return n.reduce((summ, cur) => (summ += Number(cur)), 0);
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
  operate(n1, operator, n2) {
    if (operator === "+") return this.add(n1, n2);
    if (operator === "-") return this.susbtract(n1, n2);
    if (operator === "*") return this.multiply(n1, n2);
    if (operator === "/") return this.divide(n1, n2);
  },
};

for (let i = 0; i <= 11; i++) {
  const btn = document.createElement("button");
  if (i <= 9) {
    btn.textContent = i;
    btn.classList.add("btn");
    btn.classList.add("btn-number");
    numberContainer.appendChild(btn);
  }

  if (i === 10) {
    btn.textContent = ".";
    btn.classList.add("btn");
    btn.classList.add("btn-number");
    btn.classList.add("btn-point");
    numberContainer.appendChild(btn);
  }

  if (i === 11) {
    btn.textContent = "clear";
    btn.classList.add("btn");
    btn.classList.add("btn-clear");
    numberContainer.appendChild(btn);
  }
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
    numberScreen.textContent += " " + btn.textContent + " ";
  });
});

const findIndexMultOrDivision = function (arr) {
  return arr.findIndex((n) => n === "*" || n === "/");
};

const findIndexSumRes = function (arr) {
  return arr.findIndex((n) => n === "+" || n === "-");
};

const operationResult = function (str) {
  const substr = str.split?.(" ");

  const numbeOfOperations = substr.filter((n) => symbols.includes(n));

  numbeOfOperations.forEach((e) => {
    let opIndex;
    substr.includes("*") || substr.includes("/")
      ? (opIndex = findIndexMultOrDivision(substr))
      : (opIndex = findIndexSumRes(substr));

    const subOperation = substr.splice(opIndex - 1, 3);
    const subOpResult = calculator.operate(...subOperation);
    substr.splice(opIndex - 1, 0, subOpResult);

    console.log(substr);
  });
};

btnEqual.addEventListener("click", function () {
  const operationtext = numberScreen.textContent;
  const substr = operationtext.split(" ");
  const numbeOfOperations = substr.filter((n) => symbols.includes(n));

  numbeOfOperations.forEach((e) => {
    let opIndex;
    substr.includes("*") || substr.includes("/")
      ? (opIndex = findIndexMultOrDivision(substr))
      : (opIndex = findIndexSumRes(substr));

    const subOperation = substr.splice(opIndex - 1, 3);
    const subOpResult = calculator.operate(...subOperation);
    substr.splice(opIndex - 1, 0, subOpResult);
  });
  console.log(substr);
  numberScreen.textContent = substr;
});
