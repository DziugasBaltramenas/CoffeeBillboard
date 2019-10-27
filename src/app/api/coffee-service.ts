import queryString from 'querystring';

import { restService } from './common/rest-service';
import { CoffeeResponse, PaginationResponseModel, PaginationRequestModel } from './model';

class CoffeeService {

    public readonly getCoffeeList = (
        query: PaginationRequestModel
    ): Promise<PaginationResponseModel<CoffeeResponse>> => {
        return restService.get<PaginationResponseModel<CoffeeResponse>>(`/api/coffee?${queryString.stringify(query)}`)
            .then(response => response.data);
    };

}

const coffeeService = new CoffeeService();

export { CoffeeService, coffeeService };
