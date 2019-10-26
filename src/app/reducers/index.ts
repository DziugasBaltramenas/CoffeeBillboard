import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

export interface RootState {
    router: RouterState;
}

export const rootReducer = (history: History) => combineReducers<RootState>({
    router: connectRouter(history),
});
