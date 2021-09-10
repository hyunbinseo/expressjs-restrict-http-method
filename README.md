# Features

[Example Code](#code) with and without using Express.js

| Feature | [Express.js](https://expressjs.com/) | [HTTP](https://nodejs.org/api/http.html) |  |
| -- | -- | -- | -- |
| Restrict [HTTP Request Methods](https://developer.mozilla.org/docs/Web/HTTP/Methods) | &check; | &check; | [Valid Request Methods](#valid-request-methods-in-nodejs) Only |
| Handle Error with a Custom Function | &check; |  |

# Specifications

Request with `GET` or `POST`

→ Respond with `200` and `OK`

---

Request with other [valid request methods](#valid-request-methods-in-nodejs)

→ Respond with `405` and `Method Not Allowed`

---

Request with any invalid request methods

→ Respond with `400` (related [GitHub issue](https://github.com/nodejs/node/issues/17248))

---

Error occurs in Express.js

→ Respond with `500` and `Error Occurred`

# Demo

Web hosted [demo](https://expressjs-restrict-http-method.herokuapp.com/) provided by Heroku
- Initial load maybe slow due to [Dyno sleeping](https://devcenter.heroku.com/articles/dynos#dyno-sleeping)
- Based on `with-express.js` code

# Code

Check the following files in the `src` directory
- `with-express.js`
- `without-express.js`

# Appendix

## Express.js vs Node.js [HTTP](https://nodejs.org/api/http.html)

Express.js `app.listen()` simply returns a Node.js `http.Server`

```
/**
 * Listen for connections.
 *
 * A node `http.Server` is returned, with this
 * application (which is a `Function`) as its
 * callback. If you wish to create both an HTTP
 * and HTTPS server you may do so with the "http"
 * and "https" modules as shown here:
 *
 *    var http = require('http')
 *      , https = require('https')
 *      , express = require('express')
 *      , app = express();
 *
 *    http.createServer(app).listen(80);
 *    https.createServer({ ... }, app).listen(443);
 *
 * @return {http.Server}
 * @public
 */
```
[expressjs / express / lib / application.js, GitHub](https://github.com/expressjs/express/blob/master/lib/application.js#L595-L614)

## Valid Request Methods in Node.js

Node.js HTTP Parser only considers these methods as valid

```
HTTP_ACL;
HTTP_BIND;
HTTP_CONNECT;
HTTP_DELETE;
HTTP_GET;
HTTP_HEAD;
HTTP_LOCK;
HTTP_MKCOL;
HTTP_NOTIFY;
HTTP_OPTIONS;
HTTP_POST;
HTTP_REPORT;
HTTP_SUBSCRIBE;
HTTP_TRACE;
HTTP_UNLOCK;
```
[nodejs / http-parser / http_parser.c, GitHub](https://github.com/nodejs/http-parser/blob/main/http_parser.c#L942-L963)

---

Other methods are considered invalid and are handled as error

```
switch (ch) {
  case 'A': parser->method = HTTP_ACL; break;
  // Other switch cases go here
  break;
  default:
    SET_ERRNO(HPE_INVALID_METHOD);
    goto error;
}
```
[nodejs / http-parser / http_parser.c, GitHub](https://github.com/nodejs/http-parser/blob/main/http_parser.c#L942-L963)

---

Therefore [in Node.js HTTP, invalid HTTP method returns a 400](https://github.com/nodejs/node/issues/17248).

```
const http = require('http');
http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('OK');
}).listen(80);

// Respond to all requests with `200` and `OK`
// Request using `AAA` method responds with `400`
```

## Reference Code From Official Documents

```
const express = require('express')
const https = require('https')
const http = require('http')
const app = express()

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)
```

[Express.js 4.x API / app.listen, Express.js Docs](http://expressjs.com/en/api.html#app.listen)

---

```
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
```

[The default error handler, Express.js Docs](http://expressjs.com/en/guide/error-handling.html#the-default-error-handler)

## Environment Used

- node `v16.7.0`
- npm `v7.20.3`
- express `v4.17.1`
