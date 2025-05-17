function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function inputDigit() {
    const digits = document.querySelectorAll((".num-btn"));
    const text = document.querySelector(".result-text");
    digits.forEach((digit) => {
        digit.addEventListener(("click"), (e) => {
            if (!isTextFull()) {
                text.textContent += digit.textContent;
                console.log(text);
            }
        });
    });
}

function isTextFull() {
    const text = document.querySelector(".result-text").textContent;
    if (text.length >= 9) {
        return true;
    }
    return false;
}

inputDigit();