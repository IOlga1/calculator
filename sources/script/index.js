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
// Функции - ПРОВЕРКИ
// =
const writeEqual = function () {
    if (calcArr.length > 0) {
        checkLastSign();
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
// '+'
const writeNumberPlus = function () {
    newChar = '+';
    if (calcArr.length === 0 || calcArr[calcArr.length - 1] === '(') {
        return;
    }
    else if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop();
        addNumberAndShow();
    }
    else {
        addNumberAndShow();
    }
};
// '-'
const writeNumberMinus = function () {
    newChar = '-';
    if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop();
        addNumberAndShow();
    }
    else {
        addNumberAndShow();
    }
};
// '*'
const writeNumberUmn = function () {
    newChar = '*';
    if (calcArr.length == 0 || calcArr[calcArr.length - 1] == '(') {
        return;
    }
    else if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop();
        addNumberAndShow();
    }
    else {
        addNumberAndShow();
    }
};
// '/'
const writeNumberAx = function () {
    newChar = '/';
    if (calcArr.length == 0 || calcArr[calcArr.length - 1] == '(') {
        return;
    }
    else if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.') {
        calcArr.pop();
        addNumberAndShow();
    }
    else {
        addNumberAndShow();
    }
};
// 'C'
const calcBackspace = function () {
    calcArr.pop();
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
    if (calcArr.length === 0) {
        document.querySelector('.topNumberArea').innerHTML = '0';
    }
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
    if (calcArr.length !== 0) {
        if (calcArr[calcArr.length - 1] !== '+' &&
            calcArr[calcArr.length - 1] !== '-' &&
            calcArr[calcArr.length - 1] !== '*' &&
            calcArr[calcArr.length - 1] !== '/') {
            calcArr.push('*');
            addNumberAndShow();
        }
        else {
            addNumberAndShow();
        }
    }
    else {
        addNumberAndShow();
    }
};
// ')'
const writeBracketRight = function () {
    newChar = ')';
    addNumberAndShow();
};
// События на КЛАВИАТУРУ
document.addEventListener('keyup', function () {
    newChar = event.key;
    if (validateSymbols.includes(newChar)) {
        addNumberAndShow();
    }
    else if (newChar === 'Backspace') {
        calcBackspace();
    }
    else if (newChar === 'Delete') {
        calcCleanAll();
    }
    else if (newChar === 'Enter') {
        writeEqual();
    }
    else if (newChar === '*') {
        writeNumberUmn();
    }
    else if (newChar === '+') {
        writeNumberPlus();
    }
    else if (newChar === '-') {
        writeNumberMinus();
    }
    else if (newChar === '/') {
        writeNumberAx();
    }
    else if (newChar === '.') {
        writeNumberDot();
    }
    else if (newChar === '(') {
        writeBracketLeft();
    }
    else if (newChar === ')') {
        writeBracketRight();
    }
});
//События на МЫШЬ
document.querySelector('.buttonsWrap').addEventListener('click', function () {
    newChar = event.target.textContent;
    if (validateSymbols.includes(newChar)) {
        addNumberAndShow();
    }
    else if (newChar === '+') {
        writeNumberPlus();
    }
    else if (newChar === '-') {
        writeNumberMinus();
    }
    else if (newChar === '/') {
        writeNumberAx();
    }
    else if (newChar === 'x') {
        newChar = '*';
        writeNumberUmn();
    }
    else if (newChar === 'M+') {
        memoryPlus();
    }
    else if (newChar === 'M-') {
        memoryMinus();
    }
    else if (newChar === 'MR') {
        memoryExtract();
    }
    else if (newChar === 'C') {
        calcBackspace();
    }
    else if (newChar === 'AC') {
        calcCleanAll();
    }
    else if (newChar === '(') {
        writeBracketLeft();
    }
    else if (newChar === ')') {
        writeBracketRight();
    }
    else if (newChar === '.') {
        writeNumberDot();
    }
    else if (newChar === '=') {
        writeEqual();
    }
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
const checkLastSign = function () {
    if (calcArr[calcArr.length - 1] === '-' ||
        calcArr[calcArr.length - 1] === '+' ||
        calcArr[calcArr.length - 1] === '*' ||
        calcArr[calcArr.length - 1] === '/' ||
        calcArr[calcArr.length - 1] === '.' ||
        calcArr[calcArr.length - 1] === '(') {
        calcArr.pop();
        checkLastSign();
    }
    else {
        calcStr = calcArr.join('');
        document.querySelector('.topNumberArea').innerHTML = calcStr;
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
    if (calcStr.length > 33) {
        elem.style.fontSize = '15px';
    }
    if (calcStr.length > 36) {
        elem.style.fontSize = '14px';
    }
    if (calcStr.length > 39) {
        elem.style.fontSize = '13px';
    }
    if (calcStr.length > 42) {
        elem.style.fontSize = '12px';
    }
    if (calcStr.length > 45) {
        elem.style.fontSize = '11px';
    }
    if (calcStr.length > 49) {
        elem.innerHTML = `<span style="font-size: 14px;">...</span>`;
    }
};
