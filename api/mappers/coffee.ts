import { Coffee } from 'entity/coffee';
import { CoffeeResponse, CoffeeRequest } from 'models/dto';


class CoffeeMapper {

    public static toCoffeeDto(coffee: Coffee): CoffeeResponse {
        return {
            id: coffee.id,
            title: coffee.title,
            price: coffee.price,
            imageFileName: coffee.image,
        };
    }

    public static toCoffeeEntity(coffee: CoffeeRequest): Coffee {
        const coffeeEntity = new Coffee();

        coffeeEntity.title = coffee.title;
        coffeeEntity.price = coffee.price;
        coffeeEntity.image = coffee.imageFileName;

        return coffeeEntity;
    }
}

export { CoffeeMapper };
