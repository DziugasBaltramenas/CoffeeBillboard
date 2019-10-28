import { createAction } from 'redux-actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { CoffeeResponse, PaginationRequestModel, PaginationResponseModel } from 'app/api/model';
import { coffeeService } from 'app/api/coffee-service';

import { CoffeActionTypes } from './types';

const actions = {
    coffeeFetchingFailed: createAction(CoffeActionTypes.COFFEE_FETCHING_FAILED),
    coffeeFetchingStarted: createAction(CoffeActionTypes.COFFEE_FETCHING_STARTED),
    coffeeFetchingSucceeded: createAction<PaginationResponseModel<CoffeeResponse>>(
        CoffeActionTypes.COFFEE_FETCHING_SUCCEEDED
    ),
    fetchCoffees: (query: PaginationRequestModel): ThunkAction<Promise<void>, {}, {}, AnyAction> => 
        (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
            dispatch(actions.coffeeFetchingStarted());

            return coffeeService.getCoffeeList(query)
                .then(result => {
                    dispatch(actions.coffeeFetchingSucceeded(result));
                })
                .catch(() => {
                    dispatch(actions.coffeeFetchingFailed());
                })
    },
    removeCoffee: createAction(CoffeActionTypes.REMOVE_COFFEE),
    increaseTotal: createAction(CoffeActionTypes.INCREASE_TOTAL_COFFEES_COUNT),
};

export { actions };
