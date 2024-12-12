function updateDisplay() {
    const display = document.querySelector('#display');
    const valueToSet = currentDisplayValue === '' ? '0' : currentDisplayValue;

    display.textContent = valueToSet;
}

function registerClickHandlerForNumberButton(numberButton) {
    numberButton.addEventListener('click', () => {
    });
}

function registerClickHandlerForOperationButton(operationButton) {
    operationButton.addEventListener('click', () => {
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

let currentDisplayValue = '';

registerClickHandlerForNumberButtons();
registerClickHandlerForOperationButtons();
registerClickHandlerForDotButton();
updateDisplay();