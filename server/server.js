const express = require('express'); 
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            roles:      '/api/roles',
            users:      '/api/users',
            categories: '/api/categories'
        }

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
        this.app.use(this.paths.users,      require('../routes/user.routes'));
        this.app.use(this.paths.roles,      require('../routes/role.routes'));
        this.app.use(this.paths.auth,       require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;