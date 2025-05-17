const MAX_LENGTH = 9;

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
    if (b === 0) {
        return "undefined";
    }
    return a / b;
}

function operate(a, b, operator) {
    let toReturn = 0;
    switch (operator) {
        case "+":
            toReturn = add(a, b);
            break;
        case "-":
            toReturn = subtract(a, b);
            break;
        case "X":
            toReturn = multiply(a, b);
            break;
        case "/":
            toReturn = divide(a, b);
            break;
    }
    return truncateNumber(toReturn);
}

function truncateNumber(number) {
    let toReturn = "" + number;
    if (toReturn.length > MAX_LENGTH) {
        if (toReturn.includes(".")) {
            const [int, decimal] = toReturn.split(".");
            const maxDecimals = MAX_LENGTH - int.length - 1;
            if (maxDecimals >= 0) {
                toReturn = number.toFixed(maxDecimals);
            } else {
                toReturn = number.toExponential(2);
            }
        } else {
            toReturn = number.toExponential(2);
        }
    }
    if (toReturn.length > MAX_LENGTH) {
        return number.toExponential(2);
    }
    return toReturn;
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
            if (a && selectedOperator && b.length < MAX_LENGTH) {
                b += digit.textContent;
                text.textContent = b;
            } else if (a.length < MAX_LENGTH && !selectedOperator) {
                a += digit.textContent;
                text.textContent = a;

            }
            console.log(`a: ${a} , b: ${b}, operator: ${selectedOperator}`);
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
                console.log(`a: ${a} , b: ${b}, operator: ${selectedOperator}`);
            }
            if (a) {
                selectedOperator = operator.textContent;
                console.log(operator.textContent);
            }
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

    const clearBtn = document.querySelector("#clear-btn");
    clearBtn.addEventListener("click", (e) => {
        a = "";
        b = "";
        selectedOperator = "";
        text.textContent = "";
    })

    const deleteBtn = document.querySelector("#delete-btn");
    deleteBtn.addEventListener("click", (e) => {
        if (a && selectedOperator) {
            b = b.substring(0, b.length - 1);
            text.textContent = text.textContent.substring(0, text.textContent.length - 1);
        } else {
            a = a.substring(0, a.length -1);
            text.textContent = text.textContent.substring(0, text.textContent.length - 1);
        }
    })
}
function isTextFull() {
    const text = document.querySelector(".result-text").textContent;
    if (text.length >= MAX_LENGTH) {
        return true;
    }
    return false;
}

inputDigit();