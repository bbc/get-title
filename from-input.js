'use strict';

const iconv = require('iconv-lite');
const parseHead = require('parse-head');
const getTitle = require('./from-array');

module.exports = function fromInput(stream, args) {
	const toBuffer = new Promise((resolve, reject) => {
		if (Buffer.isBuffer(stream)) return resolve(stream);
		if (typeof stream === 'string') return resolve(Buffer.from(stream));

		const buffers = [];
		stream.on('error', err => reject(err));
		stream.on('data', (chunk) => buffers.push(chunk));
		stream.on('end', () => resolve(Buffer.concat(buffers)));
	});

	let buffer;
	return toBuffer.then(b => {
		buffer = b;
		return parseHead(buffer);
	}).then((headers) => {
		const charsetNode = headers.find(h => h.nodeName === 'META' && h.charset && h.charset.toLowerCase() !== 'utf-8');
		if (charsetNode) {
			return parseHead(iconv.decode(buffer, charsetNode.charset));
		}
		return Promise.resolve(headers);
	}).then(headers => getTitle(headers, args));
};
