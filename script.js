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
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "X":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function inputDigit() {
    const digits = document.querySelectorAll((".num-btn"));
    const operators = document.querySelectorAll(".operator-btn");
    const text = document.querySelector(".result-text");
    let a = "";
    let b = "";
    let selectedOperator = "";
    digits.forEach((digit) => {
        digit.addEventListener("click", (e) => {
            if (!isTextFull()) {
                if (a && selectedOperator) {
                    b += digit.textContent;
                    text.textContent = b;
                } else {
                    a += digit.textContent;
                    text.textContent = a;
                }
                console.log(text);
            }
        });
    });

    operators.forEach((operator) => {
        operator.addEventListener("click", (e) => {
            if (a && b) {
                const result = operate(Number(a), Number(b), selectedOperator);
                console.log(result);
                text.textContent = result;
                a = result;
                b = "";
            }
            selectedOperator = operator.textContent;
            console.log(operator.textContent);
        })
    });

    const equalBtn = document.querySelector("#equal-btn");
    equalBtn.addEventListener("click", (e) => {
        if (a && b) {
            const result = operate(Number(a), Number(b), selectedOperator);
            console.log(result);
            text.textContent = result;
            a = result;
            b = "";
        }
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