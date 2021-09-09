const express = require('express');
const http = require('http');

const app = express();

/**
 * Restrict request methods - Only allows `allowedMethods`
 * Invalid methods are not handled here (Check README.md)
 */

const allowedMethods = ['GET', 'POST'];
const isAllowedMethod = (method) => allowedMethods.includes(method);

app.use((req, res, next) => {
  if (isAllowedMethod(req.method)) {
    next();
  } else {
    res
      .status(405) // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      .send('Method Not Allowed');
  }
});

/**
 * Send default response
 */

app.use((req, res) => {
  res
    .status(200) // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
    .send('OK');
});

/**
 * Handle Errors - Based on Express.js default error handler
 * http://expressjs.com/en/guide/error-handling.html#the-default-error-handler
 */

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(500)
    .send('Error Occurred');
});

/**
 * The port to bind to is assigned by Heroku as the PORT environment variable
 * https://devcenter.heroku.com/articles/runtime-principles#web-servers
 * https://devcenter.heroku.com/articles/deploying-nodejs#specifying-a-start-script
 */

http.createServer(app).listen(process.env.PORT || 80);
