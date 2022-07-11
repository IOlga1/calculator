"use strict";
let memoryPlusArr = [];
let newChar;
// НАЖАТИЕ КНОПОК И ОТОБРАЖЕНИЕ В ПОЛЕ
let calcArr = [];
let calcStr = '0';
let equal = '0';
document.querySelector('.calcFinish').innerHTML = equal;
document.querySelector('.topNumberArea').innerHTML = '0';
const validateSymbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const validateSigns = ['+', '-', '*', '/'];
// Функции - ПРОВЕРКИ
// =
const writeEqual = function () {
    if (calcArr.length > 0) {
        checkLastSignBeforeEqual();
        calcStr = calcArr.join('');
        try {
            if (calcArr.length === 0) {
                equal = '0';
            }
            else {
                equal = eval(calcStr);
            }
        }
        catch (_a) {
            getCorrectExpresion();
        }
        checkEqualLength();
    }
};
// '-'
const writeNumberMinus = function () {
    newChar = '-';
    (validateSigns.includes(calcArr[calcArr.length - 1]) || calcArr[calcArr.length - 1] === '.') && calcArr.pop();
    addNumberAndShow();
};
// '+'
const writeNumberPlus = function () {
    newChar = '+';
    checkLastSignForAddSign();
};
// '*'
const writeNumberUmn = function () {
    newChar = '*';
    checkLastSignForAddSign();
};
// '/'
const writeNumberAx = function () {
    newChar = '/';
    checkLastSignForAddSign();
};
// 'C'
const calcBackspace = function () {
    calcArr.pop();
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
    (calcArr.length === 0) && (document.querySelector('.topNumberArea').innerHTML = '0');
    changeFontSizeTopNumberPlate();
};
// 'AC'
const calcCleanAll = function () {
    calcArr = [];
    calcStr = '0';
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    document.querySelector('.calcFinish').innerHTML = '0';
    changeFontSizeTopNumberPlate();
};
// 'M-'
const memoryMinus = function () {
    memoryPlusArr = [];
    document.querySelector('.forMPlus').innerHTML = '';
};
// 'M+'
const memoryPlus = function () {
    memoryPlusArr = equal.split('');
    if (equal.length === 0) {
        document.querySelector('.titleArea').innerHTML = 'ПРИСВОЙТЕ ЗНАЧЕНИЕ';
        cleanTitleArea();
    }
    else if (equal.length > 0) {
        document.querySelector('.forMPlus').innerHTML = 'M+';
    }
};
// 'MR'
const memoryExtract = function () {
    calcArr = calcArr.concat(memoryPlusArr);
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
    document.querySelector('.titleArea').innerHTML = '';
};
// '.'
const writeNumberDot = function () {
    newChar = '.';
    if (calcArr.length === 0) {
        return;
    }
    else if (calcArr.includes('.')) {
        checkDotsAndOperands();
    }
    else {
        addNumberAndShow();
    }
};
// '('
const writeBracketLeft = function () {
    newChar = '(';
    (calcArr.length !== 0 && !validateSigns.includes(calcArr[calcArr.length - 1])) && calcArr.push('*');
    addNumberAndShow();
};
// ')'
const writeBracketRight = function () {
    newChar = ')';
    addNumberAndShow();
};
// События на КЛАВИАТУРУ
document.addEventListener('keyup', function () {
    newChar = event.key;
    validateSymbols.includes(newChar) && addNumberAndShow();
    (newChar === 'Backspace') && calcBackspace();
    (newChar === 'Delete') && calcCleanAll();
    (newChar === 'Enter') && writeEqual();
    (newChar === '*') && writeNumberUmn();
    (newChar === '+') && writeNumberPlus();
    (newChar === '-') && writeNumberMinus();
    (newChar === '/') && writeNumberAx();
    (newChar === '.') && writeNumberDot();
    (newChar === '(') && writeBracketLeft();
    (newChar === ')') && writeBracketRight();
});
//События на МЫШЬ
document.querySelector('.buttonsWrap').addEventListener('click', function () {
    newChar = event.target.textContent;
    validateSymbols.includes(newChar) && addNumberAndShow();
    (newChar === '+') && writeNumberPlus();
    (newChar === '-') && writeNumberMinus();
    (newChar === '/') && writeNumberAx();
    (newChar === 'x') && writeNumberUmn();
    (newChar === 'M+') && memoryPlus();
    (newChar === 'M-') && memoryMinus();
    (newChar === 'MR') && memoryExtract();
    (newChar === 'C') && calcBackspace();
    (newChar === 'AC') && calcCleanAll();
    (newChar === '(') && writeBracketLeft();
    (newChar === ')') && writeBracketRight();
    (newChar === '.') && writeNumberDot();
    (newChar === '=') && writeEqual();
});
// Действия
const addNumberAndShow = function () {
    calcArr.push(newChar);
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
};
const getCorrectExpresion = function () {
    document.querySelector('.titleArea').innerHTML = 'ВВЕДИТЕ КОРРЕКТНОЕ ВЫРАЖЕНИЕ';
    cleanTitleArea();
};
const cleanTitleArea = function () {
    setTimeout(function letsClean() {
        document.querySelector('.titleArea').innerHTML = '';
    }, 3000);
};
// Проверки 
const checkLastSignBeforeEqual = function () {
    if (validateSigns.includes(calcArr[calcArr.length - 1]) ||
        calcArr[calcArr.length - 1] === '(' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop();
        checkLastSignBeforeEqual();
    }
    else {
        calcStr = calcArr.join('');
        document.querySelector('.topNumberArea').innerHTML = calcStr;
    }
};
const checkLastSignForAddSign = () => {
    if (calcArr.length == 0 || calcArr[calcArr.length - 1] == '(') {
        return;
    }
    else if (validateSigns.includes(calcArr[calcArr.length - 1]) || calcArr[calcArr.length - 1] === '.') {
        calcArr.pop();
        addNumberAndShow();
    }
    else {
        addNumberAndShow();
    }
};
const checkEqualLength = function () {
    equal = String(equal);
    if (equal.length > 11) {
        equal = equal.substring(0, 10);
        document.querySelector('.calcFinish').innerHTML = equal + `<span style="font-size: 22px;">...</span>`;
    }
    else {
        document.querySelector('.calcFinish').innerHTML = equal;
    }
};
const checkDotsAndOperands = function () {
    let allDotsAndOperands = [];
    for (let j of calcArr) {
        (validateSigns.includes(j) || j === '.') && allDotsAndOperands.push(j);
    }
    if (allDotsAndOperands[allDotsAndOperands.length - 1] === '.' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/') {
        return;
    }
    else {
        let newChar = document.querySelector('.but_dot').innerHTML;
        calcArr.push(newChar);
        calcStr = calcArr.join('');
        document.querySelector('.topNumberArea').innerHTML = calcStr;
        changeFontSizeTopNumberPlate();
    }
};
const changeFontSizeTopNumberPlate = function () {
    const elem = document.querySelector('.topNumberArea');
    (calcStr.length > 33) && (elem.style.fontSize = '15px');
    (calcStr.length > 36) && (elem.style.fontSize = '14px');
    (calcStr.length > 39) && (elem.style.fontSize = '13px');
    (calcStr.length > 42) && (elem.style.fontSize = '12px');
    (calcStr.length > 45) && (elem.style.fontSize = '11px');
    (calcStr.length > 49) && (elem.innerHTML = `<span style="font-size: 14px;">...</span>`);
};
