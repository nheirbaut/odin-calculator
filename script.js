function updateDisplay() {
    const display = document.querySelector('#display');

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

function addCharacterToDisplay(character) {
    if (currentDisplayValue.length === 12) {
        return;
    }
    currentDisplayValue += character;
    updateDisplay();
}

function addNumberToDisplay(number) {
    addCharacterToDisplay(number);
}

function registerClickHandlerForNumberButton(numberButton) {
    numberButton.addEventListener('click', () => {
        addNumberToDisplay(numberButton.textContent);
    });
}

function registerClickHandlerForOperationButton(operationButton) {
    operationButton.addEventListener('click', () => {
        operations[operationButton.id]();
        updateDisplay();
    });
}

function registerClickHandlerForNumberButtons() {
    const numberButtons = document.querySelectorAll('.number');
    for (const numberButton of numberButtons) {
        registerClickHandlerForNumberButton(numberButton);
    }
}

function registerClickHandlerForOperationButtons() {
    const operationButtons = document.querySelectorAll('.operation');
    for (const operationButton of operationButtons) {
        registerClickHandlerForOperationButton(operationButton);
    }
}

function registerClickHandlerForDotButton() {
    const dotButton = document.querySelector('#dot');
    dotButton.addEventListener('click', () => {
    });
}

function allClear() {
    previousDisplayValue = '';
    currentDisplayValue = '';
}

function clear() {
    currentDisplayValue = '';
}

function percentage() {
    let currentValue = parseFloat(currentDisplayValue);
    currentValue *= 0.01;
    currentDisplayValue = currentValue.toString();
}

let currentDisplayValue = '';

const operations = {
    "all-clear": allClear,
    "clear": clear,
    "percentage": percentage,
}

registerClickHandlerForNumberButtons();
registerClickHandlerForOperationButtons();
registerClickHandlerForDotButton();
updateDisplay();