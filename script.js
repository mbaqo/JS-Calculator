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
    str = number.toString();
    let toReturn = "" + number;
    if (str.length > MAX_LENGTH) {
        if (str.includes(".")) {
            const [int, decimal] = str.split(".");
            const maxDecimals = MAX_LENGTH - int.length - 1;
            if (maxDecimals >= 0 && decimal.length <= maxDecimals) {
                toReturn = number.toFixed(maxDecimals);
            } else {
                toReturn = number.toExponential(2);
            }
        } else {
            toReturn = number.toExponential(2);
            // const expStr = number.toExponential(MAX_LENGTH - 5);
            // return expStr.length <= MAX_LENGTH ? expStr : number.toExponential(MAX_LENGTH - 6)
        }
    }
    if (toReturn.length > MAX_LENGTH) {
        return "ERROR"
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
    if (text.length >= MAX_LENGTH) {
        return true;
    }
    return false;
}

inputDigit();