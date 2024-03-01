const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = () => {
    if (a === "Error" || b === "Error") {
        return "Error";
    }

    x = Number(a);
    y = Number(b);

    switch(op) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            if (y !== 0 ) {
                return divide(x, y);
            } else {
                zeroDivisionError();
                return "Error";
            }
    }
};

const roundNumber = (num) => {
    const numStr = num.toString();
    if (numStr.length > 10) {
        if (numStr.includes('.')) {
            const integer = numStr.split('.')[0];
            const fraction = numStr.split('.')[1];

            if (integer.length > 8) {
                return num.toExponential(4);
            } else {
                return num.toFixed(10 - integer.length - 1);
            }
        } else {
            return num.toExponential(4);
        }
    }

    return num;
};

const operatorClick = (oper) => {
    if (a !== null && op !== null) {
        a = roundNumber(operate());
        display(a, false);
    } else {
        a = b;
    }

    b = '0';
    op = oper;
    clearDisplay = true;
    disableBackspace = true;
};

const numberClick = (num) => {
    display(num);
    disableBackspace = false;
};

const equalsButton = () => {
    if (a !== null && b !== null && op !== null) {
        b = roundNumber(operate());
        display(b, false);
        a = op = null;
        clearDisplay = true;
        disableBackspace = true;
    } 
};

const backspaceButton = () => {
    if (!disableBackspace) {
        if (displayText.textContent.length === 1) {
            display('0', false);
        } else {
            display(displayText.textContent.slice(0, -1), false);
        }
    }
};

const clearButton = () => {
    a = op = null;
    display('0', false);
};

const zeroDivisionError = () => {
    a = op = null;
    b = '0';
    clearDisplay = true;
    disableBackspace = true;
};

const display = (text, append=true) => {
    if (append) {
        if (clearDisplay) {
            displayText.textContent = '0';
            clearDisplay = false;
        }

        if (displayText.textContent.length < 10) {
            if (text !== '.' && text !== '0' && displayText.textContent === '0') {
                displayText.textContent = text;
            } else if ((text !== '.' && text !== '0' && displayText.textContent !== '0')
                || (text === '.' && !(displayText.textContent.includes('.')))
                || (text === '0' && displayText.textContent !== '0')) {
                displayText.textContent += text;
            }
        }
    } else {
        displayText.textContent = text;
    }

    b = displayText.textContent;
};

document.querySelector("#zero").addEventListener("click", () => numberClick('0'));
document.querySelector("#one").addEventListener("click", () => numberClick('1'));
document.querySelector("#two").addEventListener("click", () => numberClick('2'));
document.querySelector("#three").addEventListener("click", () => numberClick('3'));
document.querySelector("#four").addEventListener("click", () => numberClick('4'));
document.querySelector("#five").addEventListener("click", () => numberClick('5'));
document.querySelector("#six").addEventListener("click", () => numberClick('6'));
document.querySelector("#seven").addEventListener("click", () => numberClick('7'));
document.querySelector("#eight").addEventListener("click", () => numberClick('8'));
document.querySelector("#nine").addEventListener("click", () => numberClick('9'));
document.querySelector("#point").addEventListener("click", () => numberClick('.'));
document.querySelector("#add").addEventListener("click", () => operatorClick('+'));
document.querySelector("#subtract").addEventListener("click", () => operatorClick('-'));
document.querySelector("#multiply").addEventListener("click", () => operatorClick('*'));
document.querySelector("#divide").addEventListener("click", () => operatorClick('/'));
document.querySelector("#equals").addEventListener("click", equalsButton);
document.querySelector("#backspace").addEventListener("click", backspaceButton);
document.querySelector("#clear").addEventListener("click", clearButton);

document.addEventListener("keydown", (event) => {
    const btn = event.key;

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(btn)) {
        numberClick(btn);
    } else if (['+', '-', '*', '/'].includes(btn)) {
        operatorClick(btn);
    } else if (btn === "Enter") {
        equalsButton();
    } else if (btn === "Backspace") {
        backspaceButton();
    } else if (btn === "C" || btn === "c") {
        clearButton();
    }
});

let a = op = null;
let b = '0';

let displayText = document.querySelector("#display");
let clearDisplay = false;
let disableBackspace = true;