const express = require('express');
const http = require('http');

const app = express();

http.createServer(app).listen(80);
