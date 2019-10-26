import { Router } from 'express';

abstract class BaseController {
    public router: Router = Router();

    protected abstract initializeRoutes(): void;
}

export { BaseController };
