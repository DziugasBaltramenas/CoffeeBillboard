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
};

const coffeeReducer = handleActions<CoffeeState, PaginationResponseModel<CoffeeResponse> | number> (
    {
        [CoffeActionTypes.COFFEE_FETCHING_SUCCEEDED]: (state, action) => {
            const payload = action.payload as PaginationResponseModel<CoffeeResponse>;

            return {
                isLoading: false,
                coffees: state.coffees ? [ ...state.coffees, ...payload.items ] : payload.items,
                total: payload.count,
            }
        },
        [CoffeActionTypes.COFFEE_FETCHING_STARTED]: (state) => {
            return {
                ...state,
                isLoading: true,
            }
        },
        [CoffeActionTypes.COFFEE_FETCHING_FAILED]: (state) => {
            return {
                ...state,
                isLoading: false,
            }
        },
        [CoffeActionTypes.REMOVE_COFFEE]: (state, action) => {
            const payload = action.payload as number;

            return {
                ...state,
                coffees: state.coffees.filter(coffee => coffee.id !== payload),
                total: state.total - 1
            }
        },
        [CoffeActionTypes.INCREASE_TOTAL_COFFEES_COUNT]: (state) => {
            return {
                ...state,
                total: state.total + 1
            }
        },
    },
    initialState,
);

export { coffeeReducer };
