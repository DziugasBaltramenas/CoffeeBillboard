import { Coffee } from 'entity/coffee';
import { CoffeeResponse } from 'models/dto';


class CoffeeMapper {

    public static toCoffeeDto(coffee: Coffee): CoffeeResponse {
        return {
            id: coffee.id,
            title: coffee.title,
            price: coffee.price,
        };
    }
}

export { CoffeeMapper };
