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

const listOfActionButtons = ['Backspace', 'Delete', 'Enter'];

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

const display = document.querySelector('.display');
const buttonsContainer = document.querySelector('.buttons');
const correctExpression = new RegExp(/^[\d]{1,9}[-,+,*,/][\d]{1,9}$/);
const operatorInExpression = new RegExp(/[-,+,*,/]/);
let firstNum;
let secondNum;
let operator;
let operatorAlias;
let expression;

init();

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
  let input = '';

  if (typeOfEvent == 'click' && event.target.classList.contains('button')) {
    input = event.target.textContent;
  } else if (typeOfEvent == 'keyup' && іsLegalBtn(event.key)) {
    input = event.key;
  } else {
    return null;
  }

  calc(input);
}

function іsLegalBtn(input) {
  if (listOfButtons[0].includes(input) || listOfActionButtons.includes(input)) {
    return true;
  } else {
    return false;
  }
}

function calc(input) {
  expression = get.expression();

  if (
    correctExpression.test(expression) &&
    (input === '=' || input === 'Enter')
  ) {
    operator = get.operator();
    firstNum = get.firstNum();
    secondNum = get.secondNum();
    operatorAlias = get.alias(operator);

    const result = get.result();
    display.textContent = result;
  } else if (display.textContent === '0' && input !== '.' && /\d/.test(input)) {
    display.textContent = input;
  } else if (input === 'Backspace' || input === 'D') {
    display.textContent = expression.substring(0, expression.length - 1);
  } else {
    display.textContent += input;
  }
}

// const displayEitor = {
//   add(input) {
//     if (display.textContent === '0' && input !== '.' && /\d/.test(input)) {
//       display.textContent = input;
//     } else {
//       display.textContent += input;
//     }
//   },
//   replace() {},
//   del() {},
//   clear() {},
// };

const get = {
  expression() {
    return display.textContent;
  },

  operator() {
    return String(expression.match(operatorInExpression));
  },

  firstNum() {
    return Number(expression.slice(0, expression.lastIndexOf(operator)));
  },

  secondNum() {
    return Number(
      expression.slice(expression.lastIndexOf(operator) + 1, expression.length)
    );
  },

  alias(input) {
    return aliases[input];
  },

  result() {
    return operations[operatorAlias]();
  },
};
