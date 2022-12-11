const http = require('http');

const { isAllowedMethod } = require('./utilities');

http.createServer((req, res) => {
  /**
   * Restrict request methods - Only allows `allowedMethods`
   * Invalid methods are not handled here (Check README.md)
   */
  if (isAllowedMethod(req.method)) {
    res.statusCode = 200;
    res.end('OK');
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }
}).listen(80);
