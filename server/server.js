const express = require('express'); 
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.rolesPath = '/api/roles';
        this.authPath  = '/api/auth';

        this.database();

        this.middlewares();

        this.routes();
    }

    database() {
        dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'));
        this.app.use(this.rolesPath, require('../routes/role.routes'));
        this.app.use(this.authPath,  require('../routes/auth.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;