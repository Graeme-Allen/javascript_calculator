let inputDigits = [];
let input = 0;
let operator = [''];
let base = 0;
let value = '';
let result = '';
let values = ['',''];
let restartSum = false;
let moreMath = false;

function updateDisplay(top, middle, bottom) {
    document.getElementById('top-right-1').textContent = top;
    document.getElementById('top-right-2').textContent = middle;
    document.getElementById('top-right-3').textContent = bottom;
};

function math(val1, Operator, val2) {
    switch (Operator) {
        case '+':
            result = val1 + val2;
            break;
        case '-':
            result =  val1 - val2;
            break;
        case '×':
            result =  val1 * val2;
            break;
        case '÷':
            result =  val1 / val2;
            break;
        case '%':
            result =  val1/100 * val2;
            break;
        case 'MU':
            result = val1 * 100 / (100 - val2);
            break;
        case 'x^' :
            result = power(val1, val2);
            break;
    }
    if (result >= 1000000000) {
        return expo(result,2);
    } else {
        return +parseFloat(result).toPrecision(7);
    }
};

function power(number,power){
    let x = number;
    for (i = 1; i < power; i++) {
        x = x * number;
    }
    return x;
};

function typeDigits(digit) {
    if (restartSum) {
        updateDisplay('mail@graeme.tech', '', '')
        inputDigits = [];
        input = 0;
        operator = [''];
        base = '';
        value = '';
        result = '';
        values = ['',''];
        restartSum = false;
        moreMath = false;
    }
    if (!isNaN(digit)) {                                                     
        inputDigits.push(digit);
        document.getElementById('bottom-line').textContent = addInput(inputDigits);
    if ((digit == 0) && inputDigits[(inputDigits.length-2)] == '.') {
        document.getElementById('bottom-line').textContent = addInput(inputDigits) + '.0';
    }
    } else if (digit == ".") {                                                
        if (!inputDigits.includes('.')) {
            if (inputDigits.length > 0) {                
                inputDigits.push(digit);
                document.getElementById('bottom-line').textContent = addInput(inputDigits) + '.';
            }  else {
                inputDigits.push(digit);
                document.getElementById('bottom-line').textContent = '0.';
            }    
        }
    }
    document.getElementById(digit).classList.add('pressed');

};

function addInput(inputDigits) {
    if (inputDigits.length > 0) {       
        input = parseFloat(inputDigits.join(''));
        inputDisplay = input;
        
        if (inputDisplay.length > 9 ) {
            inputDisplay.shift();
        }
        if ((inputDisplay >= 100000000) || (inputDisplay <= -100000000)){
            return expo(inputDisplay,2);
        } else {
            return +parseFloat(inputDisplay).toPrecision(8);
        }
    } else {
        return 0;
    }
};

function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
  }

function operatorSelect(operatorKey) {
    if (base == '') {
        base = input;
        input = 0;
        inputDigits = [];
        updateDisplay(base, operatorKey, '');
        document.getElementById('bottom-line').textContent = 0;
    } else {
        value = input;
        input = 0;
        inputDigits = [];
        result = math(base, operator, value);
        base = result;
        updateDisplay(base, operator, '');
        document.getElementById('bottom-line').textContent = 0;
    }
    operator = operatorKey;
    inputDigits = [];
    restartSum = false;
    document.getElementById(operatorKey).classList.add('pressed');
};  

function calculate() {
    if (base !== '') {
        value = input;
        result = math(base, operator, value);
        updateDisplay(base, operator, value);
        document.getElementById('bottom-line').textContent = result;
        inputDigits = []
        restartSum = true;
        document.getElementById('equal').classList.add('pressed');
    }
};

function clear() {
    updateDisplay('mail@graeme.tech', '', '')
    inputDigits = [];
    input = 0;
    operator = [''];
    base = 0;
    value = '';
    result = '';
    values = ['',''];
    restartSum = false;
    moreMath = false;
    document.getElementById('bottom-line').textContent = 0;
    document.getElementById('clear').classList.add('pressed');
};

