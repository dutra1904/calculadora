let currentValue = "0"; // Valor atual
let previousValue = null; // Valor anterior
let operation = null; // Operação atual
let error = false; // Indica se ocorreu um erro

// Atualiza o display da calculadora
function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = currentValue;
}

// Limpa o display
function clearAll() {
  currentValue = "0";
  previousValue = null;
  operation = null;
  error = false;
  updateDisplay();
}

// Limpa a última entrada
function clearLast() {
  if (error) {
    clearAll();
  } else {
    currentValue = "0";
    updateDisplay();
  }
}

// Alterna o sinal do número atual
function toggleSign() {
  if (currentValue !== "0" && !error) {
    if (currentValue.startsWith("-")) {
      currentValue = currentValue.slice(1);
    } else {
      currentValue = "-" + currentValue;
    }
    updateDisplay();
  }
}

// Insere um dígito
function inputDigit(digit) {
  if (error) {
    clearAll();
  }
  if (currentValue === "0") {
    currentValue = digit;
  } else if (currentValue.length < 8) {
    currentValue += digit;
  }
  updateDisplay();
}

// Insere o ponto decimal
function inputDecimal() {
  if (error) {
    clearAll();
  }
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

// Define a operação a ser realizada
function setOperation(op) {
  if (error) {
    clearAll();
  }
  if (operation) {
    calculate();
  }
  previousValue = parseFloat(currentValue);
  currentValue = "0";
  operation = op;
}

// Função de raiz quadrada
function squareRoot() {
  if (error) {
    clearAll();
  }
  const value = parseFloat(currentValue);
  if (value < 0) {
    currentValue = "ERR"; // Não é possível tirar raiz de número negativo
    error = true;
  } else {
    currentValue = Math.sqrt(value).toString();
  }
  updateDisplay();
}

// Função de porcentagem
function percentage() {
  if (error) {
    clearAll();
  }
  const value = parseFloat(currentValue);
  currentValue = (value / 100).toString();
  updateDisplay();
}

// Função de potência (exponenciação)
function power() {
  if (error) {
    clearAll();
  }
  previousValue = parseFloat(currentValue);
  currentValue = "0";
  operation = "^"; // Definindo a operação como potência
}

// Realiza o cálculo com base na operação
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
        if (current === 0) {
          result = "ERR";
          error = true;
        } else {
          result = previousValue / current;
        }
        break;
      case "^":
        result = Math.pow(previousValue, current); // Calculando a potência
        break;
      default:
        return;
    }

    // Limita o resultado a 8 dígitos e arredonda até 3 casas decimais
    if (result === "ERR" || result.toString().length > 8) {
      currentValue = "ERR";
      error = true;
    } else {
      currentValue = result.toString().slice(0, 8);
    }

    previousValue = null;
    operation = null;
    updateDisplay();
  }
}
