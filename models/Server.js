import express from 'express';
import conexDB from '../database/conex';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectionDB();
    }

    async connectionDB() {
        await conexDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App execute by port: ${ this.port }`);
        })
    }
}

export default Server;