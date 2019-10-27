import { Request, Response } from './common';
import { NextFunction } from 'express';

export type RouteHandler<T, Q, P> = (req: Request<T, Q>, res: Response<P>, next: NextFunction) => Promise<Response<P>>;
