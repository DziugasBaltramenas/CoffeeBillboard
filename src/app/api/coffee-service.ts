import queryString from 'querystring';

import { restService } from './common/rest-service';
import { CoffeeResponse, PaginationResponseModel, PaginationRequestModel, CoffeeRequest } from './model';

class CoffeeService {

    public readonly getCoffeeList = (
        query: PaginationRequestModel,
    ): Promise<PaginationResponseModel<CoffeeResponse>> => {
        return restService.get<PaginationResponseModel<CoffeeResponse>>(`/api/coffee?${queryString.stringify(query)}`)
            .then(response => response.data);
    };

    public readonly deleteCoffee = (id: string): Promise<void> => {
        return restService.delete(`/api/coffee/${id}`)
            .then(response => response.data);
    };

    public readonly createCoffee = (coffee: CoffeeRequest): Promise<CoffeeResponse> => {
        return restService.post(`/api/coffee`, coffee)
            .then(response => response.data);
    };
}

const coffeeService = new CoffeeService();

export { CoffeeService, coffeeService };
