import express from 'express';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App execute by port: ${ this.port }`);
        })
    }
}

export default Server;