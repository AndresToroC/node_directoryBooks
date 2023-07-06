import express from 'express';
import cors from 'cors';

import conexDB from '../database/conex';
import { AuthRouter } from '../router/_router';
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
    }

    async connectionDB() {
        await conexDB();
    }

    router() {
        this.app.use('/api/auth', AuthRouter)
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