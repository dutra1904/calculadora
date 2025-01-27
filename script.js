let currentValue = "0";
let previousValue = null;
let operation = null;

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = currentValue;
}

function inputDigit(digit) {
  if (currentValue === "0") {
    currentValue = digit;
  } else if (currentValue.length < 8) {
    currentValue += digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

function setOperation(op) {
  if (operation && previousValue !== null) {
    calculate();
  }
  previousValue = parseFloat(currentValue);
  currentValue = "0";
  operation = op;
}

function calculate() {
  if (operation && previousValue !== null) {
    let result;
    const current = parseFloat(currentValue);
    switch (operation) {
      case "+":
        result = previousValue + current;
        break;
      case "-":
        result = previousValue - current;
        break;
      case "*":
        result = previousValue * current;
        break;
      case "/":
        result = current === 0 ? "ERR" : previousValue / current;
        break;
    }
    currentValue = result.toString().slice(0, 8);
    if (currentValue === "NaN" || currentValue === "ERR") {
      currentValue = "ERR";
    }
    operation = null;
    previousValue = null;
    updateDisplay();
  }
}

function clearLast() {
  currentValue = "0";
  updateDisplay();
}

function clearAll() {
  currentValue = "0";
  previousValue = null;
  operation = null;
  updateDisplay();
}

function toggleSign() {
  if (currentValue !== "0") {
    currentValue = currentValue.startsWith("-")
      ? currentValue.slice(1)
      : "-" + currentValue;
  }
  updateDisplay();
}
