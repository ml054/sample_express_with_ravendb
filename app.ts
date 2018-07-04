import * as express from 'express';
import { DocumentStore } from 'ravendb';


// Creates and configures an ExpressJS web server.
class App {
    // ref to Express instance
    public express: express.Application;
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    private middleware(): void {
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', async (req, res, next) => {

            const store = new DocumentStore('http://live-test.ravendb.net', 'northwind');
            store.initialize();

            const session = store.openSession();

            const region = await session.load("regions/1-A");

            res.json({
                message: region
            });
        });
        this.express.use('/', router);
    }
}
export default new App().express;