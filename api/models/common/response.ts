import { Response as ExpressResponse } from 'express';

interface Response<T = {}> extends Omit<ExpressResponse, 'send'> {
    send: (body?: T) => Response;
}

export { Response };
