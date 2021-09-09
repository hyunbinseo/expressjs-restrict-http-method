# Goals

- [x] Use code provided by [official documents](#reference)

# Features

- [x] Restrict [Known Request Method Type](#known-request-method-type)
- [ ] Restrict Unknown Request Method Type

## Known Request Method Type

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

# Reference

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

# Environment

- node `>=16.7.0`
- npm `>=7.20.3`
- express `^4.17.1`
