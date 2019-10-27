import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { CoffeeState, coffeeReducer } from './coffee/reducer';

export interface RootState {
    router: RouterState;
    coffee: CoffeeState;
}

export const rootReducer = (history: History) => combineReducers<RootState>({
    router: connectRouter(history),
    coffee: coffeeReducer,
});
