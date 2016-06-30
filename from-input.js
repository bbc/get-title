'use strict';

const parseHead = require('parse-head');
const getTitle = require('./from-array');

module.exports = function fromInput(stream, args) {
  return parseHead(stream).then(headers => getTitle(headers, args));
};
