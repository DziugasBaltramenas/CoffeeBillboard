import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import { BaseController } from 'models/base-controller';
import { errorHandler } from 'interceptors/error-handler';

class App {

    public app: express.Application;

    private readonly port: number;
    private PUBLIC_PATH: string = 'public';

    constructor(controllers: BaseController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeStaticContent();
        this.initializeErroHandler();
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
    }

    private initializeControllers(controllers: BaseController[]): void {
        controllers.forEach((controller) => {
            this.app.use('/api/', controller.router);
        });
    }

    private initializeStaticContent(): void {
        this.app.use(express.static(path.join(__dirname, this.PUBLIC_PATH)));
        this.app.get('*', (req, res) => {
            // TODO: return not found for wrong requests
            res.sendFile(path.join(__dirname, this.PUBLIC_PATH, 'index.html'));
        });
    }

    private initializeErroHandler(): void {
        this.app.use(errorHandler);
    }
}

export { App };
