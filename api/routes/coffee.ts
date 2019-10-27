import { BaseController } from 'models/base-controller';
import { Request, Response, PaginationRequestModel, PaginationResponseModel } from 'models/common';
import { Coffee } from 'entity/coffee';
import { CoffeeResponse } from 'models/dto';
import { CoffeeMapper } from 'mappers/coffee';

class CoffeeController extends BaseController {
    private BASE_PATH: string = '/coffee';

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(this.BASE_PATH, this.getAllCoffees);
    }

    private getAllCoffees(
        req: Request<{},PaginationRequestModel>,
        res: Response<PaginationResponseModel<CoffeeResponse>>
    ): void {
        Coffee.findAndCount({
            take: req.query.take,
            skip: req.query.skip
        }).then(([result, total]) => {
            res.send({
                items: result.map(CoffeeMapper.toCoffeeDto),
                count: total
            });
        })
    }
}

export { CoffeeController };
