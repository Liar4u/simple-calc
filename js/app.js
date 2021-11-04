'use strict';
const listOfButtons = [
  [
    '%',
    'CE',
    'C',
    'D',
    '1/x',
    'x2',
    '2√x',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '+/-',
    '0',
    '.',
    '=',
  ],
  [
    'gray_dark',
    'gray_dark',
    'gray_dark',
    'gray_dark',
    'gray_dark',
    'gray_dark',
    'gray_dark',
    'gray_dark',
    'gray',
    'gray',
    'gray',
    'gray_dark',
    'gray',
    'gray',
    'gray',
    'gray_dark',
    'gray',
    'gray',
    'gray',
    'gray_dark',
    'gray',
    'gray',
    'gray',
    'green',
  ],
];

const aliases = {
  '-': 'sub',
  '+': 'sum',
  '/': 'div',
  '*': 'mult',
  '=': 'result',
  D: 'del',
  C: 'clear',
  CE: 'clearEntry',
};

const display = document.querySelector('.display');
const buttonsContainer = document.querySelector('.buttons');
const listOfActionButtons = ['Backspace', 'Delete', 'Enter'];
const correctExpression = new RegExp(/^[\d]{1,9}[+,-,*,/][\d]{1,9}$/);
const operatorInExpression = new RegExp(/[+,-,*,/]/);
let firstNum;
let secondNum;
let operatorAlias;
init();

const operations = {
  sub() {
    return firstNum - secondNum;
  },
  sum() {
    return firstNum + secondNum;
  },
  div() {
    return firstNum / secondNum;
  },
  mult() {
    return firstNum * secondNum;
  },
};

function init() {
  for (let i = 0; i < listOfButtons[0].length; i++) {
    const button = listOfButtons[0][i];
    const style = listOfButtons[1][i];

    initButton(button, style);
  }

  document.body.addEventListener('click', eventHandler);
  document.body.addEventListener('keyup', eventHandler);
}

function initButton(button, style) {
  const currentButton = document.createElement('div');
  currentButton.setAttribute('class', 'button' + ' ' + style);
  currentButton.innerHTML = button;

  buttonsContainer.append(currentButton);
}

function eventHandler(event) {
  const typeOfEvent = event.type;
  let btn = '';

  if (typeOfEvent == 'click' && event.target.classList.contains('button')) {
    btn = event.target.textContent;
  } else if (typeOfEvent == 'keyup' && іsLegalBtn(event.key)) {
    btn = event.key;
  } else {
    return null;
  }

  calc(btn);
}

function іsLegalBtn(btn) {
  if (listOfButtons[0].includes(btn) || listOfActionButtons.includes(btn)) {
    return true;
  } else {
    return false;
  }
}

function calc(symbol) {
  const expression = display.textContent;

  if (
    correctExpression.test(expression) &&
    (symbol === '=' || symbol === 'Enter')
  ) {
    const operator = String(expression.match(operatorInExpression));
    firstNum = Number(expression.slice(0, expression.lastIndexOf(operator)));
    secondNum = Number(
      expression.slice(expression.lastIndexOf(operator) + 1, expression.length)
    );
    operatorAlias = aliases[operator];

    const result = operations[operatorAlias]();
    display.textContent = result;
  } else if (
    display.textContent === '0' &&
    symbol !== '.' &&
    /\d/.test(symbol)
  ) {
    display.textContent = symbol;
  } else {
    display.textContent += symbol;
  }
}

// const displayEitor = {
//   add(symbol) {
//     if (display.textContent === '0' && symbol !== '.' && /\d/.test(symbol)) {
//       display.textContent = symbol;
//     } else {
//       display.textContent += symbol;
//     }
//   },
// };