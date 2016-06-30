'use strict';

const test = require('blue-tape');
const parseHead = require('parse-head');
const fs = require('fs');

const fromInput = require('..');
const fromArray = require('../from-array');

test('from a stream', t => {
  const stream = fs.createReadStream(`${__dirname}/sample.html`);

  return fromInput(stream).then(title => {
    t.equal(title, "Lickety Split ice cream parlour's van stolen");
  });
});

test('from a string', t => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/sample.html`, (err, content) => {
      if (err) {
        return reject(err);
      }

      fromInput(content).then(title => {
        t.equal(title, "Lickety Split ice cream parlour's van stolen");
        resolve();
      }, reject);
    });
  });
});

test('from an array', t => {
  const stream = fs.createReadStream(`${__dirname}/sample.html`);

  return parseHead(stream).then(fromArray).then(title => {
    t.equal(title, "Lickety Split ice cream parlour's van stolen");
  });
});
