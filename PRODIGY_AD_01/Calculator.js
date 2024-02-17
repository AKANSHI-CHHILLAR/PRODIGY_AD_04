let operand1, operand2, currentOperation;

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
  screen.value = screen.value.slice(0, -1);
}

function calculate(operation, value) {
  if (operation !== '=' && value !== null) {
    if (currentOperation === null) {
      operand1 = parseFloat(screen.value);
    } else {
      operand2 = parseFloat(screen.value);
    }
    currentOperation = operation;
    screen.value = '';

    switch (currentOperation) {
      case '+':
        screen.value = operand1 + operand2;
        break;
      case '-':
        screen.value = operand1 - operand2;
        break;
      case '*':
        screen.value = operand1 * operand2;
        break;
      case '/':
        screen.value = operand1 / operand2;
        break;
      default:
        break;
    }
  } else if (value === null && currentOperation !== null) {
    switch (currentOperation) {
      case '+':
        screen.value = operand1 + operand2;
        break;
      case '-':
        screen.value = operand1 - operand2;
        break;
      case '*':
        screen.value = operand1 * operand2;
        break;
      case '/':
        screen.value = operand1 / operand2;
        break;
      default:
        break;
    }
  }
}