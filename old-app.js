const http = require('http');
const router = require('./routes');

const server = http.createServer(router.routes);

server.listen(3001);