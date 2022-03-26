
let memoryPlusArr = [];
let newChar;
// НАЖАТИЕ КНОПОК И ОТОБРАЖЕНИЕ В ПОЛЕ 
let calcArr = [];
let calcStr = '0';
let equal = '0';
document.querySelector('.calcFinish').innerHTML = equal;
document.querySelector('.topNumberArea').innerHTML = '0';


function writeNumberPos() {
    butNumPos = document.querySelectorAll('.butNum');
    console.log(butNumPos);

    butNumPos.forEach(element => {
        element.addEventListener('click', () => {
            newChar = element.textContent;
            addNumberAndShow();
        })
    });
}
writeNumberPos();

// '('
function writeScobLeft() {
    newChar = '(';
    if (calcArr.length != 0) {
        if (calcArr[calcArr.length - 1] != '+' && calcArr[calcArr.length - 1] != '-' && calcArr[calcArr.length - 1] != '*' && calcArr[calcArr.length - 1] != '/') {
            calcArr.push('*');
            addNumberAndShow();
        } else {
            addNumberAndShow();
        }
    } else {
        addNumberAndShow();
    }
}
document.querySelector('.but_scob_left').onclick = writeScobLeft;

// ')'
function writeScobRight() {
    newChar = ')';
    addNumberAndShow();
}
document.querySelector('.but_scob_right').onclick = writeScobRight;

// '.'
function writeNumberDot() {
    newChar = '.';
    if (calcArr.length == 0) {
        return calcStr;
    } else if (calcArr.includes('.')) {
        checkDotsAndOperands();
    } else {
        addNumberAndShow();
    }
}
document.querySelector('.but_dot').onclick = writeNumberDot;

// '+'
function writeNumberPlus() {
    newChar = '+';
    if (calcArr.length == 0 || calcArr[calcArr.length - 1] == '(') {
        return calcStr;
    } else if (calcArr[calcArr.length - 1] == '-' || calcArr[calcArr.length - 1] == '+' || calcArr[calcArr.length - 1] == '*' || calcArr[calcArr.length - 1] == '/' || calcArr[calcArr.length - 1] == '.') {
        calcArr.pop()
        addNumberAndShow();
    } else {
        addNumberAndShow();
    }
}
document.querySelector('.but_plus').onclick = writeNumberPlus;

// '-'
function writeNumberMinus() {
    newChar = '-';
    if (calcArr[calcArr.length - 1] == '-' || calcArr[calcArr.length - 1] == '+' || calcArr[calcArr.length - 1] == '*' || calcArr[calcArr.length - 1] == '/' || calcArr[calcArr.length - 1] == '.') {
        calcArr.pop()
        addNumberAndShow();
    } else {
        addNumberAndShow();
    }
}
document.querySelector('.but_minus').onclick = writeNumberMinus;

// '*'
function writeNumberUmn() {
    newChar = '*';
    if (calcArr.length == 0 || calcArr[calcArr.length - 1] == '(') {
        return calcStr;
    } else if (calcArr[calcArr.length - 1] == '-' || calcArr[calcArr.length - 1] == '+' || calcArr[calcArr.length - 1] == '*' || calcArr[calcArr.length - 1] == '/' || calcArr[calcArr.length - 1] == '.') {
        calcArr.pop();
        addNumberAndShow();
    } else {
        addNumberAndShow();
    }
}
document.querySelector('.but_umn').onclick = writeNumberUmn;

// '/'
function writeNumberAx() {
    newChar = '/';
    if (calcArr.length == 0 || calcArr[calcArr.length - 1] == '(') {
        return calcStr;
    } else if (calcArr[calcArr.length - 1] == '-' || calcArr[calcArr.length - 1] == '+' || calcArr[calcArr.length - 1] == '*' || calcArr[calcArr.length - 1] == '/' || calcArr[calcArr.length - 1] == '.') {
        calcArr.pop()
        addNumberAndShow();
    } else {
        addNumberAndShow();
    }
}
document.querySelector('.but_ax').onclick = writeNumberAx;

// =
function writeNumberEqual() {
    if (calcArr.length > 0) {
        checkLastSign();
        calcStr = calcArr.join('');
        try {
            if (calcArr.length == 0) {
                equal = 0;
            } else {
                equal = eval(calcStr);
            }
        } catch {
            getCorrectExpresion();
        }
        equal = String(equal); // Может оно и не надо (никакой разницы с Number)
        checkEqualLength();
    }
}
document.querySelector('.but_equal').onclick = writeNumberEqual;

