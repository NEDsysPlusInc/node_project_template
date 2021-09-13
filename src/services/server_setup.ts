import express from 'express';

const app = express();

export class startingServer {
    constructor(server_port: number) {
        app.listen(server_port, () => {
            console.log(`Server is listening on port ${server_port} ` +
                'App route its Working ==> ' + new Date().toISOString().
                    replace(/T/, ' ').      // replace T with a space
                    replace(/\..+/, ''))
        })
    }

    serverStarted() {
        return app;
    }
}
  
