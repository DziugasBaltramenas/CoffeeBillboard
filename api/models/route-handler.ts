import { Request, Response } from './common';
import { NextFunction } from 'express';

export type RouteHandler<T, P> = (req: Request<T>, res: Response<P>, next: NextFunction) => Promise<Response<P>>;
