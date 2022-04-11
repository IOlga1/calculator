
let memoryPlusArr: string[] = [];
let newChar: string;
// НАЖАТИЕ КНОПОК И ОТОБРАЖЕНИЕ В ПОЛЕ 
let calcArr: string[] = [];
let calcStr: string = '0';
let equal: string = '0';
document.querySelector('.calcFinish').innerHTML = equal;
document.querySelector('.topNumberArea').innerHTML = '0';
const validateSymbols: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// Функции - ПРОВЕРКИ

// =
const writeEqual = function (): void {
    if (calcArr.length > 0) {
        checkLastSign();
        calcStr = calcArr.join('');
        try {
            if (calcArr.length === 0) {
                equal = '0';
            } else {
                equal = eval(calcStr);
            }
        } catch {
            getCorrectExpresion();
        }
        checkEqualLength();
    }
}

// '+'
const writeNumberPlus = function (): void {
    newChar = '+';
    if (calcArr.length === 0 || calcArr[calcArr.length - 1] === '(') {
        return
    } else if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop()
        addNumberAndShow();
    } else {
        addNumberAndShow();
    }
}

// '-'
const writeNumberMinus = function (): void {
    newChar = '-';
    if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop()
        addNumberAndShow();
    } else {
        addNumberAndShow();
    }
}

// '*'
const writeNumberUmn = function (): void {
    newChar = '*';
    if (calcArr.length == 0 || calcArr[calcArr.length - 1] == '(') {
        return;
    } else if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop();
        addNumberAndShow();
    } else {
        addNumberAndShow();
    }
}

// '/'
const writeNumberAx = function (): void {
    newChar = '/';
    if (calcArr.length == 0 || calcArr[calcArr.length - 1] == '(') {
        return;
    } else if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop()
        addNumberAndShow();
    } else {
        addNumberAndShow();
    }
}

// 'C'
const calcBackspace = function (): void {
    calcArr.pop();
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
    if (calcArr.length === 0) {
        document.querySelector('.topNumberArea').innerHTML = '0';
    }
    changeFontSizeTopNumberPlate();
}

// 'AC'
const calcCleanAll = function (): void {
    calcArr = [];
    calcStr = '0';
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    document.querySelector('.calcFinish').innerHTML = '0';
    changeFontSizeTopNumberPlate();
}

// 'M-'
const memoryMinus = function (): void {
    memoryPlusArr = [];
    document.querySelector('.forMPlus').innerHTML = '';
}

// 'M+'
const memoryPlus = function (): void {
    memoryPlusArr = equal.split('');
    if (equal.length === 0) {
        document.querySelector('.titleArea').innerHTML = 'ПРИСВОЙТЕ ЗНАЧЕНИЕ';
        cleanTitleArea();
    } else if (equal.length > 0) {
        document.querySelector('.forMPlus').innerHTML = 'M+';
    }
}

// 'MR'
const memoryExtract = function (): void {
    calcArr = calcArr.concat(memoryPlusArr);
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
    document.querySelector('.titleArea').innerHTML = '';
}

// '.'
const writeNumberDot = function (): void {
    newChar = '.';
    if (calcArr.length === 0) {
        return;
    } else if (calcArr.includes('.')) {
        checkDotsAndOperands();
    } else {
        addNumberAndShow();
    }
}

// '('
const writeScobLeft = function (): void {
    newChar = '(';
    if (calcArr.length !== 0) {
        if (calcArr[calcArr.length - 1] !== '+' &&
            calcArr[calcArr.length - 1] !== '-' &&
            calcArr[calcArr.length - 1] !== '*' &&
            calcArr[calcArr.length - 1] !== '/') {
            calcArr.push('*');
            addNumberAndShow();
        } else {
            addNumberAndShow();
        }
    } else {
        addNumberAndShow();
    }
}

// ')'
const writeScobRight = function (): void {
    newChar = ')';
    addNumberAndShow();
}






