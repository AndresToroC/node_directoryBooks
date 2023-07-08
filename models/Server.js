import express from 'express';
import cors from 'cors';

import conexDB from '../database/conex';
import { AuthRouter, UserRouter } from '../router/_router';
import { createRoles } from '../controllers/RoleController';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectionDB();
        this.middleware();
        this.router();
        this.loadData();
    }

    middleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use('/public', express.static('public'))
    }

    async connectionDB() {
        await conexDB();
    }

    router() {
        this.app.use('/api/auth', AuthRouter)
        this.app.use('/api/user', UserRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App execute by port: ${ this.port }`);
        })
    }

    async loadData() {
        await createRoles()
    }
}

export default Server;