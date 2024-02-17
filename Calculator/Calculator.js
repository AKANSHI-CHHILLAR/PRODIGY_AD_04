let operand1 = 0;
let operand2 = null;
let currentOperation = null;

function appendValue(value) {
  let screen = document.getElementById('screen');
  screen.value += value;
}

function clearScreen() {
  let screen = document.getElementById('screen');
  screen.value = '';
  operand1 = 0;
  operand2 = null;
  currentOperation = null;
}

function backspace() {
  let screen = document.getElementById('screen');
  screen.value = screen.value.substr(0, screen.value.length - 1);
}

function calculate(operation, value) {
  if (operation !== '=' && value !== null) {
    if (currentOperation === null) {
      operand1 = value;
    } else {
      operand2 = value;
    }
    currentOperation = operation;
    