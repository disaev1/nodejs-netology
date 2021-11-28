#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .command('current', 'Print current date.', {
    year: {
      alias: 'y',
      describe: 'print year',
      type: 'boolean',
    },
    date: {
      alias: 'd',
      describe: 'print date of month',
      type: 'boolean',
    }
  })
  .command('add', 'Add days or years to the current date and print the resulting.', {
    days: {
      alias: 'd',
      type: 'number',
      describe: 'Number of days to add',
    },
    years: {
      alias: 'y',
      type: 'number',
      describe: 'Number of years to add',
    }
  })
  .command('sub', 'Subtract days or years from the current date and print the resulting date.', {
    days: {
      alias: 'd',
      type: 'number',
      describe: 'Number of days to subtract',
    },
    years: {
      alias: 'y',
      type: 'number',
      describe: 'Number of years to subtract',
    }
  })
  .demandCommand(1)
  .argv;

const currentDate = new Date();

if (argv._.includes('current')) {
  if (argv.year) {
    console.log(currentDate.getUTCFullYear());
  } else if (argv.date) {
    console.log(currentDate.getUTCDate());
  } else {
    console.log(currentDate.toISOString());
  }
} else if (argv._.includes('add')) {
  if (argv.days) {
    currentDate.setUTCDate(currentDate.getUTCDate() + argv.days);
    console.log(currentDate.toISOString());
  } else if (argv.years) {
    currentDate.setUTCFullYear(currentDate.getUTCFullYear() + argv.years);
    console.log(currentDate.toISOString());
  }
} else if (argv._.includes('sub')) {
  if (argv.days) {
    currentDate.setUTCDate(currentDate.getUTCDate() - argv.days);
    console.log(currentDate.toISOString());
  } else if (argv.years) {
    currentDate.setUTCFullYear(currentDate.getUTCFullYear() - argv.years);
    console.log(currentDate.toISOString());
  }
}