function backSpace() {
    if (inputDigits.length != 0) {
        inputDigits.pop();
        document.getElementById('bottom-line').textContent = addInput(inputDigits);
    }
    document.getElementById('back-space').classList.add('pressed');
};

function pi() {
    input = Math.PI;
    document.getElementById('bottom-line').textContent = input.toPrecision(7);
    document.getElementById('pi').classList.add('pressed');
    return input;
};

function squareRoot() {
    if (result != '') {
        updateDisplay(result, '√', '')
        document.getElementById('bottom-line').textContent = +Math.sqrt(result).toPrecision(7);
    } else if (input != '') {
        updateDisplay(input, '√', '')
        document.getElementById('bottom-line').textContent = +Math.sqrt(input).toPrecision(7);
    }
    document.getElementById('root').classList.add('pressed');
};

function posNeg() {
    if (result == '') {        
        if (input > 0) {
            inputDigits.unshift('-');   
            document.getElementById('bottom-line').textContent = addInput(inputDigits);
        } else if (input < 0) {
            inputDigits.shift();
            document.getElementById('bottom-line').textContent = addInput(inputDigits);
        } else {
            inputDigits.unshift('-');   
            document.getElementById('bottom-line').textContent = '-' + 0
        }
    } else {
        result = -result;
        document.getElementById('bottom-line').textContent = +(result).toPrecision(7);
    }
    document.getElementById('pos-neg').classList.add('pressed');
};

function removeTransition(e){
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
};

// Listeners ////////////////////////

// Input digits
const inputButtons = document.querySelectorAll('.inputbutton');
inputButtons.forEach(inputButton => inputButton.addEventListener('transitionend', removeTransition));
inputButtons.forEach(inputButton => inputButton.addEventListener('click', function(e){
    typeDigits(inputButton.id)
}));

// Operator
const operatorButtons = document.querySelectorAll('.operatorbutton');
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('transitionend', removeTransition));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', function(e){
    operatorSelect(operatorButton.textContent);
}));

// Equals
document.getElementById('equal').addEventListener('transitionend', removeTransition);
document.getElementById('equal').addEventListener('click', function(e){
    calculate();
});

// Clear
document.getElementById('clear').addEventListener('transitionend', removeTransition);
document.getElementById('clear').addEventListener('click', function(e){
    clear();
});

// Back Space
document.getElementById('back-space').addEventListener('transitionend', removeTransition);
document.getElementById('back-space').addEventListener('click', function(e){
    backSpace();
});

// Pi
document.getElementById('pi').addEventListener('transitionend', removeTransition);
document.getElementById('pi').addEventListener('click', function(e){
    pi();
});

// Square Root
document.getElementById('root').addEventListener('transitionend', removeTransition);
document.getElementById('root').addEventListener('click', function(e){
    squareRoot();
});

// Pos Neg
document.getElementById('pos-neg').addEventListener('transitionend', removeTransition);
document.getElementById('pos-neg').addEventListener('click', function(e){
    posNeg();
});

// Keyboard
window.addEventListener("keydown", function(e) {
    let keyBoard =  event.key;
    switch (this.event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
            typeDigits(event.key);
            break;
        case '+':
            operatorSelect('+');
            break;
        case '-':
            operatorSelect('-');
            break;
        case '*':
            operatorSelect('×');
            break;
        case '/':
            operatorSelect('÷');
            break;
        case '%':
            operatorSelect('%');
            break;
        case 'm':
        case 'M':
            operatorSelect('MU');
            break;
        case '^':
            operatorSelect('x^');
            break;
        case '=':
        case 'Enter':
            calculate();
            break;  
        case 'a':
        case 'A':  
        case 'c':
        case 'C':
        case 'Delete':
        case 'Escape':
            clear();
            break;  
        case 'Backspace':
            backSpace();
            break;
        case 'p':
        case 'P':
            pi();
            break;
        case 's':
        case 'S':
        case 'r':
        case 'R':
            squareRoot();
            break;
        case 'n':
        case 'N':
            posNeg();
            break;
    }
})