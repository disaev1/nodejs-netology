const readline = require('readline');

function getRandomNumber(min = 0, max = 100) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
}

const input = readline.createInterface(process.stdin);
const min = 0;
const max = 100;
let target;

function regenerate() {
    target = getRandomNumber(min, max);
    console.log(`Загадано число в диапазоне от ${min} до ${max}`);
}

regenerate();

input.on('line', data => {
    const inputNumber = Number(data);

    if (isNaN(inputNumber)) {
        console.error('Введите число!');
        return;
    }

    if (inputNumber === target) {
        console.log(`Отгадано число ${target}`);
        regenerate();
    } else if (inputNumber > target) {
        console.log('Меньше');
    } else {
        console.log('Больше');
    }
});
