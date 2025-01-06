let numberOne = 10;
let numberTwo = 0;
let operator = "/";

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

//console.log(operate(numberOne, numberTwo, operator));

