#!/usr/bin/env node

'use strict';

const fromInput = require('../from-input');

const args = require('yargs')
  .usage('Usage: cat some/file.html | $0 [options]')
  .example('$ cat some/file.html | $0')
  .example('$ curl -Ss http://www.bbc.co.uk/news/uk-england-tyne-36570429 | $0')
  .example("> Lickety Split ice cream parlour's van stolen - BBC News")
  .help('help')
  .strict()
  .argv;

fromInput(process.stdin, args)
  .then(title => {
    process.stdout.write(title, () => process.exit(0));
  })
  .catch(err => {
    console.error(err);
    process.exit(65); // EX_DATAERR BSD exit code
  });
