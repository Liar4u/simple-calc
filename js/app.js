'use strict'
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

const buttonsContainer = document.querySelector('.buttons');

init();

function init() {
  for (let i = 0; i < listOfButtons[0].length; i++) {
    const button = listOfButtons[0][i];
    const style = listOfButtons[1][i];

    initButton(button, style);
  }
}

function initButton(button, style) {
  const currentButton = document.createElement('div');
  currentButton.setAttribute('class', 'button' + ' ' + style);
  currentButton.innerHTML = button;

  buttonsGrid.append(currentButton);
}
