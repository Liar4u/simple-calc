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

const display = document.querySelector('.display');
const buttonsContainer = document.querySelector('.buttons');
const listOfActionButtons = ['Backspace', 'Delete', 'Enter'];

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
  let btn = '';

  if (typeOfEvent == 'click' && event.target.classList.contains('button')) {
    btn = event.target.textContent;
  } else if (typeOfEvent == 'keyup' && іsLegalBtn(event.key)) {
    btn = event.key;
  } else {
    return null;
  }

  calc(btn);
  displayEitor.add(btn);
}

function іsLegalBtn(btn) {
  if (
    listOfButtons[0].includes(btn) ||
    listOfActionButtons.includes(btn)
  ) {
    return true;
  } else {
    return false;
  }
}

function calc(btn) {
}

const displayEitor = {
  add(symbol) {
    if (display.textContent === '0') {
      display.textContent = symbol;
    } else {
      display.textContent += symbol;
    }
  },
};
