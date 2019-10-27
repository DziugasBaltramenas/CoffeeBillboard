import { BaseController } from 'models/base-controller';
import { Request, Response, PaginationRequestModel, PaginationResponseModel } from 'models/common';
import { Coffee } from 'entity/coffee';
import { CoffeeResponse, CoffeeRequest } from 'models/dto';
import { CoffeeMapper } from 'mappers/coffee';
import { withErrorHandler } from 'interceptors/error-handler';

class CoffeeController extends BaseController {
    private BASE_PATH: string = '/coffee';
    private PECIFIC_COFFEE_PATH: string = `${this.BASE_PATH}/:id`;

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes(): void {
        this.router.get(this.BASE_PATH, withErrorHandler(this.getCoffees));
        this.router.delete(this.PECIFIC_COFFEE_PATH, withErrorHandler(this.deleteCoffee));
        this.router.post(this.BASE_PATH, withErrorHandler(this.createCoffee));
    }

    private getCoffees(
        req: Request<{},PaginationRequestModel>,
        res: Response<PaginationResponseModel<CoffeeResponse>>
    ): Promise<Response> {
        return Coffee.findAndCount({
            take: req.query.take,
            skip: req.query.skip
        }).then(([result, total]) =>  
            res.send({
                items: result.map(CoffeeMapper.toCoffeeDto),
                count: total
            })
        )
    }

    private deleteCoffee(req: Request, res: Response): Promise<Response> {
        return Coffee.delete(req.params.id).then(() => res.status(204).send())
    }

    private createCoffee(req: Request<CoffeeRequest>, res: Response): Promise<Response> {
        const coffee = CoffeeMapper.toCoffeeEntity(req.body);

        return coffee.save().then((result) => res.send(CoffeeMapper.toCoffeeDto(result)))
    }
}

export { CoffeeController };
