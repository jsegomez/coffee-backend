const Server = require('./server/server')

// Variables de entorno
require('dotenv').config();

// Configuración de servidor de express
const server = new Server();

server.listen();
