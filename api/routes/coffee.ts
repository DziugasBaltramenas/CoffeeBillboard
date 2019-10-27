import { BaseController } from 'models/base-controller';
import { Request, Response } from 'models/common';
import { Coffee } from 'entity/coffee';

class CoffeeController extends BaseController {
    private BASE_PATH: string = '/coffee';

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(this.BASE_PATH, this.getAllCoffees);
    }

    private getAllCoffees(req: Request, res: Response): void {
        Coffee.find().then(coffees => res.send(coffees));
    }
}

export { CoffeeController };
