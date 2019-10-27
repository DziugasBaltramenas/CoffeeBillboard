import { createAction } from 'redux-actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { CoffeeResponse } from 'app/api/model';
import { coffeeService } from 'app/api/coffee-service';

import { CoffeActionTypes } from './types';

const actions = {
    coffeeFetchingFailed: createAction(CoffeActionTypes.COFFEE_FETCHING_FAILED),
    coffeeFetchingStarted: createAction(CoffeActionTypes.COFFEE_FETCHING_STARTED),
    coffeeFetchingSucceeded: createAction<CoffeeResponse[]>(CoffeActionTypes.COFFEE_FETCHING_SUCCEEDED),
};

const fetchCoffees = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => 
    (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        dispatch(actions.coffeeFetchingStarted());
        return coffeeService.getCoffeeList()
            .then(coffees => {
                dispatch(actions.coffeeFetchingSucceeded(coffees));
            })
            .catch(error => {
                dispatch(actions.coffeeFetchingFailed());
            })
    }

export { fetchCoffees };