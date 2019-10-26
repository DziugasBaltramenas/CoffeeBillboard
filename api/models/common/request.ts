import { Request as ExpressRequest } from 'express';

interface Request<T = {}> extends Omit<ExpressRequest, 'body'> {
    body: T;
}

export { Request };
