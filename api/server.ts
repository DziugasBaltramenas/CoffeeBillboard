import { config } from 'dotenv';
import { createConnection } from 'typeorm';

import { CoffeeController } from 'routes/coffee';
import { UploadController } from 'routes/upload';

import { App } from './app';

config();

const PORT = Number(process.env.PORT) || 4000;

createConnection().then(async () => {
    const app = new App(
        [
            new CoffeeController(),
            new UploadController()
        ],
        PORT,
    );

    app.listen();
}).catch(error => {
    console.log('Database connection error: ', error);
});
