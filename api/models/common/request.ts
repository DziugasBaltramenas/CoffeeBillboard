import { Request as ExpressRequest } from 'express';

export interface Request<T = {}, P = {}> extends Omit<ExpressRequest, 'body'|'query'> {
    body: T;
    query: P;
}
