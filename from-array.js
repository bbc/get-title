'use strict';

const url = require('url');
const noop = d => d;

const META_PRIORITY = [
  'og:title',
  'twitter:title',
  'TITLE',
];

const DEFAULT_OPTIONS = {
};

module.exports = function getTitle (headers, args) {
  const options = Object.assign({}, DEFAULT_OPTIONS, args);

  return new Promise(resolve => {
    if (!Array.isArray(headers)) {
      throw new Error('getTitle first and only argument should be an array of HTML <head> attributes.')
    }

    resolve(
      headers
        .filter(filterMeta)
        .sort(sortByPriority)
        .map(m => m.content || m.innerText)
        .shift()
    );
  });
};

function filterMeta (header) {
  if (header.name && header.name === 'twitter:title') {
    return true;
  }

  if (header.property && header.property === 'og:title') {
    return true;
  }

  if (header.nodeName === 'TITLE' && header.innerText) {
    return true;
  }
}

function sortByPriority (a, b) {
  const aIndex = META_PRIORITY.indexOf(a.name || a.property || a.nodeName);
  const bIndex = META_PRIORITY.indexOf(b.name || b.property || b.nodeName);

  return aIndex > bIndex ? 1 : (aIndex < bIndex ? -1 : 0);
}
