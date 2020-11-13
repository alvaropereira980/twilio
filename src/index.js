require('dotenv').config();

const app = require('./server');
const http = require('http');
const server = http.createServer(app);

require('./database');
require('./websockets').connection(server);

server.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
