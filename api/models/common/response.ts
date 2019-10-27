import { Response as ExpressResponse } from 'express';

export interface Response<T = {}> extends Omit<ExpressResponse, 'send'> {
    send: (body?: T) => Response;
}
