const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const input = document.querySelector("input");

let numberOne = "";
let numberTwo = "";
let operator = "";
input.value = 0;

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (a, b, symbol) {
    let result;

    switch (symbol) {
        case "+":
            result = add (a, b);
            break;
        case "-":
            result = subtract (a, b);
            break;
        case "*":
            result = multiply (a, b);
            break;
        default:
            result = divide (a, b);   
    }
    return result;
}

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!operator) {
            numberOne += button.value;
            input.value = numberOne;
        } else {
            numberTwo += button.value;
            input.value = numberOne + operator + numberTwo;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (numberOne && !numberTwo) {
            operator = button.value;
            input.value = numberOne + operator;
        }
    });
});

equalButton.addEventListener("click", () => {
    if (numberOne != "" && numberTwo != "" && operator != "") {
        alert(operate(numberOne, numberTwo, operator));
    }
});