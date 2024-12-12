function registerClickHandlerForNumberButtons() {
    const numberButtons = document.querySelectorAll('.number');
    for (const numberButton of numberButtons) {
        numberButton.addEventListener('click', () => {
            display.addCharacter(numberButton.textContent);
        });
    }
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
        display.addCharacter('.');
    });
}

function handleAllClearOperation() {
    storedValue = 0;
    currentOperator = null;
    lastOperation = null;

    display.clear();
}

function handleClearOperation() {
    display.clear();
}

function handlePercentageOperation() {
    let currentValue = display.getCurrentValue();
    currentValue *= 0.01;
    display.setValue(currentValue);
}

function saveLastOperation() {
    lastOperation = { operator: currentOperator, number: display.getCurrentValue() };
}

function repeatLastOperation() {
    return applyOperator(storedValue, lastOperation.number, lastOperation.operator);
}

function handleEqualsOperation() {
    if (currentOperator === null && lastOperation !== null) {
        storedValue = repeatLastOperation();
    }
    else if (currentOperator !== null) {
        const currentValue = display.getCurrentValue();
        storedValue = performOperation(currentOperator, currentValue);
        saveLastOperation();
        currentOperator = null;
    }

    display.setValue(storedValue);
}

function handleOperator(selectedOperator) {
    const currentValue = display.getCurrentValue();

    storedValue = currentOperator === null
        ? currentValue
        : performOperation(currentOperator, currentValue);

    currentOperator = selectedOperator;

    display.setValue(storedValue);
}

function performOperation(operator, value) {
    return applyOperator(storedValue, value, operator);
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

let storedValue = 0;
let currentOperator = null;
let lastOperation = null;

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

const display = {
    decimalAllowed: true,
    currentDisplayValue: '0',
    displayElement: document.querySelector('#display'),

    clear() {
        this.decimalAllowed = true;
        this.currentDisplayValue = '0';
        this.displayElement.textContent = this.currentDisplayValue;
    },

    addCharacter(character) {
        if (this.currentDisplayValue.length >= 12) {
            return;
        }

        if (character === '.') {
            if (!this.decimalAllowed) {
                return;
            }

            this.decimalAllowed = false;
        }

        if (character !== '.' && this.currentDisplayValue === '0') {
            this.currentDisplayValue = '';
        }

        this.currentDisplayValue += character;
        this.displayElement.textContent = this.currentDisplayValue;
    },

    getCurrentValue() {
        return parseFloat(this.currentDisplayValue);
    },

    setValue(value) {
        this.currentDisplayValue = value.toString();
        this.displayElement.textContent = this.sanitizedCurrentValue();

        this.acceptNewInput();
    },

    sanitizedCurrentValue() {
        for (let i = 12; i >= 0; i--) {
            let str = this.getCurrentValue().toFixed(i);

            // Remove trailing zeros and possible trailing decimal
            str = str.replace(/0+$/, '');
            str = str.replace(/\.$/, '');

            if (str.length <= 12) {
                return str; // Stop at the first suitable format
            }
        }

        return value;
    },

    acceptNewInput() {
        this.currentDisplayValue = '0';
        this.decimalAllowed = true;
    }
}

registerClickHandlerForNumberButtons();
registerClickHandlerForOperationButtons();
registerClickHandlerForDotButton();

display.clear();
