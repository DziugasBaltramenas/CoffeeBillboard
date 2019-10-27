import { handleActions } from 'redux-actions';

import { CoffeeResponse } from 'app/api/model';

import { CoffeActionTypes } from './types';

export interface CoffeeState {
    isLoading: boolean;
    coffees: CoffeeResponse[];
}

const initialState: CoffeeState = {
    isLoading: false,
    coffees: null
}

const coffeeReducer = handleActions<CoffeeState, CoffeeResponse[]>(
    {
        [CoffeActionTypes.COFFEE_FETCHING_FAILED]: () => {
            return {
                isLoading: false,
                coffees: null,
            }
        },
        [CoffeActionTypes.COFFEE_FETCHING_SUCCEEDED]: (state, action) => {
            return {
                isLoading: false,
                coffees: action.payload,
            }
        },
        [CoffeActionTypes.COFFEE_FETCHING_STARTED]: () => {
            return {
                isLoading: true,
                coffees: null,
            }
        },
    },
    initialState,
);

export { coffeeReducer };