// События на КЛАВИАТУРУ
document.addEventListener('keyup', function (): void {
    newChar = event.key;
    if (validateSymbols.includes(newChar)) {
        addNumberAndShow();
    } else if (newChar === 'Backspace') {
        calcBackspace();
    } else if (newChar === 'Delete') {
        calcCleanAll();
    } else if (newChar === 'Enter') {
        writeEqual();
    } else if (newChar === '*') {
        writeNumberUmn();
    } else if (newChar === '+') {
        writeNumberPlus();
    } else if (newChar === '-') {
        writeNumberMinus();
    } else if (newChar === '/') {
        writeNumberAx();
    } else if (newChar === '.') {
        writeNumberDot();
    } else if (newChar === '(') {
        writeScobLeft();
    } else if (newChar === ')') {
        writeScobRight();
    }
})




//События на МЫШЬ
document.querySelector('.buttonsWrap').addEventListener('click', function (): void {
    newChar = event.target.textContent;

    if (validateSymbols.includes(newChar)) {
        addNumberAndShow();
    } else if (newChar === '+') {
        writeNumberPlus();
    } else if (newChar === '-') {
        writeNumberMinus();
    } else if (newChar === '/') {
        writeNumberAx();
    } else if (newChar === 'x') {
        newChar = '*';
        writeNumberUmn();
    } else if (newChar === 'M+') {
        memoryPlus();
    } else if (newChar === 'M-') {
        memoryMinus();
    } else if (newChar === 'MR') {
        memoryExtract();
    } else if (newChar === 'C') {
        calcBackspace();
    } else if (newChar === 'AC') {
        calcCleanAll();
    } else if (newChar === '(') {
        writeScobLeft();
    } else if (newChar === ')') {
        writeScobRight();
    } else if (newChar === '.') {
        writeNumberDot();
    } else if (newChar === '=') {
        writeEqual();
    }
})






// Действия
const addNumberAndShow = function (): void {
    calcArr.push(newChar);
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
}

const getCorrectExpresion = function (): void {
    document.querySelector('.titleArea').innerHTML = 'ВВЕДИТЕ КОРРЕКТНОЕ ВЫРАЖЕНИЕ';
    cleanTitleArea();
}

const cleanTitleArea = function (): void {
    setTimeout(function letsClean(): void {
        document.querySelector('.titleArea').innerHTML = '';
    }, 3000)
}






// Проверки 
const checkLastSign = function (): void {
    if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.' ||
        calcArr[calcArr.length - 1] === '(') {
        calcArr.pop()
        checkLastSign();
    } else {
        calcStr = calcArr.join('');
        document.querySelector('.topNumberArea').innerHTML = calcStr;
    }
}


const checkEqualLength = function (): void {
    equal = String(equal);
    if (equal.length > 11) {
        equal = equal.substring(0, 10);
        document.querySelector('.calcFinish').innerHTML = equal + `<span style="font-size: 22px;">...</span>`;
    } else {
        document.querySelector('.calcFinish').innerHTML = equal;
    }
}


const checkDotsAndOperands = function (): void {
    let allDotsAndOperands = [];
    for (let j of calcArr) {
        if (j === '.' ||
            j === '+' ||
            j === '-' ||
            j === '*' ||
            j === '/') {
            allDotsAndOperands.push(j);
        }
    }
    if (allDotsAndOperands[allDotsAndOperands.length - 1] === '.' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/') {
        return;
    } else {
        let newChar = document.querySelector('.but_dot').innerHTML;
        calcArr.push(newChar);
        calcStr = calcArr.join('');
        document.querySelector('.topNumberArea').innerHTML = calcStr;
        changeFontSizeTopNumberPlate();
    }
}

const changeFontSizeTopNumberPlate = function (): void {
    if (calcStr.length > 33) {
        document.querySelector('.topNumberArea').style.fontSize = '15px';
    }
    if (calcStr.length > 36) {
        document.querySelector('.topNumberArea').style.fontSize = '14px';
    }
    if (calcStr.length > 39) {
        document.querySelector('.topNumberArea').style.fontSize = '13px';
    }
    if (calcStr.length > 42) {
        document.querySelector('.topNumberArea').style.fontSize = '12px';
    }
    if (calcStr.length > 45) {
        document.querySelector('.topNumberArea').style.fontSize = '11px';
    }
    if (calcStr.length > 49) {
        document.querySelector('.topNumberArea').innerHTML = `<span style="font-size: 14px;">...</span>`;
    }
} 
