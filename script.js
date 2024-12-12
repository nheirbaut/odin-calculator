function updateDisplay() {
    let currentValue = parseFloat(currentDisplayValue);

    if (isNaN(currentValue) || currentValue === 0) {
        currentDisplayValue = "0";
    } else {
        for (let i = 12; i >= 0; i--) {
            let str = currentValue.toFixed(i);

            // Remove trailing zeros and possible trailing decimal
            str = str.replace(/0+$/, '');
            str = str.replace(/\.$/, '');

            if (str.length <= 12) {
                currentDisplayValue = str;
                break; // Stop at the first suitable format
            }
        }
    }

    display.textContent = currentDisplayValue;
}

function clearDisplay() {
    currentDisplayValue = '0';
    display.textContent = currentDisplayValue;
}

function handleAddNumber(numStr) {
    if (justEvaluated) {
        // Start fresh after evaluation
        currentDisplayValue = "";
        justEvaluated = false;
    }

    // If display is '0' and user enters a number, replace it
    if (currentDisplayValue === '0') {
        currentDisplayValue = numStr;
    } else {
        if (currentDisplayValue.length < 12) {
            currentDisplayValue += numStr;
        }
    }

    updateDisplay();
}

function handleAddDecimal() {
    if (justEvaluated) {
        currentDisplayValue = "0";
        justEvaluated = false;
    }

    if (allowDecimal) {
        if (currentDisplayValue === '') {
            currentDisplayValue = '0.';
        } else {
            if (currentDisplayValue.length < 12) {
                currentDisplayValue += '.';
            }
        }

        allowDecimal = false;
    }

    updateDisplay();
}

function registerClickHandlerForNumberButtons() {
    const numberButtons = document.querySelectorAll('.number');
    for (const numberButton of numberButtons) {
        numberButton.addEventListener('click', () => {
            handleAddNumber(numberButton.textContent);
        });    }
}

function registerClickHandlerForOperationButtons() {
    const operationButtons = document.querySelectorAll('.operation');
    for (const operationButton of operationButtons) {
        operationButton.addEventListener('click', () => {
            operations[operationButton.id]();
        });
    }
}

function registerClickHandlerForDotButton() {
    const dotButton = document.querySelector('#dot');
    dotButton.addEventListener('click', () => {
        handleAddDecimal();
    });
}

function handleAllClearOperation() {
    storedValue = 0;
    currentOperator = null;
    lastOperation = null;
    justEvaluated = false;
    allowDecimal = true;

    clearDisplay();
}

function handleClearOperation() {
    justEvaluated = false;
    allowDecimal = true;

    clearDisplay();
}

function handlePercentageOperation() {
    let currentValue = parseFloat(currentDisplayValue);
    currentValue *= 0.01;
    currentDisplayValue = currentValue.toString();

    // After pressing %, treat it as evaluated so next operator continues from here
    justEvaluated = true;

    updateDisplay();
}

function handleEqualsOperation() {
    let currentValue = parseFloat(currentDisplayValue);

    if (currentOperator === null && lastOperation !== null) {
        // Repeat the last operation if equals is pressed again
        storedValue = applyOperator(storedValue, lastOperation.number, lastOperation.operator);
    } else if (currentOperator !== null) {
        // Perform the pending operation
        storedValue = applyOperator(storedValue, currentValue, currentOperator);
        // Save for repeated equals
        lastOperation = { operator: currentOperator, number: currentValue };
        currentOperator = null;
    }

    currentDisplayValue = storedValue.toString();
    justEvaluated = true;
    allowDecimal = true;

    updateDisplay();
}

function handleOperator(selectedOperator) {
    let currentValue = parseFloat(currentDisplayValue);

    // If no operator is currently active
    if (currentOperator === null) {
        storedValue = currentValue;
        currentOperator = selectedOperator;
        justEvaluated = false;
    } else {
        // If we just evaluated a result and now choose a new operator:
        if (justEvaluated) {
            currentOperator = selectedOperator;
        } else {
            // We have an operator and a current number: perform operation
            storedValue = applyOperator(storedValue, currentValue, currentOperator);
            currentDisplayValue = storedValue.toString();
            currentOperator = selectedOperator;
            justEvaluated = true;

            updateDisplay();
        }
    }

    // Prepare for new number input
    currentDisplayValue = "";
    allowDecimal = true;
}

function applyOperator(left, right, operator) {
    switch (operator) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return right === 0 ? Infinity : left / right;
        default: return right;
    }
}

let currentDisplayValue = '';
let storedValue = 0;
let currentOperator = null;
let lastOperation = null;
let justEvaluated = false;
let allowDecimal = true;

const display = document.querySelector('#display');

const operations = {
    "all-clear": handleAllClearOperation,
    "clear": handleClearOperation,
    "percentage": handlePercentageOperation,
    "equals": handleEqualsOperation,
    "addition": () => handleOperator('+'),
    "subtraction": () => handleOperator('-'),
    "multiplication": () => handleOperator('*'),
    "division": () => handleOperator('/')
};

registerClickHandlerForNumberButtons();
registerClickHandlerForOperationButtons();
registerClickHandlerForDotButton();

clearDisplay();
