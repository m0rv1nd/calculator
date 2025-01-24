const digitButtons = document.querySelectorAll(".digits");
const operatorButtons = document.querySelectorAll(".operator");
const equalButtons = document.querySelectorAll(".equal");
const inputResult = document.querySelector("#result");
const inputCalc = document.querySelector("#calculation");
const clearButton = document.querySelector("#clear");
const undoButton = document.querySelector("#undo");
const negativeButton = document.querySelector(".negative");
const decimalSeparator = document.querySelector(".decimal-dot");

let countDecimalDotOne = 0;
let countDecimalDotTwo = 0;
let unlockNegative = false;

let numberOne = "";
let numberTwo = "";
let operator = "";
inputResult.textContent = 0;

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

decimalSeparator.addEventListener("click", decimalSeparatorDisplay);
document.addEventListener("keydown", decimalSeparatorDisplay);   

negativeButton.addEventListener("click", negative);
document.addEventListener("keydown", negative);

clearButton.addEventListener("click", clearAll);
document.addEventListener("keydown", clearAll);

undoButton.addEventListener("click", undo);
document.addEventListener("keydown", undo);

function digitsDisplay(event) {
    let button;

    /* Depending on whether the user selected the appropriate button with the mouse or pressed a key on the keyboard, the appropriate HTML element is assigned to the button variable. Lines if (event.key >= 0 && event.key <= 9) { ... } and else return; are used to check if the user pressed the correct key on the keyboard. If not, the function is terminated. // Without this, when a key other than 0-9, e.g. “A”, was pressed, an error message “Uncaught TypeError: Cannot read properties of null (reading ‘value’)” would appear in the browser console, because the button variable would be empty. */
    if (event.type === "click") button = event.target;
    else if (event.type === "keydown") {
        if (event.key >= 0 && event.key <= 9) {
            button = document.querySelector(`.digits[value="${event.key}"]`);
        } else return;
    }
    
    inputLengthCheck();
    // First number 
    if (!operator) {
        if (inputResult.textContent != "ERROR") {
            // The following lines of code are intended to prevent the possibility of writing additional zeros at the beginning of a number
            if (inputResult.textContent == "0" && button.value == "0") {
                numberOne = "0";
                inputResult.textContent = numberOne;
            // Similar to the above with the exception that it prevents adding more zeros when the first character is minus 
            } else if (inputResult.textContent == "-" && button.value == "0") {
                numberOne = "-0";
                inputResult.textContent = numberOne;
            // In the following code block it is necessary to write numberOne != “0”, because if you use inputResult.textContent == “0” it would not be possible to enter more digits forming the first number.
            } else if (numberOne != "0" && inputResult.textContent != "-0") {
                numberOne += button.value;
                inputResult.textContent = numberOne;
            } 
        }
        // When an error occurs and a digit is pressed, the new value will be assigned to numberOne, and then it will be displayed on the calculator screen.
        else {
            numberOne = "";
            inputResult.textContent = "";
            numberOne += button.value;
            inputResult.textContent = numberOne;
        }
    } else {
            if (numberTwo == "0" && button.value == "0") {
                numberTwo = "0";
            } else if (numberTwo == "-" && button.value == "0") {
                numberTwo = "-0";
                inputResult.textContent = numberOne + operator + numberTwo;
            }
            else if (numberTwo != "0" && numberTwo != "-0") {
                numberTwo += button.value;
                inputResult.textContent = numberOne + operator + numberTwo;
            }
        }
}

function operatorDisplay(event) {
    let button;

    if (event.type === "click") {
        button = event.target;
    } else if (event.type === "keydown") {
        if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/") {
            button = document.querySelector(`.operator[value="${event.key}"]`);
        } else return;
    }

    if (numberOne && numberOne != "-" && !operator && !numberTwo && inputResult.textContent !="ERROR") {
        operator = button.value;
        inputResult.textContent = numberOne + operator;
    } else if (inputResult.textContent == "ERROR") {
        operator = "";
    }  else if (numberOne == "" && inputResult.textContent == 0 && (button.value == "+" || button.value == "*" || button.value == "/")) {
        numberOne = "0"
        operator = button.value;
        inputResult.textContent = numberOne + operator;
    }
}

function decimalSeparatorDisplay(event) {
    if (event.type === "click" || event.key === ".") { 
        if (countDecimalDotOne == 0) {
            if (inputResult.textContent == "0") {
                inputResult.textContent = "0.";
                numberOne = "0.";
                countDecimalDotOne++;
                // !numberOne.includes(".") is needed when the result contains a decimal point. If we want to add more digits to the result (which is also numberOne), the possibility of adding another dot should be blocked.
            } else if (numberOne !="" && numberOne !="-" && operator == "" && inputResult.textContent != "ERROR" && !numberOne.includes(".")) {
                inputResult.textContent += ".";
                numberOne += ".";
                countDecimalDotOne++;
            } else if (inputResult.textContent == "ERROR") {
                inputResult.textContent = "0.";
                numberOne = "0.";
                countDecimalDotOne++;
            } else if (numberOne == "-") {
                numberOne += "0.";
                inputResult.textContent = numberOne;
            }
        }
        if (numberOne != "" && operator != "" && countDecimalDotTwo == 0) {
            if (numberTwo == "" || numberTwo == "-") {
                inputResult.textContent += "0."
                numberTwo = "0.";
                countDecimalDotTwo++;
            } else {
                inputResult.textContent += "."
                numberTwo += ".";
                countDecimalDotTwo++;
            }
        }
    } else return;   
}

