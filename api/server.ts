import { config } from 'dotenv';
import { createConnection } from 'typeorm';

import { App } from './app';

config();

const PORT = Number(process.env.PORT) || 4000;

createConnection().then(async () => {
    const app = new App(
        [],
        PORT,
    );

    app.listen();
}).catch(error => {
    console.log('Database connection error: ', error);
});
