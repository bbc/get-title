# get-title [![Build Status](https://travis-ci.org/bbcrd/get-title.svg?branch=master)](https://travis-ci.org/bbcrd/get-title)

> A promise to extract the best title value contained in some HTML content.

The streaming approach helps remaining efficient in spite of malformed or very large HTML documents.

**Notice**: this module requires `node>=4` to work.

# Install

```bash
$ npm install --save get-title
```

# Usage

## Node API

```js
const getTitle = require('get-title');
const hyperquest = require('hyperquest');

const stream = hyperquest('http://www.bbc.co.uk/news/uk-england-tyne-36570429');

getTitle(stream).then(title => {
  // ...
});
```

You can also analyse a set of `<head>` tags provided as an array of objects
(eg: like these provided by [`parse-head`](https://npmjs.com/parse-head)):

```js
const getTitle = require('get-title/from-array');

const headers = [ { nodeName: 'TITLE', innerText: '...'  }, ... ];

getTitle(headers).then(title => {
  // ...
});
```

## Command line

```bash
Usage: cat some/file.html | get-title [options]

Options:
  --help      Show help                                                [boolean]

Examples:
  cat some/file.html | get-title
  curl -Ss http://www.bbc.co.uk/news/uk-england-tyne-36570429 | get-title
  > Lickety Split ice cream parlour's van stolen - BBC News
```


# License

> Copyright 2016, British Broadcasting Corporation
>
> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
>
>     http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
> See the License for the specific language governing permissions and
> limitations under the License.