function clearAll (event) {
    if (event.type === "click" || event.key === "Delete") {
        numberOne = "";
        numberTwo = "";
        operator = "";
        inputResult.textContent = 0;
        inputCalc.textContent = "";
        countDecimalDotOne = 0;
        countDecimalDotTwo = 0;
    } else return;
}

function undo (event) {
    inputLengthCheck();

    if ((event.type === "click" || event.key === "Backspace") && inputResult.textContent != "ERROR") {
        let lastCharacter;
        if (numberOne != "" && operator != "" && numberTwo != "") {
            lastCharacter = numberTwo.length-1;
            if (numberTwo.charAt(lastCharacter) == ".") {
                countDecimalDotTwo = 0;
            }
            numberTwo = numberTwo.substring(0, lastCharacter);
            inputResult.textContent = numberOne + operator + numberTwo;
        } else if (numberOne != "" && operator != "") {
            operator = "";
            inputResult.textContent = numberOne;
        } else if (numberOne) {
            lastCharacter = numberOne.length-1;
            if (numberOne.charAt(lastCharacter) == ".") {
                countDecimalDotOne = 0;
            } 
            numberOne = numberOne.substring(0, lastCharacter);
            inputResult.textContent = numberOne.length > 0 ? numberOne : "0";
    } else return;
}
}

function negative (event) {
    let button;

    if (event.type === "click") {
        button = event.target;
    } else if (event.type === "keydown" && event.key == "-") {
        button = document.querySelector(`.negative[value="${event.key}"]`);
    } else return;
    // Without numberOne == “ERROR” after an error occurred, you could not start a new number with a minus sign.
    if (inputResult.textContent === "ERROR") {
        if (unlockNegative) {
            numberOne = "-";
            inputResult.textContent = "-";
            unlockNegative = false; // Block update again when first pressed
        } else {
            unlockNegative = true; // Mark the first press
        }
    }
    if (!numberOne) {
        numberOne = button.value;
        inputResult.textContent = numberOne;
    } else if (numberOne && operator && !numberTwo && operator != "-") {
        numberTwo = button.value;
        inputResult.textContent += numberTwo;            
    }
}

function result(event) {
    let button;

    if (event.type === "click") {
        button = event.target;
    } else if (event.type === "keydown") {
        if (event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/" || event.key == "=") {
            button = document.querySelector(`.equal[value="${event.key}"]`);
        } else return;
    }

    if (numberOne != "" && numberTwo != "" && numberTwo != "-" && operator != "") {
        switch (button.value) {
            case "=":
                inputResult.textContent = operate(+numberOne, +numberTwo, operator);
                inputCalc.textContent = numberOne + operator + numberTwo;
                numberOne = inputResult.textContent;
                operator = "";
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                if (inputResult.textContent == "ERROR") unlockNegative = true;
                break;
            case "+":
                inputResult.textContent = operate(+numberOne, +numberTwo, operator);
                inputCalc.textContent = numberOne + operator + numberTwo;
                numberOne = inputResult.textContent;
                if (inputResult.textContent == "ERROR") operator = "";
                else operator = "+";
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                inputResult.textContent = numberOne + operator;
                break;
            case "-":
                inputResult.textContent = operate(+numberOne, +numberTwo, operator);
                inputCalc.textContent = numberOne + operator + numberTwo;
                numberOne = inputResult.textContent;
                if (inputResult.textContent == "ERROR") operator = "";   
                else operator = "-";
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                inputResult.textContent = numberOne + operator;
                break;
            case "*":
                inputResult.textContent = operate(+numberOne, +numberTwo, operator);
                inputCalc.textContent = numberOne + operator + numberTwo;
                numberOne = inputResult.textContent;
                if (inputResult.textContent == "ERROR") operator = ""
                else operator = "*"
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                inputResult.textContent = numberOne + operator;
                break;
            case "/":
                inputResult.textContent = operate(+numberOne, +numberTwo, operator);
                inputCalc.textContent = numberOne + operator + numberTwo;
                numberOne = inputResult.textContent;
                if (inputResult.textContent == "ERROR") operator = ""
                else operator = "/"
                numberTwo = "";
                countDecimalDotOne = 0;
                countDecimalDotTwo = 0;
                inputResult.textContent = numberOne + operator;
                break;
        }
    }
}

function inputLengthCheck () {
    if (inputResult.textContent.length <= 9) {
       return inputResult.style.fontSize = "70px";
    } else {
        return inputResult.style.fontSize = "35px";
    }
}