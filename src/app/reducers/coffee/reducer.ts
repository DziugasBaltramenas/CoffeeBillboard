import { handleActions } from 'redux-actions';

import { CoffeeResponse, PaginationResponseModel } from 'app/api/model';

import { CoffeActionTypes } from './types';

export interface CoffeeState {
    isLoading: boolean;
    coffees: CoffeeResponse[];
    total: number;
}

const initialState: CoffeeState = {
    isLoading: false,
    coffees: null,
    total: 999,
}

const coffeeReducer = handleActions<CoffeeState, PaginationResponseModel<CoffeeResponse>>(
    {
        [CoffeActionTypes.COFFEE_FETCHING_FAILED]: (state) => {
            return {
                ...state,
                isLoading: false,
            }
        },
        [CoffeActionTypes.COFFEE_FETCHING_SUCCEEDED]: (state, action) => {
            return {
                isLoading: false,
                coffees: state.coffees ? [...state.coffees, ...action.payload.items] : action.payload.items,
                total: action.payload.count,
            }
        },
        [CoffeActionTypes.COFFEE_FETCHING_STARTED]: (state) => {
            return {
                ...state,
                isLoading: true,
            }
        },
    },
    initialState,
);

export { coffeeReducer };
