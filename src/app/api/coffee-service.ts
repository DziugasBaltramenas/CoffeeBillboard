import { restService } from './common/rest-service';
import { CoffeeResponse } from './model';

class CoffeeService {

    public readonly getCoffeeList = (): Promise<CoffeeResponse[]> => {
        return restService.get<CoffeeResponse[]>(`/api/coffee`)
            .then(response => response.data);
    };

}

const coffeeService = new CoffeeService();

export { CoffeeService, coffeeService };
