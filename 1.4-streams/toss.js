const fs = require('fs');
const readline = require('readline');

const logFileName = 'log.txt';
const coinSides = { '1': 'head', '2': 'tail' };

const input = readline.createInterface({ input: process.stdin, output: process.stdout });
const log = fs.createWriteStream(logFileName, { flags: 'a' });

function getRandomNumber(min = 0, max = 100) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
}

function go() {
  const side = getRandomNumber(1, 2);

  input.question('Which side the coin shows (enter "head" or "tail")? ', answer => {
    let entered;
    let logStr = '';
  
    if (answer === "head") {
      entered = 1;
    } else if (answer === "tail") {
      entered = 2;
    } else {
      console.log('Please enter "head" or "tail"');
    }
  
    if (entered) {
      logStr += `${coinSides[side]} `;
      
      if (entered === side) {
        console.log('Right!');
        logStr += 'right';
      } else {
        console.log('Wrong!');
        logStr += 'wrong';
      }
    }
  
    if (logStr) {
      log.write(`${logStr}\n`);
    }

    go();
  });
}

go();

input.on('close', () => {
  log.close();
});