// 'C'
function calcBackspace() {
    calcArr.pop();
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
    if (calcArr.length == 0) {
        document.querySelector('.topNumberArea').innerHTML = '0';
    }
    changeFontSizeTopNumberPlate();
}
document.querySelector('.but_backspace').onclick = calcBackspace;

// 'AC'
function calcCleanAll() {
    calcArr = [];
    calcStr = '0';
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    document.querySelector('.calcFinish').innerHTML = '0';
    changeFontSizeTopNumberPlate();
}
document.querySelector('.but_delete').onclick = calcCleanAll;

// 'M+'
function memoryPlus() {
    memoryPlusArr = equal.split('');
    if (equal.length == 0) {
        document.querySelector('.titleArea').innerHTML = 'ПРИСВОЙТЕ ЗНАЧЕНИЕ';
        cleanTitleArea();
    } else if (equal.length > 0) {
        document.querySelector('.forMPlus').innerHTML = 'M+';
    }
}
document.querySelector('.but_memory_plus').onclick = memoryPlus;

// 'M-'
function memoryMinus() {
    memoryPlusArr = [];
    document.querySelector('.forMPlus').innerHTML = '';
}
document.querySelector('.but_memory_minus').onclick = memoryMinus;

// 'MR'
function memoryExtract() {
    // let newChar = document.querySelector('.but_9').innerHTML;
    calcArr = calcArr.concat(memoryPlusArr);
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
    document.querySelector('.titleArea').innerHTML = '';
}
document.querySelector('.but_memory_extract').onclick = memoryExtract;



function addNumberAndShow() {
    calcArr.push(newChar);
    calcStr = calcArr.join('');
    document.querySelector('.topNumberArea').innerHTML = calcStr;
    changeFontSizeTopNumberPlate();
}

function getCorrectExpresion() {
    document.querySelector('.titleArea').innerHTML = 'ВВЕДИТЕ КОРРЕКТНОЕ ВЫРАЖЕНИЕ';
    cleanTitleArea();
}

function cleanTitleArea() {
    setTimeout(function letsClean() {
        document.querySelector('.titleArea').innerHTML = '';
    }, 2500)
}

// Проверки 
function checkLastSign() {
    if (calcArr[calcArr.length - 1] == '-' || calcArr[calcArr.length - 1] == '+' || calcArr[calcArr.length - 1] == '*' || calcArr[calcArr.length - 1] == '/' || calcArr[calcArr.length - 1] == '.' || calcArr[calcArr.length - 1] == '(') {
        calcArr.pop()
        checkLastSign();
    } else {
        calcStr = calcArr.join('');
        document.querySelector('.topNumberArea').innerHTML = calcStr;
    }
}

function checkEqualLength() {
    if (equal.length > 11) {
        equal = equal.substring(0, 10);
        document.querySelector('.calcFinish').innerHTML = equal + `<span style="font-size: 22px;">...</span>`;
    } else {
        document.querySelector('.calcFinish').innerHTML = equal;
    }
}

function checkDotsAndOperands() {
    let allDotsAndOperands = [];
    for (j of calcArr) {
        if (j == '.' || j == '+' || j == '-' || j == '*' || j == '/') {
            allDotsAndOperands.push(j);
        }
    }
    if (allDotsAndOperands[allDotsAndOperands.length - 1] == '.' ||
        calcArr[calcArr.length - 1] == '+' ||
        calcArr[calcArr.length - 1] == '-' ||
        calcArr[calcArr.length - 1] == '*' ||
        calcArr[calcArr.length - 1] == '/') {
        return calcStr;
    } else {
        let newChar = document.querySelector('.but_dot').innerHTML;
        calcArr.push(newChar);
        calcStr = calcArr.join('');
        document.querySelector('.topNumberArea').innerHTML = calcStr;
        changeFontSizeTopNumberPlate();
    }
}

