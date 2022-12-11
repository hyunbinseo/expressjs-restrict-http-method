const express = require('express');
const http = require('node:http');

const app = express();

/**
 * Restrict request methods - Only allows `allowedMethods`
 * Invalid methods are not handled here (Check README.md)
 */

const { allowedMethods, makeRequests } = require('./utilities');

app.use((req, res, next) => {
  if (allowedMethods.has(req.method)) {
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

http.createServer(app).listen(80);

makeRequests();
