import express from 'express';
import cors from 'cors';

import conexDB from '../database/conex';
import { createRoles } from '../controllers/RoleController';
import { AuthRouter, BookRouter, CategoryRouter, UserRouter } from '../router/_router';

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
        this.app.use('/api/category', CategoryRouter)
        this.app.use('/api/book', BookRouter)
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