function changeFontSizeTopNumberPlate() {
    if (calcStr.length <= 33) {
        document.querySelector('.topNumberArea').style.fontSize = '';
    }
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

//  Привязка клавиатуры
document.addEventListener('keyup', (event) => {
    if (event.key === '(') {
        writeScobLeft();
    } else if (event.key === ')') {
        writeScobRight();
    } else if (event.key === '0') {
        writeNumber0();
    } else if (event.key === '1') {
        writeNumber1();
    } else if (event.key === '2') {
        writeNumber2();
    } else if (event.key === '3') {
        writeNumber3();
    } else if (event.key === '4') {
        writeNumber4();
    } else if (event.key === '5') {
        writeNumber5();
    } else if (event.key === '6') {
        writeNumber6();
    } else if (event.key === '7') {
        writeNumber7();
    } else if (event.key === '8') {
        writeNumber8();
    } else if (event.key === '9') {
        writeNumber9();
    } else if (event.key === '=' || event.keyCode === 13) {
        writeNumberEqual();
    } else if (event.key === '.' || event.keyCode == '110') {
        writeNumberDot();
    } else if (event.key === '+') {
        writeNumberPlus();
    } else if (event.key === '-') {
        writeNumberMinus();
    } else if (event.key === '*') {
        writeNumberUmn();
    } else if (event.key === '/') {
        writeNumberAx();
    } else if (event.keyCode == '46') {
        calcCleanAll();
    } else if (event.keyCode == '8') {
        calcBackspace();
    // } else if (event.keyCode == '67') {
    //     memoryPlus();
    // } else if (event.keyCode == '90') {
    //     memoryMinus();
    // } else if (event.keyCode == '86') {
    //     memoryExtract();                 // Вместо этого функция getCustomCombinationOfKeyboard
    }
})

function getCustomCombinationOfKeyboard() {
    let controlIsPressed = false;

    document.addEventListener('keydown', (event) => {
        if (event.keyCode == 17) {   // keyCode того что на первой клавише
            controlIsPressed = true;
            event.preventDefault(); // убирает дефолтное поведение клавиши
        }
    })

    document.addEventListener('keyup', (event) => {
        if (event.keyCode == 17) {   // keyCode того что на первой клавише
            controlIsPressed = false;
            event.preventDefault(); // убирает дефолтное поведение клавиши
        }
    })
    // добавляем вторую клавишу для комбинации
    document.addEventListener('keydown', function(event) {
        if (controlIsPressed == true && event.keyCode == '67'){ // ctrl + c
            event.preventDefault(); // убирает дефолтное поведение клавиши
            memoryPlus();
        } else if (controlIsPressed == true && event.keyCode == '90'){ // ctrl + v
            event.preventDefault(); // убирает дефолтное поведение клавиши
            memoryMinus();
        } else if (controlIsPressed == true && event.keyCode == '86'){ // ctrl + z
            event.preventDefault(); // убирает дефолтное поведение клавиши
            memoryExtract();
        }
    })
}

getCustomCombinationOfKeyboard()









// document.onkeydown = function (e) {
    // if (e.keyCode == '96') {
    //     writeNumber0()
    //     // добавить действие на изменение стиля кнопки если onkeydown и отмена если onkeyup
    // }
    // if (e.keyCode == '97') {
    //     writeNumber1()
    // }
    // if (e.keyCode == '98') {
    //     writeNumber2()
    // }
    // if (e.keyCode == '99') {
    //     writeNumber3()
    // }
    // if (e.keyCode == '100') {
    //     writeNumber4()
    // }
    // if (e.keyCode == '101') {
    //     writeNumber5()
    // }
    // if (e.keyCode == '102') {
    //     writeNumber6()
    // }
    // if (e.keyCode == '103') {
    //     writeNumber7()
    // }
    // if (e.keyCode == '104') {
    //     writeNumber8()
    // }
    // if (e.keyCode == '105') {
    //     writeNumber9()
    // }
    // if (e.keyCode == '13') {
    //     writeNumberEqual()
    // }
    // if (e.keyCode == '190') {
    //     writeNumberDot()
    // }
    // if (e.keyCode == '57') {
    //     writeScobLeft()
    // }
    // if (e.keyCode == '48') {
    //     writeScobRight()
    // }
    // if (e.keyCode == '107') {
    //     writeNumberPlus()
    // }
    // if (e.keyCode == '109') {
    //     writeNumberMinus()
    // }
    // if (e.keyCode == '106') {
    //     writeNumberUmn()
    // }
    // if (e.keyCode == '111' || e.keyCode == '191') {
    //     writeNumberAx()
    // }
    // if (e.keyCode == '46') {
    //     calcCleanAll()
    // }
    // if (e.keyCode == '8') {
    //     calcBackspace()
    // }
    // if (e.keyCode == '77') {
    //     memoryPlus()
    // }
    // if (e.keyCode == '88') {
    //     memoryMinus()
    // }
    // if (e.keyCode == '86') {
    //     memoryExtract()
    // }
// }