/* 
HALL OF BUGS:

    * after key on keyboard is pressed in browser console i have error: script.js:200 Uncaught TypeError: Cannot read properties of null (reading 'value')nat HTMLDocument.operatorDisplay (script.js:200:27) 
    * after divide by 0 and "ERROR" is display then I press equal button which is also operator button inputResult is "0+"

round to avoid overflow 
Math.round(123.4567 * 100) / 100; // 123.46
let rounded = Number(num.toFixed(18));
   
   
   strange number after multiply for example 1.3*3 = 3.9000000000000004 
   keyboard support
   cool layout 
   color change
   embellishment of error
   
   DONE:
   clear button
   divide by 0
   first negative number
   backspace button
   fix possibility to add dot after Error is display
*/

const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operator");
const equalButtons = document.querySelectorAll(".equal");
const inputResult = document.querySelector("#result");
const inputCalc = document.querySelector("#calculation");
const clearButton = document.querySelector("#clear");
const undoButton = document.querySelector("#undo");
const negativeButton = document.querySelector(".negative");
const decimalDotButton = document.querySelector(".decimal-dot");

let countDecimalDotOne = 0;
let countDecimalDotTwo = 0;

let numberOne = "";
let numberTwo = "";
let operator = "";
inputResult.value = 0;

function add (a, b) {
    return Math.round((a + b) * 100) / 100;
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

digitButtons.forEach(button => button.addEventListener("click", digitsDisplay));
document.addEventListener("keydown", digitsDisplay); 
operatorButtons.forEach(button => button.addEventListener("click", operatorDisplay));
document.addEventListener("keydown", operatorDisplay); 
equalButtons.forEach(button => button.addEventListener("click", result));
document.addEventListener("keydown", result);    
   

clearButton.addEventListener("click", () => {
    numberOne = "";
    numberTwo = "";
    operator = "";
    inputResult.value = 0;
    inputCalc.value = "";
    countDecimalDotOne = 0;
    countDecimalDotTwo = 0;
});

negativeButton.addEventListener("click", () => {
    if (!numberOne) {
        numberOne = negativeButton.value;
        inputResult.value = numberOne;
    }
});

decimalDotButton.addEventListener("click", () => {
    if (countDecimalDotOne == 0) {
        if (inputResult.value == 0) {
            inputResult.value = "0.";
            numberOne = "0.";
            countDecimalDotOne++;
        } else if (numberOne != "" && operator == "" && inputResult.value != "ERROR") {
            inputResult.value += "."
            numberOne += ".";
            countDecimalDotOne++;
        } else if (inputResult.value == "ERROR") {
            inputResult.value = "0.";
            numberOne = "0.";
            countDecimalDotOne++;
        }
    }
    if (numberOne != "" && operator != "" && countDecimalDotTwo == 0) {
        if (numberTwo == "") {
            inputResult.value += "0."
            numberTwo = "0.";
            countDecimalDotTwo++;
        } else {
            inputResult.value += "."
            numberTwo += ".";
            countDecimalDotTwo++;
        }
    }
});

undoButton.addEventListener("click", () => {
    let lastCharacter;
    if (numberOne != "" && operator != "" && numberTwo != "") {
        lastCharacter = numberTwo.length-1;
        if (numberTwo.charAt(lastCharacter) == ".") {
            countDecimalDotTwo = 0;
        }
        numberTwo = numberTwo.substring(0, lastCharacter);
        inputResult.value = numberOne + operator + numberTwo;
    } else if (numberOne != "" && operator != "") {
        operator = "";
        inputResult.value = numberOne;
    } else if (numberOne) {
        lastCharacter = numberOne.length-1;
        if (numberOne.charAt(lastCharacter) == ".") {
            countDecimalDotOne = 0;
        }
        numberOne = numberOne.substring(0, lastCharacter);
        inputResult.value = numberOne;
    }   
});

function digitsDisplay(event) {
    let button;

    if (event.type === "click") {
        button = event.target; 
    } else if (event.type === "keydown" && inputResult.value !== "ERROR") {
        const keyPressed = event.key;
        button = document.querySelector(`.digits[value="${keyPressed}"]`);
    }

    if (!operator) {
        if (inputResult.value != "ERROR") {
            if (inputResult.value == "0" && button.value == "0") {
                inputResult.value = "0";
                numberOne = "0";
            } else if (numberOne != "0") {
                numberOne += button.value;
                inputResult.value = numberOne;
            }
        } 
        else {
            numberOne = "";
            inputResult.value = "";
            numberOne += button.value;
            inputResult.value = numberOne;
        }
    } else {
            if (numberTwo == "0" && button.value == "0") {
                numberTwo = "0";
            } else if (numberTwo != "0") {
                numberTwo += button.value;
                inputResult.value = numberOne + operator + numberTwo;
            }
        }
}

function operatorDisplay(event) {
    let button;

    if (event.type === "click") {
        button = event.target;
    } else if (event.type === "keydown" && inputResult.value !== "ERROR") {
        button = document.querySelector(`.operator[value="${event.key}"]`);
    }
    if (numberOne && numberOne != "-" && !numberTwo && !operator && inputResult.value !="ERROR") {
        operator = button.value;
        inputResult.value = numberOne + operator;
    } else if (inputResult.value == "ERROR") {
        operator = "";
    }  else if (numberOne == "" && inputResult.value == 0 && (button.value == "+" || button.value == "*" || button.value == "/")) {
        numberOne = "0"
        operator = button.value;
        inputResult.value = numberOne + operator;
    }
}

function result(event) {
    let button;

    if (event.type === "click") {
        button = event.target;
    } else if (event.type === "keydown" && inputResult.value !== "ERROR") {
        button = document.querySelector(`.equal[value="${event.key}"]`);
    }

    if (numberOne != "" && numberTwo != "" && operator != "") {
        switch (button.value) {
            case "=":
                inputResult.value = operate(+numberOne, +numberTwo, operator);
                inputCalc.value = numberOne + operator + numberTwo;
                numberOne = inputResult.value;
                operator = "";
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                break;
            case "+":
                inputResult.value = operate(+numberOne, +numberTwo, operator);
                inputCalc.value = numberOne + operator + numberTwo;
                numberOne = inputResult.value;
                if (inputResult.value == "ERROR") operator = ""
                else operator = "+"
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                inputResult.value = numberOne + operator;
                break;
            case "-":
                inputResult.value = operate(+numberOne, +numberTwo, operator);
                inputCalc.value = numberOne + operator + numberTwo;
                numberOne = inputResult.value;
                operator = "-";
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                inputResult.value = numberOne + operator;
                break;
            case "*":
                inputResult.value = operate(+numberOne, +numberTwo, operator);
                inputCalc.value = numberOne + operator + numberTwo;
                numberOne = inputResult.value;
                operator = "*";
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                inputResult.value = numberOne + operator;
                break;
            case "/":
                inputResult.value = operate(+numberOne, +numberTwo, operator);
                inputCalc.value = numberOne + operator + numberTwo;
                numberOne = inputResult.value;
                operator = "/";
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                inputResult.value = numberOne + operator;
                break;
        }
    }
}

/*
    function digitsDisplay(event) {
    let button;

    if (event.type === "click") {
        button = event.target; 
    } else if (event.type === "keydown") {
        const keyPressed = event.key;
        button = document.querySelector(`.digits[value="${keyPressed}"]`);
    }

    if (!operator) {
        if (inputResult.value != "ERROR") {
            if (inputResult.value == "0" && button.value == "0") {
                inputResult.value = "0";
                numberOne = "0";
            } else if (numberOne != "0") {
                numberOne += button.value;
                inputResult.value = numberOne;
            }
        } 
        else {
            numberOne = "";
            inputResult.value = "";
            numberOne += button.value;
            inputResult.value = numberOne;
        }
    } else {
            if (numberTwo == "0" && button.value == "0") {
                numberTwo = "0";
            } else if (numberTwo != "0") {
                numberTwo += button.value;
                inputResult.value = numberOne + operator + numberTwo;
            }
        }
}
*/ 