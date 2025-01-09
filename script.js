/* round to avoid overflow 
Math.round(123.4567 * 100) / 100; // 123.46
let rounded = Number(num.toFixed(18));
   
   decimal dot
   backspace button
   keyboard support
   cool layout 
   color change
   embellishment of error
   
   DONE:
   clear button
   divide by 0
   first negative number
*/

const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operator");
const equalButtons = document.querySelectorAll(".equal");
const inputResult = document.querySelector("#result");
const inputCalc = document.querySelector("#calculation");
const clearButton = document.querySelector("#clear");
const negativeButton = document.querySelector(".negative");

let numberOne = "";
let numberTwo = "";
let operator = "";
inputResult.value = 0;

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
    if (b != 0) return a / b;
    else return "ERROR";
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
            if (inputResult.value != "ERROR") {
                numberOne += button.value;
                inputResult.value = numberOne;
            } else {
                numberOne = "";
                inputResult.value = "";
                numberOne += button.value;
                inputResult.value = numberOne;
            }
        } else {
            numberTwo += button.value;
            inputResult.value = numberOne + operator + numberTwo;
        } 
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (numberOne && numberOne != "-" && !numberTwo && !operator && inputResult.value !="ERROR") {
            operator = button.value;
            inputResult.value = numberOne + operator;
        } else if (inputResult.value == "ERROR") {
            operator = "";
        } 
    });
});

equalButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (numberOne != "" && numberTwo != "" && operator != "") {
            switch (button.value) {
                case "=":
                    inputResult.value = operate(+numberOne, +numberTwo, operator);
                    inputCalc.value = numberOne + operator + numberTwo;
                    numberOne = inputResult.value;
                    operator = "";
                    numberTwo = "";
                    break;
                case "+":
                    inputResult.value = operate(+numberOne, +numberTwo, operator);
                    inputCalc.value = numberOne + operator + numberTwo;
                    numberOne = inputResult.value;
                    operator = "+";
                    numberTwo = "";
                    inputResult.value = numberOne + operator;
                    break;
                case "-":
                    inputResult.value = operate(+numberOne, +numberTwo, operator);
                    inputCalc.value = numberOne + operator + numberTwo;
                    numberOne = inputResult.value;
                    operator = "-";
                    numberTwo = "";
                    inputResult.value = numberOne + operator;
                    break;
                case "*":
                    inputResult.value = operate(+numberOne, +numberTwo, operator);
                    inputCalc.value = numberOne + operator + numberTwo;
                    numberOne = inputResult.value;
                    operator = "*";
                    numberTwo = "";
                    inputResult.value = numberOne + operator;
                    break;
                case "/":
                    inputResult.value = operate(+numberOne, +numberTwo, operator);
                    inputCalc.value = numberOne + operator + numberTwo;
                    numberOne = inputResult.value;
                    operator = "/";
                    numberTwo = "";
                    inputResult.value = numberOne + operator;
                    break;
            }
        } 
    });
});

clearButton.addEventListener("click", () => {
    numberOne = "";
    numberTwo = "";
    operator = "";
    inputResult.value = 0;
    inputCalc.value = "";
});

negativeButton.addEventListener("click", () => {
    if (!numberOne) {
        numberOne = negativeButton.value;
        inputResult.value = numberOne;
    }
});


